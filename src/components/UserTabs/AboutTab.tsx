import { memo } from 'react';
import { Tag, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './UserTabs.module.scss';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const AboutTab = ({ data, loading }: { data: AuthorizationData; loading: boolean }) => {
  const { t } = useTranslation(['Common']);

  return (
    <div className={cx('about')}>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Email:</Typography.Text>
        <Typography.Text className="text-default">{data?.email}</Typography.Text>
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Age:</Typography.Text>
        {data?.age ? <Typography.Text className="text-default">{data?.age}</Typography.Text> : <Tag>{t('Empty')}</Tag>}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Address:</Typography.Text>
        {data?.address ? (
          <Typography.Text className="text-default">{data?.address}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
      <div className={cx('item')}>
        <Typography.Text className={cx('label')}>Gender:</Typography.Text>
        {data?.gender ? (
          <Typography.Text className="text-default">{data?.gender}</Typography.Text>
        ) : (
          <Tag>{t('Empty')}</Tag>
        )}
      </div>
    </div>
  );
};

export default memo(AboutTab);
