import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Typography, Button } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from './RightPanel.module.scss';
import UserTabs from '@components/UserTabs';
import useUserBySlug from '@hooks/users/useUserBySlug';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t } = useTranslation(['Home']);
  const { slug } = useParams();
  const userSlug = useMemo(() => slug, [slug]) as string;
  const { data, loading } = useUserBySlug(userSlug);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={4} className="mb-0">
        {data?.name || 'Jakob Botosh'}
      </Typography.Title>
      <Typography.Text className="text-default">@{data?.slug || 'Jakob Botosh'}</Typography.Text>
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
          <span className={cx('item-number')}>{data?.posts.length}</span>
          <span className={cx('item-text')}>{t('User.Post')}</span>
        </div>
      </div>
      <div className={cx('button')}>
        <Button icon={<UserOutlined />} className={cx('button-add')}>
          Add Friend
        </Button>
        <Button icon={<MessageOutlined />} className={cx('button-mess')}>
          Message
        </Button>
      </div>
      {data && <UserTabs data={data} loading={loading} />}
    </div>
  );
};

export default RightPanel;
