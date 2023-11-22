// import { useState } from 'react';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './FriendItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
// import ChatBox from '@components/ChatBox';

const cx = classNames.bind(styles);

const FriendItem = ({ data, size }: { data: AuthorizationData; size?: string }) => {
  // const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={cx('item', { small: size === 'small' })}>
        <div className={cx('left')}>
          <div className={cx('avatar')}>
            <img src={data.avatar || AvatarDefault} alt="Avatar" />
          </div>
          <div className={cx('text-info')}>
            <Typography.Text className={cx('name')}>{data.name || 'Jakob botosh'}</Typography.Text>
          </div>
        </div>
      </div>
      {/* <ChatBox data={data} open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default FriendItem;
