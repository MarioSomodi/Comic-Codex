import {marvelApi, getApiAuthString} from '../apiConfig';
import Character from '../../models/character';
import {formatResultToComic} from '../services/comicService';
import {formatResultToSeries} from '../services/seriesService';
import {formatResultToEvent} from './eventService';
import {formatResultToStory} from './storiesService';

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
  var response = null;
  try {
    response = await marvelApi.get('characters' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      characters.push('false');
      return characters;
    }
    response.data.data.results.forEach(result => {
      characters.push(formatResultToCharacter(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return characters;
};

const getCharacterFromApi = async id => {
  var character;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('characters/' + id + authString, {
      params: {characterId: id},
    });
    character = formatResultToCharacter(response.data.data.results[0]);
  } catch (error) {
    console.log({response: response, exception: error});
  }

  return character;
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
  var response = null;
  try {
    response = await marvelApi.get(
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
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return charactersComics;
};

const getCharactersSeriesFromApi = async (limit, offset, id) => {
  var charactersSeries = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get(
      'characters/' + id + '/series' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      charactersSeries.push('false');
      return charactersSeries;
    }
    response.data.data.results.forEach(result => {
      charactersSeries.push(formatResultToSeries(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return charactersSeries;
};

const getCharactersEventsFromApi = async (limit, offset, id) => {
  var charactersEvents = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get(
      'characters/' + id + '/events' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      charactersEvents.push('false');
      return charactersEvents;
    }
    response.data.data.results.forEach(result => {
      charactersEvents.push(formatResultToEvent(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return charactersEvents;
};

const getCharactersStoriesFromApi = async (limit, offset, id) => {
  var charactersStories = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get(
      'characters/' + id + '/stories' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      charactersStories.push('false');
      return charactersStories;
    }
    response.data.data.results.forEach(result => {
      charactersStories.push(formatResultToStory(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return charactersStories;
};

export {
  getCharactersFromApi,
  getCharactersComicsFromApi,
  formatResultToCharacter,
  getCharacterFromApi,
  getCharactersSeriesFromApi,
  getCharactersEventsFromApi,
  getCharactersStoriesFromApi,
};
