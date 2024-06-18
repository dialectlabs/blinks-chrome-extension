import DialectLogo from '../assets/DialectLogo';
import CircleInfoIcon from '../icons/CircleInfoIcon';

export const Header = () => {
  return (
    <div className="flex justify-center items-center py-[18px]">
      <DialectLogo />
      <button
        className="absolute right-4 top-4 text-icon-secondary hover:text-icon-primary"
        onClick={() =>
          chrome.tabs.create({
            url: 'https://www.dialect.to/',
          })
        }
      >
        <CircleInfoIcon />
      </button>
    </div>
  );
};
