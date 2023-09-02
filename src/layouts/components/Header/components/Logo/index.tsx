import { Typography } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import LogoImage from '@assets/images/logo.png';
import styles from './Logo.module.scss';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <div className={cx('wrapper')}>
      <Link to={ROUTE_PATH.HOME} className={cx('link')}>
        <img src={LogoImage} alt="Logo" className={cx('logo')} />
        <Typography.Title level={4} className={cx('title')}>
          WeShare
        </Typography.Title>
      </Link>
    </div>
  );
};

export default Logo;
