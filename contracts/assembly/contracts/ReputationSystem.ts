
import { call, Context, generateEvent, Storage } from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";

// Storage keys
const REPUTATION_PREFIX = "REPUTATION_";
const VOTE_PREFIX = "VOTE_";
const ARTICLE_VOTES_PREFIX = "ARTICLE_VOTES_";
const STAKE_PREFIX = "STAKE_";
const DISPUTE_PREFIX = "DISPUTE_";
const JOURNALIST_STATS_PREFIX = "JOURNALIST_STATS_";

/**
 * Records an upvote for content
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function upvoteContent(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleIdStr = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
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
  const currentRep = Storage.has(voterRepKey)
    ? Storage.get(voterRepKey)
    : "100";
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
  const articleIdStr = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
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
  const currentDownvotes = Storage.has(downvoteKey)
    ? Storage.get(downvoteKey)
    : "0";
  const newDownvotes = (parseInt(currentDownvotes) + 1).toString();
  Storage.set(downvoteKey, newDownvotes);

  generateEvent(`Downvote recorded: Article ${articleIdStr} by ${voter}`);
}

/**
 * Get user reputation score
 * @param binaryArgs - Serialized arguments containing user address
 */
export function getUserReputation(
  binaryArgs: StaticArray<u8>
): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const userAddress = args
    .nextString()
    .expect("User address argument is missing or invalid");
  const reputationKey = REPUTATION_PREFIX + userAddress;
  const reputation = Storage.has(reputationKey)
    ? Storage.get(reputationKey)
    : "100";

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
  const articleIdStr = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
  const upvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_upvotes";
  const downvoteKey = ARTICLE_VOTES_PREFIX + articleIdStr + "_downvotes";

  const upvotes = Storage.has(upvoteKey) ? Storage.get(upvoteKey) : "0";
  const downvotes = Storage.has(downvoteKey) ? Storage.get(downvoteKey) : "0";

  const result = new Args();
  result.add(upvotes);
  result.add(downvotes);
  return result.serialize();
}

/**
 * Allows fact-checkers to stake tokens for verification
 * @param binaryArgs - Serialized arguments containing articleId, isAccurate, and stakeAmount
 */
export function stakeForVerification(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleId = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
  const isAccurate = args
    .nextBool()
    .expect("Accuracy assessment argument is missing or invalid");
  const stakeAmount = args
    .nextU64()
    .expect("Stake amount argument is missing or invalid");

  const staker = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Check if user has already staked on this article
  const stakeKey = STAKE_PREFIX + staker + "_" + articleId;
  if (Storage.has(stakeKey)) {
    throw new Error("User has already staked on this article");
  }

  // Record the stake
  const stakeData = `${
    isAccurate ? "accurate" : "inaccurate"
  }|${stakeAmount}|${currentTime}`;
  Storage.set(stakeKey, stakeData);

  // Update staker's reputation for participating
  const stakerRepKey = REPUTATION_PREFIX + staker;
  const currentRep = Storage.has(stakerRepKey)
    ? Storage.get(stakerRepKey)
    : "100";
  const newRep = (parseInt(currentRep) + 2).toString(); // +2 for staking
  Storage.set(stakerRepKey, newRep);

  generateEvent(
    `Stake recorded: ${staker} staked ${stakeAmount} on article ${articleId} as ${
      isAccurate ? "accurate" : "inaccurate"
    }`
  );
}

/**
 * Get comprehensive journalist statistics
 * @param binaryArgs - Serialized arguments containing journalist address
 */
export function getJournalistStats(
  binaryArgs: StaticArray<u8>
): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");

  // Get reputation - new journalists start with 50/100 reputation
  const reputationKey = REPUTATION_PREFIX + journalistAddress;
  const reputation = Storage.has(reputationKey)
    ? Storage.get(reputationKey)
    : "50";

  // Get article count (from ArticleRegistry)
  const articleCountKey = "AUTHOR_COUNT_" + journalistAddress;
  const articlesPublished = Storage.has(articleCountKey)
    ? Storage.get(articleCountKey)
    : "0";

  // Get earnings (from PaymentGateway)
  const earningsKey = "EARNINGS_" + journalistAddress;
  const totalEarnings = Storage.has(earningsKey)
    ? Storage.get(earningsKey)
    : "0";

  // Calculate verification rate - new journalists start with lower rate
  const statsKey = JOURNALIST_STATS_PREFIX + journalistAddress;
  const verificationRate = Storage.has(statsKey) ? Storage.get(statsKey) : "0"; // New journalists have no verification history

  const result = new Args();
  result.add(reputation); // reputation score
  result.add(articlesPublished); // total articles published
  result.add(totalEarnings); // total earnings in MAS
  result.add("0"); // followers (placeholder)
  result.add(verificationRate); // verification success rate
  return result.serialize();
}

/**
 * Resolve a dispute after community voting
 * @param binaryArgs - Serialized arguments containing articleId, disputeId, and truthRevealed
 */
export function resolveDispute(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleId = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
  const disputeId = args
    .nextString()
    .expect("Dispute ID argument is missing or invalid");
  const truthRevealed = args
    .nextBool()
    .expect("Truth revealed argument is missing or invalid");

  const resolver = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Record dispute resolution
  const disputeKey = DISPUTE_PREFIX + disputeId;
  const resolutionData = `${articleId}|${truthRevealed}|${resolver}|${currentTime}`;
  Storage.set(disputeKey, resolutionData);

  // Update reputation based on resolution
  // This would need more complex logic in a full implementation
  generateEvent(
    `Dispute ${disputeId} resolved for article ${articleId}: truth revealed = ${truthRevealed}`
  );
}
