export default class Comic {
  constructor(
    id,
    numOfCharacters,
    numOfCreators,
    title,
    description,
    numOfEvents,
    thumbnailUrl,
    issueNumber,
    pageCount,
    printPrice,
    seriesName,
    numOfStories,
  ) {
    this.id = id;
    this.numOfCharacters = numOfCharacters;
    this.numOfCreators = numOfCreators;
    this.title = title;
    this.description = description;
    this.numOfEvents = numOfEvents;
    this.thumbnailUrl = thumbnailUrl;
    this.issueNumber = issueNumber;
    this.pageCount = pageCount;
    this.printPrice = printPrice;
    this.seriesName = seriesName;
    this.numOfStories = numOfStories;
  }
}
