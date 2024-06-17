import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 14.75a6.96 6.96 0 01-6.07-3.5c-1.258-2.16-1.258-4.813 0-7A7.016 7.016 0 018 .75c2.488 0 4.785 1.34 6.043 3.5 1.258 2.188 1.258 4.84 0 7A6.948 6.948 0 018 14.75zm0-10.5c-.383 0-.656.3-.656.656V7.97c0 .383.273.656.656.656a.648.648 0 00.656-.656V4.906c0-.355-.3-.656-.656-.656zm-.875 6.125c0 .492.383.875.875.875a.881.881 0 00.875-.875A.9.9 0 008 9.5a.881.881 0 00-.875.875z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgComponent;
