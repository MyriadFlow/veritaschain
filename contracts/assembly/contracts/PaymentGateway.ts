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
  const articleId = args.nextString().unwrap();
  const journalistAddress = args.nextString().unwrap();
  const amount = args.nextU64().unwrap();

  const reader = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Record the payment
  const paymentKey = PAYMENT_PREFIX + reader + "_" + articleId;
  Storage.set(paymentKey, "paid");
  Storage.set(paymentKey + "_amount", amount.toString());
  Storage.set(paymentKey + "_timestamp", currentTime);

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey) ? Storage.get(earningsKey) : "0";
  const newEarnings = (parseInt(currentEarnings) + amount).toString();
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
  const journalistAddress = args.nextString().unwrap();
  const tipAmount = args.nextU64().unwrap();

  const tipper = Context.caller().toString();
  const currentTime = Context.timestamp().toString();

  // Record the tip
  const tipKey = "TIP_" + tipper + "_" + journalistAddress + "_" + currentTime;
  Storage.set(tipKey, tipAmount.toString());

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey) ? Storage.get(earningsKey) : "0";
  const newEarnings = (parseInt(currentEarnings) + tipAmount).toString();
  Storage.set(earningsKey, newEarnings);

  generateEvent(`Tip sent: ${tipAmount} from ${tipper} to ${journalistAddress}`);
}

/**
 * Processes subscription payment
 * @param binaryArgs - Serialized arguments containing journalist address and subscription duration
 */
export function processSubscription(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const journalistAddress = args.nextString().unwrap();
  const subscriptionFee = args.nextU64().unwrap();
  const duration = args.nextU64().unwrap(); // Duration in days

  const subscriber = Context.caller().toString();
  const currentTime = Context.timestamp();
  const expirationTime = currentTime + (duration * 24 * 60 * 60 * 1000); // Convert days to milliseconds

  // Record the subscription
  const subscriptionKey = SUBSCRIPTION_PREFIX + subscriber + "_" + journalistAddress;
  Storage.set(subscriptionKey, expirationTime.toString());

  // Update journalist earnings
  const earningsKey = EARNINGS_PREFIX + journalistAddress;
  const currentEarnings = Storage.has(earningsKey) ? Storage.get(earningsKey) : "0";
  const newEarnings = (parseInt(currentEarnings) + subscriptionFee).toString();
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
  const journalistAddress = args.nextString().unwrap();

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
  const withdrawAmount = args.nextU64().unwrap();

  const journalist = Context.caller().toString();
  const earningsKey = EARNINGS_PREFIX + journalist;

  if (!Storage.has(earningsKey)) {
    throw new Error("No earnings found for journalist");
  }

  const currentEarnings = parseInt(Storage.get(earningsKey));
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
  const readerAddress = args.nextString().unwrap();
  const articleId = args.nextString().unwrap();

  const paymentKey = PAYMENT_PREFIX + readerAddress + "_" + articleId;
  const hasAccess = Storage.has(paymentKey);

  const result = new Args();
  result.add(hasAccess ? "true" : "false");
  return result.serialize();
}
