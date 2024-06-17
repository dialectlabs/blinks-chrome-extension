import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WalletSelector } from './components/WalletSelector';
import CommentExclamationIcon from './icons/CommentExclamationIcon';

export const Popup = () => {
  const [isLoading, setLoading] = useState(true);
  const [storedWallet, setStoredWallet] = useState();
  const [selectedWallet, setSelectedWallet] = useState<string | null>();

  useEffect(() => {
    chrome.storage.local.get(['selectedWallet'], (result) => {
      const storedWallet = result.selectedWallet ?? null;
      setSelectedWallet(storedWallet);
      setStoredWallet(storedWallet);
      setLoading(false);
    });
  }, []);
  const walletChanged =
    storedWallet !== undefined && selectedWallet !== storedWallet;

  if (isLoading) return null;
  return (
    <div className="h-full flex flex-1 flex-col items-center px-4 pb-4">
      <Header />
      <div className="flex flex-col mt-20 items-center h-full">
        <h1 className="text-highlight font-bold mb-2">Enable Blinks</h1>
        <p className="text-tertiary text-subtext mb-8 text-center font-normal">
          Choose a wallet you would like to enable Blinks for. What are Blinks?{' '}
          <button
            className="underline text-primary"
            onClick={() =>
              chrome.tabs.create({
                url: 'https://dashboard.dialect.to/',
              })
            }
          >
            Learn More
          </button>
        </p>
        <WalletSelector
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />

        {selectedWallet && (
          <div className="bg-accent-brand/10 rounded-lg p-2 flex items-center gap-2 w-full">
            <div className="flex-0">
              <CommentExclamationIcon />
            </div>
            <span className="text-caption font-normal text-start">
              Be sure you haven’t enabled Blinks natively in another wallet,
              such as Backpack, before selecting a wallet below.
            </span>
          </div>
        )}
        {walletChanged && (
          <div className="bg-accent-brand/10 rounded-lg p-2 flex items-center gap-2 mt-2 w-full">
            <div className="flex-0">
              <CommentExclamationIcon />
            </div>
            <span className="text-caption font-normal text-start">
              Refresh this page for changes to take effect.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};