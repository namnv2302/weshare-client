import { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, message } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './ViewUsers.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { AuthorizationData } from '@slices/authorizationSlice';
import { useAppSelector } from 'redux/hooks';
import ROUTE_PATH from '@constants/routes';
import { addfr, follow, unfollow } from '@apis/user';

const cx = classNames.bind(styles);

const ViewUsersItem = ({ data, size }: { data: AuthorizationData; size?: string }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authorization = useAppSelector((state) => state.authorization);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(() => {
    const res = authorization?.following.find((user) => user.id === data.id);
    if (res) {
      return true;
    } else {
      return false;
    }
  });
  const [isReceiveReq, setIsReceiveReq] = useState<boolean>(() => {
    const res = authorization?.followed.find((user) => user.id === data.id);
    if (res) {
      return true;
    } else {
      return false;
    }
  });
  const [friend, setFriend] = useState<boolean>(() => {
    const res = authorization?.friends.find((user) => user.id === data.id);
    if (res) {
      return true;
    } else {
      return false;
    }
  });

  const handleFollow = useCallback(async () => {
    setRequesting(true);
    try {
      if (isRequested) {
        await unfollow(data.id);
        setIsRequested(false);
      } else {
        await follow(data.id);
        setIsRequested(true);
      }
      setRequesting(false);
    } catch (error) {
      setRequesting(false);
      message.error(t('Home:Failed'));
    }
  }, [data.id, isRequested, t]);

  const handleAddfr = useCallback(async () => {
    setRequesting(true);
    try {
      if (!friend) {
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
    <div className={cx('item', { small: size === 'small' })}>
      <div className={cx('left')}>
        <div
          className={cx('avatar')}
          onClick={() =>
            navigate(
              authorization && authorization.id !== data.id
                ? ROUTE_PATH.USER.replace(':slug', `${data?.slug}`)
                : ROUTE_PATH.PROFILE.replace(':slug', `${data?.slug}`),
            )
          }
        >
          <img src={data.avatar || AvatarDefault} alt="Avatar" />
        </div>
        <div className={cx('text-info')}>
          <Typography.Text
            className={cx('name')}
            onClick={() =>
              navigate(
                authorization && authorization.id !== data.id
                  ? ROUTE_PATH.USER.replace(':slug', `${data?.slug}`)
                  : ROUTE_PATH.PROFILE.replace(':slug', `${data?.slug}`),
              )
            }
          >
            {data.name || 'Jakob botosh'}
          </Typography.Text>
        </div>
      </div>
      {authorization && authorization.id !== data.id && (
        <>
          {friend ? (
            ''
          ) : isReceiveReq ? (
            <Button className={cx('btn-confirm')} loading={requesting} onClick={handleAddfr}>
              {t('Common:Button.Confirm')}
            </Button>
          ) : (
            <Button className={cx('btn-add')} loading={requesting} onClick={handleFollow}>
              {isRequested ? t('Common:Button.Requested') : t('Common:Button.Addfriend')}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default memo(ViewUsersItem);
