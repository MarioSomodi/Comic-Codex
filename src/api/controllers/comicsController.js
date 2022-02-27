import {
  getComicsFromApi,
  getComicsCharactersFromApi,
  getComicFromApi,
  getComicsEventsFromApi,
  getComicsStoriesFromApi,
} from '../services/comicService';

const GetComics = async (limit, offset, searchValue) => {
  return await getComicsFromApi(limit, offset, searchValue);
};

const GetComic = async id => {
  return await getComicFromApi(id);
};

const GetComicsCharacters = async (limit, offset, id) => {
  return await getComicsCharactersFromApi(limit, offset, id);
};

const GetComicsEvents = async (limit, offset, id) => {
  return await getComicsEventsFromApi(limit, offset, id);
};

const GetComicsStories = async (limit, offset, id) => {
  return await getComicsStoriesFromApi(limit, offset, id);
};

export {
  GetComics,
  GetComicsCharacters,
  GetComic,
  GetComicsEvents,
  GetComicsStories,
};
