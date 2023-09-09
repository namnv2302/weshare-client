import { Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './ViewUsers.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const ViewUsersItem = ({ data }: { data: AuthorizationData }) => {
  return (
    <div className={cx('item')}>
      <div className={cx('left')}>
        <div className={cx('avatar')}>
          <img src={AvatarDefault} alt="Avatar" />
        </div>
        <div className={cx('text-info')}>
          <Typography.Text className={cx('name')}>{data.name || 'Jakob botosh'}</Typography.Text>
        </div>
      </div>
      <Button className={cx('btn-add')}>Add Friend</Button>
    </div>
  );
};

export default ViewUsersItem;
