// AssemblyScript entry point for VeritasChain contracts
// This file exports all the contract functions

// Re-export all functions from ReputationSystem
export {
  upvoteContent,
  downvoteContent,
  getUserReputation,
  getArticleVotes,
} from "./contracts/ReputationSystem";

// Re-export all functions from ArticleRegistry
export {
  publishArticle,
  getArticle,
  getAuthorArticleCount,
  getArticlesByAuthor,
  incrementViewCount,
} from "./contracts/ArticleRegistry";

// Re-export all functions from PaymentGateway
export {
  payForArticle,
  tipJournalist,
  processSubscription,
  getEarnings,
  withdrawEarnings,
  hasArticleAccess,
} from "./contracts/PaymentGateway";
