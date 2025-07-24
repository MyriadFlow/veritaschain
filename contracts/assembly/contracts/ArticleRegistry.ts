import { Context, generateEvent, Storage } from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";

// Article status enum
enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  DISPUTED = 2,
  VERIFIED = 3,
  ARCHIVED = 4,
}

// Monetization model enum
enum MonetizationModel {
  FREE = 0,
  PAID = 1,
  NFT = 2,
  SUBSCRIPTION = 3,
}

// Article structure - simplified for basic functionality
export class Article {
  constructor(
    public id: string = "",
    public authorAddress: string = "",
    public title: string = "",
    public description: string = "",
    public ipfsContentHash: string = "",
    public publicationTimestamp: string = "",
    public lastUpdatedTimestamp: string = "",
    public currentVersionHash: string = "",
    public previousVersionHash: string = "",
    public status: ArticleStatus = ArticleStatus.DRAFT,
    public monetizationModel: MonetizationModel = MonetizationModel.FREE,
    public price: string = "0", // in nanoMAS as string
    public totalViews: string = "0",
    public totalUpvotes: string = "0",
    public totalDownvotes: string = "0"
  ) {}
}

/**
 * Publishes a new article to the registry
 * @param binaryArgs - Serialized arguments containing title, description, ipfsHash
 */
export function publishArticle(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const title = args.nextString().unwrap();
  const description = args.nextString().unwrap();
  const ipfsHash = args.nextString().unwrap();

  const caller = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Generate unique article ID using timestamp and caller
  const articleId = `${caller}_${currentTime}`;

  // Create article object
  const article = new Article(
    articleId,
    caller,
    title,
    description,
    ipfsHash,
    currentTime,
    currentTime,
    ipfsHash, // current version hash is the IPFS hash
    "", // no previous version for new articles
    ArticleStatus.PUBLISHED,
    MonetizationModel.FREE,
    "0",
    "0",
    "0",
    "0"
  );

  // Store article metadata
  const articleKey = "ARTICLE_" + articleId;
  const articleData = `${article.id}|${article.authorAddress}|${article.title}|${article.description}|${article.ipfsContentHash}|${article.publicationTimestamp}|${article.lastUpdatedTimestamp}|${article.currentVersionHash}|${article.previousVersionHash}|${article.status}|${article.monetizationModel}|${article.price}|${article.totalViews}|${article.totalUpvotes}|${article.totalDownvotes}`;

  Storage.set(articleKey, articleData);

  // Update author's article count
  const authorCountKey = "AUTHOR_COUNT_" + caller;
  const currentCount = Storage.has(authorCountKey)
    ? Storage.get(authorCountKey)
    : "0";
  const newCount = (parseInt(currentCount) + 1).toString();
  Storage.set(authorCountKey, newCount);

  // Add to author's article list
  const authorArticlesKey = "AUTHOR_ARTICLES_" + caller;
  const currentArticles = Storage.has(authorArticlesKey)
    ? Storage.get(authorArticlesKey)
    : "";
  const newArticles =
    currentArticles.length > 0 ? currentArticles + "," + articleId : articleId;
  Storage.set(authorArticlesKey, newArticles);

  generateEvent(`Article published: ${articleId} by ${caller}`);
}

/**
 * Retrieves an article by ID
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function getArticle(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const articleId = args.nextString().unwrap();

  const articleKey = "ARTICLE_" + articleId;

  if (!Storage.has(articleKey)) {
    const result = new Args();
    result.add("Article not found");
    return result.serialize();
  }

  const articleData = Storage.get(articleKey);
  const result = new Args();
  result.add(articleData);
  return result.serialize();
}

/**
 * Gets the number of articles by an author
 * @param binaryArgs - Serialized arguments containing author address
 */
export function getAuthorArticleCount(
  binaryArgs: StaticArray<u8>
): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const authorAddress = args.nextString().unwrap();

  const authorCountKey = "AUTHOR_COUNT_" + authorAddress;
  const count = Storage.has(authorCountKey) ? Storage.get(authorCountKey) : "0";

  const result = new Args();
  result.add(count);
  return result.serialize();
}

/**
 * Gets articles by author
 * @param binaryArgs - Serialized arguments containing author address
 */
export function getArticlesByAuthor(
  binaryArgs: StaticArray<u8>
): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const authorAddress = args.nextString().unwrap();

  const authorArticlesKey = "AUTHOR_ARTICLES_" + authorAddress;
  const articles = Storage.has(authorArticlesKey)
    ? Storage.get(authorArticlesKey)
    : "";

  const result = new Args();
  result.add(articles);
  return result.serialize();
}

/**
 * Updates article view count
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function incrementViewCount(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleId = args.nextString().unwrap();

  const viewKey = "VIEWS_" + articleId;
  const currentViews = Storage.has(viewKey) ? Storage.get(viewKey) : "0";
  const newViews = (parseInt(currentViews) + 1).toString();
  Storage.set(viewKey, newViews);

  generateEvent(`View count updated for article: ${articleId}`);
}
