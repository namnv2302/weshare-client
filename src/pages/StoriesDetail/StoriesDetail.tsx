import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './StoriesDetail.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { IStory, StoriesOption } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const StoriesDetail = ({ story }: { story: IStory }) => {
  return (
    <div
      className={cx('item')}
      style={
        story.type === StoriesOption.IMAGE
          ? { backgroundImage: `url(${story.storyUrl || AvatarDefault})` }
          : { backgroundColor: `${story.bgColor}` }
      }
    >
      {story.text && <Typography.Text className={cx('text')}>{story.text}</Typography.Text>}
    </div>
  );
};

export default StoriesDetail;
