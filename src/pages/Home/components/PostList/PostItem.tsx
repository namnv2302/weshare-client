import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { CommentOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './PostList.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { IPost } from '@hooks/posts/usePosts';
import { DATE_FORMAT } from '@constants/time';
import { ShareIcon, HeartIcon } from '@components/Icons';
import { like, unlike } from '@apis/post';
import { useAppSelector } from 'redux/hooks';
import ViewUsers from '@components/ViewUsers';
import ReadMoreStatus from '@components/ReadMoreStatus';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const PostItem = ({ data }: { data: IPost }) => {
  const { t } = useTranslation(['Home']);
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);
  const [open, setOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(() => {
    if (data.liked && authorization) {
      const result = data.liked.find((user) => user.id === authorization.id);
      if (result) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
  const [likeCount, setLikeCount] = useState<number>(() => {
    const count = data.liked?.length;
    if (count) {
      return count;
    }
    return 0;
  });

  const handleLike = useCallback(async () => {
    if (data.id) {
      if (isLike) {
        setIsLike(!isLike);
        setLikeCount((prev) => prev - 1);
        await unlike(data.id);
      } else {
        setIsLike(!isLike);
        setLikeCount((prev) => prev + 1);
        await like(data.id);
      }
    }
  }, [isLike, data.id]);

  const handleViewUsersLiked = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className={cx('item')}>
      <div className={cx('head')}>
        <div className={cx('left')}>
          <img
            src={data.user?.avatar || AvatarDefault}
            alt="Avatar"
            onClick={() =>
              navigate(
                authorization && authorization.id !== data.user?.id
                  ? ROUTE_PATH.USER.replace(':slug', `${data?.user?.slug}`)
                  : ROUTE_PATH.PROFILE.replace(':slug', `${data?.user?.slug}`),
              )
            }
          />
          <span className={cx('desc')}>
            <span
              className={cx('name')}
              onClick={() =>
                navigate(
                  authorization && authorization.id !== data.user?.id
                    ? ROUTE_PATH.USER.replace(':slug', `${data?.user?.slug}`)
                    : ROUTE_PATH.PROFILE.replace(':slug', `${data?.user?.slug}`),
                )
              }
            >
              {data.user?.name || 'Jakob Botosh'}
            </span>
            <span className={cx('time')}>{moment(data.createdAt).format(DATE_FORMAT)}</span>
          </span>
        </div>
        <MoreOutlined className={cx('right-icon')} />
      </div>
      <div className={cx('body')}>
        {data.status ? <ReadMoreStatus status={data.status} /> : false}
        {data.postUrl ? <img src={data.postUrl} alt="post" /> : false}
      </div>
      <Divider style={{ margin: '18px 0 12px' }} />
      <div className={cx('actions')}>
        <div className={cx('action-item', 'like')}>
          <HeartIcon
            className={cx('icon', {
              isLiked: isLike,
            })}
            fill={'#696e74'}
            onClick={handleLike}
          />
          <span className={cx('text-default', 'view')} onClick={handleViewUsersLiked}>
            {likeCount} {t('Action.Like')}
          </span>
        </div>
        <div className={cx('action-item', 'comment')}>
          <CommentOutlined className={cx('icon')} />
          <span className="text-default">
            {0} {t('Action.Comment')}
          </span>
        </div>
        <div className={cx('action-item', 'share')}>
          <ShareIcon fill={'#696e74'} className={cx('icon')} />
          <span className="text-default">10 {t('Action.Share')}</span>
        </div>
      </div>
      {data.id && <ViewUsers id={data.id} open={open} onCancel={() => setOpen(false)} />}
    </div>
  );
};

export default PostItem;
