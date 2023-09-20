import { Tag, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import styles from './ProfileTabs.module.scss';

const cx = classNames.bind(styles);

const AboutTab = () => {
  const { t } = useTranslation(['Profile', 'Common']);
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('about')}>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>{t('Label.Email')}:</Typography.Text>
        <Typography.Text className="text-default">{authorization?.email}</Typography.Text>
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>{t('Label.Age')}:</Typography.Text>
        {authorization?.age ? (
          <Typography.Text className="text-default">{authorization?.age}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>{t('Label.Address')}:</Typography.Text>
        {authorization?.address ? (
          <Typography.Text className="text-default">{authorization?.address}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>{t('Label.Gender')}:</Typography.Text>
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
