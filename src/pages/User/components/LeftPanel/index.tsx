import classNames from 'classnames/bind';
import { Input, Typography } from 'antd';
import styles from './LeftPanel.module.scss';

const cx = classNames.bind(styles);

const LeftPanel = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('bio')}>
        <Typography.Text className={cx('bio-text')}>Thao</Typography.Text>
        <Input.TextArea className={cx('bio-input')} placeholder={'Add your bio'} />
      </div>
    </div>
  );
};

export default LeftPanel;
