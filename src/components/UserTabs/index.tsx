import { memo } from 'react';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './UserTabs.module.scss';
import PostList from '@pages/Home/components/PostList';
import AboutTab from '@components/UserTabs/AboutTab';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const UserTabs = ({ data, loading }: { data: AuthorizationData; loading: boolean }) => {
  const { t } = useTranslation(['Profile']);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Typography.Text style={{ fontWeight: 500 }}>{t('Tabs.About')}</Typography.Text>,
      children: <AboutTab data={data} loading={loading} />,
    },
    {
      key: '2',
      label: <Typography.Text style={{ fontWeight: 500 }}>{t('Tabs.Posts')}</Typography.Text>,
      children: <PostList posts={data.posts || []} loading={loading} divider={false} />,
    },
  ];

  return <Tabs className={cx('wrapper')} defaultActiveKey="1" items={items} />;
};

export default memo(UserTabs);
