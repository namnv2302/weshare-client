import { useMemo } from 'react';
import { Spin, Typography } from 'antd';
import { IChat } from '@hooks/chats/useUserChats';
import useRecipient from '@hooks/chats/useRecipient';
import { useAppSelector } from 'redux/hooks';
import classNames from 'classnames/bind';
import styles from './ChatItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';

const cx = classNames.bind(styles);

const ChatItem = ({ chat, size }: { chat: IChat; size?: string }) => {
  const authorization = useAppSelector((state) => state.authorization);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const { data, loading } = useRecipient(chat, userId);

  return (
    <>
      {loading ? (
        <Spin />
      ) : data ? (
        <div className={cx('item', { small: size === 'small' })}>
          <div className={cx('left')}>
            <div className={cx('avatar')}>
              <img src={data.avatar || AvatarDefault} alt="Avatar" />
              <div className={cx('online')}></div>
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

export default ChatItem;
