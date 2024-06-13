import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WalletSelector } from './components/WalletSelector';
import DialectSymbolLogo from './assets/DialectSymbolLogo';
import CommentExclamationIcon from './icons/CommentExclamationIcon';

export const Popup = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>();

  useEffect(() => {
    chrome.storage.local.get(['selectedWallet'], (result) => {
      result.selectedWallet && setSelectedWallet(result.selectedWallet);
      setTimeout(() => setLoading(false), 1000);
    });
  }, []);

  if (isLoading)
    return (
      <div className="h-full flex flex-1 flex-col justify-center items-center">
        <DialectSymbolLogo />
      </div>
    );
  return (
    <div className="h-full flex flex-1 flex-col items-center px-4 pb-4">
      <Header />
      <div className="flex flex-col mt-20 items-center h-full">
        <h1 className="text-highlight font-bold mb-2">Enable Blinks</h1>
        <p className="text-tertiary text-subtext mb-8 text-center font-normal">
          Choose a wallet you would like to enable Blinks for. What are Blinks?{' '}
          <a className="underline text-primary">Learn More</a>
        </p>
        <WalletSelector
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
        {selectedWallet && (
          <div className="bg-accent-brand/10 rounded-lg p-2 flex items-center gap-2">
            <div className="flex-1">
              <CommentExclamationIcon />
            </div>
            <span className="text-caption font-normal">
              Be sure you haven’t enabled Blinks natively in another wallet,
              such as Backpack, before selecting a wallet below.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
