import ClickCrateLogo from '../assets/ClickCrateLogo';
import CircleInfoIcon from '../icons/CircleInfoIcon';

export const Header = () => {
  return (
    <div className="flex justify-center items-center py-[18px]">
      <ClickCrateLogo width={100} height={25} />{' '}
      <button
        className="absolute right-4 top-4 text-icon-secondary hover:text-icon-primary"
        onClick={() =>
          chrome.tabs.create({
            url: 'https://www.clickcrate.xyz/',
          })
        }
      >
        <CircleInfoIcon />
      </button>
    </div>
  );
};
