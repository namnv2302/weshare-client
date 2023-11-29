import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import CreateStories from '@pages/Home/components/CreateStories';
import useStories from '@hooks/stories/useStories';
import StoryItem from '@pages/Home/components/Stories/components/StoryItem';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const Stories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      {data && data.length > 0 ? (
        <Slider {...settings}>
          <CreateStories />
          {data?.map((story) => (
            <StoryItem key={uuIdV4()} data={story} />
          ))}
        </Slider>
      ) : (
        <div className={cx('no-stories')} onClick={() => navigate(ROUTE_PATH.STORIES_CREATE)}>
          <PlusOutlined className={cx('plus-icon')} />
          <Typography.Text className={cx('text')}>{t('Home:Story.Create')}</Typography.Text>
        </div>
      )}
    </div>
  );
};

export default Stories;
