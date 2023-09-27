import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import SearchResult from '@components/SearchResult';
import { getUserByName } from '@apis/user';
import useDebounce from '@hooks/debounce/useDebounce';
import { AuthorizationData } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const Search = () => {
  const { t } = useTranslation(['Common']);
  const [inputValue, setInputValue] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<AuthorizationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debounceValue = useDebounce(inputValue.trim(), 700);

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      setShowResult(false);
      return;
    }
    (async () => {
      setLoading(true);
      setShowResult(true);
      try {
        const resp = await getUserByName(debounceValue);
        if (resp.status === 200) {
          setSearchResult(resp.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [debounceValue]);

  return (
    <Tippy
      visible={showResult}
      interactive
      placement="bottom-start"
      onClickOutside={() => setShowResult(false)}
      render={() => <SearchResult data={searchResult} loading={loading} />}
    >
      <span>
        <Input
          prefix={<SearchOutlined className={cx('icon')} />}
          placeholder={t('Search.Label')}
          className={cx('input')}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
      </span>
    </Tippy>
  );
};

export default Search;
