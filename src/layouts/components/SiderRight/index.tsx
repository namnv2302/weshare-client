import { useTranslation } from 'react-i18next';
import { Input, Typography } from 'antd';
import { FilterOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './SiderRight.module.scss';
import TabsConent from '@layouts/components/SiderRight/components/TabsConent';

const cx = classNames.bind(styles);

const SiderRight = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <span className={cx('label')}>
        <Typography.Text className={cx('title')}>{t('Home:RightSider.Label')}</Typography.Text>
        <FormOutlined className={cx('icon')} />
      </span>
      <Input
        className={cx('search-input')}
        prefix={<SearchOutlined className={cx('icon')} />}
        suffix={<FilterOutlined className={cx('icon')} />}
        placeholder={t('Home:RightSider.Search')}
      />
      <TabsConent />
    </div>
  );
};

export default SiderRight;
