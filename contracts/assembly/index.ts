// AssemblyScript entry point for VeritasChain contracts
// This file exports all the contract functions

// Re-export all functions from ReputationSystem
export {
  upvoteContent,
  downvoteContent,
  getUserReputation,
  getArticleVotes,
  stakeForVerification,
  getJournalistStats,
  resolveDispute,
} from "./contracts/ReputationSystem";

// Re-export all functions from ArticleRegistry
export {
  publishArticle,
  updateArticle,
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
  hasActiveSubscription,
  getArticlePrice,
} from "./contracts/PaymentGateway";
