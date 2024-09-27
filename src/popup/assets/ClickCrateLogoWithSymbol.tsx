import * as React from 'react';
import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={400}
      height={100}
      viewBox="0 0 300 75"
      {...props}
    >
      <defs>
        <clipPath id="a">
          <path d="M10.762 14.664h45.672v45.672H10.762Zm0 0" />
        </clipPath>
        <clipPath id="b">
          <path d="M29 33h17.535v17.434H29Zm0 0" />
        </clipPath>
        <clipPath id="c">
          <path d="M20.55 32H25v2h-4.45Zm0 0" />
        </clipPath>
        <clipPath id="d">
          <path d="M28 24.45h2V29h-2Zm0 0" />
        </clipPath>
        <clipPath id="e">
          <path d="M7.5 11.402h51.969v51.97H7.5Zm0 0" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path d="M10.762 14.664h45.672v45.672H10.762Zm0 0" />
      </g>
      <g clipPath="url(#b)">
        <path
          fill="#fff"
          d="M41.578 43.031a.693.693 0 0 1-.2-.554.706.706 0 0 1 .306-.508l4.945-3.278-16.91-5.074 5.074 16.91 3.277-4.945a.687.687 0 0 1 1.063-.102l4.219 4.211c.27.27.707.27.976 0l1.465-1.464a.683.683 0 0 0 .203-.489c0-.183-.07-.36-.203-.488Zm0 0"
        />
      </g>
      <path
        fill="#fff"
        d="M24.04 26.965a.69.69 0 0 0-.977.976l1.957 1.957a.687.687 0 0 0 .972 0c.27-.27.27-.71 0-.98Zm8.8 3.133c.176 0 .351-.07.488-.203l1.957-1.957a.69.69 0 1 0-.98-.977l-1.957 1.957a.69.69 0 0 0 .492 1.18Zm-7.82 6.152-1.957 1.957a.69.69 0 0 0 0 .977.677.677 0 0 0 .972 0l1.957-1.954c.27-.27.27-.71 0-.98a.686.686 0 0 0-.972 0Zm0 0"
      />
      <g clipPath="url(#c)">
        <path
          fill="#fff"
          d="M24.68 33.074a.695.695 0 0 0-.692-.691h-2.765a.695.695 0 0 0-.692.691c0 .38.313.692.692.692h2.765a.693.693 0 0 0 .692-.692Zm0 0"
        />
      </g>
      <g clipPath="url(#d)">
        <path
          fill="#fff"
          d="M29.863 25.125a.693.693 0 0 0-.691-.691.695.695 0 0 0-.692.691v2.766a.693.693 0 0 0 1.383 0Zm0 0"
        />
      </g>
      <g clipPath="url(#e)">
        <path
          fill="#0a5cff"
          d="M13.3 11.402c-3.19 0-5.8 2.61-5.8 5.797v40.594c0 3.187 2.61 5.8 5.8 5.8h40.59c3.192 0 5.801-2.613 5.801-5.8V17.199c0-3.187-2.609-5.797-5.8-5.797Zm40.59 46.391H13.3V17.199h40.59Zm0 0"
        />
      </g>
      <path
        fill="#fff"
        d="M87.46 57.986c-3.118 0-5.618-.977-7.5-2.938-1.875-1.969-2.813-4.664-2.813-8.094V27.22c0-4.258.844-7.469 2.531-9.625 1.696-2.164 4.36-3.25 7.985-3.25 3.156 0 5.695.867 7.625 2.594 1.937 1.73 2.906 4.226 2.906 7.484v7.375h-8.531V25.47c0-1.227-.153-2.07-.453-2.531-.305-.469-.82-.703-1.547-.703-.762 0-1.281.265-1.563.796-.281.532-.422 1.313-.422 2.344v21.485c0 1.125.16 1.949.485 2.468.332.512.832.766 1.5.766 1.332 0 2-1.078 2-3.234v-7.735h8.625v8.078c0 7.188-3.61 10.782-10.828 10.782Zm13.91-.406V14.75h8.578v35.547h8.828v7.281Zm19.65 0V14.75h8.266v42.83Zm21.925.406c-3.117 0-5.617-.977-7.5-2.938-1.875-1.969-2.812-4.664-2.812-8.094V27.22c0-4.258.843-7.469 2.53-9.625 1.696-2.164 4.36-3.25 7.985-3.25 3.157 0 5.696.867 7.625 2.594 1.938 1.73 2.907 4.226 2.907 7.484v7.375h-8.532V25.47c0-1.227-.152-2.07-.453-2.531-.304-.469-.82-.703-1.547-.703-.761 0-1.28.265-1.562.796-.281.532-.422 1.313-.422 2.344v21.485c0 1.125.16 1.949.484 2.468.332.512.832.766 1.5.766 1.332 0 2-1.078 2-3.234v-7.735h8.625v8.078c0 7.188-3.61 10.782-10.828 10.782Zm13.911-.406V14.75h8.484v17.156l3.984-17.156h8.625l-4.78 19.594 5.78 23.234h-8.875l-4.687-20.734v20.734Zm33.748.406c-3.117 0-5.617-.977-7.5-2.938-1.875-1.969-2.813-4.664-2.813-8.094V27.22c0-4.258.844-7.469 2.532-9.625 1.695-2.164 4.359-3.25 7.984-3.25 3.156 0 5.695.867 7.625 2.594 1.938 1.73 2.906 4.226 2.906 7.484v7.375h-8.531V25.47c0-1.227-.152-2.07-.453-2.531-.305-.469-.82-.703-1.547-.703-.762 0-1.281.265-1.562.796-.282.532-.422 1.313-.422 2.344v21.485c0 1.125.16 1.949.484 2.468.332.512.832.766 1.5.766 1.332 0 2-1.078 2-3.234v-7.735h8.625v8.078c0 7.188-3.61 10.782-10.828 10.782Zm13.91-43.235h13.172c2.094 0 3.711.477 4.86 1.422 1.144.95 1.914 2.277 2.312 3.984.395 1.711.594 3.899.594 6.563 0 2.43-.32 4.324-.953 5.687-.625 1.356-1.719 2.297-3.281 2.829 1.3.273 2.238.921 2.812 1.953.582 1.031.875 2.43.875 4.187l-.094 16.203h-8.375V40.83c0-1.195-.234-1.96-.703-2.297-.46-.332-1.308-.5-2.547-.5V57.58h-8.672Zm10.782 15.86c1.187 0 1.78-1.297 1.78-3.891 0-1.133-.054-1.984-.155-2.547-.094-.562-.278-.953-.547-1.172-.262-.219-.64-.328-1.14-.328h-1.985v7.938Zm12.107 26.969 4.14-42.829h14.5l4.094 42.828h-8.125l-.594-6.937h-5.187l-.5 6.937Zm9.468-13.766h3.89l-1.89-21.782h-.406Zm19.787 13.766V22.97h-5.078v-8.219h18.75v8.219h-5.094v34.61Zm16.303 0V14.75h17.157v8.281h-8.422v8.329h8.078v8.062h-8.078v9.828h8.969v8.328Zm0 0"
      />
    </svg>
  );
}

export default SvgComponent;