import { useState, useCallback } from 'react';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Divider, Input } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuIdV4 } from 'uuid';
import styles from './ChatBox.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const ChatBox = ({ data, open, setOpen }: { data: AuthorizationData; open: boolean; setOpen: any }) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = useCallback(() => {
    console.log(123);
  }, []);

  return (
    <div className={cx('wrapper', { open: open })}>
      <header className={cx('header')}>
        <div className={cx('avatar')}>
          <img src={data.avatar || AvatarDefault} alt="" />
        </div>
        <div className={cx('action')}>
          <p className={cx('name')}>{data.name}</p>
          <span className={cx('status')}>
            <span className={cx('dot')}></span>
            <span className={cx('online')}>Available</span>
          </span>
        </div>
        <CloseOutlined className={cx('close-icon')} onClick={() => setOpen(false)} />
      </header>
      <Divider style={{ margin: '0' }} />
      <div className={cx('body')}>
        <div key={uuIdV4()} className={cx('message-fri')}>
          <p className={cx('title')}>Alo</p>
          <span className={cx('timer')}>12:00</span>
        </div>
        <div key={uuIdV4()} className={cx('message')}>
          <p className={cx('title')}>Alo</p>
          <span className={cx('timer')}>12:00</span>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('footer')}>
        <div>
          <Input
            className={cx('input')}
            placeholder="Start typing.."
            suffix={<SendOutlined className={cx('send-icon')} onClick={handleSend} />}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
