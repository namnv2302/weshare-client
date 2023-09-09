import { memo, useMemo } from 'react';
import { Modal, Spin, Typography } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuIdV4 } from 'uuid';
import styles from './ViewUsers.module.scss';
import ViewUsersItem from '@components/ViewUsers/ViewUsersItem';
import usePostDetail from '@hooks/posts/usePostDetail';

const cx = classNames.bind(styles);

type ViewUsersProps = {
  id: string;
  open: boolean;
  onCancel: () => void;
};

const ViewUsers = ({ id, open, onCancel }: ViewUsersProps) => {
  const postId = useMemo(() => id, [id]);
  const { data, loading } = usePostDetail(postId);

  return (
    <Modal className={cx('wrapper')} footer={null} open={open} onCancel={onCancel}>
      <div className={cx('head')}>
        <Typography.Text className={cx('option')}>All</Typography.Text>
      </div>
      {loading ? (
        <Spin style={{ display: 'block', textAlign: 'center', marginTop: '22px' }} />
      ) : (
        <div className={cx('content')}>
          {data?.liked?.map((user) => (
            <ViewUsersItem key={uuIdV4()} data={user} />
          ))}
        </div>
      )}
    </Modal>
  );
};

export default memo(ViewUsers);
