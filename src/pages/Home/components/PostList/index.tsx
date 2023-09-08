import { Divider, Result, Spin, Typography } from 'antd';
import { v4 as uuIdV4 } from 'uuid';
import classNames from 'classnames/bind';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import styles from './PostList.module.scss';
import PostItem from '@pages/Home/components/PostList/PostItem';
import usePosts, { IPost } from '@hooks/usePosts';
import NoData from '@assets/images/no-data.jpg';

const cx = classNames.bind(styles);

const PostList = () => {
  const { t } = useTranslation();
  const { data, loading } = usePosts();

  return (
    <div className={cx('wrapper')}>
      <Divider orientation="right">
        <span className={cx('sort-text')}>Sort by: </span>
        <span className={cx('sort-option')}>Following</span>
      </Divider>
      <>
        {loading ? (
          <Spin style={{ display: 'block', textAlign: 'center', marginTop: '22px' }} />
        ) : data && data?.length > 0 ? (
          data?.map((post: IPost) => (
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
