import { useTranslation } from 'react-i18next';
import { Spin, Typography } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Suggest.module.scss';
import useSuggestList from '@hooks/users/useSuggestList';
import SuggestItem from '@layouts/components/SiderRight/components/SuggestItem';
import NoData from '@components/NoData';

const cx = classNames.bind(styles);

const Suggest = () => {
  const { t } = useTranslation();
  const { data, loading } = useSuggestList();

  return (
    <div className={cx('wrapper')}>
      <span className={cx('label')}>
        <Typography.Text className={cx('title')}>{t('Home:RightSider.Label2')}</Typography.Text>
      </span>
      {loading ? (
        <Spin />
      ) : data && data?.length > 0 ? (
        data?.map((user) => <SuggestItem key={uuIdV4()} data={user} size="small" />)
      ) : (
        <NoData title={t('Home:RightSider.Suggests.NoData')} />
      )}
    </div>
  );
};

export default Suggest;
