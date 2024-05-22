import { useEffect, useMemo, useState } from 'react';
import { ActionLayout } from './ActionLayout';
import {
  BlinkButton,
  BlinkGetResponse,
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
  url.search = new URLSearchParams(params).toString();
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
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const rootUrl = useMemo(() => new URL(initialUrl).origin, [initialUrl]);

  async function getBlink(url: string) {
    const blinkResponse = await fetch(url);
    const blink = (await blinkResponse.json()) as BlinkGetResponse;
    setCurrentUrl(url);
    setBlink(blink.layout);
  }

  useEffect(() => {
    getBlink(initialUrl).catch(console.error);
  }, [initialUrl]);

  if (!blink) return null;

  const patchLayout = (patch: Partial<BlinkLayout>) => {
    setBlink({ ...blink, ...patch });
  };

  async function executeTransaction(action: ExecuteTxClientSideAction) {
    const onSuccessLayoutPatch = action.onTxSuccess.slice;
    const onError = (error: string) => {
      if (action.onTxError.action === 'get-blink') {
        getBlink(buildUrl(rootUrl, action.onTxError.url, { error }));
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
          ? buildUrl(rootUrl, action.prepareTx.url)
          : currentUrl,
        {
          method: 'POST',
          body: JSON.stringify({ account: connectedAccount }),
        },
      );
      const tx =
        (await transactionResponse.json()) as BlinkPrepareTxActionResponse;
      // Update layout to show transaction signing
      patchLayout(action.onTxExecuting.slice);
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
        patchLayout(onSuccessLayoutPatch);
      }
    } catch (e) {
      console.log(e);
      onError(e.message ?? 'Unknown error');
    }
  }

  const onButtonClick = async (btn: BlinkButton) => {
    if (btn.onClick?.action === 'execute-tx-client-side') {
      await executeTransaction(btn.onClick);
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
    onClick: () => onButtonClick(it),
  });

  return (
    <ActionLayout
      title={blink.title}
      description={blink.description}
      image={blink.image}
      error={blink.error}
      buttonRows={blink.buttons?.map((row) =>
        row.map((it) => asButtonProps(it)),
      )}
    />
  );
};
