import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import { ImageIcon } from '@components/Icons';

const cx = classNames.bind(styles);

const StoriesPage = () => {
  const { t } = useTranslation(['Stories']);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <ImageIcon className={cx('icon')} />
        <Typography.Title level={5}>{t('Select')}</Typography.Title>
      </div>
    </div>
  );
};

export default StoriesPage;
