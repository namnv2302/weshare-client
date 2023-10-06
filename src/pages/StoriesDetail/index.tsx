import { useMemo } from 'react';
import Slider from 'react-slick';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './StoriesDetail.module.scss';
import StoriesDetail from '@pages/StoriesDetail/StoriesDetail';
import { LeftIcon, RightIcon } from '@components/Icons';
import useStories from '@hooks/stories/useStories';

const cx = classNames.bind(styles);

const ArrowPrev = ({ currentSlide, slideCount, onClick }: any) => {
  return (
    <div className={cx('arrow', 'prev', { disable: currentSlide === 0 })} onClick={onClick}>
      <LeftIcon width="1.2rem" height="1.2rem" />
    </div>
  );
};

const ArrowNext = ({ currentSlide, slideCount, onClick }: any) => {
  return (
    <div className={cx('arrow', 'next', { disable: currentSlide === slideCount - 1 })} onClick={onClick}>
      <RightIcon width="1.2rem" height="1.2rem" />
    </div>
  );
};

const StoriesDetailPage = () => {
  const { data } = useStories();

  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <ArrowNext />,
      prevArrow: <ArrowPrev />,
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Slider {...settings}>
          {data?.map((story) => (
            <StoriesDetail key={uuIdV4()} story={story} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default StoriesDetailPage;
