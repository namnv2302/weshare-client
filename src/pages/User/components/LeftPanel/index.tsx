import { useTranslation } from 'react-i18next';
import { Card, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './LeftPanel.module.scss';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const LeftPanel = ({ data, loading }: { data: AuthorizationData | undefined; loading: boolean }) => {
  const { t } = useTranslation(['Profile']);

  return (
    <div className={cx('wrapper')}>
      <Card
        title={<Typography.Text className={cx('bio-title')}>{t('Bio.Label')}</Typography.Text>}
        className={cx('bio')}
      >
        <Typography.Text className={cx('bio-text')}>{data?.bio || t('Bio.NoData')}</Typography.Text>
      </Card>
    </div>
  );
};

export default LeftPanel;
