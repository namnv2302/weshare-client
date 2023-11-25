import { useMemo, useCallback, useState, useContext, useEffect, useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Divider, Input, Typography, message as messageAntd } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuIdV4 } from 'uuid';
import styles from './ChatBox.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import useRecipient from '@hooks/chats/useRecipient';
import useMessages, { IMessage } from '@hooks/messages/useMessages';
import { openChatBox } from '@slices/settingsSlice';
import { setCurrentChat, setOnlineUsers } from '@slices/chatsSlice';
import EmptyBoxImage from '@assets/images/empty-box.png';
import { createMessage } from '@apis/message';
import { WebsocketContext } from 'context/WebsocketProvider';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const ChatBox = () => {
  const { t } = useTranslation();
  const { socket } = useContext(WebsocketContext);
  const dispatch = useAppDispatch();
  const { currentChat, onlineUsers } = useAppSelector((state) => state.chats);
  const authorization = useAppSelector((state) => state.authorization);
  const { isOpenChatBox } = useAppSelector((state) => state.settings);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const chat = useMemo(() => {
    if (currentChat) return currentChat;
    return {};
  }, [currentChat]);
  const chatId = useMemo(() => {
    if (currentChat && currentChat.id) return currentChat.id;
    return 'string';
  }, [currentChat]);
  const { data: recipientData } = useRecipient(chat, userId);
  const { data: messages, setData: setMessages } = useMessages(chatId);
  const [text, setText] = useState<string>('');
  const chatBoxRef = useRef<any>();

  const handleCloseChatBox = useCallback(() => {
    dispatch(openChatBox(false));
    dispatch(setCurrentChat(null));
  }, [dispatch]);

  const handleSendMessage = useCallback(async () => {
    if (!text.trim()) {
      messageAntd.warning('Your message empty!!!');
    }
    try {
      const resp = await createMessage({
        chatId: chatId,
        senderId: userId,
        text: text.trim(),
      });
      if (resp.status === 201) {
        if (messages) {
          setMessages((prev) => [...messages, resp.data.data]);
        }
        if (recipientData) {
          socket.emit('sendMessage', { ...resp.data.data, recipientId: recipientData.id });
        }
        setText('');
      }
    } catch (error) {
      messageAntd.error('Send message failure!');
    }
  }, [text, chatId, userId, messages, socket, recipientData, setMessages]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', userId);
    socket.on('getOnlineUsers', (resp: AuthorizationData[]) => dispatch(setOnlineUsers(resp)));

    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket, userId, dispatch]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (resp: IMessage) => {
      if (resp.chatId !== currentChat?.id) return;
      console.log(resp);
      if (messages) {
        setMessages((prev) => [...messages, resp]);
      }
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket, userId, dispatch, currentChat, messages, setMessages]);

  useEffect(() => {
    if (chatBoxRef && chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className={cx('wrapper', { open: isOpenChatBox })}>
      <header className={cx('header')}>
        <div className={cx('avatar')}>
          <img src={recipientData ? recipientData.avatar || AvatarDefault : ''} alt="" />
        </div>
        <div className={cx('action')}>
          <p className={cx('name')}>{recipientData ? recipientData.name : false}</p>
          {recipientData && onlineUsers.some((user) => user.userId === recipientData.id) ? (
            <span className={cx('status')}>
              <span className={cx('dot')}></span>
              <span className={cx('online')}>Online</span>
            </span>
          ) : (
            false
          )}
        </div>
        <CloseOutlined className={cx('close-icon')} onClick={handleCloseChatBox} />
      </header>
      <Divider style={{ margin: '0' }} />
      <div className={cx('body')}>
        {messages && messages?.length > 0 ? (
          messages?.map((message) => (
            <div
              key={uuIdV4()}
              ref={chatBoxRef}
              className={cx('', {
                'message-fri': message.senderId !== userId,
                message: message.senderId === userId,
              })}
            >
              <p className={cx('title')}>{message.text}</p>
              <span className={cx('timer')}>{moment(message.createdAt).calendar()}</span>
            </div>
          ))
        ) : (
          <div className={cx('empty')}>
            <img src={EmptyBoxImage} alt="Empty" />
            <Typography.Text className={cx('no-text')}>{t('Messenger:NoMessages')}</Typography.Text>
          </div>
        )}
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('footer')}>
        <div>
          <Input
            className={cx('input')}
            placeholder="Start typing.."
            suffix={<SendOutlined className={cx('send-icon')} onClick={handleSendMessage} />}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ChatBox);
