import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import styles from './UserInfo.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

const UserInfo = () => {
  const { t } = useTranslation(['Home']);
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <div className={cx('head')}>
          <img src={AvatarDefault} alt="Avatar" className={cx('avatar')} />
          <div className={cx('name')}>
            <span className={cx('fullname')}>{authorization ? authorization.name : 'Jakob Botosh'}</span>
            <span className={cx('username')}>@jakobbotosh</span>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('item')}>
            <span className={cx('item-number')}>2.3K</span>
            <span className={cx('item-text')}>{t('User.Follower')}</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>23</span>
            <span className={cx('item-text')}>{t('User.Following')}</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>0</span>
            <span className={cx('item-text')}>{t('User.Post')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
