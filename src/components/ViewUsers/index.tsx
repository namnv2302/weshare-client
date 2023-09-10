import { memo, useMemo } from 'react';
import { Modal, Spin, Typography } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuIdV4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import styles from './ViewUsers.module.scss';
import ViewUsersItem from '@components/ViewUsers/ViewUsersItem';
import usePostDetail from '@hooks/posts/usePostDetail';
import NoData from '@components/NoData';

const cx = classNames.bind(styles);

type ViewUsersProps = {
  id: string;
  open: boolean;
  onCancel: () => void;
};

const ViewUsers = ({ id, open, onCancel }: ViewUsersProps) => {
  const { t } = useTranslation(['Common']);
  const postId = useMemo(() => id, [id]);
  const { data, loading } = usePostDetail(postId);

  return (
    <Modal className={cx('wrapper')} footer={null} open={open} onCancel={onCancel}>
      <div className={cx('head')}>
        <Typography.Text className={cx('option')}>{t('Sort.Option.All')}</Typography.Text>
      </div>
      <div className={cx('content')}>
        {loading ? (
          <Spin style={{ display: 'block', textAlign: 'center', marginTop: '22px' }} />
        ) : data?.liked && data?.liked?.length > 0 ? (
          data?.liked?.map((user) => <ViewUsersItem key={uuIdV4()} data={user} />)
        ) : (
          <NoData title={t('NoData.Like')} />
        )}
      </div>
    </Modal>
  );
};

export default memo(ViewUsers);
