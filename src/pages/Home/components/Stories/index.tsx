import { useMemo } from 'react';
import Slider from 'react-slick';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import CreateStories from '@pages/Home/components/CreateStories';
import useStories from '@hooks/stories/useStories';
import StoryItem from '@pages/Home/components/Stories/components/StoryItem';

const cx = classNames.bind(styles);

const Stories = () => {
  const { data } = useStories();

  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <Slider {...settings}>
        <CreateStories />
        {data?.map((story) => (
          <StoryItem key={uuIdV4()} data={story} />
        ))}
      </Slider>
    </div>
  );
};

export default Stories;
