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
