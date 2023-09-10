import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './ProfileTabs.module.scss';
import PostList from '@pages/Home/components/PostList';
import usePostsOfMe from '@hooks/posts/usePostsOfMe';
import AboutTab from '@components/ProfileTabs/AboutTab';

const cx = classNames.bind(styles);

const ProfileTabs = () => {
  const { t } = useTranslation(['Profile']);
  const { data, loading } = usePostsOfMe();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Typography.Text style={{ fontWeight: 500 }}>{t('Tabs.About')}</Typography.Text>,
      children: <AboutTab />,
    },
    {
      key: '2',
      label: <Typography.Text style={{ fontWeight: 500 }}>{t('Tabs.Posts')}</Typography.Text>,
      children: <PostList posts={data || []} loading={loading} divider={false} />,
    },
  ];

  return <Tabs className={cx('wrapper')} defaultActiveKey="1" items={items} />;
};

export default ProfileTabs;
