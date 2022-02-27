import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToComic} from '../services/comicService';
import {formatResultToSeries} from '../services/seriesService';
import {formatResultToEvent} from './eventService';
import {formatResultToStory} from './storiesService';

const formatResultToCreator = result => {
  var currentCreator = new Creator(
    result.id,
    result.fullName,
    null,
    result.comics.available,
    result.series.available,
    result.stories.available,
    result.events.available,
  );
  return currentCreator;
};

const getCreatorsFromApi = async (limit, offset, searchValue) => {
  var creators = [];
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
    response = await marvelApi.get('creators' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      creators.push('false');
      return creators;
    }
    response.data.data.results.forEach(result => {
      creators.push(formatResultToCreator(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creators;
};

const getCreatorFromApi = async id => {
  var creator;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('creators/' + id + authString, {
      params: {creatorId: id},
    });
    creator = formatResultToCreator(response.data.data.results[0]);
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creator;
};

const getCreatorsComicsFromApi = async (limit, offset, id) => {
  var creatorComics = [];
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
    response = await marvelApi.get('creators/' + id + '/comics' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      creatorComics.push('false');
      return creatorComics;
    }
    response.data.data.results.forEach(result => {
      creatorComics.push(formatResultToComic(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creatorComics;
};

const getCreatorsSeriesFromApi = async (limit, offset, id) => {
  var creatorSeries = [];
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
    response = await marvelApi.get('creators/' + id + '/series' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      creatorSeries.push('false');
      return creatorSeries;
    }
    response.data.data.results.forEach(result => {
      creatorSeries.push(formatResultToSeries(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creatorSeries;
};

const getCreatorsEventsFromApi = async (limit, offset, id) => {
  var creatorsEvents = [];
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
    response = await marvelApi.get('creators/' + id + '/events' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      creatorsEvents.push('false');
      return creatorsEvents;
    }
    response.data.data.results.forEach(result => {
      creatorsEvents.push(formatResultToEvent(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creatorsEvents;
};

const getCreatorsStoriesFromApi = async (limit, offset, id) => {
  var creatorsStories = [];
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
    response = await marvelApi.get('creators/' + id + '/stories' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      creatorsStories.push('false');
      return creatorsStories;
    }
    response.data.data.results.forEach(result => {
      creatorsStories.push(formatResultToStory(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return creatorsStories;
};

export {
  getCreatorsFromApi,
  getCreatorsComicsFromApi,
  getCreatorFromApi,
  getCreatorsSeriesFromApi,
  getCreatorsEventsFromApi,
  getCreatorsStoriesFromApi,
};
