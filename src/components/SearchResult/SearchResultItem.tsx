import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const SearchResultItem = ({ user }: { user: AuthorizationData }) => {
  const { t } = useTranslation(['Common']);
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('item', 'small')}>
      <div className={cx('left')}>
        <div className={cx('avatar')}>
          <img src={user.avatar || AvatarDefault} alt="Avatar" />
        </div>
        <div className={cx('text-info')}>
          <Typography.Text className={cx('name')}>{user.name || 'Jakob botosh'}</Typography.Text>
          {authorization?.friends.find((item) => item.id === user.id) ? (
            <Typography.Text className={cx('desc')}>{t('Friend')}</Typography.Text>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
