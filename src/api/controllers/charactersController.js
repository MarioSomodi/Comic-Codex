import {
  getCharactersFromApi,
  getCharactersComicsFromApi,
} from '../services/charactersService';

const GetCharacters = async (limit, offset, searchValue) => {
  return await getCharactersFromApi(limit, offset, searchValue);
};

const GetCharactersComics = async (limit, offset, id) => {
  return await getCharactersComicsFromApi(limit, offset, id);
};

export {GetCharacters, GetCharactersComics};
