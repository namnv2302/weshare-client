import { Typography, Tabs } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuIdV4 } from 'uuid';
import type { TabsProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './TabsConent.module.scss';
import useFollowedList from '@hooks/users/useFollowedList';
import FriendRequestItem from '@layouts/components/SiderRight/components/FriendRequestItem';

const cx = classNames.bind(styles);

const TabsConent = () => {
  const { t } = useTranslation();
  const { data } = useFollowedList();

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <Typography.Text className={cx('label')}>{t('Home:RightSider.Tab.Item1')}</Typography.Text>,
        children: 'Alo',
      },
      {
        key: '2',
        label: <Typography.Text className={cx('label')}>{t('Home:RightSider.Tab.Item2')}</Typography.Text>,
        children: (
          <>
            {data?.map((user) => (
              <FriendRequestItem key={uuIdV4()} data={user} size="small" />
            ))}
          </>
        ),
      },
    ],
    [data, t],
  );

  return <Tabs className={cx('wrapper')} items={items} />;
};

export default TabsConent;
