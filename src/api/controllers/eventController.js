import {
  getEventsFromApi,
  getEventFromApi,
  getEventsCharactersFromApi,
  getEventsComicsFromApi,
  getEventsSeriesFromApi,
} from '../services/eventService';

const GetEvents = async (limit, offset, searchValue) => {
  return await getEventsFromApi(limit, offset, searchValue);
};

const GetEvent = async id => {
  return await getEventFromApi(id);
};

const GetEventsCharacters = async (limit, offset, id) => {
  return await getEventsCharactersFromApi(limit, offset, id);
};

const GetEventsComics = async (limit, offset, id) => {
  return await getEventsComicsFromApi(limit, offset, id);
};

const GetEventsSeries = async (limit, offset, id) => {
  return await getEventsSeriesFromApi(limit, offset, id);
};

export {
  GetEvents,
  GetEvent,
  GetEventsCharacters,
  GetEventsComics,
  GetEventsSeries,
};
