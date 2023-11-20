import { useTranslation } from 'react-i18next';
import { Input, Typography } from 'antd';
import { FilterOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import TabsContent from '@components/Messenger/components/TabsContent';

const cx = classNames.bind(styles);

const Messenger = () => {
  const { t } = useTranslation(['Messenger']);

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
      <TabsContent />
    </div>
  );
};

export default Messenger;
