import {
  getCharactersFromApi,
  getCharactersComicsFromApi,
  getCharacterFromApi,
  getCharactersSeriesFromApi,
  getCharactersEventsFromApi,
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

const GetCharactersSeries = async (limit, offset, id) => {
  return await getCharactersSeriesFromApi(limit, offset, id);
};

const GetCharactersEvents = async (limit, offset, id) => {
  return await getCharactersEventsFromApi(limit, offset, id);
};

export {
  GetCharacters,
  GetCharactersComics,
  GetCharacter,
  GetCharactersSeries,
  GetCharactersEvents,
};
