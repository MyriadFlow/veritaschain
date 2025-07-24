# VeritasChain

VeritasChain is a decentralized journalism platform built on the Massa blockchain. Its core mission is to empower independent journalists, combat misinformation, and restore trust in news by leveraging blockchain's immutability, transparency, and censorship resistance, it is built to address the pervasive issues of misinformation and declining public trust in traditional media. Unlike general data provenance solutions, VeritasChain specifically focuses on the lifecycle of journalistic content – from creation and publication to verification and compensation.

### **Why Massa?** Massa's unique features make it ideal:

- **Decentralization & Censorship Resistance:** Ensures no single entity can control or censor content.
- **Scalability:** Handles a high volume of articles, interactions, and transactions without congestion.
- **Smart Contracts:** Enables automated processes for content publishing, reputation, and payments.
- **Low Fees:** Facilitates micro-transactions for content access and journalist compensation.
- **On-Chain Web Hosting (DeWeb):** Massa supports hosting dApp frontends directly on the blockchain.
- **On-chain Governance (Planned):** Allows the community to shape the platform's future.

### **Why VeritasChain? (Its Selling Points):**

- **Immutable Content History:** Every article and its revisions are permanently recorded.
- **Community-Driven Verification:** Fact-checking and content quality are managed by the community through reputation and staking.
- **Direct Journalist Compensation:** Enables transparent and direct payment models for content creators.
- **Transparent Provenance for News:** Beyond just data, it provides verifiable context and history for news stories.

## Key Features

- **Decentralized Content Publishing:** Journalists can publish articles (content stored on IPFS, hash on Massa) through the dApp. The process involves signing a transaction, timestamping the publication, and associating it with their on-chain identity.
- **Version Control & Timestamps:** All edits and publications are timestamped and recorded, showing content evolution.
- **Reputation System:** On-chain scores for journalists and fact-checkers based on community feedback, accuracy, and engagement. Readers can upvote/downvote content, flag inaccuracies, or submit fact-check requests. These actions feed into the reputation algorithm, potentially requiring a small token stake to prevent spam.
- **Fact-Checking & Verification Mechanisms:**
  - **Staking for Verification:** Users/fact-checkers can stake tokens to vouch for or dispute content accuracy. If their assessment is later proven correct by community consensus, their staked tokens (and potentially a reward) are returned; otherwise, they might lose a portion of their stake
  - **Community Voting:** Decentralized voting on content quality and truthfulness. For disputed claims, a decentralized arbitration process could be initiated, potentially involving a larger pool of staked fact-checkers or a token-weighted voting system to reach a consensus on accuracy
- **Content Monetization:**
  - **Micropayments:** Readers can pay small amounts of Massa coin to access premium content similar to a pay-per-read model, or subscribe for a period. This is economically viable due to Massa's low fees
  - **NFT Articles:** Journalists can opt to mint their articles as unique NFTs (Non-Fungible Tokens). This allows for exclusive ownership, collection, or even fractional ownership, opening new revenue streams and ways for patrons to support journalism.
  - **Tipping:** Readers can directly send MAS tokens to journalists' on-chain wallets as a show of support for quality reporting.
- **Decentralized Autonomous Organizations (DAOs):**
  - **Newsroom DAOs:** Groups of journalists can form DAOs to collectively fund, manage, and publish investigative projects, pooling resources and distributing rewards based on contributions and community reception.
  - **Fact-Checking Guilds:** Specialized DAOs could form around specific subject matters (e.g., science, politics) to provide expert, decentralized fact-checking services, potentially earning a share of verification rewards.
- **Source Attribution & Linking:** Journalists can cryptographically link their sources on-chain, even if those sources are off-chain (e.g., by hashing documents and storing the hash). This adds another layer of verifiability.
- **User Profiles:** Each user (Journalist, Reader, Fact-Checker) has an on-chain profile reflecting their reputation score, published content, verification history, and any associated DAOs.

### Technical Implementation

- **Blockchain:** The Massa network serves as the immutable ledger, processing all transactions, managing smart contract states, and providing the decentralized execution environment for VeritasChain's logic.
- **Content Storage:**
  - **On-chain:** Used exclusively for critical metadata, article hashes (CIDs), author addresses, publication timestamps, version pointers, dispute statuses, reputation scores, and payment terms. Storing only hashes and metadata keeps on-chain costs minimal.
  - **Off-chain (Decentralized):** IPFS for the full article content, with its hash stored on Massa. This keeps on-chain costs low while maintaining decentralization. Content is addressed by its hash (CID). When an article is published, it's "pinned" on IPFS by multiple nodes to ensure persistence and availability.
- **Frontend:** Developed using modern web interacting frameworks like Next.js. It interacts with the Massa blockchain using the **`@massalabs/massa-web3` SDK** (a TypeScript library). This SDK allows the frontend to:

  - Call smart contract functions (e.g., `publishArticle()`, `stakeForVerification()`).
  - Read smart contract state (e.g., `getArticleDetails()`, `getReputationScore()`).
  - Connect to user wallets (Massa Station, browser extensions) to sign transactions.
  - Render content fetched from IPFS/Arweave based on CIDs retrieved from Massa.

- **Backend (Minimal/Optional):** While the core logic is on-chain, a lightweight, off-chain indexing service might be used to:

  - Index published articles for faster full-text search capabilities (blockchain data retrieval can be slow for complex queries).
  - Cache frequently accessed reputation data or article lists to improve UI responsiveness. This would be a read-only index and not a source of truth.

- **Wallet Integration:** Users interact via Massa-compatible wallets (e.g., Massa Station, browser extensions).

### Smart Contracts Involved

- **`ArticleRegistry.ts` (AssemblyScript):**
  - **Purpose:** The central repository for all journalistic content metadata.
  - **Key State:** Maps article IDs to structures containing: `authorAddress`, `title`, `description`, `ipfsContentHash` (or Arweave hash), `publicationTimestamp`, `lastUpdatedTimestamp`, `currentVersionHash`, `previousVersionHash`, `status` (e.g., "published", "disputed"), `monetizationModel` (e.g., "free", "paid", "NFT"), `associatedNFTId` (if applicable).
  - **Key Functions:**
    - `publishArticle(string _title, string _desc, string _ipfsHash, uint8 _monetizationModel)`: Allows a journalist to submit a new article.
    - `updateArticle(uint256 _articleId, string _newIpfsHash)`: Creates a new version of an existing article, updating the `currentVersionHash` and `previousVersionHash`.
    - `getArticleDetails(uint256 _articleId)`: Retrieves all metadata for a specific article.
- **`ReputationSystem.ts` (AssemblyScript):**
  - **Purpose:** Manages the dynamic reputation scores of Journalists and Fact-Checkers based on their on-chain activity and community feedback.
  - **Key State:** Maps user addresses to their `reputationScore`, `totalArticlesPublished`, `successfulVerifications`, `disputedVerifications`.
  - **Key Functions:**
    - `upvoteContent(uint256 _articleId)`: Increments an article's positive feedback count, potentially influencing author's reputation. Requires a small transaction fee to deter spam.
    - `downvoteContent(uint256 _articleId)`: Similarly, for negative feedback.
    - `stakeForVerification(uint256 _articleId, bool _isAccurate, uint256 _stakeAmount)`: Allows a `Fact-Checker` to formally stake tokens on the accuracy of an article.
    - `resolveDispute(uint256 _articleId, uint256 _disputeId, bool _truthRevealed)`: A function typically called by a DAO or after a voting period, to resolve a dispute and distribute/slash stakes.
    - `getReputationScore(address _userAddress)`: Returns the current reputation score of a user.
- **`PaymentGateway.ts` (AssemblyScript - Optional, but highly beneficial):**
  - **Purpose:** Facilitates transparent content monetization and direct journalist compensation.
  - **Key State:** Stores subscription details, pay-per-article rates, and balances for journalists.
  - **Key Functions:**
    - `payForArticle(uint256 _articleId)`: Allows a reader to send MAS to access a premium article, with funds routed to the journalist (minus a small platform fee, if any).
    - `tipJournalist(address _journalistAddress)`: Enables direct tipping.
    - `withdrawEarnings()`: Allows journalists to withdraw their accumulated MAS earnings.
- **`VeritasDAO.ts` (AssemblyScript - For community governance):**
  - **Purpose:** Manages overall platform parameters, treasury, and dispute resolution for critical issues, evolving VeritasChain into a truly decentralized entity.
  - **Key State:** Stores proposals, voting thresholds, treasury balance, list of authorized fact-checking guilds.
  - **Key Functions:**
    - `createProposal(string _description, address _targetContract, bytes _callData)`: Allows token holders to propose changes (e.g., adjust reputation algorithm, fund a special investigation).
    - `voteOnProposal(uint256 _proposalId, bool _vote)`: Enables token-weighted voting.
    - `executeProposal(uint256 _proposalId)`: Executes the proposed action if passed.

### Users and Roles (Expanded Interactions)

- **Journalist (On-chain ID required):**

  - **Primary Interaction:** Uses the dApp interface to write, format, and publish articles.
  - **Responsibilities:** Ensures factual accuracy, transparently links sources, and responds to verification requests. Can define their monetization model (free, paid, NFT).
  - **Incentives:** Earns MAS tokens directly from readers, builds an on-chain reputation that can lead to more visibility and trust, and can participate in Newsroom DAOs for collaborative projects.
  - **Actions:** `publishArticle()`, `updateArticle()`, `linkSources()`, `receivePayments/Tips()`, `proposeInvestigations` (in DAO).

- **Reader/Consumer (Wallet required):**

  - **Primary Interaction:** Browses articles, reads content, and interacts with the platform.
  - **Responsibilities:** Can provide feedback (upvote/downvote), tip journalists, or pay for premium content. Participates in community verification by flagging content or supporting fact-checkers.
  - **Incentives:** Access to uncensored, verifiable news; ability to directly support independent journalism; potential to earn small rewards for active, constructive participation in verification.
  - **Actions:** `readArticle()`, `payForArticle()`, `tipJournalist()`, `upvoteContent()`, `downvoteContent()`, `participateInVoting()`.

- **Fact-Checker (Potentially higher reputation/staking required):**

  - **Primary Interaction:** Actively reviews and assesses claims made in articles.
  - **Responsibilities:** Conducts thorough research, provides evidence for their assessments, and formally stakes MAS tokens to back their verification claims. Can participate in dispute resolution processes.
  - **Incentives:** Earns reputation for accurate verification, potentially receives MAS rewards from successful verification stakes, and can be part of specialized Fact-Checking Guilds (DAOs).
  - **Actions:** `stakeForVerification()`, `reviewContent()`, `submitVerificationReport()`, `participateInDisputeResolution()`.

- **DAO Member/Token Holder (MAS token holder):**
  - **Primary Interaction:** Engages in the governance of the VeritasChain platform.
  - **Responsibilities:** Proposes and votes on major protocol changes, allocation of community funds, dispute arbitration rules, and other critical ecosystem decisions.
  - **Incentives:** Influences the platform's direction, shares in the success of the ecosystem through token value appreciation (if applicable), and maintains the decentralized ethos.
  - **Actions:** `voteOnProposal()`, `delegateVote()`, `stakeTokensForGovernance()`.
