import { useState, useCallback, useEffect } from 'react';
import { getStoryList } from '@apis/story';
import { IStory } from '@slices/storiesSlice';

const useStories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IStory[]>();

  const fetchStoryList = useCallback(async () => {
    setLoading(true);
    const resp = await getStoryList();
    if (resp.status === 200) {
      setLoading(false);
      setData(resp.data.data);
    }
  }, []);

  useEffect(() => {
    fetchStoryList();
  }, [fetchStoryList]);

  return { data, loading };
};

export default useStories;
