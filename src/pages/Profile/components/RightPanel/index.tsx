import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './RightPanel.module.scss';
import ProfileTabs from '@components/ProfileTabs';
import { useAppSelector } from 'redux/hooks';
import EditModal from '@pages/Profile/components/EditModal';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t } = useTranslation(['Home', 'Profile']);
  const authorization = useAppSelector((state) => state.authorization);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={4} className="mb-0">
        {authorization?.name || 'Jakob Botosh'}
      </Typography.Title>
      <Typography.Text className="text-default">@{authorization?.slug || 'Jakob Botosh'}</Typography.Text>
      <div className={cx('content')}>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{authorization?.followed.length}</span>
          <span className={cx('item-text')}>{t('User.Follower')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{authorization?.following.length}</span>
          <span className={cx('item-text')}>{t('User.Following')}</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('item-number')}>{authorization?.posts ? authorization?.posts.length : 0}</span>
          <span className={cx('item-text')}>{t('User.Post')}</span>
        </div>
      </div>
      <div className={cx('button')}>
        <Button icon={<EditOutlined />} className={cx('button-edit')} onClick={() => setOpenModal(true)}>
          {t('Profile:Label.Edit')}
        </Button>
        <EditModal open={openModal} setOpenModal={setOpenModal} />
      </div>
      <ProfileTabs />
    </div>
  );
};

export default RightPanel;
