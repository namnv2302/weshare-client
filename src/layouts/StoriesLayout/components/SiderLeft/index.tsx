import { Divider, Typography } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import { PlusCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './SiderLeft.module.scss';
import StoryItem from '@layouts/StoriesLayout/components/StoryItem';
import useStories from '@hooks/stories/useStories';

const cx = classNames.bind(styles);

const SiderLeft = () => {
  const { t } = useTranslation(['Stories']);
  const { data, loading } = useStories();

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={5}>{t('Label2')}</Typography.Title>
      <div className={cx('head')}>
        <PlusCircleFilled className={cx('icon')} />
        <div className={cx('right')}>
          <Typography.Text className={cx('label')}>{t('Create.Label')}</Typography.Text>
          <span className={cx('desc')}>{t('Create.Desc')}</span>
        </div>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <div className={cx('stories-wrap')}>
        {data?.map((story) => (
          <StoryItem key={uuIdV4()} story={story} />
        ))}
      </div>
    </div>
  );
};

export default SiderLeft;
