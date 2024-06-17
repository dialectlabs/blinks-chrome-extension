import { SVGProps } from 'react';

export interface CheckboxProps {
  checked?: boolean;
}

const CircleChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={19}
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 18.25c-3.234 0-6.188-1.688-7.805-4.5-1.617-2.777-1.617-6.188 0-9A9.02 9.02 0 0110 .25c3.2 0 6.152 1.723 7.77 4.5 1.617 2.813 1.617 6.223 0 9a8.933 8.933 0 01-7.77 4.5zm3.973-10.652h-.036c.352-.317.352-.844 0-1.196a.828.828 0 00-1.16 0L8.875 10.34 7.223 8.688c-.352-.352-.88-.352-1.196 0a.77.77 0 000 1.16l2.25 2.25c.317.351.844.351 1.196 0l4.5-4.5z"
      fill="currentColor"
    />
  </svg>
);

const CircleEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={20}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.313 10.25c0-2.602-1.407-4.992-3.657-6.328-2.285-1.3-5.062-1.3-7.312 0-2.285 1.336-3.657 3.726-3.657 6.328a7.32 7.32 0 003.657 6.363c2.25 1.301 5.027 1.301 7.312 0 2.25-1.336 3.656-3.726 3.656-6.363zM0 10.25c0-3.2 1.688-6.152 4.5-7.77 2.777-1.617 6.188-1.617 9 0 2.777 1.618 4.5 4.57 4.5 7.77a9.02 9.02 0 01-4.5 7.805c-2.813 1.617-6.223 1.617-9 0C1.687 16.438 0 13.485 0 10.25z"
      fill="currentColor"
    />
  </svg>
);

export const Checkbox = ({ checked = false }: CheckboxProps) => {
  return checked ? (
    <CircleChecked className="text-accent-brand" />
  ) : (
    <CircleEmpty className="group-hover:text-[#D7D7D7] text-[#EBEBEB]" />
  );
};
