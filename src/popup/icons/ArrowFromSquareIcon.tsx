import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={15}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.313 1.406c0-.355.273-.656.656-.656h4.347c.383 0 .657.3.657.656v4.375a.632.632 0 01-.657.657.648.648 0 01-.656-.657V2.992L6.562 9.09a.599.599 0 01-.902 0c-.273-.246-.273-.656 0-.93l6.098-6.098h-2.79a.632.632 0 01-.655-.656zm-6.344.219h3.5c.355 0 .656.3.656.656 0 .383-.3.656-.656.656h-3.5c-.383 0-.657.301-.657.657v9.187c0 .383.274.656.657.656h9.187a.648.648 0 00.656-.656v-3.5c0-.355.274-.656.657-.656.355 0 .656.3.656.656v3.5a1.978 1.978 0 01-1.969 1.969H1.97A1.96 1.96 0 010 12.781V3.594c0-1.067.875-1.969 1.969-1.969z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgComponent;
