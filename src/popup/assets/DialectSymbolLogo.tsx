import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" d="M0 0H80V80H0z" />
      <path
        d="M14.46 32.976c.6 4.432 2.903 5.97 2.903 5.97s1.628-3.56 6.874-7.373c7.56-5.496 21.051-6.415 27.712-2.199 11.836 7.493-3.373 20.56-21.302 17.942-12.76-1.863-17.147-8.37-17.147-8.37l.962 4.096c1.429 6.087 4.746 12.19 10.707 14.08 9.688 3.072 19.867 2.305 28.467-1.785 8.496-4.04 12.403-10.402 11.804-17.094-.939-10.495-17.237-21.212-37.999-17.488-8.992 1.613-13.583 7.79-12.982 12.221z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgComponent;
