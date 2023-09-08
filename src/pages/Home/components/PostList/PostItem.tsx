import classNames from 'classnames/bind';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './PostList.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';
import { IPost } from '@hooks/usePosts';
import { DATE_FORMAT } from '@constants/time';

const cx = classNames.bind(styles);

const PostItem = ({ data }: { data: IPost }) => {
  return (
    <div className={cx('item')}>
      <div className={cx('head')}>
        <div className={cx('left')}>
          <img src={AvatarDefault} alt="Avatar" />
          <span className={cx('desc')}>
            <span className={cx('name')}>{data.user?.name || 'Jakob Botosh'}</span>
            <span className={cx('time')}>{moment(data.createdAt).format(DATE_FORMAT)}</span>
          </span>
        </div>
        <MoreOutlined className={cx('right-icon')} />
      </div>
      <div className={cx('body')}>
        {data.status ? <span className={cx('status')}>{data.status}</span> : false}
        {data.postUrl ? <img src={data.postUrl} alt="post" /> : false}
      </div>
    </div>
  );
};

export default PostItem;
