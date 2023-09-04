import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FileImageOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

const Menu = () => {
  const { t } = useTranslation(['Common']);
  const { pathname } = useLocation();

  return (
    <div className={cx('wrapper')}>
      <MenuItem
        label={t('Menu.Feed')}
        icon={<HomeOutlined className={cx('menu-icon')} />}
        isActive={pathname === '/'}
      />
      <MenuItem
        label={t('Menu.Friends')}
        icon={<UserOutlined className={cx('menu-icon')} />}
        isActive={pathname === '/friends'}
      />
      <MenuItem
        label={t('Menu.Photos')}
        icon={<FileImageOutlined className={cx('menu-icon')} />}
        isActive={pathname === '/photos'}
      />
      <MenuItem
        label={t('Menu.Stories')}
        icon={<VideoCameraOutlined className={cx('menu-icon')} />}
        isActive={pathname === '/stories'}
      />
    </div>
  );
};

export default Menu;
