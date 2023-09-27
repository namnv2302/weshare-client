import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import SearchResultItem from '@components/SearchResult/SearchResultItem';
import { AuthorizationData } from '@slices/authorizationSlice';
import NoData from '@components/NoData';

const cx = classNames.bind(styles);

const SearchResult = ({ data, loading }: { data: AuthorizationData[]; loading: boolean }) => {
  const { t } = useTranslation(['Common']);

  return (
    <div className={cx('wrapper')}>
      {loading ? (
        <Spin
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      ) : data.length > 0 ? (
        data.map((user) => <SearchResultItem key={uuIdV4()} user={user} />)
      ) : (
        <NoData title={t('NoData.Search')} />
      )}
    </div>
  );
};

export default SearchResult;
