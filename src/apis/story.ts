import apiInstance from '@apis/index';
import { IStory } from '@slices/storiesSlice';

enum StoryPath {
  DEFAULT = '/stories',
}

export const createStory = (payload: IStory) => {
  return apiInstance.post(StoryPath.DEFAULT, { ...payload });
};
