import { useEffect, useMemo, useReducer, useState } from 'react';
import { ActionLayout, ButtonProps } from './ActionLayout';
import { Connection } from '@solana/web3.js';
import { Action, ActionComponent } from '../api/Action';

const ROOT_URL = 'https://blinks-poc.vercel.app';
const RPC_URL = '';

const confirmTransaction = (sig: string) => {
  // todo: inject url
  const connection = new Connection(RPC_URL, 'confirmed');
  let retry = 0;
  const RETRY_TIMEOUT = 5000;
  const MAX_RETRIES = 5;

  return new Promise(async (res, rej) => {
    const latestBlockhash = await connection.getLatestBlockhash();

    const confirm = async () => {
      if (retry > MAX_RETRIES) {
        rej(new Error('Unable to confirm transaction'));
        return;
      }
      retry += 1;

      try {
        const result = await connection.confirmTransaction({
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          blockhash: latestBlockhash.blockhash,
          signature: sig,
        });

        if (result.value.err) {
          setTimeout(confirm, RETRY_TIMEOUT);
          return;
        }

        res(result);
      } catch (e) {
        setTimeout(confirm, RETRY_TIMEOUT);
        return;
      }
    };

    confirm();
  });
};

const connect = async () => {
  try {
    return await chrome.runtime.sendMessage({
      type: 'connect',
    });
  } catch {
    return null;
  }
};

type ExecutionStatus = 'idle' | 'executing' | 'success' | 'error';

interface ExecutionState {
  status: ExecutionStatus;
  executingAction?: ActionComponent | null;
  errorMessage?: string | null;
  successMessage?: string | null;
}

enum ExecutionType {
  INITIATE = 'INITIATE',
  FINISH = 'FINISH',
  FAIL = 'FAIL',
  RESET = 'RESET',
}

type ActionValue =
  | {
      type: ExecutionType.INITIATE;
      executingAction: ActionComponent;
      errorMessage?: string;
    }
  | {
      type: ExecutionType.FINISH;
      successMessage?: string | null;
    }
  | {
      type: ExecutionType.FAIL;
      errorMessage: string;
    }
  | {
      type: ExecutionType.RESET;
    };

const executionReducer = (
  state: ExecutionState,
  action: ActionValue,
): ExecutionState => {
  switch (action.type) {
    case ExecutionType.INITIATE:
      return { status: 'executing', executingAction: action.executingAction };
    case ExecutionType.FINISH:
      return {
        ...state,
        status: 'success',
        successMessage: action.successMessage,
        errorMessage: null,
      };
    case ExecutionType.FAIL:
      return {
        ...state,
        status: 'error',
        errorMessage: action.errorMessage,
        successMessage: null,
      };
    case ExecutionType.RESET:
      return {
        status: 'idle',
      };
  }
};

const buttonVariantMap: Record<
  ExecutionStatus,
  'default' | 'error' | 'success'
> = {
  idle: 'default',
  executing: 'default',
  success: 'success',
  error: 'error',
};

const buttonLabelMap: Record<ExecutionStatus, string | null> = {
  idle: null,
  executing: 'Executing',
  success: 'Completed',
  error: 'Failed',
};

export const ActionContainer = ({
  initialApiUrl,
  websiteUrl,
}: {
  initialApiUrl: string;
  websiteUrl?: string;
}) => {
  const [executionState, dispatch] = useReducer(executionReducer, {
    status: 'idle',
  });
  const [action, setAction] = useState<Action | null>(null);

  useEffect(() => {
    Action.fetch(initialApiUrl).then(setAction).catch(console.error);
  }, [initialApiUrl]);

  const buttons = useMemo(
    () =>
      action?.actions
        .filter((it) => !it.parameter)
        .filter((it) =>
          executionState.executingAction
            ? executionState.executingAction === it
            : true,
        ) ?? [],
    [action, executionState.executingAction],
  );
  const inputs = useMemo(
    () =>
      action?.actions
        .filter((it) => it.parameter)
        .filter((it) =>
          executionState.executingAction
            ? executionState.executingAction === it
            : true,
        ) ?? [],
    [action, executionState.executingAction],
  );

  if (!action) {
    return null;
  }

  const execute = async (
    component: ActionComponent,
    params?: Record<string, string>,
  ) => {
    if (component.parameter && params) {
      component.setValue(params[component.parameter.name]);
    }

    dispatch({ type: ExecutionType.INITIATE, executingAction: component });

    try {
      const account = await connect();
      if (!account) {
        dispatch({ type: ExecutionType.RESET });
        return;
      }

      const tx = await component.post(account);
      const signResult = await chrome.runtime.sendMessage({
        type: 'sign_transaction',
        payload: {
          txData: tx.transaction,
        },
      });

      if (!signResult || signResult.error) {
        dispatch({ type: ExecutionType.RESET });
      } else {
        await confirmTransaction(signResult.signature);
        dispatch({
          type: ExecutionType.FINISH,
          successMessage: tx.message,
        });
      }
    } catch (e) {
      dispatch({
        type: ExecutionType.FAIL,
        errorMessage: (e as Error).message ?? 'Unknown error',
      });
    }
  };

  const asButtonProps = (it: ActionComponent): ButtonProps => ({
    text: buttonLabelMap[executionState.status] ?? it.label,
    loading:
      executionState.status === 'executing' &&
      it === executionState.executingAction,
    disabled: action.disabled || executionState.status !== 'idle',
    variant: buttonVariantMap[executionState.status],
    onClick: (params?: Record<string, string>) => execute(it, params),
  });

  const asInputProps = (it: ActionComponent) => {
    return {
      // since we already filter this, we can safely assume that parameter is not null
      placeholder: it.parameter!.label,
      disabled: action.disabled || executionState.status !== 'idle',
      name: it.parameter!.name,
      button: asButtonProps(it),
    };
  };

  return (
    <ActionLayout
      title={action.title}
      description={action.description}
      website={websiteUrl}
      image={action.icon}
      error={
        executionState.status !== 'success'
          ? executionState.errorMessage ?? action.error
          : null
      }
      success={executionState.successMessage}
      buttons={buttons.map((component) => asButtonProps(component))}
      inputs={inputs.map((component) => asInputProps(component))}
    />
  );
};
