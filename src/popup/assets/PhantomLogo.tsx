import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_25_57)">
        <path
          d="M3.224 23.616c3.262 0 5.713-2.836 7.176-5.078a4.375 4.375 0 00-.277 1.468c0 1.31.751 2.242 2.234 2.242 2.036 0 4.21-1.786 5.337-3.71-.08.278-.119.536-.119.774 0 .912.514 1.488 1.562 1.488 3.3 0 6.621-5.852 6.621-10.97 0-3.986-2.016-7.497-7.076-7.497C9.787 2.333.2 13.203.2 20.224c0 2.758 1.483 3.392 3.024 3.392zM15.618 9.395c0-.992.554-1.686 1.364-1.686.79 0 1.344.694 1.344 1.686 0 .991-.553 1.705-1.344 1.705-.81 0-1.364-.714-1.364-1.705zm4.23 0c0-.992.554-1.686 1.364-1.686.79 0 1.344.694 1.344 1.686 0 .991-.553 1.705-1.344 1.705-.81 0-1.364-.714-1.364-1.705z"
          fill="#AB9FF2"
        />
      </g>
      <defs>
        <clipPath id="clip0_25_57">
          <path
            fill="#fff"
            transform="translate(.2 .2)"
            d="M0 0H25.6V25.6H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
