import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './StoriesDetail.module.scss';
import StoriesDetail from '@pages/StoriesDetail/StoriesDetail';
import { LeftIcon, RightIcon } from '@components/Icons';
import useStories from '@hooks/stories/useStories';
import { setCurrentStoryShow } from '@slices/storiesSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const StoriesDetailPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data } = useStories();
  const { currentStoryShow } = useAppSelector((state) => state.stories);

  useEffect(() => {
    const story = data?.find((story) => story.id === params.id);
    dispatch(setCurrentStoryShow(story));
  }, [data, dispatch, params.id]);

  const handleNextStories = useCallback(() => {
    if (!currentStoryShow || !data) return;
    const currentIndex = data?.findIndex((story) => story.id === currentStoryShow.id);
    if (currentIndex || currentIndex === 0) {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data?.length) nextIndex = 0;
      dispatch(setCurrentStoryShow(data[nextIndex]));
    }
  }, [currentStoryShow, data, dispatch]);

  const handleBackStories = useCallback(() => {
    if (!currentStoryShow || !data) return;
    const currentIndex = data?.findIndex((story) => story.id === currentStoryShow.id);
    if (currentIndex || currentIndex === 0) {
      let backIndex = currentIndex - 1;
      if (backIndex < 0) backIndex = data.length - 1;
      dispatch(setCurrentStoryShow(data[backIndex]));
    }
  }, [currentStoryShow, data, dispatch]);

  const ArrowPrev = () => {
    return (
      <div
        className={cx('arrow', 'prev', {
          disable: currentStoryShow && data?.findIndex((story) => story.id === currentStoryShow.id) === 0,
        })}
        onClick={handleBackStories}
      >
        <LeftIcon width="1.2rem" height="1.2rem" />
      </div>
    );
  };

  const ArrowNext = () => {
    return (
      <div
        className={cx('arrow', 'next', {
          disable:
            currentStoryShow &&
            data &&
            data?.findIndex((story) => story.id === currentStoryShow.id) === data?.length - 1,
        })}
        onClick={handleNextStories}
      >
        <RightIcon width="1.2rem" height="1.2rem" />
      </div>
    );
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {currentStoryShow ? (
          <>
            <ArrowPrev />
            <StoriesDetail story={currentStoryShow} />
            <ArrowNext />
          </>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default StoriesDetailPage;
