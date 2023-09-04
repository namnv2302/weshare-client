import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

const UserInfo = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <div className={cx('head')}>
          <img src={AvatarDefault} alt="Avatar" className={cx('avatar')} />
          <div className={cx('name')}>
            <span className={cx('fullname')}>Jakob Botosh</span>
            <span className={cx('username')}>@jakobbotosh</span>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('item')}>
            <span className={cx('item-number')}>2.3K</span>
            <span className={cx('item-text')}>Follower</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>23</span>
            <span className={cx('item-text')}>Following</span>
          </div>
          <div className={cx('item')}>
            <span className={cx('item-number')}>0</span>
            <span className={cx('item-text')}>Post</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
