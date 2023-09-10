import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './RightPanel.module.scss';
import ProfileTabs from '@components/ProfileTabs';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t } = useTranslation(['Home']);
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={4} className="mb-0">
        {authorization?.name || 'Jakob Botosh'}
      </Typography.Title>
      <Typography.Text className="text-default">@{authorization?.slug || 'Jakob Botosh'}</Typography.Text>
      <div className={cx('content')}>
        <div className={cx('item')}>
          <span className={cx('item-number')}>2.3K</span>
          <span className={cx('item-text')}>{t('User.Follower')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>23</span>
          <span className={cx('item-text')}>{t('User.Following')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{authorization?.posts ? authorization?.posts.length : 0}</span>
          <span className={cx('item-text')}>{t('User.Post')}</span>
        </div>
      </div>
      <div className={cx('button')}>
        <Button icon={<EditOutlined />} className={cx('button-edit')}>
          Edit Profile
        </Button>
      </div>
      <ProfileTabs />
    </div>
  );
};

export default RightPanel;
