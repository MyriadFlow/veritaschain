import { Context, generateEvent, Storage } from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";

// Storage keys
const BALANCE_PREFIX = "BALANCE_";
const PAYMENT_PREFIX = "PAYMENT_";
const SUBSCRIPTION_PREFIX = "SUBSCRIPTION_";
const EARNINGS_PREFIX = "EARNINGS_";

/**
 * Processes payment for article access
 * @param binaryArgs - Serialized arguments containing articleId, journalist address, and amount
 */
export function payForArticle(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const articleId = args
    .nextString()
    .expect("Article ID argument is missing or invalid");
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");
  const amount = args.nextU64().expect("Amount argument is missing or invalid");

  const reader = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Record the payment
  const paymentKey = PAYMENT_PREFIX + reader + "_" + articleId;
  Storage.set(paymentKey, "paid");
  Storage.set(paymentKey + "_amount", amount.toString());
  Storage.set(paymentKey + "_timestamp", currentTime);

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey)
    ? Storage.get(earningsKey)
    : "0";
  const currentEarningsNum = U64.parseInt(currentEarnings);
  const newEarnings = (currentEarningsNum + amount).toString();
  Storage.set(earningsKey, newEarnings);

  generateEvent(
    `Payment processed: ${amount} from ${reader} for article ${articleId} to ${journalistAddress}`
  );
}

/**
 * Tips a journalist
 * @param binaryArgs - Serialized arguments containing journalist address and tip amount
 */
export function tipJournalist(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");
  const tipAmount = args
    .nextU64()
    .expect("Tip amount argument is missing or invalid");

  const tipper = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Record the tip
  const tipKey = "TIP_" + tipper + "_" + journalistAddress + "_" + currentTime;
  Storage.set(tipKey, tipAmount.toString());

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey)
    ? Storage.get(earningsKey)
    : "0";
  const currentEarningsNum = U64.parseInt(currentEarnings);
  const newEarnings = (currentEarningsNum + tipAmount).toString();
  Storage.set(earningsKey, newEarnings);

  generateEvent(
    `Tip sent: ${tipAmount} from ${tipper} to ${journalistAddress}`
  );
}

/**
 * Processes subscription payment
 * @param binaryArgs - Serialized arguments containing journalist address and subscription duration
 */
export function processSubscription(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");
  const subscriptionFee = args
    .nextU64()
    .expect("Subscription fee argument is missing or invalid");
  const duration = args
    .nextU64()
    .expect("Duration argument is missing or invalid"); // Duration in days

  const subscriber = Context.caller().toString();
  const currentTime = Context.timestamp();
  const expirationTime = currentTime + duration * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  // Record the subscription
  const subscriptionKey =
    SUBSCRIPTION_PREFIX + subscriber + "_" + journalistAddress;
  Storage.set(subscriptionKey, expirationTime.toString());

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey)
    ? Storage.get(earningsKey)
    : "0";
  const currentEarningsNum = U64.parseInt(currentEarnings);
  const newEarnings = (currentEarningsNum + subscriptionFee).toString();
  Storage.set(earningsKey, newEarnings);

  generateEvent(
    `Subscription processed: ${subscriber} subscribed to ${journalistAddress} for ${duration} days`
  );
}

/**
 * Gets journalist earnings
 * @param binaryArgs - Serialized arguments containing journalist address
 */
export function getEarnings(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");

  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const earnings = Storage.has(earningsKey) ? Storage.get(earningsKey) : "0";

  const result = new Args();
  result.add(earnings);
  return result.serialize();
}

/**
 * Withdraws earnings for a journalist
 * @param binaryArgs - Serialized arguments containing withdrawal amount
 */
export function withdrawEarnings(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const withdrawAmount = args
    .nextU64()
    .expect("Withdraw amount argument is missing or invalid");

  const journalist = Context.caller().toString();
  const earningsKey = EARNINGS_PREFIX + journalist;

  if (!Storage.has(earningsKey)) {
    throw new Error("No earnings found for journalist");
  }

  const currentEarningsStr = Storage.get(earningsKey);
  const currentEarnings = U64.parseInt(currentEarningsStr);

  if (currentEarnings < withdrawAmount) {
    throw new Error("Insufficient earnings for withdrawal");
  }

  const newEarnings = (currentEarnings - withdrawAmount).toString();
  Storage.set(earningsKey, newEarnings);

  generateEvent(`Withdrawal: ${journalist} withdrew ${withdrawAmount}`);
}

/**
 * Checks if a user has access to an article
 * @param binaryArgs - Serialized arguments containing reader address and articleId
 */
export function hasArticleAccess(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const readerAddress = args
    .nextString()
    .expect("Reader address argument is missing or invalid");
  const articleId = args
    .nextString()
    .expect("Article ID argument is missing or invalid");

  const paymentKey = PAYMENT_PREFIX + readerAddress + "_" + articleId;
  const hasAccess = Storage.has(paymentKey);

  const result = new Args();
  result.add(hasAccess ? "true" : "false");
  return result.serialize();
}

/**
 * Check if a user has an active subscription to a journalist
 * @param binaryArgs - Serialized arguments containing subscriber and journalist addresses
 */
export function hasActiveSubscription(
  binaryArgs: StaticArray<u8>
): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const subscriberAddress = args
    .nextString()
    .expect("Subscriber address argument is missing or invalid");
  const journalistAddress = args
    .nextString()
    .expect("Journalist address argument is missing or invalid");

  const subscriptionKey =
    SUBSCRIPTION_PREFIX + subscriberAddress + "_" + journalistAddress;

  if (!Storage.has(subscriptionKey)) {
    const result = new Args();
    result.add("false");
    return result.serialize();
  }

  const expirationTime = U64.parseInt(Storage.get(subscriptionKey));
  const currentTime = Context.timestamp();
  const isActive = currentTime < expirationTime;

  const result = new Args();
  result.add(isActive ? "true" : "false");
  return result.serialize();
}

/**
 * Get article price and monetization model
 * @param binaryArgs - Serialized arguments containing articleId
 */
export function getArticlePrice(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const articleId = args
    .nextString()
    .expect("Article ID argument is missing or invalid");

  const articleKey = "ARTICLE_" + articleId;

  if (!Storage.has(articleKey)) {
    throw new Error("Article not found");
  }

  const articleData = Storage.get(articleKey);
  const parts = articleData.split("|");

  const monetizationModel = parts[10]; // monetization model
  const price = parts[11]; // price

  const result = new Args();
  result.add(monetizationModel);
  result.add(price);
  return result.serialize();
}
