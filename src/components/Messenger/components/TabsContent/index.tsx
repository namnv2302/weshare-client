import { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './TabsContent.module.scss';
import { IChat } from '@hooks/chats/useUserChats';
import ChatItem from '@components/Messenger/components/ChatItem';

const cx = classNames.bind(styles);

const TabsContent = ({ userChats }: { userChats: IChat[] }) => {
  const { t } = useTranslation();

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <Typography.Text className={cx('label')}>{t('Messenger:Tab.Item1')}</Typography.Text>,
        children: (
          <>
            {userChats?.map((chat) => (
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
    [t, userChats],
  );

  return <Tabs className={cx('wrapper')} items={items} />;
};

export default memo(TabsContent);
