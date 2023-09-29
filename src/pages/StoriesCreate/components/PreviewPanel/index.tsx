import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './PreviewPanel.module.scss';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const PreviewPanel = () => {
  const { t } = useTranslation(['Stories']);
  const { currentBgColor, currentText } = useAppSelector((state) => state.stories);

  return (
    <div className={cx('wrapper')}>
      <Typography.Text className={cx('label')}>{t('Preview.Label')}</Typography.Text>
      <div className={cx('body')}>
        <div className={cx('content')} style={{ backgroundColor: `${currentBgColor}` }}>
          <span className={cx('text')}>{currentText}</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
