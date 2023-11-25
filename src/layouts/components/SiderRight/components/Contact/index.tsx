import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuIdV4 } from 'uuid';
import { Spin, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import FriendItem from '@layouts/components/SiderRight/components/FriendItem';
import useFriendList from '@hooks/users/useFriendList';
import { useAppSelector } from 'redux/hooks';
import NoData from '@components/NoData';

const cx = classNames.bind(styles);

const Contact = () => {
  const { t } = useTranslation();
  const authorization = useAppSelector((state) => state.authorization);
  const userId = useMemo(() => {
    if (authorization) return authorization.id;
    return '';
  }, [authorization]);
  const { data, loading } = useFriendList(userId);

  return (
    <div className={cx('wrapper')}>
      <span className={cx('label')}>
        <Typography.Text className={cx('title')}>{t('Home:RightSider.Label1')}</Typography.Text>
      </span>
      {loading ? (
        <Spin />
      ) : data && data.length > 0 ? (
        data?.map((user) => <FriendItem key={uuIdV4()} data={user} size="small" />)
      ) : (
        <NoData title={t('Home:RightSider.Contacts.NoData')} />
      )}
    </div>
  );
};

export default Contact;
