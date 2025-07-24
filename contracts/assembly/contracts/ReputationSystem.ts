// Import using the proper AS SDK approach
import { call, Context, generateEvent, Storage } from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";

// Storage keys
const REPUTATION_PREFIX = "REPUTATION_";
const VOTE_PREFIX = "VOTE_";
const ARTICLE_VOTES_PREFIX = "ARTICLE_VOTES_";

/**
 * Records an upvote for content
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function upvoteContent(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleIdStr = args.nextString();
  const voter = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Check if user has already voted on this article
  const voteKey = VOTE_PREFIX + voter + "_" + articleIdStr;
  if (Storage.has(voteKey)) {
    throw new Error("User has already voted on this article");
  }

  // Record the vote
  Storage.set(voteKey, "upvote");
  Storage.set(voteKey + "_timestamp", currentTime);

  // Update article vote count
  const upvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_upvotes";
  const currentUpvotes = Storage.has(upvoteKey) ? Storage.get(upvoteKey) : "0";
  const newUpvotes = (parseInt(currentUpvotes) + 1).toString();
  Storage.set(upvoteKey, newUpvotes);

  // Update voter's reputation
  const voterRepKey = REPUTATION_PREFIX + voter;
  const currentRep = Storage.has(voterRepKey) ? Storage.get(voterRepKey) : "100";
  const newRep = (parseInt(currentRep) + 1).toString(); // +1 for voting
  Storage.set(voterRepKey, newRep);

  generateEvent(`Upvote recorded: Article ${articleIdStr} by ${voter}`);
}

/**
 * Records a downvote for content
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function downvoteContent(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleIdStr = args.nextString();
  const voter = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Check if user has already voted on this article
  const voteKey = VOTE_PREFIX + voter + "_" + articleIdStr;
  if (Storage.has(voteKey)) {
    throw new Error("User has already voted on this article");
  }

  // Record the vote
  Storage.set(voteKey, "downvote");
  Storage.set(voteKey + "_timestamp", currentTime);

  // Update article vote count
  const downvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_downvotes";
  const currentDownvotes = Storage.has(downvoteKey) ? Storage.get(downvoteKey) : "0";
  const newDownvotes = (parseInt(currentDownvotes) + 1).toString();
  Storage.set(downvoteKey, newDownvotes);

  generateEvent(`Downvote recorded: Article ${articleIdStr} by ${voter}`);
}

/**
 * Get user reputation score
 * @param binaryArgs - Serialized arguments containing user address
 */
export function getUserReputation(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const userAddress = args.nextString();
  const reputationKey = REPUTATION_PREFIX + userAddress;
  const reputation = Storage.has(reputationKey) ? Storage.get(reputationKey) : "100";
  
  const result = new Args();
  result.add(reputation);
  return result.serialize();
}

/**
 * Get article vote counts
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function getArticleVotes(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const articleIdStr = args.nextString();
  const upvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_upvotes";
  const downvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_downvotes";

  const upvotes = Storage.has(upvoteKey) ? Storage.get(upvoteKey) : "0";
  const downvotes = Storage.has(downvoteKey) ? Storage.get(downvoteKey) : "0";

  const result = new Args();
  result.add(upvotes);
  result.add(downvotes);
  return result.serialize();
}
