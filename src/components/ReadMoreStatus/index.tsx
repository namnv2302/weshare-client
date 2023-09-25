import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReadMoreStatus.module.scss';

const cx = classNames.bind(styles);

const ReadMoreStatus = ({ status }: { status: string }) => {
  const statusRefEle = useRef<HTMLSpanElement | any>();
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  useEffect(() => {
    if (status) {
      const text = isReadMore ? status.slice(0, 160) : status;
      statusRefEle.current.innerHTML = `${text} ${isReadMore ? '...' : ''}`;
    }
  }, [status, isReadMore]);

  return (
    <>
      <span ref={statusRefEle} className={cx('status')} onClick={() => setIsReadMore(!isReadMore)}></span>
    </>
  );
};

export default ReadMoreStatus;
