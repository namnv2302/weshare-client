import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './PreviewPanel.module.scss';
import { useAppSelector } from 'redux/hooks';
import { StoriesOption } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const PreviewPanel = () => {
  const { t } = useTranslation(['Stories']);
  const { currentStoriesOption, currentBgColor, currentText, previewStory } = useAppSelector((state) => state.stories);

  return (
    <div className={cx('wrapper')}>
      <Typography.Text className={cx('label')}>{t('Preview.Label')}</Typography.Text>
      <div className={cx('body')}>
        {currentStoriesOption === StoriesOption.TEXT ? (
          <div className={cx('content')} style={{ backgroundColor: `${currentBgColor}` }}>
            <span className={cx('text')}>{currentText}</span>
          </div>
        ) : (
          false
        )}
        {currentStoriesOption === StoriesOption.IMAGE ? (
          <div className={cx('image')}>
            <img src={previewStory.preview} alt="" />
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
