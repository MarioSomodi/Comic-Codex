export default class Creator {
  constructor(
    id,
    name,
    role,
    numOfComics,
    numOfSeries,
    numOfStories,
    numOfEvents,
  ) {
    this.id = id;
    this.numOfComics = numOfComics;
    this.numOfEvents = numOfEvents;
    this.name = name;
    this.role = role;
    this.numOfSeries = numOfSeries;
    this.numOfStories = numOfStories;
  }
}
