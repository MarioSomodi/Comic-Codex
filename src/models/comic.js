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
    format,
    seriesId,
    creators,
  ) {
    this.id = id;
    this.numOfCharacters = numOfCharacters;
    this.numOfCreators = numOfCreators;
    this.title = title;
    this.format = format;
    this.description = description;
    this.numOfEvents = numOfEvents;
    this.thumbnailUrl = thumbnailUrl;
    this.issueNumber = issueNumber;
    this.pageCount = pageCount;
    this.printPrice = printPrice;
    this.seriesName = seriesName;
    this.numOfStories = numOfStories;
    this.seriesId = seriesId;
    this.creators = creators;
  }
}
