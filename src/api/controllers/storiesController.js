import {
  getStoriesFromApi,
  getStoryFromApi,
  getStoriesCharactersFromApi,
  getStoriesComicsFromApi,
  getStoriesEventsFromApi,
  getStoriesSeriesFromApi,
} from '../services/storiesService';

const GetStories = async (limit, offset, searchValue) => {
  return await getStoriesFromApi(limit, offset, searchValue);
};

const GetStory = async id => {
  return await getStoryFromApi(id);
};

const GetStoriesComics = async (limit, offset, id) => {
  return await getStoriesComicsFromApi(limit, offset, id);
};

const GetStoriesEvents = async (limit, offset, id) => {
  return await getStoriesEventsFromApi(limit, offset, id);
};

const GetStoriesSeries = async (limit, offset, id) => {
  return await getStoriesSeriesFromApi(limit, offset, id);
};

const GetStoriesCharacters = async (limit, offset, id) => {
  return await getStoriesCharactersFromApi(limit, offset, id);
};

export {
  GetStories,
  GetStory,
  GetStoriesComics,
  GetStoriesEvents,
  GetStoriesSeries,
  GetStoriesCharacters,
};
