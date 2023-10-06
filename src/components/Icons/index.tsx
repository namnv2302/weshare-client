type IconProp = {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
  onClick?: () => any;
};

export const ShareIcon = ({ width = '2.4rem', height = '2.4rem', fill, className }: IconProp) => (
  <svg
    width={width}
    height={height}
    className={className}
    version="1.1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
  >
    <g id="info" />
    <g id="icons">
      <path
        d="M21.7,10.2l-6.6-6C14.6,3.7,14,4.2,14,5v3c-4.7,0-8.7,2.9-10.6,6.8c-0.7,1.3-1.1,2.7-1.4,4.1   c-0.2,1,1.3,1.5,1.9,0.6C6.1,16,9.8,13.7,14,13.7V17c0,0.8,0.6,1.3,1.1,0.8l6.6-6C22.1,11.4,22.1,10.6,21.7,10.2z"
        id="share"
      />
    </g>
  </svg>
);

export const HeartIcon = ({ width = '2.4rem', height = '2.4rem', fill, className, onClick }: IconProp) => (
  <svg
    width={width}
    height={height}
    className={className}
    onClick={onClick}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
  >
    <path d="M880.64 378.6752c0-110.6944-84.0704-200.3968-187.8016-200.3968-86.1184 0-158.72 61.952-180.8384 146.3296-22.1184-84.3776-94.72-146.3296-180.8384-146.3296-103.7312 0-187.8016 89.7024-187.8016 200.3968 0 54.9888 20.6848 104.7552 54.272 140.9024l0.7168 0.8192 298.7008 318.7712c8.0896 8.6016 21.8112 8.6016 29.9008 0l299.4176-319.488c33.5872-36.2496 54.272-86.016 54.272-141.0048z" />
  </svg>
);

export const ImageIcon = ({ width = '2.4rem', height = '2.4rem', fill, className, onClick }: IconProp) => (
  <svg
    width={width}
    height={height}
    className={className}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 112 112"
  >
    <defs>
      <clipPath id="a">
        <rect width="81.38" height="68.11" x="12.34" y="18.4" fill="none" rx="6.69" />
      </clipPath>
    </defs>
    <rect width="81.38" height="68.11" x="20.91" y="27.89" fill="#7a7d81" rx="6.69" />
    <g clipPath="url(#a)">
      <rect width="81.38" height="68.11" x="12.34" y="18.4" fill="#bcc0c4" rx="6.69" />
      <path fill="#fff" d="M7.44 89.57l32.5-42.76 13.09 13.04 27.89-31.9 21.42 27.71 1.06 37.49H8.5l-1.06-3.58z" />
    </g>
    <circle cx="27.57" cy="35.69" r="6.65" fill="#1876f2" />
  </svg>
);

export const LeftIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProp) => (
  <svg
    className={className}
    width={width}
    height={height}
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-left"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"
    ></path>
  </svg>
);

export const RightIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProp) => (
  <svg
    className={className}
    width={width}
    height={height}
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-right"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
    ></path>
  </svg>
);
