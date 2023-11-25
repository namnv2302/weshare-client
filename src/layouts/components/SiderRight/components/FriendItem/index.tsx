import { useCallback } from 'react';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './FriendItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCurrentChat } from '@slices/chatsSlice';
import { openChatBox } from '@slices/settingsSlice';
import { createChat } from '@apis/chat';

const cx = classNames.bind(styles);

const FriendItem = ({ data, size }: { data: AuthorizationData; size?: string }) => {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);

  const handleChat = useCallback(async () => {
    if (authorization) {
      const resp = await createChat(authorization?.id, data.id);
      if (resp.status === 201 && resp.data) {
        dispatch(setCurrentChat(resp.data.data));
        dispatch(openChatBox(true));
      }
    }
  }, [dispatch, authorization, data.id]);

  return (
    <>
      <div className={cx('item', { small: size === 'small' })} onClick={handleChat}>
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

export default FriendItem;
