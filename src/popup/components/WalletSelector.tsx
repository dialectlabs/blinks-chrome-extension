import { ReactNode, useState } from 'react';
import PhantomLogo from '../assets/PhantomLogo';
import SolflareLogo from '../assets/SolflareLogo';
import BackpackLogo from '../assets/BackpackLogo';
import ArrowFromSquareIcon from '../icons/ArrowFromSquareIcon';
import CommentExclamationIcon from '../icons/CommentExclamationIcon';

interface WalletProps {
  isSelected?: boolean;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  rightAdornment?: ReactNode;
}
const Wallet = ({
  title,
  subtitle,
  icon,
  rightAdornment,
  isSelected,
}: WalletProps) => {
  const borderColor = isSelected ? 'border-accent-brand' : 'border-secondary';
  return (
    <div
      className={
        'border px-4 py-3 flex flex-row items-center gap-3 rounded-lg ' +
        borderColor
      }
    >
      {icon}
      <div className="flex flex-col flex-1">
        <span className="text-text font-medium">{title}</span>
        {subtitle && (
          <span className="text-caption font-medium text-quaternary">
            {subtitle}
          </span>
        )}
      </div>
      {rightAdornment}
    </div>
  );
};

export const WalletSelector = () => {
  const [selectedWallet, setSelectedWallet] = useState<string>();

  //TODO normal checkbox
  const getRightAdornment = (wallet: string) =>
    selectedWallet === wallet ? (
      <button onClick={() => setSelectedWallet(undefined)}>
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18.25C6.76562 18.25 3.8125 16.5625 2.19531 13.75C0.578125 10.9727 0.578125 7.5625 2.19531 4.75C3.8125 1.97266 6.76562 0.25 10 0.25C13.1992 0.25 16.1523 1.97266 17.7695 4.75C19.3867 7.5625 19.3867 10.9727 17.7695 13.75C16.1523 16.5625 13.1992 18.25 10 18.25ZM13.9727 7.59766H13.9375C14.2891 7.28125 14.2891 6.75391 13.9375 6.40234C13.6211 6.08594 13.0938 6.08594 12.7773 6.40234L8.875 10.3398L7.22266 8.6875C6.87109 8.33594 6.34375 8.33594 6.02734 8.6875C5.67578 9.00391 5.67578 9.53125 6.02734 9.84766L8.27734 12.0977C8.59375 12.4492 9.12109 12.4492 9.47266 12.0977L13.9727 7.59766Z"
            fill="#09CBBF"
          />
        </svg>
      </button>
    ) : (
      <button onClick={() => setSelectedWallet(wallet)}>
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3125 10.25C16.3125 7.64844 14.9062 5.25781 12.6562 3.92188C10.3711 2.62109 7.59375 2.62109 5.34375 3.92188C3.05859 5.25781 1.6875 7.64844 1.6875 10.25C1.6875 12.8867 3.05859 15.2773 5.34375 16.6133C7.59375 17.9141 10.3711 17.9141 12.6562 16.6133C14.9062 15.2773 16.3125 12.8867 16.3125 10.25ZM0 10.25C0 7.05078 1.6875 4.09766 4.5 2.48047C7.27734 0.863281 10.6875 0.863281 13.5 2.48047C16.2773 4.09766 18 7.05078 18 10.25C18 13.4844 16.2773 16.4375 13.5 18.0547C10.6875 19.6719 7.27734 19.6719 4.5 18.0547C1.6875 16.4375 0 13.4844 0 10.25Z"
            fill="#EBEBEB"
          />
        </svg>
      </button>
    );
  return (
    <div className="flex flex-1 flex-col justify-between h-full">
      <div className="flex flex-col gap-2 w-full">
        <Wallet
          isSelected={selectedWallet === 'phantom'}
          title={'Phantom'}
          icon={<PhantomLogo />}
          rightAdornment={getRightAdornment('phantom')}
        />
        <Wallet
          isSelected={selectedWallet === 'solflare'}
          title={'Solflare'}
          icon={<SolflareLogo />}
          rightAdornment={getRightAdornment('solflare')}
        />
        <Wallet
          title={'Backpack'}
          subtitle={'Blinks are natively supported in Backpack'}
          icon={<BackpackLogo />}
          rightAdornment={<ArrowFromSquareIcon />}
        />
      </div>
      {selectedWallet && (
        <div className="bg-accent-brand/10 rounded-lg p-2 flex items-center gap-2">
          <div className="flex-1">
            <CommentExclamationIcon />
          </div>
          <span className="text-caption font-normal">
            Be sure you haven’t enabled Blinks natively in another wallet, such
            as Backpack, before selecting a wallet below.
          </span>
        </div>
      )}
    </div>
  );
};
