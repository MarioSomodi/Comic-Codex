import {marvelApi, getApiAuthString} from '../apiConfig';
import Character from '../../models/character';
import {formatResultToComic} from '../services/comicService';

const formatResultToCharacter = result => {
  var description =
    result.description.trim().length === 0
      ? 'There was no description provided for this Character.'
      : result.description;
  var thumbnailUrl =
    result.thumbnail.path.includes('image_not_available') ||
    result.thumbnail.path.includes('4c002e0305708')
      ? true
      : result.thumbnail.path.replace('http', 'https') +
        '/portrait_incredible.' +
        result.thumbnail.extension;
  var currentCharacter = new Character(
    result.id,
    result.comics.available,
    description,
    result.events.available,
    result.name,
    result.series.available,
    result.stories.available,
    thumbnailUrl,
  );
  return currentCharacter;
};

const getCharactersFromApi = async (limit, offset, searchValue) => {
  var characters = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  if (searchValue != null && searchValue.trim().length > 0) {
    paramsObj.nameStartsWith = searchValue;
  }
  var authString = await getApiAuthString();
  const response = await marvelApi.get('characters' + authString, {
    params: paramsObj,
  });
  if (response.data.data.count === 0) {
    characters.push('false');
    return characters;
  }
  response.data.data.results.forEach(result => {
    characters.push(formatResultToCharacter(result));
  });
  return characters;
};

const getCharactersComicsFromApi = async (limit, offset, id) => {
  var charactersComics = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  var authString = await getApiAuthString();
  const response = await marvelApi.get(
    'characters/' + id + '/comics' + authString,
    {
      params: paramsObj,
    },
  );
  if (response.data.data.count === 0) {
    charactersComics.push('false');
    return charactersComics;
  }
  response.data.data.results.forEach(result => {
    charactersComics.push(formatResultToComic(result));
  });
  return charactersComics;
};

export {
  getCharactersFromApi,
  getCharactersComicsFromApi,
  formatResultToCharacter,
};
