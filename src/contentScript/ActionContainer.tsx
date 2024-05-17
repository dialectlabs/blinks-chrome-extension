import { useEffect, useState } from 'react';
import { ActionLayout } from './ActionLayout';
import {
  BlinkButton,
  BlinkGetResponse,
  BlinkLayout,
  BlinkPrepareTxActionResponse,
  ExecuteTxClientSideAction,
} from './api/dialectSpec';

const ROOT_URL = 'https://blinks-poc.vercel.app';

export const ActionContainer = () => {
  const [account, setAccount] = useState('');
  useEffect(() => {
    const connectWallet = async () => {
      const data = await chrome.runtime.sendMessage({ type: 'connect' });
      setAccount(data);
    };

    connectWallet().catch(console.error);
  }, []);

  const BLINK_URL =
    ROOT_URL +
    '/api/blinks/donate?' +
    new URLSearchParams({
      account,
      to: 'Gde9K4TuAKZFM1JvLkvvBmGuVY9E64tnJ34ckNbB7BEA',
    });

  const [blink, setBlink] = useState<BlinkLayout>();

  async function getBlink(url: string) {
    const blinkResponse = await fetch(url);
    const blink = (await blinkResponse.json()) as BlinkGetResponse;
    setBlink(blink.layout);
  }

  useEffect(() => {
    if (account) {
      getBlink(BLINK_URL).catch(console.error);
    }
  }, [account]);

  if (!blink) return null;

  const patchLayout = (patch: Partial<BlinkLayout>) => {
    setBlink({ ...blink, ...patch });
  };

  async function executeTransaction(action: ExecuteTxClientSideAction) {
    const onSuccessLayoutPatch = action.onTxSuccess.slice;
    const onError = (error: string) => {
      if (action.onTxError.action === 'get-blink') {
        const url =
          ROOT_URL +
          action.onTxError.url +
          '&' +
          new URLSearchParams({
            error,
          });
        getBlink(url);
      }
    };
    try {
      // Request transaction
      const transactionResponse = await fetch(
        action.prepareTx?.url ? ROOT_URL + action.prepareTx?.url : BLINK_URL,
        {
          method: 'POST',
          body: JSON.stringify({ account }),
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
      console.log('result', result);
      //
      if (!result || result.error) {
        onError(result.error ?? 'Unknown error');
      } else {
        // TODO transaction confirmation
        patchLayout(onSuccessLayoutPatch);
      }
    } catch (e) {
      onError(e.message ?? 'Unknown error');
    }
  }

  const onButtonClick = async (btn: BlinkButton) => {
    if (btn.onClick?.action === 'execute-tx-client-side') {
      await executeTransaction(btn.onClick);
    } else if (btn.onClick?.action === 'get-blink') {
      const url = ROOT_URL + btn.onClick.url;
      getBlink(url);
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
