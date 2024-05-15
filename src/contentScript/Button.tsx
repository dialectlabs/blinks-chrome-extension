import { PropsWithChildren } from 'react';

export const Button = ({
  onClick,
  disabled,
  children,
}: { onClick: () => void; disabled?: boolean } & PropsWithChildren) => {
  const buttonStyle = disabled
    ? 'bg-twitter-neutral-70 text-twitter-neutral-50'
    : 'bg-twitter-accent text-white';
  return (
    <button
      className={
        'w-full flex justify-center items-center text-text font-semibold rounded-full px-6 py-3 ' +
        buttonStyle
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
