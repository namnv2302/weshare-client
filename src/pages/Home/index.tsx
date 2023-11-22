import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchPostList } from '@slices/postSlice';
import Stories from '@pages/Home/components/Stories';
import Posts from '@pages/Home/components/Posts';
import PostList from '@pages/Home/components/PostList';
import ChatBox from '@components/ChatBox';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.post);

  useEffect(() => {
    (async () => {
      await dispatch(fetchPostList());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stories />
      <Posts />
      <PostList posts={posts} loading={loading} />
      <ChatBox />
    </>
  );
};

export default HomePage;
