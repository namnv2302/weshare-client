import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import CreateStories from '@pages/Home/components/CreateStories';

const cx = classNames.bind(styles);

const Stories = () => {
  return (
    <div className={cx('wrapper')}>
      <CreateStories />
    </div>
  );
};

export default Stories;
