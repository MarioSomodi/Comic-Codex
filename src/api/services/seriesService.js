import Series from '../../models/series';
import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToComic} from '../services/comicService';
import {formatResultToCharacter} from '../services/charactersService';

const formatResultToSeries = result => {
  var description =
    result.description != null
      ? result.description
      : 'There was no description provided for this Series.';
  var thumbnailUrl =
    result.thumbnail.path.includes('image_not_available') ||
    result.thumbnail.path.includes('4c002e0305708')
      ? true
      : result.thumbnail.path.replace('http', 'https') +
        '/portrait_incredible.' +
        result.thumbnail.extension;
  var currentSeries = new Series(
    result.id,
    result.title,
    description,
    String(result.startYear).length > 0 ? result.startYear : null,
    String(result.endYear).length > 0 ? result.endYear : null,
    result.rating.length > 0 ? result.rating : null,
    result.type.length > 0 ? result.type : null,
    thumbnailUrl,
    null,
    result.characters.available,
    result.stories.available,
    result.comics.available,
    result.events.available,
  );
  if (result.creators.available > 0) {
    var creatorsOfSeries = [];
    result.creators.items.forEach(creator => {
      var parts = creator.resourceURI.split('/');
      var creatorObj = new Creator(
        parts[parts.length - 1],
        creator.name,
        creator.role,
      );
      creatorsOfSeries.push(creatorObj);
    });
    currentSeries.creators = creatorsOfSeries;
  }
  return currentSeries;
};

const getSeriesSingleFromApi = async id => {
  var series;
  var authString = await getApiAuthString();
  var response = null;
  try {
    response = await marvelApi.get('series/' + id + authString, {
      params: {seriesId: id},
    });
    series = formatResultToSeries(response.data.data.results[0]);
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return series;
};

const getSeriesFromApi = async (limit, offset, searchValue) => {
  var series = [];
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
    response = await marvelApi.get('series' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      series.push('false');
      return series;
    }
    response.data.data.results.forEach(result => {
      series.push(formatResultToSeries(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return series;
};

const getSeriesComicsFromApi = async (limit, offset, id) => {
  var seriesComics = [];
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
    response = await marvelApi.get('series/' + id + '/comics' + authString, {
      params: paramsObj,
    });
    if (response.data.data.count === 0) {
      seriesComics.push('false');
      return seriesComics;
    }
    response.data.data.results.forEach(result => {
      seriesComics.push(formatResultToComic(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return seriesComics;
};

const getSeriesCharactersFromApi = async (limit, offset, id) => {
  var seriesCharacters = [];
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
      'series/' + id + '/characters' + authString,
      {
        params: paramsObj,
      },
    );
    if (response.data.data.count === 0) {
      seriesCharacters.push('false');
      return seriesCharacters;
    }
    response.data.data.results.forEach(result => {
      seriesCharacters.push(formatResultToCharacter(result));
    });
  } catch (error) {
    console.log({response: response, exception: error});
  }
  return seriesCharacters;
};

export {
  getSeriesFromApi,
  formatResultToSeries,
  getSeriesSingleFromApi,
  getSeriesComicsFromApi,
  getSeriesCharactersFromApi,
};
