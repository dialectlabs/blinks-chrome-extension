import { ReactNode } from 'react';
import PhantomLogo from '../assets/PhantomLogo';
import SolflareLogo from '../assets/SolflareLogo';
import BackpackLogo from '../assets/BackpackLogo';
import ArrowFromSquareIcon from '../icons/ArrowFromSquareIcon';
import { Checkbox } from './Checkbox';

enum Wallets {
  Solflare = 'solflare',
  Phantom = 'phantom',
}
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

export const WalletSelector = ({
  selectedWallet,
  setSelectedWallet,
}: {
  selectedWallet?: string | null;
  setSelectedWallet: (w: string | null) => void;
}) => {
  function selectWallet(wallet: string) {
    setSelectedWallet(wallet);
    chrome.storage.local.set({ selectedWallet: wallet });
  }

  function unselectWallet() {
    setSelectedWallet(null);
    chrome.storage.local.remove('selectedWallet');
  }

  const isWalletSolflare = selectedWallet === Wallets.Solflare;
  const isWalletPhantom = selectedWallet === Wallets.Phantom;
  return (
    <div className="flex flex-col flex-1 gap-2 w-full">
      <Wallet
        isSelected={isWalletPhantom}
        title="Phantom"
        icon={<PhantomLogo />}
        rightAdornment={
          <Checkbox
            checked={isWalletPhantom}
            onChange={(isChecked: boolean) =>
              isChecked ? selectWallet(Wallets.Phantom) : unselectWallet()
            }
          />
        }
      />
      <Wallet
        isSelected={isWalletSolflare}
        title="Solflare"
        icon={<SolflareLogo />}
        rightAdornment={
          <Checkbox
            checked={isWalletSolflare}
            onChange={(isChecked: boolean) =>
              isChecked ? selectWallet(Wallets.Solflare) : unselectWallet()
            }
          />
        }
      />
      <Wallet
        title="Backpack"
        subtitle="Blinks are natively supported in Backpack"
        icon={<BackpackLogo />}
        rightAdornment={
          <button
            onClick={() =>
              chrome.tabs.create({
                url: 'https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof',
              })
            }
          >
            <ArrowFromSquareIcon />
          </button>
        }
      />
    </div>
  );
};
