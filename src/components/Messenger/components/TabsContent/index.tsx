import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './TabsContent.module.scss';
import useUserChats from '@hooks/chats/useUserChats';
import { useAppSelector } from 'redux/hooks';
import ChatItem from '@components/Messenger/components/ChatItem';

const cx = classNames.bind(styles);

const TabsContent = () => {
  const { t } = useTranslation();
  const authorization = useAppSelector((state) => state.authorization);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const { data } = useUserChats(userId);

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <Typography.Text className={cx('label')}>{t('Messenger:Tab.Item1')}</Typography.Text>,
        children: (
          <>
            {data?.map((chat) => (
              <ChatItem key={uuIdV4()} chat={chat} />
            ))}
          </>
        ),
      },
      {
        key: '2',
        label: <Typography.Text className={cx('label')}>{t('Messenger:Tab.Item2')}</Typography.Text>,
      },
    ],
    [t, data],
  );

  return <Tabs className={cx('wrapper')} items={items} />;
};

export default TabsContent;
