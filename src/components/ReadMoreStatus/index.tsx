import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReadMoreStatus.module.scss';

const cx = classNames.bind(styles);

const ReadMoreStatus = ({ status, mb }: { status: string; mb?: boolean }) => {
  const statusRefEle = useRef<HTMLSpanElement | any>();
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  useEffect(() => {
    if (status) {
      let text;
      if (status.length < 160) {
        text = status;
        statusRefEle.current.innerHTML = `${text}`;
      } else {
        text = isReadMore ? status.slice(0, 160) : status;
        statusRefEle.current.innerHTML = `${text} ${isReadMore ? '...' : ''}`;
      }
    }
  }, [status, isReadMore]);

  return (
    <>
      <span ref={statusRefEle} className={cx('status', { mb: mb })} onClick={() => setIsReadMore(!isReadMore)}></span>
    </>
  );
};

export default ReadMoreStatus;
