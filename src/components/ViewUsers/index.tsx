import { memo } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './ViewUsers.module.scss';

const cx = classNames.bind(styles);

type ViewUsersProps = {
  open: boolean;
  onCancel: () => void;
};

const ViewUsers = ({ open, onCancel }: ViewUsersProps) => {
  return <Modal className={cx('wrapper')} footer={null} open={open} onCancel={onCancel}></Modal>;
};

export default memo(ViewUsers);
