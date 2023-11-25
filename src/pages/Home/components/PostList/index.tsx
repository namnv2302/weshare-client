import { memo } from 'react';
import { Divider, Spin } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import styles from './PostList.module.scss';
import PostItem from '@pages/Home/components/PostList/PostItem';
import { IPost } from '@hooks/posts/usePosts';
import NoData from '@components/NoData';

const cx = classNames.bind(styles);

const PostList = ({ posts, loading, divider = true }: { posts: IPost[]; loading: boolean; divider?: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      {divider && (
        <Divider orientation="right">
          <span className={cx('sort-text')}>{t('Sort.Label')}: </span>
          <span className={cx('sort-option')}>{t('Sort.Option.Following')}</span>
        </Divider>
      )}
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
          <NoData title={t('Post.NoData')} />
        )}
      </>
    </div>
  );
};

export default memo(PostList);
