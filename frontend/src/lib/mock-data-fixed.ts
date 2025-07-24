import { Article, Author, Vote } from "./types";

export const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Sarah Chen",
    bio: "Investigative journalist with 15 years of experience covering corporate corruption and financial crimes. Pulitzer Prize nominee.",
    avatar: "/avatars/sarah-chen.jpg",
    reputation: 95,
    articlesPublished: 47,
    totalVotes: 2847,
    joinedDate: "2023-01-15",
    walletAddress: "AS1qE8K4HaXE9jRhq6JGE7K8X9WfGXhE8q",
    verified: true,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    bio: "Environmental journalist and photographer documenting climate change impacts across Latin America.",
    avatar: "/avatars/marcus-rodriguez.jpg",
    reputation: 88,
    articlesPublished: 32,
    totalVotes: 1923,
    joinedDate: "2023-03-22",
    walletAddress: "AS2qF9L5IbYF0kShr7KHF8L9Y0XgGYiF9r",
    verified: true,
  },
  {
    id: "3",
    name: "Dr. Amara Okafor",
    bio: "Medical journalist and former healthcare worker covering public health crises and pharmaceutical industry.",
    avatar: "/avatars/amara-okafor.jpg",
    reputation: 92,
    articlesPublished: 28,
    totalVotes: 2156,
    joinedDate: "2023-02-08",
    walletAddress: "AS3qG0M6JcZG1lTis8LIG9M0Z1YhHZjG0s",
    verified: true,
  },
];

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Silicon Valley Bank Collapse: A Warning Ignored",
    subtitle:
      "How regulatory capture and risky investments brought down the tech industry's favorite bank",
    content: `# Chapter 1: The Warning Signs

In the months leading up to Silicon Valley Bank's spectacular collapse, warning signs were everywhere. Industry insiders, regulatory experts, and even some of the bank's own employees had raised concerns about the institution's increasingly risky investment strategy and its heavy concentration in a single sector.

The bank's troubles began with its massive bet on long-term government bonds. As interest rates rose throughout 2022, the value of these bonds plummeted, creating a paper loss of over $15 billion. But this was just the beginning of a story that would expose the fragility of the modern banking system and the dangers of regulatory capture.

## The Tech Bubble Connection

Silicon Valley Bank wasn't just any regional bank. It was the financial backbone of the tech industry, holding deposits from thousands of startups, venture capital firms, and tech workers. When the bank failed, it sent shockwaves through Silicon Valley and beyond.

# Chapter 2: The Fatal Miscalculation

On March 8, 2023, Silicon Valley Bank announced that it had sold $21 billion of its available-for-sale securities at a loss of $1.8 billion. The bank also announced plans to raise $2.25 billion in new capital to shore up its balance sheet.

This announcement triggered a panic among the bank's customers, many of whom were already nervous about the broader tech sector downturn. Within 24 hours, customers had attempted to withdraw $42 billion – nearly all of the bank's deposits.

## The Digital Bank Run

What made this bank run particularly devastating was its speed. Unlike traditional bank runs, which could take days or weeks to unfold, the Silicon Valley Bank run happened in real-time through digital channels. Social media amplified the panic, with venture capitalists and tech leaders publicly advising their portfolio companies to withdraw their funds.

# Chapter 3: Regulatory Failures

The collapse of Silicon Valley Bank wasn't just a failure of risk management – it was a failure of regulation. Despite multiple warning signs, regulators failed to take decisive action to address the bank's growing risks.

The bank had been classified as "well-capitalized" by regulators just months before its collapse. This rating was based on outdated regulatory frameworks that failed to account for the bank's unique risk profile and the speed at which modern bank runs can occur.

## The Lobbying Machine

Internal documents obtained through Freedom of Information Act requests reveal that Silicon Valley Bank spent millions of dollars lobbying for relaxed banking regulations. The bank successfully pushed for the rollback of key provisions of the Dodd-Frank Act, arguing that these regulations were too burdensome for regional banks.

# Chapter 4: The Aftermath

The collapse of Silicon Valley Bank sent shockwaves through the global financial system. While regulators stepped in to protect depositors, the damage to confidence in the banking sector was already done.

Hundreds of tech companies found themselves scrambling to move their funds to other institutions. Some startups were unable to make payroll, while others delayed planned investments and hiring.

## Lessons Learned?

The Silicon Valley Bank collapse exposed fundamental weaknesses in our financial system. The bank's failure demonstrated how quickly confidence can evaporate in the digital age and how interconnected our financial institutions have become.

As we move forward, the question remains: Have we learned the right lessons from this crisis, or are we simply setting the stage for the next one?`,
    excerpt:
      "An in-depth investigation into the regulatory failures and warning signs that led to the collapse of Silicon Valley Bank, exposing the fragility of our modern banking system.",
    coverImage: "/images/svb-collapse-cover.jpg",
    author: mockAuthors[0],
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    readTime: 12,
    category: "Finance",
    tags: ["banking", "regulation", "silicon-valley", "financial-crisis"],
    verificationScore: 94,
    voteCount: 247,
    upvotes: 235,
    downvotes: 12,
    status: "verified",
    premium: true,
    price: 5.0,
    chapters: [
      {
        id: "ch1",
        title: "The Warning Signs",
        content:
          "In the months leading up to Silicon Valley Bank's spectacular collapse...",
        order: 1,
      },
      {
        id: "ch2",
        title: "The Fatal Miscalculation",
        content: "On March 8, 2023, Silicon Valley Bank announced...",
        order: 2,
      },
    ],
    stakingAmount: 50.0,
    ipfsHash: "QmX4Gx5y2H8K9w3E1R7T6U4I8O2P5Q9M3N7V1Z8B4C6D2",
    transactionHash: "0x1234567890abcdef...",
  },
  {
    id: "2",
    title: "The Amazon Rainforest Burns: A Climate Emergency Ignored",
    subtitle:
      "How political negligence and corporate greed are destroying the lungs of our planet",
    content: `# Chapter 1: The Fires Begin

The smoke was visible from space. Satellite images showed thousands of fires burning across the Amazon rainforest, sending plumes of smoke across South America and beyond. But these weren't natural wildfires – they were deliberately set to clear land for cattle ranching and agriculture.

## The Scale of Destruction

In 2023, the Amazon lost an area of rainforest larger than the state of Connecticut. This deforestation represents not just an environmental catastrophe, but a climate emergency with global implications.

# Chapter 2: The Politics of Destruction

The increase in Amazon deforestation coincided with changes in Brazilian environmental policy. Under pressure from agribusiness lobbies, environmental protections were weakened and enforcement was reduced.

## Corporate Complicity

Major multinational corporations, including some of the world's largest meat and soy producers, have been linked to Amazon deforestation through their supply chains. Despite public commitments to sustainability, many companies continue to source from suppliers who clear rainforest land.

# Chapter 3: The Climate Impact

The Amazon rainforest plays a crucial role in regulating global climate patterns. It absorbs billions of tons of carbon dioxide each year and produces 20% of the world's oxygen. When the forest burns, it releases stored carbon back into the atmosphere, accelerating climate change.

## Tipping Points

Scientists warn that the Amazon is approaching a tipping point where large portions of the rainforest could transform from carbon sink to carbon source. Once this happens, the process becomes irreversible.

# Chapter 4: Indigenous Voices

For the indigenous peoples of the Amazon, the rainforest is not just an environmental resource – it's their home, their culture, and their identity. Indigenous territories have some of the lowest deforestation rates in the Amazon, demonstrating that traditional land management practices are key to conservation.

## Threats and Violence

Indigenous leaders and environmental activists face increasing threats and violence as they work to protect the rainforest. Many have been murdered for opposing illegal logging and land clearing operations.

# Chapter 5: Solutions and Hope

Despite the challenges, there are reasons for hope. New technologies are making it easier to monitor deforestation in real-time, while consumer pressure is forcing companies to clean up their supply chains.

## The Role of International Pressure

International agreements and economic incentives could play a crucial role in protecting the Amazon. The global community must recognize that saving the rainforest is not just Brazil's responsibility – it's a global imperative.`,
    excerpt:
      "A comprehensive investigation into the ongoing destruction of the Amazon rainforest and its implications for global climate change.",
    coverImage: "/images/amazon-fires-cover.jpg",
    author: mockAuthors[1],
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    readTime: 15,
    category: "Environment",
    tags: ["climate-change", "amazon", "deforestation", "environment"],
    verificationScore: 91,
    voteCount: 189,
    upvotes: 176,
    downvotes: 13,
    status: "verified",
    premium: true,
    price: 4.5,
    chapters: [],
    stakingAmount: 45.0,
    ipfsHash: "QmY5Hx6z3I9L0x4F2S8U7V5J9P3Q0N4M8W2A9C5E7G3H1",
    transactionHash: "0xabcdef1234567890...",
  },
  {
    id: "3",
    title: "The Opioid Crisis: Big Pharma's Deadly Deception",
    subtitle:
      "How pharmaceutical giants knowingly fueled America's deadliest drug epidemic",
    content: `# Prologue: A Mother's Loss

Janet Miller never thought she'd be planning her son's funeral at 25. Michael had been prescribed OxyContin for a back injury sustained in a construction accident. Within six months, he was dead from an overdose.

Janet's story is one of hundreds of thousands. The opioid crisis has claimed more than 500,000 American lives since 1999, making it one of the deadliest epidemics in U.S. history. But this wasn't a natural disaster or an unforeseeable tragedy – it was the result of deliberate corporate malfeasance.

# Chapter 1: The Origin of Deception

The story begins in 1995 with the approval of OxyContin by the FDA. Purdue Pharma, the drug's manufacturer, made extraordinary claims about its safety and addiction potential. The company insisted that the risk of addiction was less than 1% – a claim that had no scientific basis.

## The Marketing Machine

Purdue Pharma spent hundreds of millions of dollars marketing OxyContin to doctors across the country. Sales representatives were trained to downplay addiction risks and to push higher doses for longer periods. Internal documents reveal that the company knew its marketing claims were false.

# Chapter 2: The Sackler Family's Role

Behind Purdue Pharma was the Sackler family, whose members served on the company's board and played active roles in developing marketing strategies. Court documents show that family members were intimately involved in decisions about how to promote OxyContin, despite later claims that they were passive investors.

## Wealth and Philanthropy

Even as the opioid crisis devastated communities across America, the Sackler family used their profits to build a philanthropic empire. Museums, universities, and cultural institutions around the world bear the Sackler name, funded by what critics call "blood money."

# Chapter 3: Regulatory Capture

The FDA's approval and regulation of OxyContin reveals a troubling pattern of regulatory capture. Key FDA officials involved in the drug's approval later took lucrative jobs with pharmaceutical companies. Meanwhile, the agency repeatedly ignored warning signs about the drug's abuse potential.

## The Revolving Door

The pharmaceutical industry's influence over regulators extends far beyond individual cases. A revolving door between the FDA and drug companies has created conflicts of interest that undermine public health protection.

# Chapter 4: The Human Cost

Behind the statistics are real people whose lives have been destroyed by opioid addiction. Communities across America, particularly in rural areas, have been devastated by overdose deaths, crime, and family breakdown.

## Healthcare System Strain

The opioid crisis has overwhelmed healthcare systems, emergency responders, and social services. The economic cost of the epidemic is estimated at over $1 trillion, but the human cost is immeasurable.

# Chapter 5: Justice and Accountability

In recent years, courts have begun to hold pharmaceutical companies accountable for their role in the opioid crisis. Purdue Pharma pleaded guilty to criminal charges and agreed to pay billions in settlements. But critics argue that the penalties are insufficient given the scale of the harm caused.

## The Settlement Controversy

The Sackler family's proposed settlement would grant them immunity from future lawsuits in exchange for $6 billion in payments over nine years. Critics argue that this amount is a fraction of the family's wealth and does little to ensure justice for victims.

# Epilogue: Lessons Unlearned

The opioid crisis exposed fundamental flaws in how we regulate pharmaceutical companies and protect public health. Despite the massive human and economic toll, many of the conditions that enabled the crisis remain unchanged.

As new synthetic opioids like fentanyl drive even higher overdose rates, the question remains: Have we learned from our mistakes, or are we doomed to repeat them?`,
    excerpt:
      "An investigation into how pharmaceutical companies deliberately fueled the opioid epidemic, examining corporate deception, regulatory failure, and the ongoing fight for justice.",
    coverImage: "/images/opioid-crisis-cover.jpg",
    author: mockAuthors[2],
    publishedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    readTime: 18,
    category: "Health",
    tags: ["opioids", "pharmaceutical", "public-health", "corporate-crime"],
    verificationScore: 96,
    voteCount: 312,
    upvotes: 298,
    downvotes: 14,
    status: "verified",
    premium: true,
    price: 6.0,
    chapters: [],
    stakingAmount: 60.0,
    ipfsHash: "QmZ6Iy7a4J0M1y5G3T9W8X6K0Q4R5S1O9B6D8F4H2J7L3",
    transactionHash: "0xfedcba0987654321...",
  },
];

export const mockVotes: Vote[] = [
  {
    id: "1",
    articleId: "1",
    voterId: "user1",
    voteType: "up",
    reason: "Well-researched and thoroughly documented",
    timestamp: "2024-01-15T12:30:00Z",
    stake: 10.0,
  },
  {
    id: "2",
    articleId: "1",
    voterId: "user2",
    voteType: "fact_check",
    reason: "Verified sources and cross-referenced claims",
    timestamp: "2024-01-15T14:45:00Z",
    stake: 25.0,
  },
];
