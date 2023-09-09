import { Divider, Result, Spin, Typography } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import styles from './PostList.module.scss';
import PostItem from '@pages/Home/components/PostList/PostItem';
import { IPost } from '@hooks/usePosts';
import NoData from '@assets/images/no-data.jpg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchPostList } from '@slices/postSlice';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const PostList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.post);

  useEffect(() => {
    (async () => {
      await dispatch(fetchPostList());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('wrapper')}>
      <Divider orientation="right">
        <span className={cx('sort-text')}>{t('Sort.Label')}: </span>
        <span className={cx('sort-option')}>{t('Sort.Option.Following')}</span>
      </Divider>
      <>
        {loading ? (
          <Spin style={{ display: 'block', textAlign: 'center', marginTop: '22px' }} />
        ) : posts && posts?.length > 0 ? (
          posts?.map((post: IPost) => (
            <LazyLoad key={uuIdV4()} height={712}>
              <PostItem data={post} />
            </LazyLoad>
          ))
        ) : (
          <Result
            title={<Typography.Text className="text-default">{t('Post.NoData')}</Typography.Text>}
            icon={<img src={NoData} alt="No data" style={{ width: '100px', borderRadius: '10px' }} />}
          />
        )}
      </>
    </div>
  );
};

export default PostList;
