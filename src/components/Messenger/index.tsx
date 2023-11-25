import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Spin, Typography } from 'antd';
import { FilterOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import TabsContent from '@components/Messenger/components/TabsContent';
import { useAppSelector } from 'redux/hooks';
import useUserChats from '@hooks/chats/useUserChats';

const cx = classNames.bind(styles);

const Messenger = () => {
  const { t } = useTranslation(['Messenger']);
  const authorization = useAppSelector((state) => state.authorization);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const { data, loading } = useUserChats(userId);

  return (
    <div className={cx('wrapper')}>
      <span className={cx('label')}>
        <Typography.Text className={cx('title')}>{t('Label')}</Typography.Text>
        <FormOutlined className={cx('icon')} />
      </span>
      <Input
        className={cx('search-input')}
        prefix={<SearchOutlined className={cx('icon')} />}
        suffix={<FilterOutlined className={cx('icon')} />}
        placeholder={t('Search')}
      />
      {loading ? (
        <Spin />
      ) : data && data.length > 0 ? (
        <TabsContent userChats={data} />
      ) : (
        <Typography.Text className={cx('no-conversation')}>{t('NoConversation')}</Typography.Text>
      )}
    </div>
  );
};

export default Messenger;
