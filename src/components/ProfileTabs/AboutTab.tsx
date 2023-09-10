import { Tag, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import styles from './ProfileTabs.module.scss';

const cx = classNames.bind(styles);

const AboutTab = () => {
  const { t } = useTranslation(['Common']);
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('about')}>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Email:</Typography.Text>
        <Typography.Text className="text-default">{authorization?.email}</Typography.Text>
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Age:</Typography.Text>
        {authorization?.age ? (
          <Typography.Text className="text-default">{authorization?.age}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Address:</Typography.Text>
        {authorization?.address ? (
          <Typography.Text className="text-default">{authorization?.address}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Gender:</Typography.Text>
        {authorization?.gender ? (
          <Typography.Text className="text-default">{authorization?.gender}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
    </div>
  );
};

export default AboutTab;
