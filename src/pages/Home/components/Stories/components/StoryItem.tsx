import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from '../Stories.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { IStory, StoriesOption } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const StoryItem = ({ data }: { data: IStory }) => {
  return (
    <div className={cx('story-item')}>
      <div
        className={cx('body')}
        style={
          data.type === StoriesOption.IMAGE
            ? { backgroundImage: `url(${data.storyUrl || AvatarDefault})` }
            : { backgroundColor: `${data.bgColor}` }
        }
      >
        <div className={cx('avatar')}>
          <img src={data.owner?.avatar || AvatarDefault} alt="" />
        </div>
        <div className={cx('info')}>
          <h4 className={cx('name')}>{data.owner?.name}</h4>
        </div>
        {data.text && <Typography.Text className={cx('text')}>{data.text}</Typography.Text>}
      </div>
    </div>
  );
};

export default StoryItem;
