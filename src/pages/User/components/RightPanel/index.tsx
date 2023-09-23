import { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Typography, Button, message, notification } from 'antd';
import { CheckOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from './RightPanel.module.scss';
import UserTabs from '@components/UserTabs';
import useUserBySlug from '@hooks/users/useUserBySlug';
import { useAppSelector } from 'redux/hooks';
import { addfr, follow, unfollow } from '@apis/user';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t } = useTranslation(['Home', 'Common']);
  const { slug } = useParams();
  const userSlug = useMemo(() => slug, [slug]) as string;
  const { data, loading } = useUserBySlug(userSlug);
  const authorization = useAppSelector((state) => state.authorization);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isReceiveReq, setIsReceiveReq] = useState<boolean>(false);
  const [friend, setFriend] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.id) {
      const requested = authorization?.following.find((user) => user.id === data.id);
      if (requested) {
        setIsRequested(true);
      } else {
        setIsRequested(false);
      }
    }
  }, [data, authorization?.following]);

  useEffect(() => {
    if (data && data.id) {
      const receiveRequest = authorization?.followed.find((user) => user.id === data.id);
      if (receiveRequest) {
        setIsReceiveReq(true);
      } else {
        setIsReceiveReq(false);
      }
    }
  }, [data, authorization?.followed]);

  useEffect(() => {
    if (data && data.id) {
      const isFriend = authorization?.friends.find((user) => user.id === data.id);
      if (isFriend) {
        setFriend(true);
      } else {
        setFriend(false);
      }
    }
  }, [data, authorization?.friends]);

  const handleFollow = useCallback(async () => {
    setRequesting(true);
    try {
      if (isRequested) {
        if (data) {
          await unfollow(data.id);
          setIsRequested(false);
        }
      } else {
        if (data) {
          await follow(data.id);
          setIsRequested(true);
        }
      }
      setRequesting(false);
    } catch (error) {
      setRequesting(false);
      message.error(t('Home:Failed'));
    }
  }, [data, isRequested, t]);

  const handleAddfr = useCallback(async () => {
    setRequesting(true);
    try {
      if (friend) {
        notification.info({ message: t('Common:NotYet'), placement: 'top' });
      } else {
        if (data) {
          await addfr(data.id);
          setIsReceiveReq(false);
          setFriend(true);
        }
      }
      setRequesting(false);
    } catch (error) {
      setRequesting(false);
      message.error(t('Home:Failed'));
    }
  }, [t, data, friend]);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={4} className="mb-0">
        {data?.name || 'Jakob Botosh'}
      </Typography.Title>
      <Typography.Text className="text-default">@{data?.slug || 'Jakob Botosh'}</Typography.Text>
      <div className={cx('content')}>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{data?.followed.length}</span>
          <span className={cx('item-text')}>{t('User.Follower')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{data?.following.length}</span>
          <span className={cx('item-text')}>{t('User.Following')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{data?.posts.length}</span>
          <span className={cx('item-text')}>{t('User.Post')}</span>
        </div>
      </div>
      <div className={cx('button')}>
        {friend ? (
          <Button icon={<UserOutlined />} className={cx('button-add')} loading={requesting} onClick={handleAddfr}>
            Friend
          </Button>
        ) : isReceiveReq ? (
          <Button icon={<CheckOutlined />} className={cx('button-confirm')} loading={requesting} onClick={handleAddfr}>
            Confirm
          </Button>
        ) : (
          <Button icon={<UserOutlined />} className={cx('button-add')} loading={requesting} onClick={handleFollow}>
            {isRequested ? 'Requested' : 'Addfriend'}
          </Button>
        )}
        <Button icon={<MessageOutlined />} className={cx('button-mess')}>
          Message
        </Button>
      </div>
      {data && <UserTabs data={data} loading={loading} />}
    </div>
  );
};

export default RightPanel;
