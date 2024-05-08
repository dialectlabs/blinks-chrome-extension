import { Button } from './Button';
import { useState } from 'react';
import { CheckIcon, SpinnerDots } from './icons';

export const ActionContainer = () => {
  return (
    <div className="w-full rounded-2xl bg-twitter-neutral-80 overflow-hidden mt-3">
      <img
        className="w-full aspect-square object-cover"
        src="https://pbs.twimg.com/profile_images/1749869491834462208/IEVQauMR_400x400.jpg"
        alt={'action-image'}
      />
      <div className="p-5 flex flex-col">
        <span className="text-subtext text-twitter-neutral-50 mb-1.5">
          dialect.to
        </span>
        <span className="text-text text-white font-semibold">
          Dialect Hello World
        </span>
        <span className="text-subtext text-twitter-neutral-40 mb-4">
          Sign message to say hello to this world
        </span>
        <ActionButton />
      </div>
    </div>
  );
};

const ActionButton = () => {
  const [signedMessage, setSignedMessage] = useState();
  const [isSigning, setIsSigning] = useState(false);

  const ButtonContent = () => {
    if (isSigning)
      return (
        <span className="flex flex-row items-center justify-center gap-2">
          Signing <SpinnerDots />
        </span>
      );
    if (signedMessage)
      return (
        <span className="flex flex-row items-center justify-center gap-2 text-twitter-success">
          Message Signed
          <CheckIcon />
        </span>
      );

    return 'Sign Message';
  };
  const signMessage = async () => {
    const res = await chrome.runtime.sendMessage({ type: 'connect' });
    console.log('button on click', res);
    setIsSigning(true);
    const signedMsg = await chrome.runtime.sendMessage({
      type: 'sign_message',
      payload: { message: 'hello' },
    });
    setIsSigning(false);
    setSignedMessage(signedMsg);
    console.log('signed message', signedMsg);
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