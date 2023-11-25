import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './SiderRight.module.scss';

const cx = classNames.bind(styles);

const SiderRight = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <span className={cx('label')}>
        <Typography.Text className={cx('title')}>{t('Home:RightSider.Label1')}</Typography.Text>
      </span>
    </div>
  );
};

export default SiderRight;
