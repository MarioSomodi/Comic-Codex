import {
  getComicsFromApi,
  getComicsCharactersFromApi,
} from '../services/comicService';

const GetComics = async (limit, offset, searchValue) => {
  return await getComicsFromApi(limit, offset, searchValue);
};

const GetComicsCharacters = async (limit, offset, id) => {
  return await getComicsCharactersFromApi(limit, offset, id);
};

export {GetComics, GetComicsCharacters};
