import {
  getCharactersFromApi,
  getCharactersComicsFromApi,
  getCharacterFromApi,
} from '../services/charactersService';

const GetCharacters = async (limit, offset, searchValue) => {
  return await getCharactersFromApi(limit, offset, searchValue);
};

const GetCharacter = async id => {
  return await getCharacterFromApi(id);
};

const GetCharactersComics = async (limit, offset, id) => {
  return await getCharactersComicsFromApi(limit, offset, id);
};

export {GetCharacters, GetCharactersComics, GetCharacter};
