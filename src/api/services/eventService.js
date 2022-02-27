import Creator from '../../models/creator';
import Event from '../../models/event';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToCharacter} from './charactersService';
import {formatResultToComic} from './comicService';
import {formatResultToSeries} from './seriesService';
import {formatResultToStory} from './storiesService';

const formatResultToEvent = result => {
  var description =
    result.description != null
      ? result.description
      : 'There was no description provided for this Event.';
  var thumbnailUrl =
    result.thumbnail.path.includes('image_not_available') ||
    result.thumbnail.path.includes('4c002e0305708')
      ? true
      : result.thumbnail.path.replace('http', 'https') +
        '/portrait_incredible.' +
        result.thumbnail.extension;
  var start = String(result.start);
  var end = String(result.end);
  var currentEvent = new Event(
    result.id,
    result.title,
    description,
    String(result.start).length > 0
      ? start.replace(/-/g, '.').split(' ')[0]
      : null,
    String(result.end).length > 0 ? end.replace(/-/g, '.').split(' ')[0] : null,
    thumbnailUrl,
    null,
    result.characters !== undefined ? result.characters.available : 0,
    result.stories !== undefined ? result.stories.available : 0,
    result.comics !== undefined ? result.comics.available : 0,
    result.series !== undefined ? result.series.available : 0,
  );
  if (result.creators != undefined && result.creators.available > 0) {
    var creatorsOfEvent = [];
    result.creators.items.forEach(creator => {
      var parts = creator.resourceURI.split('/');
      var creatorObj = new Creator(
        parts[parts.length - 1],
        creator.name,
        creator.role,
      );
      creatorsOfEvent.push(creatorObj);
    });
    currentEvent.creators = creatorsOfEvent;
  }
  return currentEvent;
};

const getEventFromApi = async id => {
  var event;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('events/' + id + authString, {
      params: {eventId: id},
    });
    event = formatResultToEvent(response.data.data.results[0]);
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return event;
};

const getEventsFromApi = async (limit, offset, searchValue) => {
  var events = [];
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
    response = await marvelApi.get('events' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      events.push('false');
      return events;
    }
    response.data.data.results.forEach(result => {
      events.push(formatResultToEvent(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return events;
};

const getEventsCharactersFromApi = async (limit, offset, id) => {
  var eventsCharacters = [];
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
      'events/' + id + '/characters' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      eventsCharacters.push('false');
      return eventsCharacters;
    }
    response.data.data.results.forEach(result => {
      eventsCharacters.push(formatResultToCharacter(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return eventsCharacters;
};

const getEventsSeriesFromApi = async (limit, offset, id) => {
  var eventsSeries = [];
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
    response = await marvelApi.get('events/' + id + '/series' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      eventsSeries.push('false');
      return eventsSeries;
    }
    response.data.data.results.forEach(result => {
      eventsSeries.push(formatResultToSeries(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return eventsSeries;
};

const getEventsComicsFromApi = async (limit, offset, id) => {
  var eventsComics = [];
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
    response = await marvelApi.get('events/' + id + '/comics' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      eventsComics.push('false');
      return eventsComics;
    }
    response.data.data.results.forEach(result => {
      eventsComics.push(formatResultToComic(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return eventsComics;
};

const getEventsStoriesFromApi = async (limit, offset, id) => {
  var evnetsStories = [];
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
    response = await marvelApi.get('events/' + id + '/stories' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      evnetsStories.push('false');
      return evnetsStories;
    }
    response.data.data.results.forEach(result => {
      evnetsStories.push(formatResultToStory(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return evnetsStories;
};

export {
  getEventsFromApi,
  formatResultToEvent,
  getEventFromApi,
  getEventsCharactersFromApi,
  getEventsComicsFromApi,
  getEventsSeriesFromApi,
  getEventsStoriesFromApi,
};
