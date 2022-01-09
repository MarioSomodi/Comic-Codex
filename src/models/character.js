export default class Character {
  constructor(
    id,
    numOfComics,
    description,
    numOfEvents,
    name,
    numOfSeries,
    numOfStories,
    thumbnailUrl,
  ) {
    this.id = id;
    this.numOfComics = numOfComics;
    this.description = description;
    this.numOfEvents = numOfEvents;
    this.name = name;
    this.numOfSeries = numOfSeries;
    this.numOfStories = numOfStories;
    this.thumbnailUrl = thumbnailUrl;
  }
}
