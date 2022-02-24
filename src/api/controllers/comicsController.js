import {
  getComicsFromApi,
  getComicsCharactersFromApi,
  getComicFromApi,
  getComicsEventsFromApi,
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

export {GetComics, GetComicsCharacters, GetComic, GetComicsEvents};
