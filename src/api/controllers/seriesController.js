import {
  getSeriesFromApi,
  getSeriesSingleFromApi,
  getSeriesComicsFromApi,
  getSeriesCharactersFromApi,
  getSeriesEventsFromApi,
  getSeriesStoriesFromApi,
} from '../services/seriesService';

const GetSeries = async (limit, offset, searchValue) => {
  return await getSeriesFromApi(limit, offset, searchValue);
};

const GetSeriesSingle = async id => {
  return await getSeriesSingleFromApi(id);
};

const GetSeriesComics = async (limit, offset, id) => {
  return await getSeriesComicsFromApi(limit, offset, id);
};

const GetSeriesCharacters = async (limit, offset, id) => {
  return await getSeriesCharactersFromApi(limit, offset, id);
};

const GetSeriesEvents = async (limit, offset, id) => {
  return await getSeriesEventsFromApi(limit, offset, id);
};

const GetSeriesStories = async (limit, offset, id) => {
  return await getSeriesStoriesFromApi(limit, offset, id);
};

export {
  GetSeries,
  GetSeriesSingle,
  GetSeriesComics,
  GetSeriesCharacters,
  GetSeriesEvents,
  GetSeriesStories,
};
