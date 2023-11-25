import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './SuggestItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const SuggestItem = ({ data, size }: { data: AuthorizationData; size?: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx('item', { small: size === 'small' })}
        onClick={() => navigate(ROUTE_PATH.USER.replace(':slug', `${data.slug}`))}
      >
        <div className={cx('left')}>
          <div className={cx('avatar')}>
            <img src={data.avatar || AvatarDefault} alt="Avatar" />
          </div>
          <div className={cx('text-info')}>
            <Typography.Text className={cx('name')}>{data.name || 'Jakob botosh'}</Typography.Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestItem;
