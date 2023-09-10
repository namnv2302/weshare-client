import classNames from 'classnames/bind';
import { Image } from 'antd';
import styles from './LeftPanel.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

const LeftPanel = () => {
  return (
    <div className={cx('wrapper')}>
      <Image style={{ borderRadius: '10px' }} width={200} src={AvatarDefault} />
    </div>
  );
};

export default LeftPanel;
