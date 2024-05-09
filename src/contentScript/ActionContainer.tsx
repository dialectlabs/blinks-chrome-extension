import { Button } from './Button';
import { useState } from 'react';
import { CheckIcon, SpinnerDots } from './icons';

export const ActionContainer = ({ content }: { content: ActionContent }) => {
  return (
    <div className="w-full rounded-2xl bg-twitter-neutral-80 overflow-hidden mt-3 shadow-action border border-twitter-accent">
      {content.imageUrl && (
        <img
          className="w-full aspect-square object-cover object-left"
          src={content.imageUrl}
          alt="action-image"
        />
      )}
      <div className="p-5 flex flex-col">
        <span className="text-subtext text-twitter-neutral-50 mb-1.5">
          {content.website}
        </span>
        <span className="text-text text-white font-semibold">
          {content.title}
        </span>
        <span className="text-subtext text-twitter-neutral-40 mb-4">
          {content.description}
        </span>
        <ActionButton />
      </div>
    </div>
  );
};

const ActionButton = () => {
  const [signedMessage, setSignedMessage] = useState();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const ButtonContent = () => {
    if (isSigning)
      return (
        <span className="flex flex-row items-center justify-center gap-2">
          Waiting for Wallet <SpinnerDots />
        </span>
      );
    if (isExecuting)
      return (
        <span className="flex flex-row items-center justify-center gap-2">
          Donating <SpinnerDots />
        </span>
      );
    if (signedMessage)
      return (
        <span className="flex flex-row items-center justify-center gap-2 text-twitter-success">
          Donated
          <CheckIcon />
        </span>
      );

    return 'Thank Creator (50 Droplets)';
  };
  const signMessage = async () => {
    setIsSigning(true);
    try {
      const res = await chrome.runtime.sendMessage({ type: 'connect' });
      console.log('button on click', res);
      const signedMsg = await chrome.runtime.sendMessage({
        type: 'sign_message',
        payload: { message: 'This is a demo flow' },
      });
      setSignedMessage(signedMsg);
      console.log('signed message', signedMsg);
      if (signedMsg) {
        setIsExecuting(true);
        setTimeout(() => setIsExecuting(false), 2500);
      }
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <Button
      onClick={signMessage}
      disabled={isSigning || Boolean(signedMessage)}
    >
      <ButtonContent />
    </Button>
  );
};
