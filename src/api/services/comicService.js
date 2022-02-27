import Comic from '../../models/comic';
import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToCharacter} from '../services/charactersService';
import {formatResultToEvent} from './eventService';
import {formatResultToStory} from './storiesService';

const formatResultToComic = result => {
  var textObj = result.textObjects.find(x => x.type === 'issue_solicit_text');
  var description =
    textObj === undefined
      ? result.description != null
        ? result.description
        : 'There was no description provided for this Comic.'
      : textObj.text;
  var priceObj = result.prices.find(x => x.type === 'printPrice');
  var printPrice =
    priceObj === undefined
      ? 'There was no price provided for this Comic.'
      : priceObj.price;
  var thumbnailUrl =
    result.thumbnail.path.includes('image_not_available') ||
    result.thumbnail.path.includes('4c002e0305708')
      ? true
      : result.thumbnail.path.replace('http', 'https') +
        '/portrait_incredible.' +
        result.thumbnail.extension;
  var currentComic = new Comic(
    result.id,
    result.characters.available,
    result.creators.available,
    result.title,
    description,
    result.events.available,
    thumbnailUrl,
    result.issueNumber,
    result.pageCount,
    printPrice,
    result.series.name,
    result.stories.available,
    result.format,
  );
  if (result.series != null) {
    var parts = result.series.resourceURI.split('/');
    currentComic.seriesId = parts[parts.length - 1];
  }
  if (result.creators.available > 0) {
    var creatorsOfComic = [];
    result.creators.items.forEach(creator => {
      var parts = creator.resourceURI.split('/');
      var creatorObj = new Creator(
        parts[parts.length - 1],
        creator.name,
        creator.role,
      );
      creatorsOfComic.push(creatorObj);
    });
    currentComic.creators = creatorsOfComic;
  }
  return currentComic;
};

const getComicFromApi = async id => {
  var comic;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('comics/' + id + authString, {
      params: {comicId: id},
    });
    comic = formatResultToComic(response.data.data.results[0]);
  } catch (error) {
    console.log({
      response: response,
      exception: error,
      authString: authString,
      calledRoute: 'comics/' + id + authString,
    });
  }
  return comic;
};

const getComicsFromApi = async (limit, offset, searchValue) => {
  var comics = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    formatType: 'comic',
    orderBy: '-modified',
    offset: offset,
  };
  if (searchValue != null && searchValue.trim().length > 0) {
    paramsObj.titleStartsWith = searchValue;
  }
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('comics' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      comics.push('false');
      return comics;
    }
    response.data.data.results.forEach(result => {
      comics.push(formatResultToComic(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return comics;
};

const getComicsCharactersFromApi = async (limit, offset, id) => {
  var comicsCharacters = [];
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
      'comics/' + id + '/characters' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      comicsCharacters.push('false');
      return comicsCharacters;
    }
    response.data.data.results.forEach(result => {
      comicsCharacters.push(formatResultToCharacter(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return comicsCharacters;
};

const getComicsEventsFromApi = async (limit, offset, id) => {
  var comicsEvents = [];
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
    response = await marvelApi.get('comics/' + id + '/events' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      comicsEvents.push('false');
      return comicsEvents;
    }
    response.data.data.results.forEach(result => {
      comicsEvents.push(formatResultToEvent(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return comicsEvents;
};

const getComicsStoriesFromApi = async (limit, offset, id) => {
  var comicsStories = [];
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
    response = await marvelApi.get('comics/' + id + '/stories' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      comicsStories.push('false');
      return comicsStories;
    }
    response.data.data.results.forEach(result => {
      comicsStories.push(formatResultToStory(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return comicsStories;
};

export {
  getComicsFromApi,
  formatResultToComic,
  getComicsCharactersFromApi,
  getComicFromApi,
  getComicsEventsFromApi,
  getComicsStoriesFromApi,
};
