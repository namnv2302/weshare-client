import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const UserInfo = () => {
  const { t } = useTranslation(['Home']);
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <div className={cx('head')}>
          <img
            src={authorization?.avatar || AvatarDefault}
            alt="Avatar"
            className={cx('avatar')}
            onClick={() => navigate(ROUTE_PATH.PROFILE.replace(':slug', `${authorization?.slug}`))}
          />
          <div className={cx('name')}>
            <span
              className={cx('fullname')}
              onClick={() => navigate(ROUTE_PATH.PROFILE.replace(':slug', `${authorization?.slug}`))}
            >
              {authorization ? authorization.name : 'Jakob Botosh'}
            </span>
            <span className={cx('username')}>@{authorization?.slug || 'jakobbotosh'}</span>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('item')}>
            <span className={cx('item-number')}>{authorization?.followed.length}</span>
            <span className={cx('item-text')}>{t('User.Follower')}</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>{authorization?.following.length}</span>
            <span className={cx('item-text')}>{t('User.Following')}</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>{authorization?.posts.length}</span>
            <span className={cx('item-text')}>{t('User.Post')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
