import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1240_16372)">
        <path
          d="M4.224 16.636c2.038 0 3.57-1.773 4.484-3.174-.111.31-.173.62-.173.918 0 .818.47 1.4 1.396 1.4 1.273 0 2.632-1.115 3.336-2.318a1.77 1.77 0 00-.074.484c0 .57.32.93.976.93 2.063 0 4.138-3.658 4.138-6.856 0-2.492-1.26-4.686-4.422-4.686-5.56 0-11.552 6.793-11.552 11.182 0 1.723.927 2.12 1.89 2.12zm7.746-8.889c0-.62.346-1.053.852-1.053.494 0 .84.433.84 1.053 0 .62-.346 1.066-.84 1.066-.506 0-.852-.446-.852-1.066zm2.643 0c0-.62.346-1.053.853-1.053.494 0 .84.433.84 1.053 0 .62-.346 1.066-.84 1.066-.507 0-.852-.446-.852-1.066z"
          fill="#AB9FF2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1240_16372">
          <path fill="#fff" transform="translate(2.333 2)" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
