import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={1}
        width={10}
        height={14}
      >
        <path d="M12.813 1H3.187v14h9.626V1z" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.912 2.1c.509 0 .986.069 1.428.196C9.907 1.287 9.009 1 8.01 1c-1.003 0-1.903.288-2.334 1.301.438-.13.914-.2 1.42-.2h1.816zM6.98 3.114c-2.416 0-3.793 1.901-3.793 4.246v2.409c0 .234.196.42.438.42h8.75a.427.427 0 00.438-.42v-2.41c0-2.344-1.601-4.245-4.018-4.245H6.98zM7.997 7.38a1.531 1.531 0 100-3.063 1.531 1.531 0 000 3.063zm-4.81 4.223c0-.234.196-.424.438-.424h8.75c.242 0 .438.19.438.424v2.548c0 .469-.392.849-.876.849H4.064a.862.862 0 01-.875-.85v-2.547z"
          fill="#E33E3F"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
