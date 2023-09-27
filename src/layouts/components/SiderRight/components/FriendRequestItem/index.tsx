import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './FriendRequestItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
import { CheckOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const FriendRequestItem = ({ data, size }: { data: AuthorizationData; size?: string }) => {
  return (
    <div className={cx('item', { small: size === 'small' })}>
      <div className={cx('left')}>
        <div className={cx('avatar')}>
          <img src={data.avatar || AvatarDefault} alt="Avatar" />
        </div>
        <div className={cx('text-info')}>
          <Typography.Text className={cx('name')}>{data.name || 'Jakob botosh'}</Typography.Text>
        </div>
      </div>
      <span className={cx('action')}>
        <CheckOutlined className={cx('icon')} />
      </span>
    </div>
  );
};

export default FriendRequestItem;
