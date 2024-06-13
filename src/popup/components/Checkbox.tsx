export interface CheckboxProps {
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
}

export const Checkbox = ({ checked = false, onChange }: CheckboxProps) => {
  const onClick = () => {
    onChange?.(!checked);
  };

  return (
    <label
      className="inline-flex cursor-pointer items-center"
      onClick={onClick}
    >
      <input type="hidden" checked={checked} onChange={onClick} />
      {checked ? (
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18.25C6.76562 18.25 3.8125 16.5625 2.19531 13.75C0.578125 10.9727 0.578125 7.5625 2.19531 4.75C3.8125 1.97266 6.76562 0.25 10 0.25C13.1992 0.25 16.1523 1.97266 17.7695 4.75C19.3867 7.5625 19.3867 10.9727 17.7695 13.75C16.1523 16.5625 13.1992 18.25 10 18.25ZM13.9727 7.59766H13.9375C14.2891 7.28125 14.2891 6.75391 13.9375 6.40234C13.6211 6.08594 13.0938 6.08594 12.7773 6.40234L8.875 10.3398L7.22266 8.6875C6.87109 8.33594 6.34375 8.33594 6.02734 8.6875C5.67578 9.00391 5.67578 9.53125 6.02734 9.84766L8.27734 12.0977C8.59375 12.4492 9.12109 12.4492 9.47266 12.0977L13.9727 7.59766Z"
            fill="#09CBBF"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3125 10.25C16.3125 7.64844 14.9062 5.25781 12.6562 3.92188C10.3711 2.62109 7.59375 2.62109 5.34375 3.92188C3.05859 5.25781 1.6875 7.64844 1.6875 10.25C1.6875 12.8867 3.05859 15.2773 5.34375 16.6133C7.59375 17.9141 10.3711 17.9141 12.6562 16.6133C14.9062 15.2773 16.3125 12.8867 16.3125 10.25ZM0 10.25C0 7.05078 1.6875 4.09766 4.5 2.48047C7.27734 0.863281 10.6875 0.863281 13.5 2.48047C16.2773 4.09766 18 7.05078 18 10.25C18 13.4844 16.2773 16.4375 13.5 18.0547C10.6875 19.6719 7.27734 19.6719 4.5 18.0547C1.6875 16.4375 0 13.4844 0 10.25Z"
            fill="#EBEBEB"
          />
        </svg>
      )}
    </label>
  );
};
