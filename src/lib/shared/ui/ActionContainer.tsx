import { useEffect, useMemo, useState } from 'react';
import { ActionLayout } from './ActionLayout';
import {
  BlinkButton,
  BlinkGetResponse,
  BlinkInput,
  BlinkLayout,
  BlinkPrepareTxActionResponse,
  ExecuteTxClientSideAction,
} from '../api/dialectSpec';
import { Connection } from '@solana/web3.js';

const ROOT_URL = 'https://blinks-poc.vercel.app';
const RPC_URL = '';

const confirmTransaction = (sig: string) => {
  // todo: inject url
  const connection = new Connection(RPC_URL, 'confirmed');
  let retry = 0;
  const RETRY_TIMEOUT = 1000;
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

const buildUrl = (
  base: string,
  path: string,
  params?: Record<string, string>,
) => {
  const url = new URL(base + path);

  if (params) {
    Object.entries(params).map(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
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

export const ActionContainer = ({ initialUrl }: { initialUrl: string }) => {
  const [blink, setBlink] = useState<BlinkLayout>();
  const rootUrl = useMemo(() => new URL(initialUrl).origin, [initialUrl]);

  async function getBlink(url: string) {
    console.log('get blink', url);
    const blinkResponse = await fetch(url);
    const blink = (await blinkResponse.json()) as BlinkGetResponse;
    setBlink(blink.layout);
  }

  useEffect(() => {
    getBlink(initialUrl).catch(console.error);
  }, [initialUrl]);

  if (!blink) return null;

  const patchLayout = (patch: Partial<BlinkLayout>) => {
    setBlink({ ...blink, ...patch });
  };

  async function executeTransaction(
    action: ExecuteTxClientSideAction,
    params?: Record<string, string>,
  ) {
    const onSuccessLayoutPatch = action.onTxSuccess.slice;
    const onError = (error: string) => {
      if (action.onTxError.action === 'get-blink') {
        getBlink(buildUrl(rootUrl, action.onTxError.url, { error }));
        return;
      }

      if (action.onTxError.action === 'mutate-layout') {
        patchLayout(action.onTxError.slice);
        return;
      }
    };

    try {
      const connectedAccount = await connect();

      if (!connectedAccount) {
        return;
      }

      // Request transaction
      const transactionResponse = await fetch(
        action.prepareTx?.url
          ? buildUrl(rootUrl, action.prepareTx.url, params)
          : buildUrl(initialUrl, '', params),
        {
          method: 'POST',
          body: JSON.stringify({ account: connectedAccount }),
        },
      );
      const tx =
        (await transactionResponse.json()) as BlinkPrepareTxActionResponse;
      // Update layout to show transaction signing
      patchLayout({ ...action.onTxExecuting.slice, error: null });
      const result = await chrome.runtime.sendMessage({
        type: 'sign_transaction',
        payload: {
          txData: tx.transaction,
        },
      });

      if (!result || result.error) {
        onError(result.error ?? 'Unknown error');
      } else {
        await confirmTransaction(result.signature);
        patchLayout({ ...onSuccessLayoutPatch, error: null });
      }
    } catch (e: any) {
      console.log(e);
      onError(e.message ?? 'Unknown error');
    }
  }

  const onButtonClick = async (
    btn: BlinkButton,
    params?: Record<string, string>,
  ) => {
    if (btn.onClick?.action === 'execute-tx-client-side') {
      await executeTransaction(btn.onClick, params);
    } else if (btn.onClick?.action === 'get-blink') {
      getBlink(buildUrl(rootUrl, btn.onClick.url));
    } else {
      console.log('Unknown button');
    }
  };

  const asButtonProps = (it: BlinkButton) => ({
    text: it.text,
    loading: it.loading,
    disabled: it.disabled,
    variant: it.variant,
    onClick: (params?: Record<string, string>) => onButtonClick(it, params),
  });

  const asInputProps = (it?: BlinkInput | null) => {
    if (!it) {
      return;
    }

    return {
      placeholder: it.hint,
      name: it.name,
      button: asButtonProps(it.button),
    };
  };

  return (
    <ActionLayout
      title={blink.title}
      description={blink.description}
      image={blink.image}
      error={blink.error}
      buttonRows={blink.buttons?.map((row) =>
        row.map((it) => asButtonProps(it)),
      )}
      input={asInputProps(blink.input)}
    />
  );
};
