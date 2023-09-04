import classNames from 'classnames/bind';
import styles from './CreateStories.module.scss';
import Avatar from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

const CreateStories = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar')}>
        <img src={Avatar} alt="Avatar" />
      </div>
      <span className={cx('label')}>Your Story</span>
    </div>
  );
};

export default CreateStories;
