import { useMemo, useCallback, memo } from 'react';
import { Spin, Typography } from 'antd';
import { IChat } from '@hooks/chats/useUserChats';
import useRecipient from '@hooks/chats/useRecipient';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import classNames from 'classnames/bind';
import styles from './ChatItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { setCurrentChat } from '@slices/chatsSlice';
import { openMessenger, openChatBox } from '@slices/settingsSlice';

const cx = classNames.bind(styles);

const ChatItem = ({ chat, size }: { chat: IChat; size?: string }) => {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const { onlineUsers } = useAppSelector((state) => state.chats);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const { data, loading } = useRecipient(chat, userId);

  const handleOpenChat = useCallback(() => {
    dispatch(setCurrentChat(chat));
    dispatch(openMessenger(false));
    dispatch(openChatBox(true));
  }, [chat, dispatch]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : data ? (
        <div className={cx('item', { small: size === 'small' })} onClick={handleOpenChat}>
          <div className={cx('left')}>
            <div className={cx('avatar')}>
              <img src={data.avatar || AvatarDefault} alt="Avatar" />
              {onlineUsers.some((user) => user.userId === data.id) ? <div className={cx('online')}></div> : false}
            </div>
            <div className={cx('text-info')}>
              <Typography.Text className={cx('name')}>{data.name || 'Jakob botosh'}</Typography.Text>
              <Typography.Text className={cx('message')}>Hôm nay bạn khỏe không!!</Typography.Text>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default memo(ChatItem);
