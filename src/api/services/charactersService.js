import {marvelApi, getApiAuthString} from '../apiConfig';
import Character from '../../models/character';

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

const getCharactersFromApi = async (limit, offset) => {
  var characters = [];
  if (limit === null) limit = 24;
  var authString = await getApiAuthString();
  const response = await marvelApi.get('characters' + authString, {
    params: {
      limit: limit,
      orderBy: '-modified',
      offset: offset,
    },
  });
  response.data.data.results.forEach(result => {
    characters.push(formatResultToCharacter(result));
  });
  return characters;
};

export {getCharactersFromApi};
