import Story from '../../models/story';
import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToCharacter} from './charactersService';
import {formatResultToComic} from './comicService';
import {formatResultToEvent} from './eventService';
import {formatResultToSeries} from './seriesService';

const formatResultToStory = result => {
  var description =
    result.description.length > 0
      ? result.description
      : 'There was no description provided for this Story.';
  var currentStory = new Story(
    result.id,
    result.title,
    description,
    result.type,
    null,
    result.characters.available,
    result.series.available,
    result.comics.available,
    result.events.available,
  );
  if (result.creators.available > 0) {
    var creatorsOfStory = [];
    result.creators.items.forEach(creator => {
      var parts = creator.resourceURI.split('/');
      var creatorObj = new Creator(
        parts[parts.length - 1],
        creator.name,
        creator.role,
      );
      creatorsOfStory.push(creatorObj);
    });
    currentStory.creators = creatorsOfStory;
  }
  return currentStory;
};

const getStoryFromApi = async id => {
  var story;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('stories/' + id + authString, {
      params: {seriesId: id},
    });
    story = formatResultToStory(response.data.data.results[0]);
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return story;
};

const getStoriesFromApi = async (limit, offset, searchValue) => {
  var stories = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  if (searchValue != null && searchValue.trim().length > 0) {
    paramsObj.titleStartsWith = searchValue;
  }
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('stories' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      stories.push('false');
      return stories;
    }
    response.data.data.results.forEach(result => {
      stories.push(formatResultToStory(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return stories;
};

const getStoriesCharactersFromApi = async (limit, offset, id) => {
  var storiesCharcters = [];
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
      'stories/' + id + '/characters' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      storiesCharcters.push('false');
      return storiesCharcters;
    }
    response.data.data.results.forEach(result => {
      storiesCharcters.push(formatResultToCharacter(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return storiesCharcters;
};

const getStoriesComicsFromApi = async (limit, offset, id) => {
  var storiesComics = [];
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
    response = await marvelApi.get('stories/' + id + '/comics' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      storiesComics.push('false');
      return storiesComics;
    }
    response.data.data.results.forEach(result => {
      storiesComics.push(formatResultToComic(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return storiesComics;
};

const getStoriesEventsFromApi = async (limit, offset, id) => {
  var storiesEvents = [];
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
    response = await marvelApi.get('stories/' + id + '/events' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      storiesEvents.push('false');
      return storiesEvents;
    }
    response.data.data.results.forEach(result => {
      storiesEvents.push(formatResultToEvent(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return storiesEvents;
};

const getStoriesSeriesFromApi = async (limit, offset, id) => {
  var storiesSeries = [];
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
    response = await marvelApi.get('stories/' + id + '/series' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      storiesSeries.push('false');
      return storiesSeries;
    }
    response.data.data.results.forEach(result => {
      storiesSeries.push(formatResultToSeries(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return storiesSeries;
};

export {
  getStoriesFromApi,
  formatResultToStory,
  getStoryFromApi,
  getStoriesCharactersFromApi,
  getStoriesComicsFromApi,
  getStoriesEventsFromApi,
  getStoriesSeriesFromApi,
};
