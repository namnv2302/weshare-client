import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
  const { t } = useTranslation(['Common']);
  return (
    <>
      <Input
        prefix={<SearchOutlined className={cx('icon')} />}
        placeholder={t('Search.Label')}
        className={cx('input')}
      />
    </>
  );
};

export default Search;
