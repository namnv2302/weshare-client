import { Typography, Tabs } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuIdV4 } from 'uuid';
import type { TabsProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './TabsContent.module.scss';
import useFollowedList from '@hooks/users/useFollowedList';
import FriendRequestItem from '@layouts/components/SiderRight/components/FriendRequestItem';
import FriendItem from '@layouts/components/SiderRight/components/FriendItem';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const TabsContent = () => {
  const { t } = useTranslation();
  const authorization = useAppSelector((state) => state.authorization);
  const { data: dataFollowed } = useFollowedList();

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <Typography.Text className={cx('label')}>{t('Home:RightSider.Tab.Item1')}</Typography.Text>,
        children: (
          <>
            {authorization?.friends?.map((user) => (
              <FriendItem key={uuIdV4()} data={user} size="small" />
            ))}
          </>
        ),
      },
      {
        key: '2',
        label: <Typography.Text className={cx('label')}>{t('Home:RightSider.Tab.Item2')}</Typography.Text>,
        children: (
          <>
            {dataFollowed?.map((user) => (
              <FriendRequestItem key={uuIdV4()} data={user} size="small" />
            ))}
          </>
        ),
      },
    ],
    [dataFollowed, t, authorization?.friends],
  );

  return <Tabs className={cx('wrapper')} items={items} />;
};

export default TabsContent;
