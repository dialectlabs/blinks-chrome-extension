import { Button } from './Button';
import { CheckIcon, SpinnerDots } from './icons';
import { useState } from 'react';

interface LayoutProps {
  image?: string;
  error?: string | null;
  website?: string;
  title: string;
  description: string;
  buttonRows?: ButtonProps[][];
  input?: InputProps;
}
interface ButtonProps {
  text: string | null;
  loading?: boolean;
  variant?: 'default' | 'success' | 'error';
  disabled?: boolean;
  onClick: (params?: Record<string, string>) => void;
}
interface InputProps {
  placeholder?: string;
  name: string;
  button: ButtonProps;
}

export const ActionLayout = ({
  title,
  description,
  image,
  website,
  buttonRows,
  input,
  error,
}: LayoutProps) => {
  return (
    <div className="w-full rounded-2xl bg-twitter-neutral-80 overflow-hidden mt-3 shadow-action border border-twitter-accent">
      {image && (
        <img
          className="w-full aspect-square object-cover object-left"
          src={image}
          alt="action-image"
        />
      )}
      <div className="p-5 flex flex-col">
        {website && (
          <span className="text-subtext text-twitter-neutral-50 mb-1.5">
            {website}
          </span>
        )}
        <span className="text-text text-white font-semibold">{title}</span>
        <span className="text-subtext text-twitter-neutral-40 mb-4">
          {description}
        </span>
        {buttonRows?.map((row, index) => (
          <div key={index} className="flex items-center gap-2">
            {row.map((it, index) => (
              <ActionButton key={index} {...it} />
            ))}
          </div>
        ))}
        {input && (
          <div className="mt-3">
            <ActionInput {...input} />
          </div>
        )}
        {error && (
          <span className="flex justify-center text-subtext text-twitter-error mt-4">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

const ActionInput = ({ placeholder, name, button }: InputProps) => {
  const [value, onChange] = useState('');

  return (
    <div className="rounded-full flex items-center gap-2 border border-[#3D4144]">
      <input
        placeholder={placeholder || 'Type here...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent ml-4 flex-1 outline-none"
      />
      <div className="my-2 mr-2">
        <ActionButton
          {...button}
          onClick={() => button.onClick({ [name]: value })}
          disabled={button.disabled || value === ''}
        />
      </div>
    </div>
  );
};

const ActionButton = ({
  text,
  loading,
  disabled,
  variant,
  onClick,
}: ButtonProps) => {
  const ButtonContent = () => {
    if (loading)
      return (
        <span className="flex flex-row items-center justify-center gap-2">
          {text} <SpinnerDots />
        </span>
      );
    if (variant === 'success')
      return (
        <span className="flex flex-row items-center justify-center gap-2 text-twitter-success">
          {text}
          <CheckIcon />
        </span>
      );
    return text;
  };

  return (
    <Button onClick={() => onClick()} disabled={disabled} variant={variant}>
      <ButtonContent />
    </Button>
  );
};
