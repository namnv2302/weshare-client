import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './StoryItem.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { IStory } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const StoryItem = ({ story }: { story: IStory }) => {
  return (
    <div className={cx('wrapper')}>
      <img src={story.owner?.avatar || AvatarDefault} alt="" />
      <div className={cx('right')}>
        <span className={cx('name')}>{story.owner?.name}</span>
        <span className={cx('time')}>{moment(story.createdAt).startOf('minute').fromNow()}</span>
      </div>
    </div>
  );
};

export default StoryItem;
