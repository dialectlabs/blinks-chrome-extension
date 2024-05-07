import { PropsWithChildren } from 'react';

export const Button = ({
  onClick,
  disabled,
  children,
}: { onClick: () => void; disabled?: boolean } & PropsWithChildren) => {
  const buttonStyle = disabled
    ? 'bg-neutral-700 text-neutral-500'
    : 'bg-sky-500 text-white';
  return (
    <button
      className={
        'w-full text-text font-semibold rounded-full px-6 py-3 ' + buttonStyle
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
