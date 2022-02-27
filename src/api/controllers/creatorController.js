import {
  getCreatorsFromApi,
  getCreatorsComicsFromApi,
  getCreatorFromApi,
  getCreatorsSeriesFromApi,
  getCreatorsEventsFromApi,
  getCreatorsStoriesFromApi,
} from '../services/creatorService';

const GetCreators = async (limit, offset, searchValue) => {
  return await getCreatorsFromApi(limit, offset, searchValue);
};

const GetCreator = async id => {
  return await getCreatorFromApi(id);
};

const GetCreatorsComics = async (limit, offset, id) => {
  return await getCreatorsComicsFromApi(limit, offset, id);
};

const GetCreatorsSeries = async (limit, offset, id) => {
  return await getCreatorsSeriesFromApi(limit, offset, id);
};

const GetCreatorsEvents = async (limit, offset, id) => {
  return await getCreatorsEventsFromApi(limit, offset, id);
};

const GetCreatorsStories = async (limit, offset, id) => {
  return await getCreatorsStoriesFromApi(limit, offset, id);
};

export {
  GetCreators,
  GetCreatorsComics,
  GetCreator,
  GetCreatorsSeries,
  GetCreatorsEvents,
  GetCreatorsStories,
};
