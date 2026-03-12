// finterview Question Bank v0.2
// Finance interview questions categorized by role and question type

// Role definitions (for filtering)
const roles = {
    "ib": { name: "Investment Banking", color: "#3498db", icon: "fas fa-building" },
    "markets": { name: "Sales & Trading", color: "#9b59b6", icon: "fas fa-chart-line" },
    "quant": { name: "Quantitative Finance", color: "#e74c3c", icon: "fas fa-calculator" },
    "am": { name: "Asset Management", color: "#2ecc71", icon: "fas fa-chart-pie" },
    "corpfin": { name: "Corporate Finance", color: "#f39c12", icon: "fas fa-landmark" },
    "risk": { name: "Risk Management", color: "#d35400", icon: "fas fa-shield-alt" },
    "fintech": { name: "FinTech", color: "#1abc9c", icon: "fas fa-mobile-alt" },
    "fo": { name: "Family Office / PWM", color: "#16a085", icon: "fas fa-home" },
    "all": { name: "All Roles", color: "#7f8c8d", icon: "fas fa-briefcase" }
};

// Question type categories
const questionTypes = {
    "technical": { name: "Technical", color: "#3498db" },
    "behavioral": { name: "Behavioral", color: "#2ecc71" },
    "case": { name: "Case Study", color: "#9b59b6" },
    "market": { name: "Market Insight", color: "#f39c12" },
    "all": { name: "All Types", color: "#7f8c8d" }
};

// Difficulty levels
const difficulties = {
    "easy": { name: "Easy", color: "#27ae60" },
    "medium": { name: "Medium", color: "#f39c12" },
    "hard": { name: "Hard", color: "#e74c3c" }
};

// Question Bank - 50+ questions across financial roles
// Question Bank - 79 combined English questions
// Question Bank - 179 questions (79 existing + 100 new)
const questionBank = [

  {
    "id": 1025,
    "role": "ib",
    "category": "market",
    "difficulty": "medium",
    "title": "Current M&A Market",
    "question": "How would you characterize the current M&A market, and what are the key drivers influencing deal activity?",
    "modelAnswer": "As of early 2026, the global M&A market is experiencing a period of selective resurgence after the volatility of previous years. Key characteristics and drivers include:\n\n1. Market Sentiment & Macro Environment:\n- Interest Rates: Central banks have paused or begun lowering rates, reducing financing costs and making leveraged buyouts more attractive.\n- Economic Uncertainty: While recession risks have receded in major economies, geopolitical tensions (e.g., trade fragmentation, regional conflicts) continue to create caution among strategic buyers.\n- Equity Valuations: Public market valuations have stabilized, narrowing the bid‑ask spread that previously stalled many transactions.\n\n2. Sector‑Specific Trends:\n- Technology & AI: Consolidation in artificial intelligence infrastructure, cloud services, and cybersecurity remains robust, driven by rapid innovation and scale needs.\n- Healthcare & Biotech: Aging demographics and post‑pandemic focus on health resilience fuel acquisitions in pharmaceuticals, medical devices, and digital health.\n- Energy Transition: Deals in renewable energy, EV supply chains, and carbon‑capture technologies are accelerating due to regulatory incentives and ESG pressures.\n- Financial Services: Fintech disruption and regulatory changes spur M&A among banks, payment processors, and asset managers.\n\n3. Deal Structures & Financing:\n- Cash‑Rich Buyers: Large corporates with strong balance sheets are using cash reserves for bolt‑on acquisitions.\n- Private Equity Dry Powder: Record levels of uncommitted capital (over $2 trillion globally) are driving secondary buyouts and add‑on acquisitions.\n- Contingent Consideration: More deals include earn‑outs and milestone payments to bridge valuation gaps.\n\n4. Regulatory & Political Factors:\n- Antitrust Scrutiny: Regulators in the US, EU, and China are increasingly challenging large horizontal mergers, especially in tech and healthcare.\n- CFIUS & FDI Reviews: National‑security reviews are lengthening deal timelines and affecting cross‑border transactions.\n- ESG Diligence: Environmental, social, and governance factors are now critical in due diligence and financing terms.\n\n5. Geographic Highlights:\n- North America: Still the largest market, with strong activity in tech and healthcare.\n- Europe: Renewed focus on cross‑border consolidation within the EU, particularly in industrials and consumer goods.\n- Asia‑Pacific: Outbound M&A from Japan and Korea remains active; inbound investment into India and Southeast Asia grows steadily.",
    "scoringKeywords": {
      "interest rates": 15,
      "private equity dry powder": 15,
      "sector trends": 20,
      "regulatory scrutiny": 15,
      "geographic dynamics": 15,
      "deal structures": 10,
      "ESG diligence": 10
    },
    "expectedStructure": [
      "Macroeconomic drivers",
      "Sector‑by‑section trends",
      "Financing environment",
      "Regulatory landscape",
      "Regional highlights"
    ],
    "detailedAnalysis": {
      "overview": "This question assesses a candidate's awareness of the real‑time M&A landscape, requiring synthesis of macroeconomic, sector‑specific, and regulatory factors. It is common in investment banking and corporate development interviews.",
      "whyWorks": "A strong answer combines recent data points (e.g., dry‑powder figures, rate trends) with structural insights, demonstrating both up‑to‑date knowledge and analytical framework. Mentioning specific sectors and regions adds credibility.",
      "commonMistakes": "1. Providing a generic, outdated description (e.g., still referring to 2020–2021 boom). 2. Focusing only on one region or sector. 3. Overlooking regulatory/antitrust developments. 4. Failing to link drivers to actual deal activity. 5. Being excessively pessimistic or optimistic without nuance.",
      "improvementTips": "1. Reference recent high‑profile deals or terminated transactions as examples. 2. Discuss how M&A activity varies by deal size (mega‑deals vs. middle market). 3. Mention the role of SPACs and PIPEs in the current environment. 4. Highlight differences between strategic vs. financial buyer motivations."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:54:00Z",
      "confidence": "medium",
      "sources": [
        "Reuters Global M&A Report 2025",
        "PitchBook 2025 Annual Report",
        "McKinsey on M&A",
        "Financial Times DealWatch"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 85,
        "differentiation": 80,
        "sourceAuthority": 80,
        "answerClarity": 85,
        "marketRelevance": 95,
        "regionalApplicability": 90,
        "difficulty": 50
      },
      "weightedScore": 83.5,
      "starRating": 4,
      "tags": [
        "热点题",
        "理解题",
        "权威题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "As of early 2026, the global M&A market is experiencing a period of selective resurgence after the volatility of previous years. Key characteristics and drivers include:\n\n1. Market Sentiment & Macro Environment:\n- Interest Rates: Central banks have paused or begun lowering rates, reducing financing costs and making leveraged buyouts more attractive.\n- Economic Uncertainty: While recession risks have receded in major economies, geopolitical tensions (e.g., trade fragmentation, regional conflicts) continue to create caution among strategic buyers.\n- Equity Valuations: Public market valuations have stabilized, narrowing the bid‑ask spread that previously stalled many transactions.\n\n2. Sector‑Specific Trends:\n- Technology & AI: Consolidation in artificial intelligence infrastructure, cloud services, and cybersecurity remains robust, driven by rapid innovation and scale needs.\n- Healthcare & Biotech: Aging demographics and post‑pandemic focus on health resilience fuel acquisitions in pharmaceuticals, medical devices, and digital health.\n- Energy Transition: Deals in renewable energy, EV supply chains, and carbon‑capture technologies are accelerating due to regulatory incentives and ESG pressures.\n- Financial Services: Fintech disruption and regulatory changes spur M&A among banks, payment processors, and asset managers.\n\n3. Deal Structures & Financing:\n- Cash‑Rich Buyers: Large corporates with strong balance sheets are using cash reserves for bolt‑on acquisitions.\n- Private Equity Dry Powder: Record levels of uncommitted capital (over $2 trillion globally) are driving secondary buyouts and add‑on acquisitions.\n- Contingent Consideration: More deals include earn‑outs and milestone payments to bridge valuation gaps.\n\n4. Regulatory & Political Factors:\n- Antitrust Scrutiny: Regulators in the US, EU, and China are increasingly challenging large horizontal mergers, especially in tech and healthcare.\n- CFIUS & FDI Reviews: National‑security reviews are lengthening deal timelines and affecting cross‑border transactions.\n- ESG Diligence: Environmental, social, and governance factors are now critical in due diligence and financing terms.\n\n5. Geographic Highlights:\n- North America: Still the largest market, with strong activity in tech and healthcare.\n- Europe: Renewed focus on cross‑border consolidation within the EU, particularly in industrials and consumer goods.\n- Asia‑Pacific: Outbound M&A from Japan and Korea remains active; inbound investment into India and Southeast Asia grows steadily.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Market Sentiment & Macro Environment\n  - Interest Rates: Central banks have paused or begun lowering rates, reducing financing costs and making leveraged buyouts more attractive.\n  - Economic Uncertainty: While recession risks have receded in major economies, geopolitical tensions (e.g., trade fragmentation, regional conflicts) continue to create caution among strategic buyers.\n\n• Sector‑Specific Trends\n  - Technology & AI: Consolidation in artificial intelligence infrastructure, cloud services, and cybersecurity remains robust, driven by rapid innovation and scale needs.\n  - Healthcare & Biotech: Aging demographics and post‑pandemic focus on health resilience fuel acquisitions in pharmaceuticals, medical devices, and digital health.\n\n• Deal Structures & Financing\n  - Cash‑Rich Buyers: Large corporates with strong balance sheets are using cash reserves for bolt‑on acquisitions.\n  - Private Equity Dry Powder: Record levels of uncommitted capital (over $2 trillion globally) are driving secondary buyouts and add‑on acquisitions.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1026,
    "role": "am",
    "category": "technical",
    "difficulty": "medium",
    "title": "Family Office vs Traditional Asset Management",
    "question": "Compare and contrast a single‑family office (SFO) with a traditional asset management firm. What are the key differences in objectives, services, and investment approach?",
    "modelAnswer": "Single‑Family Office (SFO) is a private organization that manages the financial and personal affairs of one ultra‑high‑net‑worth family (typically >$500M–$1B+ in assets). Traditional Asset Management (AM) firms serve multiple institutional and retail clients, offering standardized investment products.\n\n1. Objectives & Alignment:\n- SFO: Sole focus is on preserving and growing the wealth of a single family across generations. Goals are highly customized (e.g., legacy planning, philanthropy, lifestyle maintenance). Alignment is perfect—the office's success equals the family's success.\n- Traditional AM: Primary objective is to grow assets under management (AUM) and generate fee income. While client performance matters, there can be conflicts (e.g., incentives to gather AUM rather than optimize after‑tax returns).\n\n2. Services & Scope:\n- SFO: Holistic services beyond investment management:\n  - Wealth Management: Tax planning, estate planning, trust administration.\n  - Concierge & Lifestyle: Property management, travel arrangements, security, education planning.\n  - Family Governance: Facilitating family meetings, succession planning, educating next generation.\n  - Direct Investments: Often co‑invests alongside the family in private equity, real estate, venture capital.\n- Traditional AM: Narrower focus—primarily investment management (portfolio construction, manager selection). Additional services (e.g., financial planning) are often separate offerings or partnerships.\n\n3. Investment Approach:\n- SFO:\n  - Concentrated Portfolios: Willing to take large, illiquid positions in assets the family understands (e.g., direct ownership of businesses, real estate).\n  - Long‑Term Horizon: No quarterly performance pressure; can invest for decades.\n  - Tax Efficiency: Aggressive tax‑loss harvesting, use of trusts, charitable vehicles.\n  - Co‑Investment: Frequently invests alongside top‑tier private equity and hedge funds as a limited partner, often with fee discounts.\n- Traditional AM:\n  - Diversified Portfolios: Typically follow modern portfolio theory, emphasizing diversification across asset classes.\n  - Relative Performance: Benchmarked against indices; short‑term underperformance can lead to client redemptions.\n  - Scalability: Investments must be liquid enough to accommodate inflows/outflows from many clients.\n  - Fee Structure: Management fees (often ad‑valorem) plus performance fees for some strategies.\n\n4. Cost Structure:\n- SFO: High fixed costs (salaries, office, technology) paid directly by the family. No profit motive, but costs usually range from 0.5% to 1.5% of AUM.\n- Traditional AM: Costs spread across many clients; fees typically 0.5%–2% depending on strategy and client size.\n\n5. Regulatory & Reporting:\n- SFO: Less regulated (depending on jurisdiction) as it serves only one family. Reporting is tailored to family's preferences.\n- Traditional AM: Heavily regulated (SEC, FINRA, etc.); must provide standardized reporting, comply with marketing rules, and meet fiduciary duties to multiple clients.\n\nSummary: SFOs offer bespoke, holistic wealth stewardship with extreme alignment but high fixed costs. Traditional AM provides scalable investment expertise with broader market access but less personalization and potential conflicts.",
    "scoringKeywords": {
      "holistic services": 20,
      "concentrated portfolios": 20,
      "tax efficiency": 15,
      "long‑term horizon": 15,
      "alignment of interests": 15,
      "regulatory environment": 10,
      "cost structure": 5
    },
    "expectedStructure": [
      "Definition of each entity",
      "Comparison of objectives",
      "Services offered",
      "Investment philosophy differences",
      "Cost & regulatory aspects",
      "Summary table or key takeaways"
    ],
    "detailedAnalysis": {
      "overview": "This conceptual question assesses a candidate's understanding of different wealth‑management structures, particularly relevant for private banking, family office, and asset management interviews.",
      "whyWorks": "A strong answer systematically contrasts the two models across multiple dimensions, highlighting the trade‑offs each entails. It demonstrates awareness of the practical realities (costs, regulation, investment constraints) that drive institutional design.",
      "commonMistakes": "1. Treating SFOs as simply smaller versions of traditional AM. 2. Overlooking the non‑investment services (concierge, governance). 3. Assuming SFOs are always more cost‑effective. 4. Ignoring the impact of scale on investment opportunities. 5. Failing to mention the role of multi‑family offices (MFOs) as a hybrid.",
      "improvementTips": "1. Provide a concrete example of a well‑known family office (e.g., Rockefeller, Walton). 2. Discuss how the rise of MFOs has blurred the lines. 3. Mention how technology (family office platforms) is changing the cost structure. 4. Relate the comparison to career‑path considerations (working in a family office vs. a large asset manager)."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T02:01:00Z",
      "confidence": "high",
      "sources": [
        "The Family Office: A Comprehensive Guide (Gray et al.)",
        "Campden Wealth Family Office Reports",
        "CFA Institute: Private Wealth Management",
        "PwC / UBS Global Family Office Reports"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 85,
        "sourceAuthority": 85,
        "answerClarity": 90,
        "marketRelevance": 80,
        "regionalApplicability": 75,
        "difficulty": 55
      },
      "weightedScore": 79.5,
      "starRating": 4,
      "tags": [
        "理解题",
        "权威题",
        "本地题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "Single‑Family Office (SFO) is a private organization that manages the financial and personal affairs of one ultra‑high‑net‑worth family (typically >$500M–$1B+ in assets). Traditional Asset Management (AM) firms serve multiple institutional and retail clients, offering standardized investment products.\n\n1. Objectives & Alignment:\n- SFO: Sole focus is on preserving and growing the wealth of a single family across generations. Goals are highly customized (e.g., legacy planning, philanthropy, lifestyle maintenance). Alignment is perfect—the office's success equals the family's success.\n- Traditional AM: Primary objective is to grow assets under management (AUM) and generate fee income. While client performance matters, there can be conflicts (e.g., incentives to gather AUM rather than optimize after‑tax returns).\n\n2. Services & Scope:\n- SFO: Holistic services beyond investment management:\n  - Wealth Management: Tax planning, estate planning, trust administration.\n  - Concierge & Lifestyle: Property management, travel arrangements, security, education planning.\n  - Family Governance: Facilitating family meetings, succession planning, educating next generation.\n  - Direct Investments: Often co‑invests alongside the family in private equity, real estate, venture capital.\n- Traditional AM: Narrower focus—primarily investment management (portfolio construction, manager selection). Additional services (e.g., financial planning) are often separate offerings or partnerships.\n\n3. Investment Approach:\n- SFO:\n  - Concentrated Portfolios: Willing to take large, illiquid positions in assets the family understands (e.g., direct ownership of businesses, real estate).\n  - Long‑Term Horizon: No quarterly performance pressure; can invest for decades.\n  - Tax Efficiency: Aggressive tax‑loss harvesting, use of trusts, charitable vehicles.\n  - Co‑Investment: Frequently invests alongside top‑tier private equity and hedge funds as a limited partner, often with fee discounts.\n- Traditional AM:\n  - Diversified Portfolios: Typically follow modern portfolio theory, emphasizing diversification across asset classes.\n  - Relative Performance: Benchmarked against indices; short‑term underperformance can lead to client redemptions.\n  - Scalability: Investments must be liquid enough to accommodate inflows/outflows from many clients.\n  - Fee Structure: Management fees (often ad‑valorem) plus performance fees for some strategies.\n\n4. Cost Structure:\n- SFO: High fixed costs (salaries, office, technology) paid directly by the family. No profit motive, but costs usually range from 0.5% to 1.5% of AUM.\n- Traditional AM: Costs spread across many clients; fees typically 0.5%–2% depending on strategy and client size.\n\n5. Regulatory & Reporting:\n- SFO: Less regulated (depending on jurisdiction) as it serves only one family. Reporting is tailored to family's preferences.\n- Traditional AM: Heavily regulated (SEC, FINRA, etc.); must provide standardized reporting, comply with marketing rules, and meet fiduciary duties to multiple clients.\n\nSummary: SFOs offer bespoke, holistic wealth stewardship with extreme alignment but high fixed costs. Traditional AM provides scalable investment expertise with broader market access but less personalization and potential conflicts.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Objectives & Alignment\n  - SFO: Sole focus is on preserving and growing the wealth of a single family across generations. Goals are highly customized (e.g., legacy planning, philanthropy, lifestyle maintenance). Alignment is perfect—the office's success equals the family's success.\n  - Traditional AM: Primary objective is to grow assets under management (AUM) and generate fee income. While client performance matters, there can be conflicts (e.g., incentives to gather AUM rather than optimize after‑tax returns).\n\n• Services & Scope\n  - SFO: Holistic services beyond investment management:\n  - Wealth Management: Tax planning, estate planning, trust administration.\n\n• Investment Approach\n  - Concentrated Portfolios: Willing to take large, illiquid positions in assets the family understands (e.g., direct ownership of businesses, real estate).\n  - Long‑Term Horizon: No quarterly performance pressure; can invest for decades.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1027,
    "role": "am",
    "category": "technical",
    "difficulty": "medium",
    "title": "Portfolio Construction",
    "question": "Describe the key steps in constructing a diversified investment portfolio for a moderate‑risk client.",
    "modelAnswer": "Portfolio construction is a systematic process that balances risk and return while aligning with the client's objectives. For a moderate‑risk client, the steps are:\n\n1. Client Profiling:\n- Risk Tolerance: Assess via questionnaires and interviews; moderate risk typically implies willingness to accept some volatility in exchange for long‑term growth.\n- Investment Horizon: Usually 5–10 years, allowing recovery from market downturns.\n- Liquidity Needs: Determine required cash flows (e.g., regular withdrawals, upcoming expenses).\n- Tax Considerations: Account for tax status (e.g., taxable vs. tax‑deferred account) and jurisdiction.\n- ESG Preferences: Incorporate any environmental, social, or governance constraints.\n\n2. Strategic Asset Allocation (SAA):\nSet long‑term target weights based on expected risk‑return characteristics of major asset classes:\n- Equities: 50‑60% (global diversification: developed markets 40%, emerging markets 10‑15%)\n- Fixed Income: 30‑40% (government bonds 20%, investment‑grade corporates 10‑15%, high‑yield 5%)\n- Alternatives: 5‑10% (real estate investment trusts (REITs), commodities, infrastructure)\n- Cash & Equivalents: 0‑5% for liquidity and rebalancing.\n\n3. Risk‑Return Optimization:\n- Use mean‑variance optimization (Markowitz) or a Black‑Litterman approach to adjust weights for expected returns, volatilities, and correlations.\n- Stress‑test the allocation under historical crisis scenarios (e.g., 2008, 2020).\n- Ensure the portfolio's expected volatility aligns with the client's moderate risk profile (e.g., annual standard deviation of 8‑12%).\n\n4. Implementation (Tactical Choices):\n- Passive vs. Active: Core holdings can be low‑cost index funds/ETFs; satellite positions may employ active managers for alpha generation.\n- Security Selection: Within equities, diversify across sectors (tech, healthcare, financials, consumer staples) and market capitalizations (large‑cap, mid‑cap).\n- Fixed‑Income Structure: Ladder maturities to manage interest‑rate risk; include inflation‑linked bonds if inflation concerns exist.\n- Currency Hedging: For international exposure, decide whether to hedge currency risk back to the client's base currency.\n\n5. Portfolio Monitoring & Rebalancing:\n- Regular Review: Quarterly performance assessment against benchmarks and client goals.\n- Rebalancing Triggers: When asset class deviations exceed predetermined bands (e.g., ±5% from target), rebalance back to SAA.\n- Tax‑Efficient Rebalancing: Use contributions/withdrawals to adjust weights, harvest tax losses where possible.\n\n6. Reporting & Communication:\nProvide clear, periodic statements explaining performance, risk metrics (Sharpe ratio, maximum drawdown), and any changes to the strategy.\n\nExample Moderate‑Risk Portfolio:\n- 55% Global Equities (40% US, 10% Europe, 5% Asia ex‑Japan, 5% Japan)\n- 35% Fixed Income (20% US Treasuries, 10% Investment‑Grade Corporates, 5% Emerging‑Market Debt)\n- 5% REITs\n- 5% Cash",
    "scoringKeywords": {
      "strategic asset allocation": 25,
      "risk tolerance": 20,
      "diversification": 20,
      "rebalancing": 15,
      "mean‑variance optimization": 10,
      "tax efficiency": 10
    },
    "expectedStructure": [
      "Client profiling",
      "Strategic asset allocation",
      "Risk‑return optimization",
      "Implementation details",
      "Monitoring & rebalancing",
      "Example allocation"
    ],
    "detailedAnalysis": {
      "overview": "This question tests the candidate's ability to translate client needs into a concrete, diversified portfolio. It is fundamental for roles in asset management, wealth management, and financial advisory.",
      "whyWorks": "A comprehensive answer walks through the entire process—from understanding the client to ongoing management—and provides specific allocation percentages, demonstrating practical knowledge. It also mentions modern techniques (Black‑Litterman, tax‑loss harvesting).",
      "commonMistakes": "1. Jumping directly to asset weights without discussing client profiling. 2. Proposing an allocation that does not match the stated risk profile (e.g., too aggressive or too conservative). 3. Omitting rebalancing and monitoring. 4. Ignoring tax considerations. 5. Failing to justify the chosen weights with risk‑return rationale.",
      "improvementTips": "1. Reference industry benchmarks (e.g., 60/40 portfolio) and explain why you might deviate. 2. Discuss how factor investing (value, momentum, quality) can be incorporated. 3. Mention the role of liability‑driven investment (LDI) for clients with specific future obligations. 4. Highlight the difference between strategic and tactical asset allocation."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T02:00:00Z",
      "confidence": "high",
      "sources": [
        "CFA Level III Portfolio Management",
        "Modern Portfolio Theory (Markowitz)",
        "The Intelligent Asset Allocator (Bernstein)",
        "Vanguard Principles for Investing Success"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 85,
        "differentiation": 75,
        "sourceAuthority": 90,
        "answerClarity": 85,
        "marketRelevance": 95,
        "regionalApplicability": 90,
        "difficulty": 60
      },
      "weightedScore": 85.25,
      "starRating": 4,
      "tags": [
        "高频题",
        "理解题",
        "明确题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "Portfolio construction is a systematic process that balances risk and return while aligning with the client's objectives. For a moderate‑risk client, the steps are:\n\n1. Client Profiling:\n- Risk Tolerance: Assess via questionnaires and interviews; moderate risk typically implies willingness to accept some volatility in exchange for long‑term growth.\n- Investment Horizon: Usually 5–10 years, allowing recovery from market downturns.\n- Liquidity Needs: Determine required cash flows (e.g., regular withdrawals, upcoming expenses).\n- Tax Considerations: Account for tax status (e.g., taxable vs. tax‑deferred account) and jurisdiction.\n- ESG Preferences: Incorporate any environmental, social, or governance constraints.\n\n2. Strategic Asset Allocation (SAA):\nSet long‑term target weights based on expected risk‑return characteristics of major asset classes:\n- Equities: 50‑60% (global diversification: developed markets 40%, emerging markets 10‑15%)\n- Fixed Income: 30‑40% (government bonds 20%, investment‑grade corporates 10‑15%, high‑yield 5%)\n- Alternatives: 5‑10% (real estate investment trusts (REITs), commodities, infrastructure)\n- Cash & Equivalents: 0‑5% for liquidity and rebalancing.\n\n3. Risk‑Return Optimization:\n- Use mean‑variance optimization (Markowitz) or a Black‑Litterman approach to adjust weights for expected returns, volatilities, and correlations.\n- Stress‑test the allocation under historical crisis scenarios (e.g., 2008, 2020).\n- Ensure the portfolio's expected volatility aligns with the client's moderate risk profile (e.g., annual standard deviation of 8‑12%).\n\n4. Implementation (Tactical Choices):\n- Passive vs. Active: Core holdings can be low‑cost index funds/ETFs; satellite positions may employ active managers for alpha generation.\n- Security Selection: Within equities, diversify across sectors (tech, healthcare, financials, consumer staples) and market capitalizations (large‑cap, mid‑cap).\n- Fixed‑Income Structure: Ladder maturities to manage interest‑rate risk; include inflation‑linked bonds if inflation concerns exist.\n- Currency Hedging: For international exposure, decide whether to hedge currency risk back to the client's base currency.\n\n5. Portfolio Monitoring & Rebalancing:\n- Regular Review: Quarterly performance assessment against benchmarks and client goals.\n- Rebalancing Triggers: When asset class deviations exceed predetermined bands (e.g., ±5% from target), rebalance back to SAA.\n- Tax‑Efficient Rebalancing: Use contributions/withdrawals to adjust weights, harvest tax losses where possible.\n\n6. Reporting & Communication:\nProvide clear, periodic statements explaining performance, risk metrics (Sharpe ratio, maximum drawdown), and any changes to the strategy.\n\nExample Moderate‑Risk Portfolio:\n- 55% Global Equities (40% US, 10% Europe, 5% Asia ex‑Japan, 5% Japan)\n- 35% Fixed Income (20% US Treasuries, 10% Investment‑Grade Corporates, 5% Emerging‑Market Debt)\n- 5% REITs\n- 5% Cash",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Client Profiling\n  - Risk Tolerance: Assess via questionnaires and interviews; moderate risk typically implies willingness to accept some volatility in exchange for long‑term growth.\n  - Investment Horizon: Usually 5–10 years, allowing recovery from market downturns.\n\n• Strategic Asset Allocation (SAA)\n  - Equities: 50‑60% (global diversification: developed markets 40%, emerging markets 10‑15%)\n  - Fixed Income: 30‑40% (government bonds 20%, investment‑grade corporates 10‑15%, high‑yield 5%)\n\n• Risk‑Return Optimization\n  - Use mean‑variance optimization (Markowitz) or a Black‑Litterman approach to adjust weights for expected returns, volatilities, and correlations.\n  - Stress‑test the allocation under historical crisis scenarios (e.g., 2008, 2020).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1028,
    "role": "quant",
    "category": "technical",
    "difficulty": "hard",
    "title": "Black‑Scholes Derivation",
    "question": "Outline the key steps in deriving the Black‑Scholes partial differential equation (PDE) and its solution for a European call option.",
    "modelAnswer": "The Black‑Scholes‑Merton model derives a PDE for the price of a derivative under the following assumptions: geometric Brownian motion for the stock, constant risk‑free rate and volatility, no dividends during the option's life, no arbitrage, and continuous trading.\n\n1. Stock Price Dynamics:\nAssume the stock price S follows the stochastic differential equation (SDE):\n  dS = μS dt + σS dW\nwhere μ is the expected return, σ is the constant volatility, and dW is a Wiener process (Brownian motion).\n\n2. Itô's Lemma for the Option Price:\nLet V(S,t) be the price of a derivative contingent on S. By Itô's lemma,\n  dV = (∂V/∂t + μS ∂V/∂S + ½ σ²S² ∂²V/∂S²) dt + σS ∂V/∂S dW.\n\n3. Construct a Risk‑Free Portfolio (Hedging):\nTo eliminate the stochastic term dW, form a portfolio Π that is short one derivative and long ∂V/∂S shares of the stock:\n  Π = –V + (∂V/∂S) S.\nThe change in portfolio value over dt is:\n  dΠ = –dV + (∂V/∂S) dS.\nSubstitute dV and dS from above:\n  dΠ = [–∂V/∂t – ½ σ²S² ∂²V/∂S²] dt.\nNotice the μ terms cancel, and the dW terms cancel—the portfolio is now risk‑free.\n\n4. No‑Arbitrage Condition:\nA risk‑free portfolio must earn the risk‑free rate r:\n  dΠ = r Π dt.\nEquate the two expressions for dΠ:\n  [–∂V/∂t – ½ σ²S² ∂²V/∂S²] dt = r [–V + (∂V/∂S) S] dt.\nRearrange to obtain the Black‑Scholes PDE:\n  ∂V/∂t + rS ∂V/∂S + ½ σ²S² ∂²V/∂S² – rV = 0.\n\n5. Solving the PDE for a European Call:\nWith boundary condition V(S,T) = max(S – K, 0) at maturity T, the solution is the Black‑Scholes formula:\n  C = S N(d₁) – K e^{–r(T–t)} N(d₂)\nwhere\n  d₁ = [ln(S/K) + (r + ½ σ²)(T–t)] / [σ √(T–t)]\n  d₂ = d₁ – σ √(T–t)\nand N(·) is the cumulative standard normal distribution.\n\nInterpretation:\n- N(d₁) is the hedge ratio (delta); S N(d₁) represents the expected present value of the stock conditional on exercise.\n- K e^{–r(T–t)} N(d₂) is the discounted strike multiplied by the risk‑neutral probability of exercise.\n- The formula is independent of μ (the expected return), reflecting risk‑neutral valuation.\n\nKey Insights:\nThe derivation shows how dynamic hedging eliminates risk, leading to a PDE that does not depend on investor risk preferences. The solution provides a closed‑form expression that is computationally tractable and forms the foundation of modern option pricing.",
    "scoringKeywords": {
      "geometric Brownian motion": 15,
      "Itô's lemma": 20,
      "risk‑free portfolio": 20,
      "no‑arbitrage": 15,
      "Black‑Scholes PDE": 15,
      "boundary condition": 10,
      "risk‑neutral valuation": 5
    },
    "expectedStructure": [
      "Stock price SDE",
      "Apply Itô's lemma to option price",
      "Construct hedged portfolio",
      "Derive PDE via no‑arbitrage",
      "State solution (call formula)",
      "Interpret terms"
    ],
    "detailedAnalysis": {
      "overview": "This is a core quantitative finance question that tests deep understanding of stochastic calculus, hedging arguments, and derivative pricing theory. It is frequently asked in quantitative research, derivatives trading, and structured products roles.",
      "whyWorks": "A rigorous answer walks through each mathematical step clearly, emphasizing the economic intuition (hedging eliminates risk, leading to risk‑neutral pricing). Connecting the PDE to the final formula demonstrates completeness.",
      "commonMistakes": "1. Incorrect application of Itô's lemma (missing second‑order term). 2. Failing to cancel the μ terms. 3. Mis‑specifying the boundary condition. 4. Confusing the portfolio composition (long/short signs). 5. Omitting the interpretation of N(d₁) and N(d₂).",
      "improvementTips": "1. Provide a brief intuitive explanation of why μ disappears (risk‑neutral valuation). 2. Mention how dividends can be incorporated (Merton extension). 3. Discuss limitations of the model (constant volatility, continuous hedging). 4. Relate the derivation to the Greeks (delta, gamma) used in practice."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:58:00Z",
      "confidence": "high",
      "sources": [
        "Black‑Scholes‑Merton original papers",
        "Hull Options, Futures, and Other Derivatives",
        "Shreve Stochastic Calculus for Finance II",
        "Wilmott on Quantitative Finance"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 95,
        "sourceAuthority": 95,
        "answerClarity": 75,
        "marketRelevance": 85,
        "regionalApplicability": 80,
        "difficulty": 90
      },
      "weightedScore": 82.75,
      "starRating": 4,
      "tags": [
        "权威题",
        "理解题",
        "高频题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "The Black‑Scholes‑Merton model derives a PDE for the price of a derivative under the following assumptions: geometric Brownian motion for the stock, constant risk‑free rate and volatility, no dividends during the option's life, no arbitrage, and continuous trading.\n\n1. Stock Price Dynamics:\nAssume the stock price S follows the stochastic differential equation (SDE):\n  dS = μS dt + σS dW\nwhere μ is the expected return, σ is the constant volatility, and dW is a Wiener process (Brownian motion).\n\n2. Itô's Lemma for the Option Price:\nLet V(S,t) be the price of a derivative contingent on S. By Itô's lemma,\n  dV = (∂V/∂t + μS ∂V/∂S + ½ σ²S² ∂²V/∂S²) dt + σS ∂V/∂S dW.\n\n3. Construct a Risk‑Free Portfolio (Hedging):\nTo eliminate the stochastic term dW, form a portfolio Π that is short one derivative and long ∂V/∂S shares of the stock:\n  Π = –V + (∂V/∂S) S.\nThe change in portfolio value over dt is:\n  dΠ = –dV + (∂V/∂S) dS.\nSubstitute dV and dS from above:\n  dΠ = [–∂V/∂t – ½ σ²S² ∂²V/∂S²] dt.\nNotice the μ terms cancel, and the dW terms cancel—the portfolio is now risk‑free.\n\n4. No‑Arbitrage Condition:\nA risk‑free portfolio must earn the risk‑free rate r:\n  dΠ = r Π dt.\nEquate the two expressions for dΠ:\n  [–∂V/∂t – ½ σ²S² ∂²V/∂S²] dt = r [–V + (∂V/∂S) S] dt.\nRearrange to obtain the Black‑Scholes PDE:\n  ∂V/∂t + rS ∂V/∂S + ½ σ²S² ∂²V/∂S² – rV = 0.\n\n5. Solving the PDE for a European Call:\nWith boundary condition V(S,T) = max(S – K, 0) at maturity T, the solution is the Black‑Scholes formula:\n  C = S N(d₁) – K e^{–r(T–t)} N(d₂)\nwhere\n  d₁ = [ln(S/K) + (r + ½ σ²)(T–t)] / [σ √(T–t)]\n  d₂ = d₁ – σ √(T–t)\nand N(·) is the cumulative standard normal distribution.\n\nInterpretation:\n- N(d₁) is the hedge ratio (delta); S N(d₁) represents the expected present value of the stock conditional on exercise.\n- K e^{–r(T–t)} N(d₂) is the discounted strike multiplied by the risk‑neutral probability of exercise.\n- The formula is independent of μ (the expected return), reflecting risk‑neutral valuation.\n\nKey Insights:\nThe derivation shows how dynamic hedging eliminates risk, leading to a PDE that does not depend on investor risk preferences. The solution provides a closed‑form expression that is computationally tractable and forms the foundation of modern option pricing.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Stock Price Dynamics\n\n• Itô's Lemma for the Option Price\n\n• Construct a Risk‑Free Portfolio (Hedging)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1029,
    "role": "markets",
    "category": "technical",
    "difficulty": "medium",
    "title": "Bond Pricing & Yield",
    "question": "Explain how a bond is priced, and discuss the relationship between bond prices and yields.",
    "modelAnswer": "Bond Pricing:\nA bond's price is the present value of its future cash flows, discounted at the market‑required yield (discount rate). The cash flows consist of:\n1. Periodic coupon payments (usually semi‑annual) = Coupon Rate × Face Value ÷ Payment Frequency.\n2. Face value (par) repaid at maturity.\n\nMathematically, Price = Σ [C / (1 + r)^t] + F / (1 + r)^n\nWhere:\n- C = coupon payment\n- r = periodic discount rate (yield‑to‑maturity per period)\n- t = period number\n- F = face value\n- n = total number of periods\n\nYield Measures:\n- Yield‑to‑Maturity (YTM): The internal rate of return (IRR) earned if the bond is held to maturity, assuming all coupons are reinvested at the same YTM. It is the discount rate that equates the bond's price to the PV of its cash flows.\n- Current Yield: Annual coupon divided by current market price.\n- Yield‑to‑Call (YTC): Similar to YTM but assumes the bond is called at the first call date.\n\nPrice‑Yield Relationship (Convexity):\n- Inverse Relationship: Bond prices and yields move inversely. When market yields rise, existing bonds with lower coupons become less attractive, so their prices fall (and vice‑versa).\n- Duration: Measures the sensitivity of a bond's price to changes in yield. Modified duration estimates the percentage price change for a 1% change in yield: ΔPrice ≈ –Duration × ΔYield.\n- Convexity: Adjusts for the fact that the price‑yield curve is not linear. Convexity accounts for the curvature, providing a more accurate estimate for larger yield moves.\n\nFactors Affecting Bond Prices:\n1. Interest‑Rate Risk: Changes in benchmark rates (e.g., Treasury yields) affect all bonds.\n2. Credit Risk: Deterioration in the issuer's creditworthiness increases the required yield spread, lowering price.\n3. Time to Maturity: Longer‑maturity bonds exhibit greater price volatility for a given yield change.\n4. Coupon Level: Lower‑coupon bonds have higher duration and are more sensitive to rate changes.\n5. Embedded Options: Callable, putable, or convertible features introduce optionality that affects pricing.",
    "scoringKeywords": {
      "present value": 20,
      "yield‑to‑maturity": 20,
      "duration": 20,
      "convexity": 15,
      "inverse relationship": 15,
      "credit risk": 10
    },
    "expectedStructure": [
      "Price as present value of cash flows",
      "Key yield definitions",
      "Price‑yield inverse relationship",
      "Duration & convexity",
      "Factors affecting prices"
    ],
    "detailedAnalysis": {
      "overview": "This is a foundational fixed‑income question that tests understanding of bond mathematics, risk measures, and market dynamics. It is common in roles spanning sales & trading, credit analysis, and portfolio management.",
      "whyWorks": "A thorough answer covers both the formulaic pricing approach and the intuitive economic relationship, while introducing key risk metrics (duration, convexity) and external drivers (credit, optionality).",
      "commonMistakes": "1. Stating that bond price equals face value. 2. Confusing yield‑to‑maturity with current yield or coupon rate. 3. Forgetting that coupons are typically semi‑annual (need to adjust periodicity). 4. Omitting the reinvestment assumption in YTM. 5. Failing to explain why the price‑yield curve is convex.",
      "improvementTips": "1. Provide a simple numerical example (e.g., price a 5‑year, 4% coupon bond at a 5% YTM). 2. Illustrate duration with a scenario (e.g., if duration = 7, a 1% yield increase leads to ~7% price drop). 3. Discuss how the relationship is used in portfolio immunization and hedging. 4. Mention differences between government and corporate bonds."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:56:00Z",
      "confidence": "high",
      "sources": [
        "Fabozzi Fixed Income Securities",
        "CFA Level I Fixed Income",
        "Tuckman & Serrat Fixed Income Markets"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 85,
        "differentiation": 75,
        "sourceAuthority": 90,
        "answerClarity": 85,
        "marketRelevance": 90,
        "regionalApplicability": 85,
        "difficulty": 55
      },
      "weightedScore": 83,
      "starRating": 4,
      "tags": [
        "高频题",
        "理解题",
        "权威题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "Bond Pricing:\nA bond's price is the present value of its future cash flows, discounted at the market‑required yield (discount rate). The cash flows consist of:\n1. Periodic coupon payments (usually semi‑annual) = Coupon Rate × Face Value ÷ Payment Frequency.\n2. Face value (par) repaid at maturity.\n\nMathematically, Price = Σ [C / (1 + r)^t] + F / (1 + r)^n\nWhere:\n- C = coupon payment\n- r = periodic discount rate (yield‑to‑maturity per period)\n- t = period number\n- F = face value\n- n = total number of periods\n\nYield Measures:\n- Yield‑to‑Maturity (YTM): The internal rate of return (IRR) earned if the bond is held to maturity, assuming all coupons are reinvested at the same YTM. It is the discount rate that equates the bond's price to the PV of its cash flows.\n- Current Yield: Annual coupon divided by current market price.\n- Yield‑to‑Call (YTC): Similar to YTM but assumes the bond is called at the first call date.\n\nPrice‑Yield Relationship (Convexity):\n- Inverse Relationship: Bond prices and yields move inversely. When market yields rise, existing bonds with lower coupons become less attractive, so their prices fall (and vice‑versa).\n- Duration: Measures the sensitivity of a bond's price to changes in yield. Modified duration estimates the percentage price change for a 1% change in yield: ΔPrice ≈ –Duration × ΔYield.\n- Convexity: Adjusts for the fact that the price‑yield curve is not linear. Convexity accounts for the curvature, providing a more accurate estimate for larger yield moves.\n\nFactors Affecting Bond Prices:\n1. Interest‑Rate Risk: Changes in benchmark rates (e.g., Treasury yields) affect all bonds.\n2. Credit Risk: Deterioration in the issuer's creditworthiness increases the required yield spread, lowering price.\n3. Time to Maturity: Longer‑maturity bonds exhibit greater price volatility for a given yield change.\n4. Coupon Level: Lower‑coupon bonds have higher duration and are more sensitive to rate changes.\n5. Embedded Options: Callable, putable, or convertible features introduce optionality that affects pricing.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Periodic coupon payments (usually semi‑annual) = Coupon Rate × Face Value ÷ Payment Frequency.\n\n• Face value (par) repaid at maturity.\n  - C = coupon payment\n  - r = periodic discount rate (yield‑to‑maturity per period)\n\n• Key Points\n  - Yield‑to‑Maturity (YTM): The internal rate of return (IRR) earned if the bond is held to maturity, assuming all coupons are reinvested at the same YTM. It is the discount rate that equates the bond's price to the PV of its cash flows.\n  - Current Yield: Annual coupon divided by current market price.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1030,
    "role": "quant",
    "category": "technical",
    "difficulty": "hard",
    "title": "Statistical Arbitrage",
    "question": "What is statistical arbitrage, and describe a typical pairs‑trading strategy. What are the key risks?",
    "modelAnswer": "Statistical Arbitrage (Stat Arb) is a quantitative trading strategy that seeks to profit from temporary mispricings between related securities, using statistical and econometric models to identify and exploit these deviations. It is generally market‑neutral and high‑frequency in nature.\n\nCore Concept: Stat arb assumes that prices of related assets (e.g., stocks in the same sector, ETFs and their constituents, futures and spot) exhibit a stable long‑run relationship. When the spread between them widens beyond historical norms, the strategy bets on mean reversion.\n\nPairs‑Trading Example:\n1. Pair Selection: Identify two stocks (e.g., Coca‑Cola and Pepsi) that historically move together due to similar fundamentals, market exposure, or industry dynamics.\n2. Cointegration Test: Use statistical tests (Engle‑Granger, Johansen) to verify that the price ratio or spread is stationary—i.e., it reverts to a long‑term mean.\n3. Trading Signal: Calculate the spread Z‑score:\n   Z = (Spread – Mean(Spread)) / Std(Spread)\n   When Z exceeds a threshold (e.g., +2), the spread is considered abnormally wide: short the outperformer and long the underperformer. When Z falls below a threshold (e.g., –2), do the opposite.\n4. Position Sizing: Size positions to be dollar‑neutral or beta‑neutral, minimizing exposure to broad market moves.\n5. Exit: Unwind the pair when the spread reverts to its mean (Z ≈ 0) or when a stop‑loss is triggered.\n\nKey Risks:\n1. Model Risk: The historical relationship may break down due to structural changes (e.g., merger, regulatory shift, technology disruption). Cointegration is not a permanent property.\n2. Execution & Liquidity Risk: High trading frequency demands low latency and tight spreads; illiquid stocks can incur significant slippage.\n3. Divergence Risk (\"Black Swan\"): The spread may continue to widen instead of reverting, leading to large losses. This is especially acute during market crises when correlations spike.\n4. Crowding Risk: Many quant funds run similar strategies, causing signals to decay and increasing competition for alpha.\n5. Transaction Costs: Frequent rebalancing erodes profits; commissions, bid‑ask spreads, and financing costs must be carefully managed.\n6. Regulatory Risk: Changes in short‑selling rules or transaction taxes can impair strategy viability.\n\nExtensions & Modern Variants:\n- Multi‑factor Models: Use cross‑sectional signals (value, momentum, quality) to rank thousands of stocks and go long the top quintile, short the bottom quintile.\n- Machine‑Learning Approaches: Apply random forests, neural networks, or reinforcement learning to predict short‑term price movements from high‑dimensional data.\n- ETF Arbitrage: Exploit mispricings between an ETF and its underlying basket via creation/redemption mechanisms.",
    "scoringKeywords": {
      "cointegration": 20,
      "mean reversion": 20,
      "Z‑score": 15,
      "market‑neutral": 15,
      "model risk": 10,
      "execution risk": 10,
      "crowding risk": 10
    },
    "expectedStructure": [
      "Definition of statistical arbitrage",
      "Pairs‑trading steps (selection, testing, signal, exit)",
      "Key risks with examples",
      "Brief mention of modern extensions"
    ],
    "detailedAnalysis": {
      "overview": "This question evaluates a candidate's grasp of quantitative trading strategies, risk management, and practical implementation challenges. It is common in hedge‑fund, proprietary trading, and quant research interviews.",
      "whyWorks": "A strong answer combines theoretical concepts (cointegration, stationarity) with concrete trading mechanics (Z‑score, position sizing) and a thorough discussion of risks. It shows awareness of both classical and contemporary approaches.",
      "commonMistakes": "1. Confusing statistical arbitrage with pure arbitrage (risk‑free). 2. Failing to mention cointegration testing. 3. Overlooking transaction costs and liquidity constraints. 4. Not addressing regime‑change risk. 5. Describing pairs‑trading without quantifying the entry/exit thresholds.",
      "improvementTips": "1. Provide a simple numerical example of Z‑score calculation. 2. Discuss how to hedge out sector or factor exposures beyond simple dollar neutrality. 3. Mention how high‑frequency data and alternative data (sentiment, web traffic) are used in modern stat arb. 4. Reference real‑world episodes where pairs broke down (e.g., during the 2008 financial crisis)."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:59:00Z",
      "confidence": "high",
      "sources": [
        "Pairs Trading: Quantitative Methods and Analysis (Ganapathy Vidyamurthy)",
        "Advances in Financial Machine Learning (López de Prado)",
        "Journal of Finance articles on cointegration",
        "Risk management chapters in quant handbooks"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 75,
        "differentiation": 90,
        "sourceAuthority": 85,
        "answerClarity": 80,
        "marketRelevance": 90,
        "regionalApplicability": 80,
        "difficulty": 80
      },
      "weightedScore": 83.75,
      "starRating": 4,
      "tags": [
        "理解题",
        "权威题",
        "热点题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "Statistical Arbitrage (Stat Arb) is a quantitative trading strategy that seeks to profit from temporary mispricings between related securities, using statistical and econometric models to identify and exploit these deviations. It is generally market‑neutral and high‑frequency in nature.\n\nCore Concept: Stat arb assumes that prices of related assets (e.g., stocks in the same sector, ETFs and their constituents, futures and spot) exhibit a stable long‑run relationship. When the spread between them widens beyond historical norms, the strategy bets on mean reversion.\n\nPairs‑Trading Example:\n1. Pair Selection: Identify two stocks (e.g., Coca‑Cola and Pepsi) that historically move together due to similar fundamentals, market exposure, or industry dynamics.\n2. Cointegration Test: Use statistical tests (Engle‑Granger, Johansen) to verify that the price ratio or spread is stationary—i.e., it reverts to a long‑term mean.\n3. Trading Signal: Calculate the spread Z‑score:\n   Z = (Spread – Mean(Spread)) / Std(Spread)\n   When Z exceeds a threshold (e.g., +2), the spread is considered abnormally wide: short the outperformer and long the underperformer. When Z falls below a threshold (e.g., –2), do the opposite.\n4. Position Sizing: Size positions to be dollar‑neutral or beta‑neutral, minimizing exposure to broad market moves.\n5. Exit: Unwind the pair when the spread reverts to its mean (Z ≈ 0) or when a stop‑loss is triggered.\n\nKey Risks:\n1. Model Risk: The historical relationship may break down due to structural changes (e.g., merger, regulatory shift, technology disruption). Cointegration is not a permanent property.\n2. Execution & Liquidity Risk: High trading frequency demands low latency and tight spreads; illiquid stocks can incur significant slippage.\n3. Divergence Risk (\"Black Swan\"): The spread may continue to widen instead of reverting, leading to large losses. This is especially acute during market crises when correlations spike.\n4. Crowding Risk: Many quant funds run similar strategies, causing signals to decay and increasing competition for alpha.\n5. Transaction Costs: Frequent rebalancing erodes profits; commissions, bid‑ask spreads, and financing costs must be carefully managed.\n6. Regulatory Risk: Changes in short‑selling rules or transaction taxes can impair strategy viability.\n\nExtensions & Modern Variants:\n- Multi‑factor Models: Use cross‑sectional signals (value, momentum, quality) to rank thousands of stocks and go long the top quintile, short the bottom quintile.\n- Machine‑Learning Approaches: Apply random forests, neural networks, or reinforcement learning to predict short‑term price movements from high‑dimensional data.\n- ETF Arbitrage: Exploit mispricings between an ETF and its underlying basket via creation/redemption mechanisms.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Pairs‑Trading Example\n• Pair Selection: Identify two stocks (e.g., Coca‑Cola and Pepsi) that historically move together due to similar fundamentals, market exposure, or industry dynamics.\n• Cointegration Test: Use statistical tests (Engle‑Granger, Johansen) to verify that the price ratio or spread is stationary—i.e., it reverts to a long‑term mean.\n• Trading Signal: Calculate the spread Z‑score",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1031,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Three Financial Statements",
    "question": "Walk me through the three financial statements and explain how they are interconnected.",
    "modelAnswer": "The three core financial statements are the Income Statement, Balance Sheet, and Statement of Cash Flows.\n\n1. Income Statement: Shows a company's profitability over a period (e.g., quarter or year). It starts with Revenue, subtracts Cost of Goods Sold (COGS) to get Gross Profit. Then operating expenses (SG&A, R&D) are deducted to arrive at Operating Income (EBIT). After subtracting interest and taxes, we get Net Income.\n\n2. Balance Sheet: Provides a snapshot of a company's financial position at a specific point in time. It follows the equation: Assets = Liabilities + Equity. Assets are categorized as Current (cash, accounts receivable, inventory) and Non‑Current (PP&E, intangible assets). Liabilities include Current (accounts payable, short‑term debt) and Non‑Current (long‑term debt). Equity consists of contributed capital and retained earnings (which link to the Income Statement via net income).\n\n3. Statement of Cash Flows: Reconciles net income to the actual cash generated or used during the period. It has three sections: Operating Activities (adjusts net income for non‑cash items and changes in working capital), Investing Activities (cash used for capital expenditures, acquisitions, or proceeds from asset sales), and Financing Activities (cash from issuing debt/equity, repurchases, dividends).\n\nInterconnections:\n- Net Income from the Income Statement flows into Retained Earnings on the Balance Sheet and is the starting point for the Operating Cash Flow section.\n- Changes in Balance Sheet items (e.g., accounts receivable, inventory, accounts payable) appear in the Operating Cash Flow as working‑capital adjustments.\n- Capital expenditures (Investing Cash Flow) increase PP&E on the Balance Sheet.\n- Debt issuances/repayments (Financing Cash Flow) affect the debt balances on the Balance Sheet.\n- The ending cash balance on the Statement of Cash Flows equals the Cash line on the Balance Sheet.",
    "scoringKeywords": {
      "Income Statement": 20,
      "Balance Sheet": 20,
      "Statement of Cash Flows": 20,
      "interconnections": 20,
      "working capital": 10,
      "retained earnings": 10
    },
    "expectedStructure": [
      "Describe each statement's purpose and key line items",
      "Explain the accounting equation for Balance Sheet",
      "Detail the three sections of Cash Flow Statement",
      "Highlight at least three concrete linkages between statements"
    ],
    "detailedAnalysis": {
      "overview": "This is a fundamental technical question asked in virtually every investment banking and equity research interview. It tests the candidate's grasp of accounting basics and their ability to see how financial statements fit together.",
      "whyWorks": "A strong answer not only lists the three statements but also clearly explains how they connect—showing the candidate understands the integrated nature of financial reporting. Mentioning specific line items (e.g., depreciation, changes in working capital) adds depth.",
      "commonMistakes": "1. Describing the statements in isolation without explaining linkages. 2. Confusing cash flow from operations with net income. 3. Omitting the role of retained earnings as the bridge between income statement and balance sheet. 4. Misstating the order or purpose of the cash flow sections.",
      "improvementTips": "1. Use a simple numeric example (even hypothetical) to illustrate the connections. 2. Reference how analysts use these linkages in financial modeling (e.g., building a three‑statement model). 3. Mention how different accounting standards (US GAAP vs. IFRS) may affect presentation."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:52:00Z",
      "confidence": "high",
      "sources": [
        "CFA Level I Financial Reporting & Analysis",
        "Investment Banking Interview Guide (Rosenbaum & Pearl)",
        "Wall Street Prep Accounting Fundamentals"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 95,
        "differentiation": 80,
        "sourceAuthority": 90,
        "answerClarity": 85,
        "marketRelevance": 90,
        "regionalApplicability": 95,
        "difficulty": 40
      },
      "weightedScore": 86.75,
      "starRating": 4,
      "tags": [
        "高频题",
        "理解题",
        "明确题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "The three core financial statements are the Income Statement, Balance Sheet, and Statement of Cash Flows.\n\n1. Income Statement: Shows a company's profitability over a period (e.g., quarter or year). It starts with Revenue, subtracts Cost of Goods Sold (COGS) to get Gross Profit. Then operating expenses (SG&A, R&D) are deducted to arrive at Operating Income (EBIT). After subtracting interest and taxes, we get Net Income.\n\n2. Balance Sheet: Provides a snapshot of a company's financial position at a specific point in time. It follows the equation: Assets = Liabilities + Equity. Assets are categorized as Current (cash, accounts receivable, inventory) and Non‑Current (PP&E, intangible assets). Liabilities include Current (accounts payable, short‑term debt) and Non‑Current (long‑term debt). Equity consists of contributed capital and retained earnings (which link to the Income Statement via net income).\n\n3. Statement of Cash Flows: Reconciles net income to the actual cash generated or used during the period. It has three sections: Operating Activities (adjusts net income for non‑cash items and changes in working capital), Investing Activities (cash used for capital expenditures, acquisitions, or proceeds from asset sales), and Financing Activities (cash from issuing debt/equity, repurchases, dividends).\n\nInterconnections:\n- Net Income from the Income Statement flows into Retained Earnings on the Balance Sheet and is the starting point for the Operating Cash Flow section.\n- Changes in Balance Sheet items (e.g., accounts receivable, inventory, accounts payable) appear in the Operating Cash Flow as working‑capital adjustments.\n- Capital expenditures (Investing Cash Flow) increase PP&E on the Balance Sheet.\n- Debt issuances/repayments (Financing Cash Flow) affect the debt balances on the Balance Sheet.\n- The ending cash balance on the Statement of Cash Flows equals the Cash line on the Balance Sheet.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Income Statement: Shows a company's profitability over a period (e.g., quarter or year). It starts with Revenue, subtracts Cost of Goods Sold (COGS) to get Gross Profit. Then operating expenses (SG&A, R&D) are deducted to arrive at Operating Income (EBIT). After subtracting interest and taxes, we get Net Income.\n• Balance Sheet: Provides a snapshot of a company's financial position at a specific",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1032,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "easy",
    "title": "Why Investment Banking?",
    "question": "Why do you want to work in investment banking, and what skills do you think are essential to succeed?",
    "modelAnswer": "I am drawn to investment banking for three core reasons:\n\n1. Intellectual Challenge & Exposure: Banking provides front‑row exposure to high‑stakes corporate transactions (M&A, capital raises, restructurings). The opportunity to work on complex financial models, valuation analyses, and strategic advisement appeals to my analytical mindset and desire to continuously learn.\n\n2. Accelerated Learning Curve: The steep learning environment, mentorship from senior bankers, and breadth of industries covered offer an unparalleled foundation in finance. This platform is ideal for building technical skills, business acumen, and professional network early in one's career.\n\n3. Impact & Tangible Outcomes: Advising clients on transformative deals—whether helping a company go public, facilitating a cross‑border acquisition, or rescuing a distressed business—creates measurable economic impact. Seeing a transaction close delivers a concrete sense of accomplishment.\n\nEssential Skills for Success:\n- Technical Rigor: Mastery of accounting, valuation (DCF, comparables, precedent transactions), and financial modeling. Ability to quickly analyze financial statements and build accurate, flexible models.\n- Attention to Detail: In a business where small errors can have material consequences, meticulousness in numbers, presentations, and legal documents is non‑negotiable.\n- Resilience & Work Ethic: The hours are demanding; sustaining high performance under pressure and tight deadlines requires mental stamina and discipline.\n- Communication & Client Management: Distilling complex analyses into clear, concise presentations for clients and senior management. Building trust and managing expectations throughout a deal process.\n- Team Collaboration: Banking is a team sport; being a reliable, supportive colleague who can both lead and follow is critical.\n- Commercial Awareness: Understanding industry dynamics, competitive landscapes, and what drives value for clients beyond spreadsheets.",
    "scoringKeywords": {
      "intellectual challenge": 15,
      "learning curve": 15,
      "impact": 15,
      "technical skills": 20,
      "attention to detail": 15,
      "resilience": 10,
      "communication": 10
    },
    "expectedStructure": [
      "Motivations (typically 2–3 clear reasons)",
      "Specific skills required",
      "Link personal attributes to those skills",
      "Demonstrate awareness of realities (hours, pressure)"
    ],
    "detailedAnalysis": {
      "overview": "This is a classic behavioral question asked in virtually every investment banking interview. It tests the candidate's self‑awareness, understanding of the role, and alignment with the profession's demands.",
      "whyWorks": "A compelling answer balances enthusiasm for the work with a realistic appraisal of the challenges. It should be personalized (avoid clichés like \"fast‑paced environment\") and connect the candidate's own experiences to the required skills.",
      "commonMistakes": "1. Giving generic, rehearsed answers (\"I love Excel\"). 2. Focusing only on exit opportunities (\"banking is a stepping stone\"). 3. Underestimating the intensity of the hours. 4. Failing to mention specific technical skills. 5. Appearing naïve about the day‑to‑day work.",
      "improvementTips": "1. Reference a recent deal the bank worked on that sparked your interest. 2. Mention a specific skill you've developed (e.g., building a three‑statement model) and how it relates. 3. Acknowledge the sacrifices but explain why the trade‑off is worth it for you. 4. Tailor the answer to the firm's strengths (e.g., sector focus, geographic footprint)."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:55:00Z",
      "confidence": "high",
      "sources": [
        "Vault Guide to Investment Banking Interviews",
        "Mergers & Inquisitions Interview Guide",
        "Wall Street Oasis forums"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 95,
        "differentiation": 70,
        "sourceAuthority": 75,
        "answerClarity": 90,
        "marketRelevance": 85,
        "regionalApplicability": 90,
        "difficulty": 30
      },
      "weightedScore": 81.5,
      "starRating": 4,
      "tags": [
        "高频题",
        "明确题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "I am drawn to investment banking for three core reasons:\n\n1. Intellectual Challenge & Exposure: Banking provides front‑row exposure to high‑stakes corporate transactions (M&A, capital raises, restructurings). The opportunity to work on complex financial models, valuation analyses, and strategic advisement appeals to my analytical mindset and desire to continuously learn.\n\n2. Accelerated Learning Curve: The steep learning environment, mentorship from senior bankers, and breadth of industries covered offer an unparalleled foundation in finance. This platform is ideal for building technical skills, business acumen, and professional network early in one's career.\n\n3. Impact & Tangible Outcomes: Advising clients on transformative deals—whether helping a company go public, facilitating a cross‑border acquisition, or rescuing a distressed business—creates measurable economic impact. Seeing a transaction close delivers a concrete sense of accomplishment.\n\nEssential Skills for Success:\n- Technical Rigor: Mastery of accounting, valuation (DCF, comparables, precedent transactions), and financial modeling. Ability to quickly analyze financial statements and build accurate, flexible models.\n- Attention to Detail: In a business where small errors can have material consequences, meticulousness in numbers, presentations, and legal documents is non‑negotiable.\n- Resilience & Work Ethic: The hours are demanding; sustaining high performance under pressure and tight deadlines requires mental stamina and discipline.\n- Communication & Client Management: Distilling complex analyses into clear, concise presentations for clients and senior management. Building trust and managing expectations throughout a deal process.\n- Team Collaboration: Banking is a team sport; being a reliable, supportive colleague who can both lead and follow is critical.\n- Commercial Awareness: Understanding industry dynamics, competitive landscapes, and what drives value for clients beyond spreadsheets.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Intellectual Challenge & Exposure: Banking provides front‑row exposure to high‑stakes corporate transactions (M&A, capital raises, restructurings). The opportunity to work on complex financial models, valuation analyses, and strategic advisement appeals to my analytical mindset and desire to continuously learn.\n\n• Accelerated Learning Curve: The steep learning environment, mentorship from senior bankers, and breadth of industries covered offer an unparalleled foundation in finance. This platform is ideal for building technical skills, business acumen, and professional network early in one's career.\n\n• Impact & Tangible Outcomes: Advising clients on transformative deals—whether helping a company go public, facilitating a cross‑border acquisition, or rescuing a distressed business—creates measurable economic impact. Seeing a transaction close delivers a concrete sense of accomplishment.\n  - Technical Rigor: Mastery of accounting, valuation (DCF, comparables, precedent transactions), and financial modeling. Ability to quickly analyze financial statements and build accurate, flexible models.\n  - Attention to Detail: In a business where small errors can have material consequences, meticulousness in numbers, presentations, and legal documents is non‑negotiable.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1033,
    "role": "ib",
    "category": "technical",
    "difficulty": "hard",
    "title": "DCF Walkthrough",
    "question": "Walk me through a discounted cash flow (DCF) valuation from start to finish.",
    "modelAnswer": "A DCF values a company by projecting its unlevered free cash flows (UFCF) and discounting them back to present value using the weighted average cost of capital (WACC). The steps are:\n\n1. Project Revenue & Expenses: Build a financial model forecasting the income statement, usually 5–10 years. Start with revenue growth assumptions, then model COGS, operating expenses, depreciation, and taxes to arrive at EBIT.\n\n2. Calculate Unlevered Free Cash Flow (UFCF):\n   UFCF = EBIT × (1 – Tax Rate) + Depreciation & Amortization – Capital Expenditures – Change in Net Working Capital.\n   This represents cash available to all investors (debt and equity).\n\n3. Estimate Terminal Value: Beyond the explicit forecast period, we assume the business grows at a perpetual rate (g). Use the Gordon Growth Model:\n   Terminal Value = UFCF in final year × (1 + g) ÷ (WACC – g).\n   Alternatively, apply an exit multiple (e.g., EV/EBITDA) based on comparable companies.\n\n4. Determine Discount Rate (WACC):\n   WACC = (E/V × Re) + (D/V × Rd × (1 – Tax Rate))\n   Where:\n   - E = market value of equity, D = market value of debt, V = E + D\n   - Re = cost of equity (calculated via CAPM: Risk‑Free Rate + Beta × Equity Risk Premium)\n   - Rd = cost of debt (approximated by the yield on the company's debt)\n\n5. Discount Cash Flows: Discount each projected UFCF and the terminal value back to present value using WACC.\n   PV = Σ (UFCF_t / (1 + WACC)^t) + Terminal Value / (1 + WACC)^n\n\n6. Arrive at Enterprise Value (EV): Sum of the present values equals the enterprise value. \n\n7. Derive Equity Value: Subtract net debt (total debt minus cash) and add/minus other non‑operating items to get equity value. Divide by diluted shares outstanding to obtain share price.\n\n8. Sensitivity Analysis: Vary key assumptions (WACC, growth rate, exit multiple) to create a valuation range.",
    "scoringKeywords": {
      "Unlevered Free Cash Flow": 25,
      "WACC": 20,
      "Terminal Value": 20,
      "Enterprise Value": 15,
      "CAPM": 10,
      "sensitivity analysis": 10
    },
    "expectedStructure": [
      "Build financial projections",
      "Calculate UFCF",
      "Estimate terminal value",
      "Determine WACC",
      "Discount cash flows",
      "Derive equity value",
      "Perform sensitivity analysis"
    ],
    "detailedAnalysis": {
      "overview": "The DCF is a core valuation technique tested in investment banking, private equity, and equity research interviews. A structured walk‑through demonstrates technical rigor and understanding of value drivers.",
      "whyWorks": "This answer covers each step in logical order, explains the purpose of each component, and highlights critical formulas. It also mentions sensitivity analysis, showing awareness of real‑world application.",
      "commonMistakes": "1. Confusing levered vs. unlevered cash flows. 2. Using inconsistent tax rates (marginal vs. effective). 3. Forgetting to subtract net working capital changes. 4. Applying terminal growth rate greater than WACC (which breaks the Gordon Growth Model). 5. Neglecting to convert enterprise value to equity value.",
      "improvementTips": "1. Illustrate with a simple numerical example (even with placeholder numbers). 2. Discuss how WACC assumptions differ for high‑growth vs. stable companies. 3. Mention alternatives like APV (Adjusted Present Value) for leveraged buyouts. 4. Reference how DCF is used in M&A to assess accretion/dilution."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:53:00Z",
      "confidence": "high",
      "sources": [
        "Investment Banking: Valuation, LBOs, M&A (Rosenbaum & Pearl)",
        "Damodaran on Valuation",
        "Wall Street Prep DCF Modeling Guide"
      ],
      "needsReview": false,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 90,
        "differentiation": 85,
        "sourceAuthority": 95,
        "answerClarity": 80,
        "marketRelevance": 95,
        "regionalApplicability": 90,
        "difficulty": 70
      },
      "weightedScore": 87.5,
      "starRating": 4,
      "tags": [
        "高频题",
        "理解题",
        "权威题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "A DCF values a company by projecting its unlevered free cash flows (UFCF) and discounting them back to present value using the weighted average cost of capital (WACC). The steps are:\n\n1. Project Revenue & Expenses: Build a financial model forecasting the income statement, usually 5–10 years. Start with revenue growth assumptions, then model COGS, operating expenses, depreciation, and taxes to arrive at EBIT.\n\n2. Calculate Unlevered Free Cash Flow (UFCF):\n   UFCF = EBIT × (1 – Tax Rate) + Depreciation & Amortization – Capital Expenditures – Change in Net Working Capital.\n   This represents cash available to all investors (debt and equity).\n\n3. Estimate Terminal Value: Beyond the explicit forecast period, we assume the business grows at a perpetual rate (g). Use the Gordon Growth Model:\n   Terminal Value = UFCF in final year × (1 + g) ÷ (WACC – g).\n   Alternatively, apply an exit multiple (e.g., EV/EBITDA) based on comparable companies.\n\n4. Determine Discount Rate (WACC):\n   WACC = (E/V × Re) + (D/V × Rd × (1 – Tax Rate))\n   Where:\n   - E = market value of equity, D = market value of debt, V = E + D\n   - Re = cost of equity (calculated via CAPM: Risk‑Free Rate + Beta × Equity Risk Premium)\n   - Rd = cost of debt (approximated by the yield on the company's debt)\n\n5. Discount Cash Flows: Discount each projected UFCF and the terminal value back to present value using WACC.\n   PV = Σ (UFCF_t / (1 + WACC)^t) + Terminal Value / (1 + WACC)^n\n\n6. Arrive at Enterprise Value (EV): Sum of the present values equals the enterprise value. \n\n7. Derive Equity Value: Subtract net debt (total debt minus cash) and add/minus other non‑operating items to get equity value. Divide by diluted shares outstanding to obtain share price.\n\n8. Sensitivity Analysis: Vary key assumptions (WACC, growth rate, exit multiple) to create a valuation range.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Project Revenue & Expenses: Build a financial model forecasting the income statement, usually 5–10 years. Start with revenue growth assumptions, then model COGS, operating expenses, depreciation, and taxes to arrive at EBIT.\n• Calculate Unlevered Free Cash Flow (UFCF)\n• Estimate Terminal Value: Beyond the explicit forecast period, we assume the business grows at a perpetual rate (g). Use the Gor",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1034,
    "role": "am",
    "category": "market",
    "difficulty": "medium",
    "title": "Current Market View",
    "question": "What is your view on the current equity market, and what are the key risks and opportunities you see?",
    "modelAnswer": "My baseline view is that the equity market in early 2026 is in a late‑cycle expansion phase, characterized by moderate growth, elevated valuations, and heightened sensitivity to policy shifts.\n\nSupportive Factors (Opportunities):\n1. Earnings Resilience: Corporate earnings have generally held up despite earlier recession fears, supported by pricing power and efficiency gains from digital transformation.\n2. Monetary Policy Pivot: Major central banks have shifted from tightening to a neutral or easing stance, lowering discount rates and supporting equity valuations.\n3. Innovation‑Led Growth: Artificial intelligence adoption is driving productivity improvements across sectors, creating new revenue streams and margin expansion for tech and industrial companies.\n4. Geographic Diversification: Strong growth in emerging markets (especially India, Southeast Asia) offers diversification benefits and exposure to faster GDP expansion.\n5. Sector‑Specific Tailwinds:\n   - Healthcare: Aging demographics and biotech breakthroughs.\n   - Renewables & Infrastructure: Government incentives and energy‑security concerns.\n   - Financials: Higher net interest margins as rates stabilize.\n\nKey Risks (Challenges):\n1. Valuation Stretch: Many market segments (e.g., mega‑cap tech) trade at premiums to historical averages, leaving limited margin of safety if growth disappoints.\n2. Geopolitical Uncertainty: Ongoing tensions in Eastern Europe, the Middle East, and the South China Sea could disrupt supply chains and commodity prices.\n3. Inflation Stickiness: Core services inflation remains above central‑bank targets in several economies, risking a re‑acceleration that could force renewed tightening.\n4. Corporate Debt Burden: Higher interest expenses may pressure highly leveraged companies, especially in cyclical sectors.\n5. Concentration Risk: Market returns are increasingly driven by a handful of large‑cap stocks, reducing diversification benefits.\n6. Regulatory Overhang: Antitrust, data‑privacy, and ESG‑related regulations could impose new costs on certain industries.\n\nInvestment Implications:\n- Focus on Quality: Seek companies with strong balance sheets, sustainable competitive advantages, and pricing power.\n- Barbell Approach: Combine defensive sectors (utilities, consumer staples) with selective exposure to secular growth themes (AI, healthcare innovation).\n- Active Management: In a dispersion‑rich environment, stock‑picking and sector rotation can add value over passive indexing.\n- Risk Management: Maintain adequate cash levels to deploy during corrections, and consider hedging via options or defensive asset classes.",
    "scoringKeywords": {
      "late‑cycle expansion": 15,
      "earnings resilience": 15,
      "monetary policy": 15,
      "valuation stretch": 15,
      "geopolitical risk": 15,
      "sector tailwinds": 10,
      "concentration risk": 10,
      "investment implications": 5
    },
    "expectedStructure": [
      "Overall market phase",
      "Supportive factors (opportunities)",
      "Key risks",
      "Sector‑specific insights",
      "Actionable implications"
    ],
    "detailedAnalysis": {
      "overview": "This question tests a candidate's ability to synthesize macroeconomic, fundamental, and market‑structure insights into a coherent investment view. It is common for equity research, asset management, and hedge‑fund interviews.",
      "whyWorks": "A strong answer balances optimism with caution, cites concrete drivers (e.g., central‑bank policy, earnings trends), and translates the view into practical portfolio decisions. It demonstrates both macro awareness and bottom‑up thinking.",
      "commonMistakes": "1. Presenting a one‑sided view (only bullish or only bearish). 2. Using vague clichés (\"markets are uncertain\"). 3. Failing to mention specific sectors or regions. 4. Not linking risks to potential portfolio actions. 5. Being overly reliant on past performance narratives.",
      "improvementTips": "1. Reference recent economic data (e.g., CPI prints, PMI figures) to anchor the view. 2. Compare current valuations to historical ranges (e.g., Shiller P/E). 3. Discuss how your view differs from consensus. 4. Mention how you would adjust the view if a key assumption (e.g., Fed cuts) changes."
    },
    "metadata": {
      "generatedBy": "finterview_english_expert",
      "generatedAt": "2026-03-10T01:57:00Z",
      "confidence": "medium",
      "sources": [
        "Goldman Sachs Investment Strategy Report",
        "J.P. Morgan Guide to the Markets",
        "BlackRock Investment Institute Outlook",
        "Bloomberg Market Analysis"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 90,
        "differentiation": 80,
        "sourceAuthority": 85,
        "answerClarity": 80,
        "marketRelevance": 95,
        "regionalApplicability": 85,
        "difficulty": 60
      },
      "weightedScore": 84.75,
      "starRating": 4,
      "tags": [
        "热点题",
        "理解题",
        "权威题"
      ]
    },
    "entryLevel": false,
    "stars": 4,
    "answers": {
      "detailed": {
        "answer": "My baseline view is that the equity market in early 2026 is in a late‑cycle expansion phase, characterized by moderate growth, elevated valuations, and heightened sensitivity to policy shifts.\n\nSupportive Factors (Opportunities):\n1. Earnings Resilience: Corporate earnings have generally held up despite earlier recession fears, supported by pricing power and efficiency gains from digital transformation.\n2. Monetary Policy Pivot: Major central banks have shifted from tightening to a neutral or easing stance, lowering discount rates and supporting equity valuations.\n3. Innovation‑Led Growth: Artificial intelligence adoption is driving productivity improvements across sectors, creating new revenue streams and margin expansion for tech and industrial companies.\n4. Geographic Diversification: Strong growth in emerging markets (especially India, Southeast Asia) offers diversification benefits and exposure to faster GDP expansion.\n5. Sector‑Specific Tailwinds:\n   - Healthcare: Aging demographics and biotech breakthroughs.\n   - Renewables & Infrastructure: Government incentives and energy‑security concerns.\n   - Financials: Higher net interest margins as rates stabilize.\n\nKey Risks (Challenges):\n1. Valuation Stretch: Many market segments (e.g., mega‑cap tech) trade at premiums to historical averages, leaving limited margin of safety if growth disappoints.\n2. Geopolitical Uncertainty: Ongoing tensions in Eastern Europe, the Middle East, and the South China Sea could disrupt supply chains and commodity prices.\n3. Inflation Stickiness: Core services inflation remains above central‑bank targets in several economies, risking a re‑acceleration that could force renewed tightening.\n4. Corporate Debt Burden: Higher interest expenses may pressure highly leveraged companies, especially in cyclical sectors.\n5. Concentration Risk: Market returns are increasingly driven by a handful of large‑cap stocks, reducing diversification benefits.\n6. Regulatory Overhang: Antitrust, data‑privacy, and ESG‑related regulations could impose new costs on certain industries.\n\nInvestment Implications:\n- Focus on Quality: Seek companies with strong balance sheets, sustainable competitive advantages, and pricing power.\n- Barbell Approach: Combine defensive sectors (utilities, consumer staples) with selective exposure to secular growth themes (AI, healthcare innovation).\n- Active Management: In a dispersion‑rich environment, stock‑picking and sector rotation can add value over passive indexing.\n- Risk Management: Maintain adequate cash levels to deploy during corrections, and consider hedging via options or defensive asset classes.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Earnings Resilience: Corporate earnings have generally held up despite earlier recession fears, supported by pricing power and efficiency gains from digital transformation.\n\n• Monetary Policy Pivot: Major central banks have shifted from tightening to a neutral or easing stance, lowering discount rates and supporting equity valuations.\n\n• Innovation‑Led Growth: Artificial intelligence adoption is driving productivity improvements across sectors, creating new revenue streams and margin expansion for tech and industrial companies.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1035,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Investment Banking Role",
    "question": "What are the main functions of an investment bank?",
    "modelAnswer": "Investment banks primarily assist corporations and governments with capital raising, mergers and acquisitions (M&A), and advisory services. Key functions: 1) Underwriting securities (IPOs, bonds) to raise capital. 2) Providing M&A advice (valuations, negotiations, due diligence). 3) Sales and trading of securities for institutional clients. 4) Research on companies and markets. For example, an investment bank might help a company go public by pricing its shares and marketing to investors. Common mistakes: confusing investment banking with commercial banking (lending), or overstating the role of proprietary trading (now limited post‑2008).",
    "scoringKeywords": [
      "capital raising",
      "M&A",
      "underwriting",
      "advisory",
      "sales and trading"
    ],
    "detailedAnalysis": {
      "overview": "This basic question ensures candidates understand the core business lines of an investment bank.",
      "commonMistakes": "Omitting research or sales/trading, or describing retail banking services."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "easy",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Investment banks primarily assist corporations and governments with capital raising, mergers and acquisitions (M&A), and advisory services. Key functions: 1) Underwriting securities (IPOs, bonds) to raise capital. 2) Providing M&A advice (valuations, negotiations, due diligence). 3) Sales and trading of securities for institutional clients. 4) Research on companies and markets. For example, an investment bank might help a company go public by pricing its shares and marketing to investors. Common mistakes: confusing investment banking with commercial banking (lending), or overstating the role of proprietary trading (now limited post‑2008).",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Key functions: 1) Underwriting securities (IPOs, bonds) to raise capital\n• 2) Providing M&A advice (valuations, negotiations, due diligence)\n• 3) Sales and trading of securities for institutional clients\n• 4) Research on companies and markets",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1036,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Bond Pricing Concepts",
    "question": "What are the key factors that affect bond prices?",
    "modelAnswer": "Bond prices are primarily influenced by interest rates, credit risk, and time to maturity. When market interest rates rise, existing bond prices fall (inverse relationship). Higher credit risk (lower rating) leads to lower prices due to higher required yield. Longer maturity bonds are more sensitive to interest rate changes. For example, a 10-year Treasury bond price will drop more than a 2-year bond if rates increase. Common entry-level errors: thinking bond prices move in the same direction as rates, or confusing yield with coupon rate.",
    "scoringKeywords": [
      "interest rates",
      "credit risk",
      "maturity",
      "yield",
      "inverse relationship"
    ],
    "detailedAnalysis": {
      "overview": "Understanding bond pricing is fundamental for fixed income and broader market analysis.",
      "commonMistakes": "Failing to articulate the inverse rate-price relationship, not distinguishing between coupon and yield to maturity."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "easy",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Bond prices are primarily influenced by interest rates, credit risk, and time to maturity. When market interest rates rise, existing bond prices fall (inverse relationship). Higher credit risk (lower rating) leads to lower prices due to higher required yield. Longer maturity bonds are more sensitive to interest rate changes. For example, a 10-year Treasury bond price will drop more than a 2-year bond if rates increase. Common entry-level errors: thinking bond prices move in the same direction as rates, or confusing yield with coupon rate.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Bond prices are primarily influenced by interest rates, credit risk, and time to maturity\n• When market interest rates rise, existing bond prices fall (inverse relationship)\n• Higher credit risk (lower rating) leads to lower prices due to higher required yield\n• Longer maturity bonds are more sensitive to interest rate changes",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1037,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Market Trends (Simple)",
    "question": "How would you describe the current trend in the stock market? What indicators would you look at?",
    "modelAnswer": "To gauge market trend, I'd examine price movements, trading volume, and key economic indicators. An uptrend is marked by higher highs and higher lows on major indices like the S&P 500, supported by strong volume. Down trends show lower highs and lower lows. I'd also check moving averages (e.g., 50-day vs 200-day), investor sentiment, and macroeconomic data like GDP growth and inflation. For example, a sustained break above the 200-day moving average often signals bullish momentum. Common mistakes: relying solely on short-term price moves, ignoring volume confirmation, or confusing market noise with a genuine trend.",
    "scoringKeywords": [
      "uptrend",
      "moving averages",
      "trading volume",
      "market indices",
      "economic indicators"
    ],
    "detailedAnalysis": {
      "overview": "This question tests basic market analysis skills. Entry-level candidates should know simple trend concepts and common indicators.",
      "commonMistakes": "Overcomplicating with advanced technical analysis, or failing to mention both price and volume."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "medium",
      "importance": "medium",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timely"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "To gauge market trend, I'd examine price movements, trading volume, and key economic indicators. An uptrend is marked by higher highs and higher lows on major indices like the S&P 500, supported by strong volume. Down trends show lower highs and lower lows. I'd also check moving averages (e.g., 50-day vs 200-day), investor sentiment, and macroeconomic data like GDP growth and inflation. For example, a sustained break above the 200-day moving average often signals bullish momentum. Common mistakes: relying solely on short-term price moves, ignoring volume confirmation, or confusing market noise with a genuine trend.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• To gauge market trend, I'd examine price movements, trading volume, and key economic indicators\n• Down trends show lower highs and lower lows\n• For example, a sustained break above the 200-day moving average often signals bullish momentum",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1038,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "medium",
    "title": "Career Goals",
    "question": "Where do you see yourself in 5 years?",
    "modelAnswer": "In five years, I aim to be a seasoned associate or vice president, having developed deep expertise in M&A or capital markets. I hope to have led several transactions end‑to‑end, managed client relationships, and mentored junior analysts. I also plan to pursue the CFA charter to strengthen my analytical foundation. This role is a critical stepping stone because it offers unparalleled technical training and exposure to senior decision‑makers. Ultimately, I want to contribute to the firm's success while growing into a leadership position. Common mistakes: being too vague ('in a managerial role'), mentioning unrelated career paths, or sounding like you'll leave the firm quickly.",
    "scoringKeywords": [
      "associate",
      "expertise",
      "transactions",
      "mentorship",
      "CFA"
    ],
    "detailedAnalysis": {
      "overview": "This question assesses ambition, realism, and alignment with the firm's career path.",
      "commonMistakes": "Over‑specific titles that may not exist, ignoring the need for continuous learning, or failing to connect goals to the current role."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "In five years, I aim to be a seasoned associate or vice president, having developed deep expertise in M&A or capital markets. I hope to have led several transactions end‑to‑end, managed client relationships, and mentored junior analysts. I also plan to pursue the CFA charter to strengthen my analytical foundation. This role is a critical stepping stone because it offers unparalleled technical training and exposure to senior decision‑makers. Ultimately, I want to contribute to the firm's success while growing into a leadership position. Common mistakes: being too vague ('in a managerial role'), mentioning unrelated career paths, or sounding like you'll leave the firm quickly.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• In five years, I aim to be a seasoned associate or vice president, having developed deep expertise in M&A or capital markets.\n• I hope to have led several transactions end‑to‑end, managed client relationships, and mentored junior analysts.\n• I also plan to pursue the CFA charter to strengthen my analytical foundation.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1039,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "medium",
    "title": "Problem-Solving Example",
    "question": "Describe a complex problem you solved and the steps you took.",
    "modelAnswer": "During an internship, our team discovered a data inconsistency in a client report the night before delivery. The problem was that two sources showed different revenue figures. I first verified the data sources and identified a timing mismatch: one dataset included pending orders while the other did not. I reconciled the numbers by aligning the cut‑off dates and created a clear footnote explaining the difference. Then I proposed a process to flag such mismatches earlier. The client received an accurate, transparent report on time. This experience taught me to diagnose root causes before jumping to solutions. Common mistakes: describing a trivial problem, skipping the thought process, or not highlighting the outcome.",
    "scoringKeywords": [
      "data reconciliation",
      "root cause analysis",
      "process improvement",
      "timely delivery",
      "client communication"
    ],
    "detailedAnalysis": {
      "overview": "Problem‑solving is a core competency. The answer should follow a logical structure and demonstrate analytical thinking.",
      "commonMistakes": "Focusing only on the solution without explaining the problem, or using a personal rather than professional example."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "During an internship, our team discovered a data inconsistency in a client report the night before delivery. The problem was that two sources showed different revenue figures. I first verified the data sources and identified a timing mismatch: one dataset included pending orders while the other did not. I reconciled the numbers by aligning the cut‑off dates and created a clear footnote explaining the difference. Then I proposed a process to flag such mismatches earlier. The client received an accurate, transparent report on time. This experience taught me to diagnose root causes before jumping to solutions. Common mistakes: describing a trivial problem, skipping the thought process, or not highlighting the outcome.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• During an internship, our team discovered a data inconsistency in a client report the night before delivery.\n• The problem was that two sources showed different revenue figures.\n• I first verified the data sources and identified a timing mismatch: one dataset included pending orders while the other did not.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1040,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "medium",
    "title": "Strengths and Weaknesses",
    "question": "What are your greatest strengths and areas for improvement?",
    "modelAnswer": "My key strengths are analytical rigor, attention to detail, and adaptability. I enjoy digging into numbers to find insights and I double‑check my work to ensure accuracy. I also learn quickly in new environments. An area I'm working on is public speaking—while comfortable in small groups, I want to become more polished in formal presentations. I'm addressing this by joining Toastmasters and volunteering for presentation opportunities. It's important to turn a weakness into a growth plan. Common mistakes: giving a weakness that's actually a strength ('I'm a perfectionist'), being too generic, or not showing steps to improve.",
    "scoringKeywords": [
      "analytical",
      "attention to detail",
      "adaptability",
      "public speaking",
      "growth plan"
    ],
    "detailedAnalysis": {
      "overview": "This classic question tests self‑awareness and honesty. Strengths should be relevant to the role; weaknesses should be genuine but not disqualifying.",
      "commonMistakes": "Cliché weaknesses, failing to provide examples, or listing strengths that don't align with finance."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "My key strengths are analytical rigor, attention to detail, and adaptability. I enjoy digging into numbers to find insights and I double‑check my work to ensure accuracy. I also learn quickly in new environments. An area I'm working on is public speaking—while comfortable in small groups, I want to become more polished in formal presentations. I'm addressing this by joining Toastmasters and volunteering for presentation opportunities. It's important to turn a weakness into a growth plan. Common mistakes: giving a weakness that's actually a strength ('I'm a perfectionist'), being too generic, or not showing steps to improve.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• My key strengths are analytical rigor, attention to detail, and adaptability.\n• I enjoy digging into numbers to find insights and I double‑check my work to ensure accuracy.\n• I also learn quickly in new environments.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1041,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "easy",
    "title": "Teamwork Experience",
    "question": "Describe a time you worked effectively in a team. What was your role and what did you achieve?",
    "modelAnswer": "In a university group project, our team had to analyze a public company and present a buy/sell recommendation. I took the lead on financial statement analysis and DCF valuation. We held regular check‑ins, divided tasks based on strengths, and created a shared document for collaboration. When one member fell behind, I helped them catch up without blaming. Our final presentation won top marks because we combined solid numbers with clear storytelling. This taught me that effective teamwork requires clear roles, open communication, and mutual support. Common mistakes: taking sole credit, describing a conflict without resolution, or giving a vague example with no concrete outcome.",
    "scoringKeywords": [
      "collaboration",
      "role clarity",
      "communication",
      "problem‑solving",
      "shared success"
    ],
    "detailedAnalysis": {
      "overview": "Teamwork is essential in finance. Candidates should demonstrate ability to work cooperatively and contribute meaningfully.",
      "commonMistakes": "Focusing only on individual contribution, omitting the team's goal, or failing to mention what was learned."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "easy",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "In a university group project, our team had to analyze a public company and present a buy/sell recommendation. I took the lead on financial statement analysis and DCF valuation. We held regular check‑ins, divided tasks based on strengths, and created a shared document for collaboration. When one member fell behind, I helped them catch up without blaming. Our final presentation won top marks because we combined solid numbers with clear storytelling. This taught me that effective teamwork requires clear roles, open communication, and mutual support. Common mistakes: taking sole credit, describing a conflict without resolution, or giving a vague example with no concrete outcome.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• In a university group project, our team had to analyze a public company and present a buy/sell recommendation.\n• I took the lead on financial statement analysis and DCF valuation.\n• We held regular check‑ins, divided tasks based on strengths, and created a shared document for collaboration.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1042,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "medium",
    "title": "Handling Pressure",
    "question": "How do you handle high‑pressure situations and tight deadlines?",
    "modelAnswer": "I manage pressure by prioritizing tasks, breaking large projects into smaller steps, and maintaining clear communication. First, I identify the most critical deliverables and allocate time accordingly. I use checklists and timelines to track progress. When unexpected issues arise, I calmly assess options and seek guidance if needed. For example, during finals week with multiple deadlines, I created a hour‑by‑hour schedule and focused on one subject at a time, which helped me submit quality work on time. It's also important to take short breaks to stay sharp. Common mistakes: claiming you never feel stress (unrealistic), or describing a situation where you worked 24/7 without a sustainable method.",
    "scoringKeywords": [
      "prioritization",
      "organization",
      "communication",
      "calm assessment",
      "time management"
    ],
    "detailedAnalysis": {
      "overview": "Pressure handling is crucial in fast‑paced finance roles. Candidates should show a structured, resilient approach.",
      "commonMistakes": "Portraying burnout as a virtue, lacking concrete techniques, or not mentioning teamwork/communication."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "I manage pressure by prioritizing tasks, breaking large projects into smaller steps, and maintaining clear communication. First, I identify the most critical deliverables and allocate time accordingly. I use checklists and timelines to track progress. When unexpected issues arise, I calmly assess options and seek guidance if needed. For example, during finals week with multiple deadlines, I created a hour‑by‑hour schedule and focused on one subject at a time, which helped me submit quality work on time. It's also important to take short breaks to stay sharp. Common mistakes: claiming you never feel stress (unrealistic), or describing a situation where you worked 24/7 without a sustainable method.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• I manage pressure by prioritizing tasks, breaking large projects into smaller steps, and maintaining clear communication.\n• First, I identify the most critical deliverables and allocate time accordingly.\n• I use checklists and timelines to track progress.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1043,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Risk and Return Relationship",
    "question": "Explain the relationship between risk and return in finance.",
    "modelAnswer": "In finance, higher potential returns generally require accepting higher risk. This trade‑off exists because investors demand compensation for uncertainty. Low‑risk assets like government bonds offer modest returns; high‑risk assets like growth stocks have greater return potential but also higher volatility. Diversification can improve the risk‑return profile by reducing unsystematic risk. For example, a portfolio of only tech stocks may soar or crash, while adding bonds smooths returns. Common mistakes: thinking risk guarantees higher returns (it only offers the potential), or confusing risk with loss (risk is about uncertainty, not just downside).",
    "scoringKeywords": [
      "trade‑off",
      "uncertainty",
      "volatility",
      "diversification",
      "compensation"
    ],
    "detailedAnalysis": {
      "overview": "This fundamental concept underpins all investment decisions. Candidates should articulate the basic principle with simple examples.",
      "commonMistakes": "Stating that risk always leads to higher returns, or failing to mention diversification."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "easy",
      "importance": "critical",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "In finance, higher potential returns generally require accepting higher risk. This trade‑off exists because investors demand compensation for uncertainty. Low‑risk assets like government bonds offer modest returns; high‑risk assets like growth stocks have greater return potential but also higher volatility. Diversification can improve the risk‑return profile by reducing unsystematic risk. For example, a portfolio of only tech stocks may soar or crash, while adding bonds smooths returns. Common mistakes: thinking risk guarantees higher returns (it only offers the potential), or confusing risk with loss (risk is about uncertainty, not just downside).",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• In finance, higher potential returns generally require accepting higher risk\n• This trade‑off exists because investors demand compensation for uncertainty\n• Diversification can improve the risk‑return profile by reducing unsystematic risk\n• For example, a portfolio of only tech stocks may soar or crash, while adding bonds smooths returns",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1044,
    "role": "ib",
    "category": "market",
    "difficulty": "medium",
    "title": "Current Market Trends (Simplified)",
    "question": "What are some current major trends affecting global financial markets?",
    "modelAnswer": "Recent trends include elevated interest rates as central banks combat inflation, geopolitical tensions affecting supply chains, and the rapid adoption of AI technology. Higher rates have pressured bond prices and shifted capital toward cash‑like instruments. Geopolitical risks increase volatility in commodity markets (oil, metals). AI innovation is driving stock performance in tech sectors while raising questions about productivity and disruption. Investors are also watching ESG integration and regulatory changes. For example, the US‑China tech competition influences semiconductor stocks. Common mistakes: citing outdated trends, focusing only on equities while ignoring fixed income, or making overly speculative predictions.",
    "scoringKeywords": [
      "interest rates",
      "geopolitical risk",
      "AI adoption",
      "ESG",
      "volatility"
    ],
    "detailedAnalysis": {
      "overview": "Market awareness is valued. Candidates should demonstrate up‑to‑date knowledge of macro and sector trends.",
      "commonMistakes": "Parroting headlines without analysis, being too pessimistic/optimistic, or lacking breadth across asset classes."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "medium",
      "practicality": "high",
      "recency": "timely"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Recent trends include elevated interest rates as central banks combat inflation, geopolitical tensions affecting supply chains, and the rapid adoption of AI technology. Higher rates have pressured bond prices and shifted capital toward cash‑like instruments. Geopolitical risks increase volatility in commodity markets (oil, metals). AI innovation is driving stock performance in tech sectors while raising questions about productivity and disruption. Investors are also watching ESG integration and regulatory changes. For example, the US‑China tech competition influences semiconductor stocks. Common mistakes: citing outdated trends, focusing only on equities while ignoring fixed income, or making overly speculative predictions.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Higher rates have pressured bond prices and shifted capital toward cash‑like instruments\n• Geopolitical risks increase volatility in commodity markets (oil, metals)\n• Investors are also watching ESG integration and regulatory changes\n• For example, the US‑China tech competition influences semiconductor stocks",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1045,
    "role": "ib",
    "category": "market",
    "difficulty": "medium",
    "title": "Industry News Impact",
    "question": "How does major industry news (e.g., a merger announcement, regulatory change) affect stock prices?",
    "modelAnswer": "Industry news moves stock prices by altering expectations about future cash flows and risk. A merger announcement typically lifts the target's stock (premium) and may boost the acquirer if synergies are credible. Regulatory changes can create winners and losers: stricter rules may hurt incumbent costs but help compliant innovators. The magnitude depends on whether the news is anticipated (already priced in) or a surprise. For example, FDA approval for a drug can send a biotech stock soaring. Common mistakes: assuming all news has immediate linear impact, ignoring second‑order effects on competitors, or forgetting that markets look forward, not backward.",
    "scoringKeywords": [
      "cash flow expectations",
      "risk perception",
      "synergies",
      "regulatory impact",
      "priced in"
    ],
    "detailedAnalysis": {
      "overview": "This question tests understanding of how information flows into prices. Candidates should think about expectations and relative effects.",
      "commonMistakes": "Oversimplifying direction (always up/down), not considering industry structure, or focusing only on short‑term reaction."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "medium",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Industry news moves stock prices by altering expectations about future cash flows and risk. A merger announcement typically lifts the target's stock (premium) and may boost the acquirer if synergies are credible. Regulatory changes can create winners and losers: stricter rules may hurt incumbent costs but help compliant innovators. The magnitude depends on whether the news is anticipated (already priced in) or a surprise. For example, FDA approval for a drug can send a biotech stock soaring. Common mistakes: assuming all news has immediate linear impact, ignoring second‑order effects on competitors, or forgetting that markets look forward, not backward.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Industry news moves stock prices by altering expectations about future cash flows and risk\n• The magnitude depends on whether the news is anticipated (already priced in) or a surprise\n• For example, FDA approval for a drug can send a biotech stock soaring",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1046,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Portfolio Diversification",
    "question": "Why is diversification important in portfolio management?",
    "modelAnswer": "Diversification reduces risk by spreading investments across different assets, sectors, or geographies. It works because not all investments move in the same direction at the same time. Key benefits: lowers portfolio volatility, protects against specific company or industry shocks, and improves risk-adjusted returns. For example, holding both stocks and bonds can stabilize returns during market downturns. Common mistakes: over-diversifying (which dilutes returns), or confusing diversification with simply owning many similar stocks (e.g., only tech companies).",
    "scoringKeywords": [
      "risk reduction",
      "asset classes",
      "correlation",
      "volatility",
      "risk-adjusted returns"
    ],
    "detailedAnalysis": {
      "overview": "Diversification is a core principle of modern portfolio theory. Entry-level candidates should grasp the basic rationale and practical application.",
      "commonMistakes": "Believing diversification eliminates all risk (only unsystematic risk), or not understanding the role of correlation."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "easy",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Diversification reduces risk by spreading investments across different assets, sectors, or geographies. It works because not all investments move in the same direction at the same time. Key benefits: lowers portfolio volatility, protects against specific company or industry shocks, and improves risk-adjusted returns. For example, holding both stocks and bonds can stabilize returns during market downturns. Common mistakes: over-diversifying (which dilutes returns), or confusing diversification with simply owning many similar stocks (e.g., only tech companies).",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Diversification reduces risk by spreading investments across different assets, sectors, or geographies.\n• It works because not all investments move in the same direction at the same time.\n• Key benefits: lowers portfolio volatility, protects against specific company or industry shocks, and improves risk-adjusted returns.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1047,
    "role": "ib",
    "category": "market",
    "difficulty": "medium",
    "title": "Regional Market Characteristics",
    "question": "How do major financial markets (e.g., US, Europe, Asia) differ in terms of investor behavior or market structure?",
    "modelAnswer": "US markets are dominated by institutional investors, have deep liquidity, and are driven by tech and innovation. European markets are more bank‑centric, with stronger retail participation and focus on dividends. Asian markets (ex‑Japan) are often retail‑driven, more volatile, and influenced by government policy. Market structure differences include trading hours, settlement cycles, and regulatory frameworks. For example, the US T+2 settlement is faster than some Asian markets. Investor behavior also varies: US investors may prioritize growth, Europeans stability, and Asians momentum. Common mistakes: overgeneralizing, ignoring intra‑regional diversity (e.g., Germany vs. Italy), or not mentioning the role of local currency and interest rates.",
    "scoringKeywords": [
      "institutional vs retail",
      "liquidity",
      "volatility",
      "government policy",
      "settlement cycles"
    ],
    "detailedAnalysis": {
      "overview": "Global awareness is increasingly important. Candidates should recognize broad regional distinctions without stereotyping.",
      "commonMistakes": "Treating 'Asia' as monolithic, forgetting currency risk, or missing structural factors like trading hours."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "medium",
      "importance": "medium",
      "specificity": "general",
      "complexity": "medium",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "US markets are dominated by institutional investors, have deep liquidity, and are driven by tech and innovation. European markets are more bank‑centric, with stronger retail participation and focus on dividends. Asian markets (ex‑Japan) are often retail‑driven, more volatile, and influenced by government policy. Market structure differences include trading hours, settlement cycles, and regulatory frameworks. For example, the US T+2 settlement is faster than some Asian markets. Investor behavior also varies: US investors may prioritize growth, Europeans stability, and Asians momentum. Common mistakes: overgeneralizing, ignoring intra‑regional diversity (e.g., Germany vs. Italy), or not mentioning the role of local currency and interest rates.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• European markets are more bank‑centric, with stronger retail participation and focus on dividends.\n• Market structure differences include trading hours, settlement cycles, and regulatory frameworks.\n• For example, the US T+2 settlement is faster than some Asian markets.\n• Common mistakes: overgeneralizing, ignoring intra‑regional diversity (e.g., Ge).",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1048,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Financial Ratios Basics",
    "question": "What are some key financial ratios and what do they measure?",
    "modelAnswer": "Financial ratios fall into four categories: profitability, liquidity, leverage, and efficiency. Profitability ratios like net margin show how much profit is generated from revenue. Liquidity ratios (current ratio) assess ability to meet short‑term obligations. Leverage ratios (debt‑to‑equity) measure financial risk from debt. Efficiency ratios (inventory turnover) gauge how well assets are used. For example, a high current ratio (>2) suggests strong liquidity. Common mistakes: calculating ratios incorrectly (mismatching time periods), using them in isolation without industry context, or not understanding what a 'good' value depends on the sector.",
    "scoringKeywords": [
      "profitability",
      "liquidity",
      "leverage",
      "efficiency",
      "industry context"
    ],
    "detailedAnalysis": {
      "overview": "Ratios are essential tools for financial analysis. Entry‑level candidates should know major categories and their purposes.",
      "commonMistakes": "Memorizing formulas without understanding meaning, comparing ratios across different industries without adjustment."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "easy",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Financial ratios fall into four categories: profitability, liquidity, leverage, and efficiency. Profitability ratios like net margin show how much profit is generated from revenue. Liquidity ratios (current ratio) assess ability to meet short‑term obligations. Leverage ratios (debt‑to‑equity) measure financial risk from debt. Efficiency ratios (inventory turnover) gauge how well assets are used. For example, a high current ratio (>2) suggests strong liquidity. Common mistakes: calculating ratios incorrectly (mismatching time periods), using them in isolation without industry context, or not understanding what a 'good' value depends on the sector.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Financial ratios fall into four categories: profitability, liquidity, leverage, and efficiency\n• Profitability ratios like net margin show how much profit is generated from revenue\n• Liquidity ratios (current ratio) assess ability to meet short‑term obligations\n• Leverage ratios (debt‑to‑equity) measure financial risk from debt",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1049,
    "role": "ib",
    "category": "behavioral",
    "difficulty": "medium",
    "title": "Why Investment Banking/Asset Management?",
    "question": "Why are you interested in a career in investment banking (or asset management)?",
    "modelAnswer": "I'm drawn to investment banking for three reasons: intellectual challenge, exposure to high‑impact transactions, and rapid skill development. The role involves complex financial modeling, strategic advisory, and working with senior executives. I enjoy analyzing businesses and markets, and banking provides a front‑row seat to major corporate decisions like M&A and IPOs. The fast‑paced, merit‑driven environment aligns with my desire to learn quickly and contribute to tangible outcomes. For example, helping a company raise growth capital directly influences its expansion. Common entry‑level mistakes: giving generic answers ('I like finance'), focusing only on compensation, or showing limited understanding of the actual day‑to‑day work.",
    "scoringKeywords": [
      "intellectual challenge",
      "exposure to transactions",
      "skill development",
      "strategic advisory",
      "fast‑paced"
    ],
    "detailedAnalysis": {
      "overview": "This classic motivational question tests genuine interest and preparation. Candidates should articulate specific, thoughtful reasons.",
      "commonMistakes": "Cliché responses, over‑emphasis on money/prestige, lack of research about the firm's specific strengths."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "critical",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "I'm drawn to investment banking for three reasons: intellectual challenge, exposure to high‑impact transactions, and rapid skill development. The role involves complex financial modeling, strategic advisory, and working with senior executives. I enjoy analyzing businesses and markets, and banking provides a front‑row seat to major corporate decisions like M&A and IPOs. The fast‑paced, merit‑driven environment aligns with my desire to learn quickly and contribute to tangible outcomes. For example, helping a company raise growth capital directly influences its expansion. Common entry‑level mistakes: giving generic answers ('I like finance'), focusing only on compensation, or showing limited understanding of the actual day‑to‑day work.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• I'm drawn to investment banking for three reasons: intellectual challenge, exposure to high‑impact transactions, and rapid skill development.\n• The role involves complex financial modeling, strategic advisory, and working with senior executives.\n• I enjoy analyzing businesses and markets, and banking provides a front‑row seat to major corporate decisions like M&A and IPOs.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1050,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Basic Valuation Methods",
    "question": "What are the main valuation methods used for companies?",
    "modelAnswer": "The three primary valuation approaches are comparable company analysis, precedent transactions, and discounted cash flow (DCF). Comparable analysis uses valuation multiples (P/E, EV/EBITDA) of similar public companies. Precedent transactions look at multiples paid in recent acquisitions. DCF estimates intrinsic value based on projected cash flows. Each method has strengths: comparables are market‑based, transactions reflect control premiums, DCF is forward‑looking. In practice, analysts use a combination to triangulate a fair value range. Common mistakes: relying on only one method, using mismatched multiples (e.g., P/E for a loss‑making firm), or ignoring qualitative factors.",
    "scoringKeywords": [
      "comparable companies",
      "precedent transactions",
      "DCF",
      "valuation multiples",
      "intrinsic value"
    ],
    "detailedAnalysis": {
      "overview": "Entry‑level candidates should know the three core valuation frameworks and when each is appropriate.",
      "commonMistakes": "Confusing enterprise value with equity value, not understanding why multiples differ across industries."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "critical",
      "specificity": "general",
      "complexity": "medium",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "The three primary valuation approaches are comparable company analysis, precedent transactions, and discounted cash flow (DCF). Comparable analysis uses valuation multiples (P/E, EV/EBITDA) of similar public companies. Precedent transactions look at multiples paid in recent acquisitions. DCF estimates intrinsic value based on projected cash flows. Each method has strengths: comparables are market‑based, transactions reflect control premiums, DCF is forward‑looking. In practice, analysts use a combination to triangulate a fair value range. Common mistakes: relying on only one method, using mismatched multiples (e.g., P/E for a loss‑making firm), or ignoring qualitative factors.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Comparable analysis uses valuation multiples (P/E, EV/EBITDA) of similar public companies\n• Precedent transactions look at multiples paid in recent acquisitions\n• DCF estimates intrinsic value based on projected cash flows\n• In practice, analysts use a combination to triangulate a fair value range",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1051,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Basic DCF Steps",
    "question": "Explain the basic steps of a discounted cash flow (DCF) valuation.",
    "modelAnswer": "DCF values a company by forecasting its future free cash flows and discounting them to present value. Key steps: 1) Project free cash flows for 5-10 years based on revenue growth and margins. 2) Estimate terminal value using a perpetual growth formula. 3) Determine the discount rate (weighted average cost of capital). 4) Discount all cash flows to present value. 5) Sum present values to get enterprise value, then adjust for debt and cash to derive equity value. For example, valuing a stable company might use 3% long-term growth. Common mistakes: using unrealistic growth rates, ignoring working capital changes, or mismatching discount rate with cash flow type.",
    "scoringKeywords": [
      "free cash flow",
      "terminal value",
      "discount rate",
      "WACC",
      "present value"
    ],
    "detailedAnalysis": {
      "overview": "DCF is a core valuation technique. Entry-level candidates should understand the logical flow without diving into complex calculations.",
      "commonMistakes": "Forgetting to subtract net debt, using equity cash flows with WACC, or overcomplicating the forecast period."
    },
    "metadata": {
      "frequency": "high",
      "difficulty": "medium",
      "importance": "critical",
      "specificity": "general",
      "complexity": "medium",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "DCF values a company by forecasting its future free cash flows and discounting them to present value. Key steps: 1) Project free cash flows for 5-10 years based on revenue growth and margins. 2) Estimate terminal value using a perpetual growth formula. 3) Determine the discount rate (weighted average cost of capital). 4) Discount all cash flows to present value. 5) Sum present values to get enterprise value, then adjust for debt and cash to derive equity value. For example, valuing a stable company might use 3% long-term growth. Common mistakes: using unrealistic growth rates, ignoring working capital changes, or mismatching discount rate with cash flow type.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Key steps: 1) Project free cash flows for 5-10 years based on revenue growth and margins\n• 2) Estimate terminal value using a perpetual growth formula\n• 3) Determine the discount rate (weighted average cost of capital)\n• 4) Discount all cash flows to present value",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1052,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Economic Indicators",
    "question": "Name three important economic indicators and explain why they matter to investors.",
    "modelAnswer": "GDP growth, inflation (CPI), and unemployment rate are three critical indicators. GDP growth reflects the overall economy's health; strong growth usually supports corporate earnings and stock markets. Inflation measures rising prices; high inflation erodes purchasing power and may lead to higher interest rates, which can hurt bond prices and equity valuations. Unemployment indicates labor market strength; low unemployment suggests consumer spending power, but extremely low levels can signal wage‑push inflation. For example, the Fed watches these indicators to set monetary policy. Common mistakes: confusing leading with lagging indicators, or not connecting the indicator to specific asset class impacts.",
    "scoringKeywords": [
      "GDP growth",
      "inflation",
      "unemployment",
      "monetary policy",
      "asset class impact"
    ],
    "detailedAnalysis": {
      "overview": "Understanding key macroeconomic indicators is essential for market analysis. Candidates should know what each measures and its investment implications.",
      "commonMistakes": "Listing indicators without explaining relevance, or missing the link between indicators and central bank actions."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "medium",
      "importance": "high",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timely"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "GDP growth, inflation (CPI), and unemployment rate are three critical indicators. GDP growth reflects the overall economy's health; strong growth usually supports corporate earnings and stock markets. Inflation measures rising prices; high inflation erodes purchasing power and may lead to higher interest rates, which can hurt bond prices and equity valuations. Unemployment indicates labor market strength; low unemployment suggests consumer spending power, but extremely low levels can signal wage‑push inflation. For example, the Fed watches these indicators to set monetary policy. Common mistakes: confusing leading with lagging indicators, or not connecting the indicator to specific asset class impacts.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• GDP growth, inflation (CPI), and unemployment rate are three critical indicators.\n• GDP growth reflects the overall economy's health; strong growth usually supports corporate earnings and stock markets.\n• Inflation measures rising prices; high inflation erodes purchasing power and may lead to higher interest rates, which can hurt bond prices and equity valuations.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1053,
    "role": "ib",
    "category": "market",
    "difficulty": "easy",
    "title": "Basic Regulatory Concepts",
    "question": "What is the role of financial regulators (e.g., SEC, FINRA) and why are they important?",
    "modelAnswer": "Financial regulators protect investors, ensure market integrity, and promote stability. The SEC oversees securities markets, requiring disclosure to prevent fraud. FINRA regulates brokerage firms and enforces fair practices. Their importance lies in maintaining trust: without regulation, insider trading and manipulation could erode confidence, reducing capital formation. Regulations also aim to prevent systemic risk, as seen after the 2008 crisis. For example, the SEC's filing requirements allow investors to make informed decisions. Common mistakes: viewing regulation as purely burdensome, not distinguishing between different regulators' mandates, or missing the link between trust and market efficiency.",
    "scoringKeywords": [
      "investor protection",
      "market integrity",
      "disclosure",
      "systemic risk",
      "trust"
    ],
    "detailedAnalysis": {
      "overview": "Entry‑level candidates should appreciate the purpose of financial regulation beyond 'rules'.",
      "commonMistakes": "Confusing SEC with Fed, focusing only on compliance costs, or being unable to name a specific regulator."
    },
    "metadata": {
      "frequency": "medium",
      "difficulty": "easy",
      "importance": "medium",
      "specificity": "general",
      "complexity": "low",
      "practicality": "high",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Financial regulators protect investors, ensure market integrity, and promote stability. The SEC oversees securities markets, requiring disclosure to prevent fraud. FINRA regulates brokerage firms and enforces fair practices. Their importance lies in maintaining trust: without regulation, insider trading and manipulation could erode confidence, reducing capital formation. Regulations also aim to prevent systemic risk, as seen after the 2008 crisis. For example, the SEC's filing requirements allow investors to make informed decisions. Common mistakes: viewing regulation as purely burdensome, not distinguishing between different regulators' mandates, or missing the link between trust and market efficiency.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Financial regulators protect investors, ensure market integrity, and promote stability\n• The SEC oversees securities markets, requiring disclosure to prevent fraud\n• FINRA regulates brokerage firms and enforces fair practices\n• Regulations also aim to prevent systemic risk, as seen after the 2008 crisis",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1054,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Market Making Basics",
    "question": "What is market making and how do market makers profit?",
    "modelAnswer": "Market makers provide liquidity by continuously quoting bid and ask prices, earning the spread (difference between buy and sell prices). They profit from the spread and from inventory management (holding securities temporarily). Market makers also hedge their positions to reduce directional risk. For entry‑level interviews, candidates should mention that market makers facilitate trading but are not necessarily betting on price direction. Key risks include adverse selection (trading against better‑informed counterparties) and market volatility. Common mistakes include confusing market making with proprietary trading, or assuming market makers always win.",
    "scoringKeywords": [
      "bid‑ask spread",
      "liquidity provision",
      "inventory management",
      "hedging",
      "adverse selection"
    ],
    "detailedAnalysis": {
      "overview": "A core concept in market microstructure—important for trading, sales, or electronic markets roles.",
      "commonMistakes": "Thinking market makers set prices arbitrarily, ignoring the role of technology (algos), or not understanding the difference between maker‑taker and other fee models."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Market makers provide liquidity by continuously quoting bid and ask prices, earning the spread (difference between buy and sell prices). They profit from the spread and from inventory management (holding securities temporarily). Market makers also hedge their positions to reduce directional risk. For entry‑level interviews, candidates should mention that market makers facilitate trading but are not necessarily betting on price direction. Key risks include adverse selection (trading against better‑informed counterparties) and market volatility. Common mistakes include confusing market making with proprietary trading, or assuming market makers always win.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Market makers provide liquidity by continuously quoting bid and ask prices, earning the spread (difference between buy and sell prices).\n• They profit from the spread and from inventory management (holding securities temporarily).\n• Market makers also hedge their positions to reduce directional risk.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1055,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Regulatory Requirements (Basel)",
    "question": "What is the purpose of Basel regulations in banking?",
    "modelAnswer": "Basel regulations (I, II, III) are international standards designed to ensure banks hold sufficient capital to absorb unexpected losses, promoting financial stability. They introduce minimum capital requirements, leverage ratios, and liquidity standards (LCR, NSFR). Basel III, developed after the 2008 crisis, focuses on higher quality capital, countercyclical buffers, and reducing systemic risk. For entry‑level interviews, candidates should know that these rules aim to prevent bank failures and taxpayer bailouts. Common mistakes include confusing capital requirements with reserve requirements, or thinking Basel only applies to large banks.",
    "scoringKeywords": [
      "capital adequacy",
      "leverage ratio",
      "liquidity coverage ratio",
      "financial stability",
      "risk‑weighted assets"
    ],
    "detailedAnalysis": {
      "overview": "Tests awareness of the regulatory environment that shapes modern banking—important for risk, compliance, or treasury roles.",
      "commonMistakes": "Over‑simplifying the three pillars, not mentioning the transition from Basel II to III, or ignoring the impact on bank profitability."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Basel regulations (I, II, III) are international standards designed to ensure banks hold sufficient capital to absorb unexpected losses, promoting financial stability. They introduce minimum capital requirements, leverage ratios, and liquidity standards (LCR, NSFR). Basel III, developed after the 2008 crisis, focuses on higher quality capital, countercyclical buffers, and reducing systemic risk. For entry‑level interviews, candidates should know that these rules aim to prevent bank failures and taxpayer bailouts. Common mistakes include confusing capital requirements with reserve requirements, or thinking Basel only applies to large banks.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Basel regulations (I, II, III) are international standards designed to ensure banks hold sufficient capital to absorb unexpected losses, promoting financial stability.\n• They introduce minimum capital requirements, leverage ratios, and liquidity standards (LCR, NSFR).\n• Basel III, developed after the 2008 crisis, focuses on higher quality capital, countercyclical buffers, and reducing systemic risk.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1056,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Credit Analysis Basics",
    "question": "What are the main factors you would examine when assessing a company's creditworthiness?",
    "modelAnswer": "Credit analysis evaluates a borrower's ability to repay debt. Key factors include financial ratios (leverage, interest coverage, liquidity), cash flow stability, industry position, management quality, and macroeconomic environment. Analysts review historical and projected financial statements, debt structure, and collateral. For entry‑level interviews, candidates should mention the \"5 Cs of Credit\": character, capacity, capital, collateral, and conditions. Understanding credit ratings (investment grade vs. speculative) and basic covenant terms is also valuable. Common mistakes include over‑relying on a single ratio or ignoring qualitative factors like industry cyclicality.",
    "scoringKeywords": [
      "financial ratios",
      "cash flow stability",
      "industry position",
      "credit ratings",
      "5 Cs of Credit"
    ],
    "detailedAnalysis": {
      "overview": "A foundational topic for roles in commercial banking, corporate lending, or fixed income analysis.",
      "commonMistakes": "Focusing only on historical numbers, neglecting industry risks, or confusing credit analysis with equity valuation."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Credit analysis evaluates a borrower's ability to repay debt. Key factors include financial ratios (leverage, interest coverage, liquidity), cash flow stability, industry position, management quality, and macroeconomic environment. Analysts review historical and projected financial statements, debt structure, and collateral. For entry‑level interviews, candidates should mention the \"5 Cs of Credit\": character, capacity, capital, collateral, and conditions. Understanding credit ratings (investment grade vs. speculative) and basic covenant terms is also valuable. Common mistakes include over‑relying on a single ratio or ignoring qualitative factors like industry cyclicality.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Credit analysis evaluates a borrower's ability to repay debt\n• Analysts review historical and projected financial statements, debt structure, and collateral\n• Understanding credit ratings (investment grade vs\n• speculative) and basic covenant terms is also valuable",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1057,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Commodities Trading",
    "question": "What are the main categories of commodities and what factors influence their prices?",
    "modelAnswer": "Commodities are split into hard (energy, metals) and soft (agricultural, livestock). Prices are driven by supply (production, inventories) and demand (economic growth, seasonality), as well as geopolitical events, weather, and currency movements. Trading occurs via futures contracts on exchanges (e.g., CME, ICE). For entry‑level interviews, candidates should mention that commodities are often used as inflation hedges and have low correlation with stocks/bonds. Common mistakes include treating all commodities as homogeneous, ignoring storage and transportation costs, or not understanding the term structure (contango vs. backwardation).",
    "scoringKeywords": [
      "energy",
      "metals",
      "agricultural",
      "supply and demand",
      "futures contracts"
    ],
    "detailedAnalysis": {
      "overview": "A niche but important market—useful for roles in commodities trading, risk management, or macroeconomic analysis.",
      "commonMistakes": "Confusing spot prices with futures prices, overlooking the role of speculators vs. commercial hedgers, or assuming commodities are always a good diversification tool."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Commodities are split into hard (energy, metals) and soft (agricultural, livestock). Prices are driven by supply (production, inventories) and demand (economic growth, seasonality), as well as geopolitical events, weather, and currency movements. Trading occurs via futures contracts on exchanges (e.g., CME, ICE). For entry‑level interviews, candidates should mention that commodities are often used as inflation hedges and have low correlation with stocks/bonds. Common mistakes include treating all commodities as homogeneous, ignoring storage and transportation costs, or not understanding the term structure (contango vs. backwardation).",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Commodities are split into hard (energy, metals) and soft (agricultural, livestock).\n• Prices are driven by supply (production, inventories) and demand (economic growth, seasonality), as well as geopolitical events, weather, and currency movements.\n• Trading occurs via futures contracts on exchanges (e.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1058,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Treasury Management",
    "question": "What are the key functions of a corporate treasury department?",
    "modelAnswer": "Corporate treasury manages a company's liquidity, funding, financial risk, and banking relationships. Core functions include cash forecasting, optimizing working capital, arranging debt or equity financing, managing foreign exchange and interest rate exposure, and overseeing investment of surplus cash. Treasury also ensures compliance with debt covenants and maintains relationships with banks. For entry‑level interviews, candidates should emphasize the importance of balancing liquidity with yield, and the role of treasury in supporting strategic initiatives. Knowledge of basic instruments (e.g., forward contracts, commercial paper) is a plus.",
    "scoringKeywords": [
      "liquidity management",
      "funding",
      "risk management",
      "cash forecasting",
      "banking relationships"
    ],
    "detailedAnalysis": {
      "overview": "Tests understanding of how companies handle their money—a key area in corporate finance roles.",
      "commonMistakes": "Limiting treasury to just cash handling, ignoring risk management, or failing to mention the strategic aspect."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Corporate treasury manages a company's liquidity, funding, financial risk, and banking relationships. Core functions include cash forecasting, optimizing working capital, arranging debt or equity financing, managing foreign exchange and interest rate exposure, and overseeing investment of surplus cash. Treasury also ensures compliance with debt covenants and maintains relationships with banks. For entry‑level interviews, candidates should emphasize the importance of balancing liquidity with yield, and the role of treasury in supporting strategic initiatives. Knowledge of basic instruments (e.g., forward contracts, commercial paper) is a plus.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Corporate treasury manages a company's liquidity, funding, financial risk, and banking relationships.\n• Core functions include cash forecasting, optimizing working capital, arranging debt or equity financing, managing foreign exchange and interest rate exposure, and overseeing investment of surplus cash.\n• Treasury also ensures compliance with debt covenants and maintains relationships with banks.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1059,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Investment Styles (Value vs. Growth)",
    "question": "What is the difference between value and growth investing, and what metrics might you use for each?",
    "modelAnswer": "Value investing seeks stocks trading below intrinsic value, often characterized by low P/E, P/B, or high dividend yield. Growth investing targets companies with above‑average earnings expansion, often with high P/E or P/S ratios. Value investors look for margin of safety and mean reversion; growth investors focus on future potential and market leadership. Metrics differ: value uses price‑to‑book, dividend yield; growth uses PEG ratio, revenue growth rates. For entry‑level interviews, candidates should note that many investors blend both styles. Common mistakes include assuming value stocks are always cheap, or that growth stocks ignore valuation entirely.",
    "scoringKeywords": [
      "intrinsic value",
      "P/E ratio",
      "P/B ratio",
      "earnings growth",
      "margin of safety"
    ],
    "detailedAnalysis": {
      "overview": "Tests knowledge of two major equity investment philosophies—essential for discussing portfolio strategy or research focus.",
      "commonMistakes": "Over‑simplifying the dichotomy, ignoring the cyclicality of style performance, or not mentioning hybrid approaches like GARP (growth at a reasonable price)."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Value investing seeks stocks trading below intrinsic value, often characterized by low P/E, P/B, or high dividend yield. Growth investing targets companies with above‑average earnings expansion, often with high P/E or P/S ratios. Value investors look for margin of safety and mean reversion; growth investors focus on future potential and market leadership. Metrics differ: value uses price‑to‑book, dividend yield; growth uses PEG ratio, revenue growth rates. For entry‑level interviews, candidates should note that many investors blend both styles. Common mistakes include assuming value stocks are always cheap, or that growth stocks ignore valuation entirely.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Value investing seeks stocks trading below intrinsic value, often characterized by low P/E, P/B, or high dividend yield.\n• Growth investing targets companies with above‑average earnings expansion, often with high P/E or P/S ratios.\n• Value investors look for margin of safety and mean reversion; growth investors focus on future potential and market leadership.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1060,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Interest Rate Risk Management",
    "question": "How do banks manage interest rate risk?",
    "modelAnswer": "Banks face interest rate risk because their assets (loans) and liabilities (deposits) may reprice at different times. They manage it through asset‑liability matching, gap analysis, duration management, and using derivatives (swaps, options, futures). For example, if a bank has more rate‑sensitive liabilities than assets, rising rates could squeeze net interest margin. Hedging involves taking offsetting positions. For entry‑level interviews, candidates should mention the role of the ALCO (Asset‑Liability Committee) and regulatory requirements. Common mistakes include confusing interest rate risk with credit risk, or assuming hedging eliminates all risk.",
    "scoringKeywords": [
      "asset‑liability matching",
      "gap analysis",
      "duration",
      "derivatives",
      "net interest margin"
    ],
    "detailedAnalysis": {
      "overview": "Tests understanding of a key risk for banks—important for treasury, risk management, or ALM roles.",
      "commonMistakes": "Overlooking basis risk, not considering optionality (e.g., prepayment risk), or thinking fixed‑rate loans are immune to rate changes."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Banks face interest rate risk because their assets (loans) and liabilities (deposits) may reprice at different times. They manage it through asset‑liability matching, gap analysis, duration management, and using derivatives (swaps, options, futures). For example, if a bank has more rate‑sensitive liabilities than assets, rising rates could squeeze net interest margin. Hedging involves taking offsetting positions. For entry‑level interviews, candidates should mention the role of the ALCO (Asset‑Liability Committee) and regulatory requirements. Common mistakes include confusing interest rate risk with credit risk, or assuming hedging eliminates all risk.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Banks face interest rate risk because their assets (loans) and liabilities (deposits) may reprice at different times.\n• They manage it through asset‑liability matching, gap analysis, duration management, and using derivatives (swaps, options, futures).\n• For example, if a bank has more rate‑sensitive liabilities than assets, rising rates could squeeze net interest margin.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1061,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Sector Analysis Basics",
    "question": "How would you approach analyzing a new sector for investment opportunities?",
    "modelAnswer": "Sector analysis starts with understanding the industry's value chain, key players, growth drivers, and regulatory environment. Macro factors (GDP, interest rates) and sector‑specific trends (technology adoption, consumer preferences) are assessed. Financial benchmarking of companies within the sector helps identify outliers. For entry‑level interviews, candidates should mention using Porter's Five Forces to evaluate competitive intensity, and SWOT analysis for individual companies. Important metrics vary by sector—e.g., same‑store sales for retail, loan loss provisions for banks. Common mistakes include treating all sectors the same, ignoring cyclicality, or focusing only on historical performance.",
    "scoringKeywords": [
      "value chain",
      "competitive landscape",
      "growth drivers",
      "Porter's Five Forces",
      "financial benchmarking"
    ],
    "detailedAnalysis": {
      "overview": "A foundational skill for equity research and asset management—shows ability to think beyond single‑company analysis.",
      "commonMistakes": "Failing to differentiate between cyclical and defensive sectors, overlooking regulatory risks, or not linking sector trends to company performance."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Sector analysis starts with understanding the industry's value chain, key players, growth drivers, and regulatory environment. Macro factors (GDP, interest rates) and sector‑specific trends (technology adoption, consumer preferences) are assessed. Financial benchmarking of companies within the sector helps identify outliers. For entry‑level interviews, candidates should mention using Porter's Five Forces to evaluate competitive intensity, and SWOT analysis for individual companies. Important metrics vary by sector—e.g., same‑store sales for retail, loan loss provisions for banks. Common mistakes include treating all sectors the same, ignoring cyclicality, or focusing only on historical performance.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Sector analysis starts with understanding the industry's value chain, key players, growth drivers, and regulatory environment.\n• Macro factors (GDP, interest rates) and sector‑specific trends (technology adoption, consumer preferences) are assessed.\n• Financial benchmarking of companies within the sector helps identify outliers.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1062,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Corporate Banking Products",
    "question": "What are the main products and services offered by a corporate banking division?",
    "modelAnswer": "Corporate banking provides loans (term loans, revolving credit facilities), cash management, trade finance, foreign exchange, interest rate hedging, and advisory services. Products are tailored to mid‑sized and large corporations. Relationship managers coordinate offerings to meet client needs. For entry‑level interviews, candidates should differentiate corporate banking from investment banking (less focus on M&A/IPOs) and commercial banking (more complex, larger tickets). Understanding how products link to the client's business cycle (e.g., seasonal working capital loans) is valuable. Common mistakes include listing retail products, or not mentioning the cross‑sell strategy.",
    "scoringKeywords": [
      "term loans",
      "revolving credit",
      "cash management",
      "foreign exchange",
      "relationship management"
    ],
    "detailedAnalysis": {
      "overview": "A practical overview of what corporate bankers actually sell—useful for interviews in corporate banking or commercial banking.",
      "commonMistakes": "Confusing corporate banking with investment banking, overlooking the importance of fee‑based services, or assuming lending is the only product."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Corporate banking provides loans (term loans, revolving credit facilities), cash management, trade finance, foreign exchange, interest rate hedging, and advisory services. Products are tailored to mid‑sized and large corporations. Relationship managers coordinate offerings to meet client needs. For entry‑level interviews, candidates should differentiate corporate banking from investment banking (less focus on M&A/IPOs) and commercial banking (more complex, larger tickets). Understanding how products link to the client's business cycle (e.g., seasonal working capital loans) is valuable. Common mistakes include listing retail products, or not mentioning the cross‑sell strategy.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Products are tailored to mid‑sized and large corporations\n• Relationship managers coordinate offerings to meet client needs\n• Common mistakes include listing retail products, or not mentioning the cross‑sell strategy.",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1063,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Portfolio Performance Metrics",
    "question": "What metrics would you use to evaluate the performance of an investment portfolio?",
    "modelAnswer": "Key portfolio metrics include total return, annualized return, volatility (standard deviation), Sharpe ratio (risk‑adjusted return), maximum drawdown, and tracking error versus a benchmark. For entry‑level interviews, candidates should explain that total return measures absolute gain, while Sharpe ratio compares excess return per unit of risk. Drawdown shows the largest peak‑to‑trough decline, important for understanding downside risk. Tracking error indicates how closely the portfolio follows its benchmark. Common mistakes include focusing solely on returns without considering risk, ignoring fees and taxes, or using inappropriate benchmarks.",
    "scoringKeywords": [
      "total return",
      "Sharpe ratio",
      "volatility",
      "maximum drawdown",
      "tracking error"
    ],
    "detailedAnalysis": {
      "overview": "Tests knowledge of basic portfolio evaluation tools—essential for roles in asset management or wealth management.",
      "commonMistakes": "Confusing Sharpe ratio with information ratio, not annualizing returns properly, or overlooking the impact of compounding."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Key portfolio metrics include total return, annualized return, volatility (standard deviation), Sharpe ratio (risk‑adjusted return), maximum drawdown, and tracking error versus a benchmark. For entry‑level interviews, candidates should explain that total return measures absolute gain, while Sharpe ratio compares excess return per unit of risk. Drawdown shows the largest peak‑to‑trough decline, important for understanding downside risk. Tracking error indicates how closely the portfolio follows its benchmark. Common mistakes include focusing solely on returns without considering risk, ignoring fees and taxes, or using inappropriate benchmarks.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Key portfolio metrics include total return, annualized return, volatility (standard deviation), Sharpe ratio (risk‑adjusted return), maximum drawdown, and tracking error versus a benchmark.\n• For entry‑level interviews, candidates should explain that total return measures absolute gain, while Sharpe ratio compares excess return per unit of risk.\n• Drawdown shows the largest peak‑to‑trough decline, important for understanding downside risk.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1064,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Certifications (CFA, FRM, CPA)",
    "question": "What are the CFA, FRM, and CPA certifications, and which finance roles are they most relevant for?",
    "modelAnswer": "The CFA (Chartered Financial Analyst) is the gold standard for investment roles (asset management, equity research, portfolio management). The FRM (Financial Risk Manager) focuses on risk management (banking, hedge funds, regulatory). The CPA (Certified Public Accountant) is accounting‑focused (audit, tax, corporate finance). Each requires passing rigorous exams and work experience. For entry‑level candidates, pursuing these signals commitment and builds knowledge. Common mistakes include thinking certifications guarantee jobs, or choosing the wrong one for your career path.",
    "scoringKeywords": [
      "CFA",
      "FRM",
      "CPA",
      "investment roles",
      "risk management"
    ],
    "detailedAnalysis": {
      "overview": "Helps candidates understand the landscape of professional designations and their strategic value.",
      "commonMistakes": "Overestimating the immediate payoff, underestimating the time commitment, or not researching employer preferences."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "The CFA (Chartered Financial Analyst) is the gold standard for investment roles (asset management, equity research, portfolio management). The FRM (Financial Risk Manager) focuses on risk management (banking, hedge funds, regulatory). The CPA (Certified Public Accountant) is accounting‑focused (audit, tax, corporate finance). Each requires passing rigorous exams and work experience. For entry‑level candidates, pursuing these signals commitment and builds knowledge. Common mistakes include thinking certifications guarantee jobs, or choosing the wrong one for your career path.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• The FRM (Financial Risk Manager) focuses on risk management (banking, hedge funds, regulatory)\n• The CPA (Certified Public Accountant) is accounting‑focused (audit, tax, corporate finance)\n• Each requires passing rigorous exams and work experience\n• For entry‑level candidates, pursuing these signals commitment and builds knowledge",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1065,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Cover Letter Writing",
    "question": "What should an effective cover letter for a finance position include?",
    "modelAnswer": "An effective cover letter should be concise (one page), addressed to a specific person, and highlight why you are interested in the firm and role. It should connect your skills and experiences to the job requirements, mention relevant achievements, and demonstrate knowledge of the company (recent deals, culture). Close with a call to action (request for interview). For entry‑level candidates, enthusiasm and attention to detail matter. Avoid generic templates; personalize each letter. Common mistakes include repeating the resume verbatim, being too long, or not explaining why you want that particular firm.",
    "scoringKeywords": [
      "personalization",
      "firm knowledge",
      "skills alignment",
      "conciseness",
      "call to action"
    ],
    "detailedAnalysis": {
      "overview": "A practical guide to writing a cover letter that complements the resume and shows genuine interest.",
      "commonMistakes": "Using a generic salutation, focusing only on yourself rather than what you can offer, or including typos."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "An effective cover letter should be concise (one page), addressed to a specific person, and highlight why you are interested in the firm and role. It should connect your skills and experiences to the job requirements, mention relevant achievements, and demonstrate knowledge of the company (recent deals, culture). Close with a call to action (request for interview). For entry‑level candidates, enthusiasm and attention to detail matter. Avoid generic templates; personalize each letter. Common mistakes include repeating the resume verbatim, being too long, or not explaining why you want that particular firm.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• An effective cover letter should be concise (one page), addressed to a specific person, and highlight why you are interested in the firm and role.\n• It should connect your skills and experiences to the job requirements, mention relevant achievements, and demonstrate knowledge of the company (recent deals, culture).\n• Close with a call to action (request for interview).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1066,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Market Timing Strategies",
    "question": "What are the challenges of trying to time the market, and what alternative approach might you recommend?",
    "modelAnswer": "Market timing is difficult because it requires predicting both when to exit and when to re‑enter, often leading to missed rallies or increased transaction costs. Emotional biases (fear, greed) and the efficient market hypothesis suggest consistent timing success is rare. Instead, a disciplined dollar‑cost averaging or strategic asset allocation approach is more reliable for long‑term investors. For entry‑level interviews, candidates should acknowledge that timing can add value in extreme situations but is generally not a sustainable strategy. Common mistakes include overconfidence in short‑term forecasts, chasing performance, or neglecting the tax implications of frequent trading.",
    "scoringKeywords": [
      "predicting market turns",
      "emotional biases",
      "dollar‑cost averaging",
      "strategic allocation",
      "transaction costs"
    ],
    "detailedAnalysis": {
      "overview": "Tests practical understanding of investment behavior and the limitations of active trading—a key lesson for new investors.",
      "commonMistakes": "Advocating market timing as a primary strategy, underestimating the impact of taxes and fees, or dismissing timing altogether without nuance."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Market timing is difficult because it requires predicting both when to exit and when to re‑enter, often leading to missed rallies or increased transaction costs. Emotional biases (fear, greed) and the efficient market hypothesis suggest consistent timing success is rare. Instead, a disciplined dollar‑cost averaging or strategic asset allocation approach is more reliable for long‑term investors. For entry‑level interviews, candidates should acknowledge that timing can add value in extreme situations but is generally not a sustainable strategy. Common mistakes include overconfidence in short‑term forecasts, chasing performance, or neglecting the tax implications of frequent trading.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Market timing is difficult because it requires predicting both when to exit and when to re‑enter, often leading to missed rallies or increased transaction costs\n• Emotional biases (fear, greed) and the efficient market hypothesis suggest consistent timing success is rare\n• Instead, a disciplined dollar‑cost averaging or strategic asset allocation approach is more reliable for long‑term investors\n• For entry‑level interviews, candidates should acknowledge that timing can add value in extreme situations but is generally not a sustainable strategy",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1067,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Salary Negotiation Strategies",
    "question": "What are some effective salary negotiation tips for an entry‑level finance offer?",
    "modelAnswer": "Research market rates for the role/location using Glassdoor, industry surveys, and alumni. Consider the total package (base, bonus, benefits, perks). Express enthusiasm for the role before negotiating. Frame requests based on value and market data, not personal need. Be prepared to discuss your qualifications and how they align with the firm's needs. Practice with a friend. If the offer is non‑negotiable, ask about performance‑based raises or early review. Common mistakes include accepting the first offer without discussion, making unrealistic demands, or focusing only on base salary.",
    "scoringKeywords": [
      "market research",
      "total compensation",
      "enthusiasm",
      "value‑based framing",
      "practice"
    ],
    "detailedAnalysis": {
      "overview": "A delicate but important skill—helps candidates secure fair compensation without damaging relationships.",
      "commonMistakes": "Negotiating too early, using competing offers as a blunt weapon, or not considering non‑monetary aspects (training, mentorship)."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Research market rates for the role/location using Glassdoor, industry surveys, and alumni. Consider the total package (base, bonus, benefits, perks). Express enthusiasm for the role before negotiating. Frame requests based on value and market data, not personal need. Be prepared to discuss your qualifications and how they align with the firm's needs. Practice with a friend. If the offer is non‑negotiable, ask about performance‑based raises or early review. Common mistakes include accepting the first offer without discussion, making unrealistic demands, or focusing only on base salary.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Research market rates for the role/location using Glassdoor, industry surveys, and alumni\n• Consider the total package (base, bonus, benefits, perks)\n• Express enthusiasm for the role before negotiating\n• Frame requests based on value and market data, not personal need",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1068,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Networking in Finance",
    "question": "What are some effective networking strategies for someone starting a finance career?",
    "modelAnswer": "Effective networking includes reaching out to alumni, attending industry events/conferences, using LinkedIn thoughtfully, and conducting informational interviews. Prepare specific questions about the person's role and firm, show genuine interest, and follow up with a thank‑you note. Offer value where possible (e.g., sharing an interesting article). Build relationships over time, not just when you need a job. For entry‑level, focus on learning rather than asking for a referral immediately. Common mistakes include being too transactional, not doing basic research, or failing to maintain connections.",
    "scoringKeywords": [
      "alumni network",
      "informational interviews",
      "LinkedIn",
      "follow‑up",
      "relationship building"
    ],
    "detailedAnalysis": {
      "overview": "A soft‑skills question that addresses how to build professional connections in a relationship‑driven industry.",
      "commonMistakes": "Sending generic connection requests, asking for a job in the first message, or neglecting to keep in touch after initial contact."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Effective networking includes reaching out to alumni, attending industry events/conferences, using LinkedIn thoughtfully, and conducting informational interviews. Prepare specific questions about the person's role and firm, show genuine interest, and follow up with a thank‑you note. Offer value where possible (e.g., sharing an interesting article). Build relationships over time, not just when you need a job. For entry‑level, focus on learning rather than asking for a referral immediately. Common mistakes include being too transactional, not doing basic research, or failing to maintain connections.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Offer value where possible (e.g., sharing an interesting article)\n• Build relationships over time, not just when you need a job\n• For entry‑level, focus on learning rather than asking for a referral immediately",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1069,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Equity Research Process",
    "question": "Walk me through the typical steps of an equity research analyst's work.",
    "modelAnswer": "The equity research process involves idea generation, due diligence, financial modeling, valuation, and report writing. Analysts start by screening for attractive stocks based on themes, sector trends, or quantitative factors. They then conduct deep dive into the company's business model, competitive position, and financials. Building a detailed forecast model leads to a valuation using multiples, DCF, or other methods. Finally, they produce a research report with a buy/hold/sell recommendation and target price. For entry‑level interviews, highlighting the iterative nature and the importance of communicating insights clearly is key.",
    "scoringKeywords": [
      "idea generation",
      "due diligence",
      "financial modeling",
      "valuation",
      "research report"
    ],
    "detailedAnalysis": {
      "overview": "A structured overview of what sell‑side or buy‑side equity analysts do—essential for anyone targeting research roles.",
      "commonMistakes": "Skipping the idea generation step, confusing sell‑side with buy‑side research, or omitting the final communication/output."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "The equity research process involves idea generation, due diligence, financial modeling, valuation, and report writing. Analysts start by screening for attractive stocks based on themes, sector trends, or quantitative factors. They then conduct deep dive into the company's business model, competitive position, and financials. Building a detailed forecast model leads to a valuation using multiples, DCF, or other methods. Finally, they produce a research report with a buy/hold/sell recommendation and target price. For entry‑level interviews, highlighting the iterative nature and the importance of communicating insights clearly is key.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• They then conduct deep dive into the company's business model, competitive position, and financials\n• Building a detailed forecast model leads to a valuation using multiples, DCF, or other methods\n• Finally, they produce a research report with a buy/hold/sell recommendation and target price",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1070,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Working Capital Management",
    "question": "Explain the concept of working capital and why it's important for a company's financial health.",
    "modelAnswer": "Working capital is the difference between current assets and current liabilities, representing the short-term liquidity available to fund day-to-day operations. Effective working capital management ensures a company can meet its short-term obligations while minimizing idle cash. Key aspects include optimizing inventory levels, managing receivables collection periods, and negotiating favorable payment terms with suppliers. For example, a company with positive working capital can pay suppliers on time and invest in growth opportunities. Poor management can lead to cash shortages even if the business is profitable on paper. Key metrics include the current ratio and quick ratio.",
    "scoringKeywords": [
      "current assets",
      "current liabilities",
      "liquidity",
      "operational efficiency",
      "cash conversion cycle"
    ],
    "detailedAnalysis": {
      "overview": "This question tests understanding of short-term financial management, crucial for entry‑level roles in corporate finance, treasury, or credit analysis.",
      "commonMistakes": "Confusing working capital with cash, overlooking the cash conversion cycle, or failing to mention the trade‑off between liquidity and profitability."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Working capital is the difference between current assets and current liabilities, representing the short-term liquidity available to fund day-to-day operations. Effective working capital management ensures a company can meet its short-term obligations while minimizing idle cash. Key aspects include optimizing inventory levels, managing receivables collection periods, and negotiating favorable payment terms with suppliers. For example, a company with positive working capital can pay suppliers on time and invest in growth opportunities. Poor management can lead to cash shortages even if the business is profitable on paper. Key metrics include the current ratio and quick ratio.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Working capital is the difference between current assets and current liabilities, representing the short-term liquidity available to fund day-to-day operations.\n• Effective working capital management ensures a company can meet its short-term obligations while minimizing idle cash.\n• Key aspects include optimizing inventory levels, managing receivables collection periods, and negotiating favorable payment terms with suppliers.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1071,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Fixed Income Trading",
    "question": "What are the main differences between trading equities and trading fixed income securities?",
    "modelAnswer": "Fixed income trading is mostly over‑the‑counter (OTC) with less transparency, while equities trade on centralized exchanges. Bonds are quoted in yield/price, have defined cash flows (coupon, principal), and are influenced by interest rates and credit spreads. Liquidity varies greatly by issuer and maturity. Trading desks often act as principals (hold inventory) rather than pure agents. For entry‑level interviews, candidates should mention the importance of macroeconomic data (CPI, Fed decisions) and credit analysis. Common mistakes include treating bonds like stocks, ignoring the impact of duration, or not understanding the role of dealers.",
    "scoringKeywords": [
      "OTC markets",
      "yield",
      "credit spreads",
      "duration",
      "dealer inventory"
    ],
    "detailedAnalysis": {
      "overview": "A comparative question that reveals understanding of different asset classes—useful for fixed income sales & trading interviews.",
      "commonMistakes": "Assuming bond prices move linearly with yields, overlooking settlement differences (T+2 vs. T+1), or not mentioning the regulatory changes (MiFID II) affecting bond trading."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Fixed income trading is mostly over‑the‑counter (OTC) with less transparency, while equities trade on centralized exchanges. Bonds are quoted in yield/price, have defined cash flows (coupon, principal), and are influenced by interest rates and credit spreads. Liquidity varies greatly by issuer and maturity. Trading desks often act as principals (hold inventory) rather than pure agents. For entry‑level interviews, candidates should mention the importance of macroeconomic data (CPI, Fed decisions) and credit analysis. Common mistakes include treating bonds like stocks, ignoring the impact of duration, or not understanding the role of dealers.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Fixed income trading is mostly over‑the‑counter (OTC) with less transparency, while equities trade on centralized exchanges.\n• Bonds are quoted in yield/price, have defined cash flows (coupon, principal), and are influenced by interest rates and credit spreads.\n• Liquidity varies greatly by issuer and maturity.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1072,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Trade Finance Basics",
    "question": "What is trade finance and what are its main instruments?",
    "modelAnswer": "Trade finance facilitates international trade by mitigating payment and delivery risks between buyers and sellers. Key instruments include letters of credit (LCs), bank guarantees, documentary collections, and supply chain finance. An LC ensures the seller gets paid upon presenting compliant shipping documents. Bank guarantees provide assurance of performance or payment. Supply chain finance allows suppliers to receive early payment at a discount. For entry‑level interviews, candidates should mention the role of banks as intermediaries that reduce counterparty risk. Common mistakes include confusing LCs with insurance, or not understanding the difference between import and export financing.",
    "scoringKeywords": [
      "letters of credit",
      "bank guarantees",
      "documentary collections",
      "supply chain finance",
      "counterparty risk"
    ],
    "detailedAnalysis": {
      "overview": "Tests knowledge of a specialized but important banking area—relevant for roles in trade finance, transaction banking, or corporate banking.",
      "commonMistakes": "Over‑simplifying the documentation process, ignoring the regulatory (anti‑money laundering) aspects, or assuming trade finance is only for large corporations."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Trade finance facilitates international trade by mitigating payment and delivery risks between buyers and sellers. Key instruments include letters of credit (LCs), bank guarantees, documentary collections, and supply chain finance. An LC ensures the seller gets paid upon presenting compliant shipping documents. Bank guarantees provide assurance of performance or payment. Supply chain finance allows suppliers to receive early payment at a discount. For entry‑level interviews, candidates should mention the role of banks as intermediaries that reduce counterparty risk. Common mistakes include confusing LCs with insurance, or not understanding the difference between import and export financing.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• An LC ensures the seller gets paid upon presenting compliant shipping documents\n• Bank guarantees provide assurance of performance or payment\n• Supply chain finance allows suppliers to receive early payment at a discount",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1073,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Corporate Governance",
    "question": "What is corporate governance and why is it important for investors?",
    "modelAnswer": "Corporate governance refers to the system of rules, practices, and processes by which a company is directed and controlled. It balances the interests of shareholders, management, and other stakeholders. Good governance includes an independent board, transparent financial reporting, ethical conduct, and shareholder rights protection. For investors, strong governance reduces agency costs and the risk of fraud or mismanagement. Entry‑level candidates should mention key components like board structure, audit committees, and executive compensation alignment. Recent trends emphasize ESG (environmental, social, governance) factors as part of governance assessment.",
    "scoringKeywords": [
      "board independence",
      "transparency",
      "shareholder rights",
      "agency costs",
      "ESG"
    ],
    "detailedAnalysis": {
      "overview": "Tests awareness of how companies are managed and held accountable—a topic increasingly relevant in finance interviews.",
      "commonMistakes": "Equating governance only with compliance, ignoring the investor perspective, or failing to mention recent ESG integration."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Corporate governance refers to the system of rules, practices, and processes by which a company is directed and controlled. It balances the interests of shareholders, management, and other stakeholders. Good governance includes an independent board, transparent financial reporting, ethical conduct, and shareholder rights protection. For investors, strong governance reduces agency costs and the risk of fraud or mismanagement. Entry‑level candidates should mention key components like board structure, audit committees, and executive compensation alignment. Recent trends emphasize ESG (environmental, social, governance) factors as part of governance assessment.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Corporate governance refers to the system of rules, practices, and processes by which a company is directed and controlled.\n• It balances the interests of shareholders, management, and other stakeholders.\n• Good governance includes an independent board, transparent financial reporting, ethical conduct, and shareholder rights protection.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1074,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Derivatives Basics (Options, Futures)",
    "question": "What are the basic characteristics of options and futures?",
    "modelAnswer": "Futures are standardized contracts to buy/sell an asset at a future date at a predetermined price; they are exchange‑traded, marked‑to‑market daily, and involve margin. Options give the buyer the right (but not obligation) to buy (call) or sell (put) at a strike price by expiration. Options have asymmetric payoff; futures have symmetric. For entry‑level interviews, candidates should know that derivatives are used for hedging, speculation, and arbitrage. Common mistakes include confusing options with forwards, or not understanding the difference between European and American exercise styles.",
    "scoringKeywords": [
      "futures contract",
      "call option",
      "put option",
      "strike price",
      "margin"
    ],
    "detailedAnalysis": {
      "overview": "Tests foundational knowledge of derivatives—essential for roles in trading, risk management, or structured products.",
      "commonMistakes": "Mixing up long vs. short positions, forgetting about time decay in options, or assuming all derivatives are highly leveraged."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Futures are standardized contracts to buy/sell an asset at a future date at a predetermined price; they are exchange‑traded, marked‑to‑market daily, and involve margin. Options give the buyer the right (but not obligation) to buy (call) or sell (put) at a strike price by expiration. Options have asymmetric payoff; futures have symmetric. For entry‑level interviews, candidates should know that derivatives are used for hedging, speculation, and arbitrage. Common mistakes include confusing options with forwards, or not understanding the difference between European and American exercise styles.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Futures are standardized contracts to buy/sell an asset at a future date at a predetermined price; they are exchange‑traded, marked‑to‑market daily, and involve margin.\n• Options give the buyer the right (but not obligation) to buy (call) or sell (put) at a strike price by expiration.\n• Options have asymmetric payoff; futures have symmetric.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1075,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Mergers & Acquisitions Basics",
    "question": "What are the primary motivations for a company to pursue a merger or acquisition?",
    "modelAnswer": "Companies pursue M&A to achieve synergies (cost savings or revenue enhancements), enter new markets, acquire technology or talent, eliminate competitors, or achieve diversification. Financial motivations include using excess cash or cheap debt to create value. Strategic buyers often look for complementary businesses that increase market share or improve efficiency. For entry‑level interviews, candidates should mention common types (horizontal, vertical, conglomerate) and key challenges like integration risks and overpaying. Understanding basic valuation metrics (acquisition multiples, premium paid) is also useful.",
    "scoringKeywords": [
      "synergies",
      "market entry",
      "technology acquisition",
      "diversification",
      "integration risk"
    ],
    "detailedAnalysis": {
      "overview": "A core investment banking and corporate development topic. Entry‑level candidates should know the basic drivers and terminology.",
      "commonMistakes": "Focusing only on financial gains without mentioning strategic rationale, or confusing mergers with acquisitions."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Companies pursue M&A to achieve synergies (cost savings or revenue enhancements), enter new markets, acquire technology or talent, eliminate competitors, or achieve diversification. Financial motivations include using excess cash or cheap debt to create value. Strategic buyers often look for complementary businesses that increase market share or improve efficiency. For entry‑level interviews, candidates should mention common types (horizontal, vertical, conglomerate) and key challenges like integration risks and overpaying. Understanding basic valuation metrics (acquisition multiples, premium paid) is also useful.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Companies pursue M&A to achieve synergies (cost savings or revenue enhancements), enter new markets, acquire technology or talent, eliminate competitors, or achieve diversification.\n• Financial motivations include using excess cash or cheap debt to create value.\n• Strategic buyers often look for complementary businesses that increase market share or improve efficiency.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1076,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Long‑Term Career Planning",
    "question": "What steps should an entry‑level finance professional take to plan their career long‑term?",
    "modelAnswer": "Start by identifying your interests (markets, corporate finance, quantitative) and values (work‑life balance, impact). Research career paths and talk to professionals in those roles. Set short‑term goals (skills, certifications) and long‑term aspirations (role in 5‑10 years). Seek roles that provide relevant experience and mentorship. Regularly reassess and adapt as the industry evolves. Build a diverse skill set (technical, soft, leadership). Networking and staying informed about industry trends are ongoing. Common mistakes include sticking rigidly to a plan, chasing prestige over fit, or neglecting personal development outside work.",
    "scoringKeywords": [
      "self‑assessment",
      "career research",
      "goal setting",
      "skill development",
      "adaptability"
    ],
    "detailedAnalysis": {
      "overview": "Encourages intentional career management rather than drifting—important for sustained success in finance.",
      "commonMistakes": "Comparing your path to others', focusing only on money, or waiting for opportunities instead of creating them."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Start by identifying your interests (markets, corporate finance, quantitative) and values (work‑life balance, impact). Research career paths and talk to professionals in those roles. Set short‑term goals (skills, certifications) and long‑term aspirations (role in 5‑10 years). Seek roles that provide relevant experience and mentorship. Regularly reassess and adapt as the industry evolves. Build a diverse skill set (technical, soft, leadership). Networking and staying informed about industry trends are ongoing. Common mistakes include sticking rigidly to a plan, chasing prestige over fit, or neglecting personal development outside work.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Research career paths and talk to professionals in those roles\n• Set short‑term goals (skills, certifications) and long‑term aspirations (role in 5‑10 years)\n• Seek roles that provide relevant experience and mentorship\n• Regularly reassess and adapt as the industry evolves",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1077,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Bank Financial Statements",
    "question": "How do a bank's financial statements differ from those of a non‑financial company?",
    "modelAnswer": "Banks have unique line items: loans and deposits are core assets/liabilities, not inventory or payables. The income statement is driven by net interest income (interest earned minus interest paid) and fee income. Provision for loan losses is a major expense reflecting expected credit losses. The balance sheet is larger relative to equity due to leverage. Regulatory capital (Tier 1, Tier 2) is a key metric. For entry‑level interviews, candidates should note that banks are highly regulated and their statements reflect that (e.g., held‑to‑maturity vs. trading securities). Common mistakes include treating loans as sales, or ignoring off‑balance‑sheet items like loan commitments.",
    "scoringKeywords": [
      "net interest income",
      "loan loss provision",
      "deposits",
      "regulatory capital",
      "leverage"
    ],
    "detailedAnalysis": {
      "overview": "A technical question that reveals whether a candidate understands the specifics of banking finance.",
      "commonMistakes": "Applying manufacturing ratios (e.g., inventory turnover) to banks, forgetting the importance of non‑interest income, or confusing tangible common equity with total equity."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Banks have unique line items: loans and deposits are core assets/liabilities, not inventory or payables. The income statement is driven by net interest income (interest earned minus interest paid) and fee income. Provision for loan losses is a major expense reflecting expected credit losses. The balance sheet is larger relative to equity due to leverage. Regulatory capital (Tier 1, Tier 2) is a key metric. For entry‑level interviews, candidates should note that banks are highly regulated and their statements reflect that (e.g., held‑to‑maturity vs. trading securities). Common mistakes include treating loans as sales, or ignoring off‑balance‑sheet items like loan commitments.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Banks have unique line items: loans and deposits are core assets/liabilities, not inventory or payables.\n• The income statement is driven by net interest income (interest earned minus interest paid) and fee income.\n• Provision for loan losses is a major expense reflecting expected credit losses.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1078,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "FX Markets Overview",
    "question": "What are the key characteristics of the foreign exchange market?",
    "modelAnswer": "The FX market is the largest and most liquid financial market, operating 24 hours globally. It is primarily OTC, with major currency pairs (EUR/USD, USD/JPY) having tight spreads. Participants include central banks, corporations, investors, and speculators. Drivers include interest rate differentials, economic data, geopolitical events, and carry trades. For entry‑level interviews, candidates should know that FX is quoted in pairs, with the base currency first. Spot and forward contracts are common. Common mistakes include thinking FX is only for travel, or not understanding the impact of central bank interventions.",
    "scoringKeywords": [
      "OTC market",
      "liquidity",
      "currency pairs",
      "interest rate differentials",
      "central banks"
    ],
    "detailedAnalysis": {
      "overview": "Tests basic knowledge of the global currency market—relevant for FX trading, corporate treasury, or international finance roles.",
      "commonMistakes": "Confusing nominal exchange rates with real exchange rates, overlooking transaction costs for exotic currencies, or assuming FX markets are purely speculative."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "The FX market is the largest and most liquid financial market, operating 24 hours globally. It is primarily OTC, with major currency pairs (EUR/USD, USD/JPY) having tight spreads. Participants include central banks, corporations, investors, and speculators. Drivers include interest rate differentials, economic data, geopolitical events, and carry trades. For entry‑level interviews, candidates should know that FX is quoted in pairs, with the base currency first. Spot and forward contracts are common. Common mistakes include thinking FX is only for travel, or not understanding the impact of central bank interventions.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• The FX market is the largest and most liquid financial market, operating 24 hours globally\n• It is primarily OTC, with major currency pairs (EUR/USD, USD/JPY) having tight spreads\n• Participants include central banks, corporations, investors, and speculators\n• Drivers include interest rate differentials, economic data, geopolitical events, and ca",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1079,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Resume Tips for Finance",
    "question": "What are the key elements of a strong finance resume for an entry‑level candidate?",
    "modelAnswer": "A strong finance resume includes a clear summary of relevant skills (financial modeling, valuation, Excel), education with GPA (if high), finance‑related coursework or projects, internship experience with quantifiable achievements, and extracurricular activities showing leadership or analytical ability. Use action verbs and numbers (e.g., \"built a DCF model that valued a $50M company\"). Tailor to the specific role (investment banking vs. asset management). Avoid typos, excessive length, or irrelevant details. For entry‑level, demonstrating passion for markets and technical readiness is key. Common mistakes include vague descriptions, listing duties instead of accomplishments, or over‑designing the format.",
    "scoringKeywords": [
      "quantifiable achievements",
      "relevant skills",
      "education",
      "internship experience",
      "tailored content"
    ],
    "detailedAnalysis": {
      "overview": "Practical advice for crafting a resume that stands out in competitive finance recruiting.",
      "commonMistakes": "Including irrelevant jobs, using passive language, failing to highlight technical skills, or neglecting to proofread."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A strong finance resume includes a clear summary of relevant skills (financial modeling, valuation, Excel), education with GPA (if high), finance‑related coursework or projects, internship experience with quantifiable achievements, and extracurricular activities showing leadership or analytical ability. Use action verbs and numbers (e.g., \"built a DCF model that valued a $50M company\"). Tailor to the specific role (investment banking vs. asset management). Avoid typos, excessive length, or irrelevant details. For entry‑level, demonstrating passion for markets and technical readiness is key. Common mistakes include vague descriptions, listing duties instead of accomplishments, or over‑designing the format.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Use action verbs and numbers (e.g., \"built a DCF model that valued a $50M company\")\n• Tailor to the specific role (investment banking vs\n• Avoid typos, excessive length, or irrelevant details\n• For entry‑level, demonstrating passion for markets and technical readiness is key",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1080,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Internship Success Tips",
    "question": "What can an intern do to maximize their chances of receiving a full‑time offer?",
    "modelAnswer": "Arrive early, dress professionally, show enthusiasm for even mundane tasks, ask thoughtful questions, and seek feedback regularly. Build relationships with colleagues and mentors. Deliver high‑quality work, meet deadlines, and go beyond the assignment when appropriate. Demonstrate curiosity about the business and industry. Keep a record of accomplishments for your final review. Avoid office politics, excessive social media, or appearing disengaged. For finance internships, technical competence (Excel, modeling) is expected; soft skills (communication, teamwork) differentiate you. Common mistakes include waiting to be told what to do, not networking, or failing to express interest in returning.",
    "scoringKeywords": [
      "professionalism",
      "relationship building",
      "high‑quality work",
      "curiosity",
      "feedback seeking"
    ],
    "detailedAnalysis": {
      "overview": "Practical advice for turning an internship into a job offer—based on real expectations in finance.",
      "commonMistakes": "Treating the internship as a summer camp, being afraid to ask for help, or not aligning with the team's culture."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Arrive early, dress professionally, show enthusiasm for even mundane tasks, ask thoughtful questions, and seek feedback regularly. Build relationships with colleagues and mentors. Deliver high‑quality work, meet deadlines, and go beyond the assignment when appropriate. Demonstrate curiosity about the business and industry. Keep a record of accomplishments for your final review. Avoid office politics, excessive social media, or appearing disengaged. For finance internships, technical competence (Excel, modeling) is expected; soft skills (communication, teamwork) differentiate you. Common mistakes include waiting to be told what to do, not networking, or failing to express interest in returning.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Build relationships with colleagues and mentors\n• Deliver high‑quality work, meet deadlines, and go beyond the assignment when appropriate\n• Demonstrate curiosity about the business and industry\n• Keep a record of accomplishments for your final review",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1081,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Credit Risk Assessment",
    "question": "How does a bank assess the credit risk of a corporate borrower?",
    "modelAnswer": "Banks assess credit risk through financial statement analysis, cash flow projections, industry evaluation, and management due diligence. Key ratios include debt‑to‑EBITDA, interest coverage, and current ratio. Qualitative factors include business model sustainability, competitive position, and macroeconomic exposure. Banks also consider collateral quality and secondary repayment sources. For entry‑level interviews, candidates should mention the \"5 Cs of Credit\" and the use of internal rating models. Common mistakes include over‑relying on historical numbers, ignoring off‑balance‑sheet liabilities, or not considering the borrower's sensitivity to economic cycles.",
    "scoringKeywords": [
      "financial ratios",
      "cash flow projections",
      "industry analysis",
      "collateral",
      "5 Cs of Credit"
    ],
    "detailedAnalysis": {
      "overview": "A core banking question—demonstrates understanding of how lenders decide whom to lend to and at what terms.",
      "commonMistakes": "Treating all industries with the same ratios, forgetting to adjust for seasonality, or neglecting the importance of management integrity."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Banks assess credit risk through financial statement analysis, cash flow projections, industry evaluation, and management due diligence. Key ratios include debt‑to‑EBITDA, interest coverage, and current ratio. Qualitative factors include business model sustainability, competitive position, and macroeconomic exposure. Banks also consider collateral quality and secondary repayment sources. For entry‑level interviews, candidates should mention the \"5 Cs of Credit\" and the use of internal rating models. Common mistakes include over‑relying on historical numbers, ignoring off‑balance‑sheet liabilities, or not considering the borrower's sensitivity to economic cycles.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Banks assess credit risk through financial statement analysis, cash flow projections, industry evaluation, and management due diligence.\n• Key ratios include debt‑to‑EBITDA, interest coverage, and current ratio.\n• Qualitative factors include business model sustainability, competitive position, and macroeconomic exposure.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1082,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Capital Budgeting Basics",
    "question": "What is capital budgeting and what are the key methods used to evaluate investment projects?",
    "modelAnswer": "Capital budgeting is the process of evaluating and selecting long‑term investments that align with a company's strategic goals. Common evaluation methods include Net Present Value (NPV), Internal Rate of Return (IRR), and Payback Period. NPV discounts future cash flows to today's value; a positive NPV indicates value creation. IRR is the discount rate that makes NPV zero; projects with IRR above the cost of capital are acceptable. Payback Period measures the time required to recover the initial investment—simple but ignores time value of money. For entry‑level roles, understanding these basic tools and their limitations (e.g., IRR's multiple‑solution issue) is essential.",
    "scoringKeywords": [
      "NPV",
      "IRR",
      "payback period",
      "discounted cash flow",
      "investment appraisal"
    ],
    "detailedAnalysis": {
      "overview": "Tests foundational knowledge of how firms decide which large projects to undertake. A core topic in corporate finance interviews.",
      "commonMistakes": "Confusing IRR with cost of capital, forgetting to mention the time value of money, or presenting payback period as the primary decision criterion."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Capital budgeting is the process of evaluating and selecting long‑term investments that align with a company's strategic goals. Common evaluation methods include Net Present Value (NPV), Internal Rate of Return (IRR), and Payback Period. NPV discounts future cash flows to today's value; a positive NPV indicates value creation. IRR is the discount rate that makes NPV zero; projects with IRR above the cost of capital are acceptable. Payback Period measures the time required to recover the initial investment—simple but ignores time value of money. For entry‑level roles, understanding these basic tools and their limitations (e.g., IRR's multiple‑solution issue) is essential.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Capital budgeting is the process of evaluating and selecting long‑term investments that align with a company's strategic goals.\n• Common evaluation methods include Net Present Value (NPV), Internal Rate of Return (IRR), and Payback Period.\n• NPV discounts future cash flows to today's value; a positive NPV indicates value creation.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1083,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Market Microstructure",
    "question": "What is market microstructure and what are some key elements?",
    "modelAnswer": "Market microstructure studies the process and rules by which securities are traded. Key elements include order types, matching engines, market participants (retail, institutional, market makers), fee structures (maker‑taker), and transparency (pre‑trade/post‑trade). Different market models exist: auction (NYSE) vs. continuous (NASDAQ) vs. dark pools. For entry‑level interviews, candidates should understand that microstructure affects execution costs, liquidity, and price formation. Common mistakes include confusing exchange‑based trading with OTC, or assuming all markets operate the same way.",
    "scoringKeywords": [
      "order matching",
      "market participants",
      "fee structures",
      "transparency",
      "trading venues"
    ],
    "detailedAnalysis": {
      "overview": "A technical but important topic for roles in electronic trading, exchange operations, or quantitative analysis.",
      "commonMistakes": "Over‑simplifying the role of high‑frequency traders, ignoring regulatory differences, or not mentioning the impact of technology on market structure."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Market microstructure studies the process and rules by which securities are traded. Key elements include order types, matching engines, market participants (retail, institutional, market makers), fee structures (maker‑taker), and transparency (pre‑trade/post‑trade). Different market models exist: auction (NYSE) vs. continuous (NASDAQ) vs. dark pools. For entry‑level interviews, candidates should understand that microstructure affects execution costs, liquidity, and price formation. Common mistakes include confusing exchange‑based trading with OTC, or assuming all markets operate the same way.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Market microstructure studies the process and rules by which securities are traded.\n• Key elements include order types, matching engines, market participants (retail, institutional, market makers), fee structures (maker‑taker), and transparency (pre‑trade/post‑trade).\n• Different market models exist: auction (NYSE) vs.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1084,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Investment Thesis Development",
    "question": "How do you develop a compelling investment thesis for a stock?",
    "modelAnswer": "An investment thesis is built on a clear hypothesis about why a stock is mispriced, supported by qualitative and quantitative evidence. Start by identifying a gap between market perception and fundamental reality—e.g., undervalued due to temporary headwinds, or overvalued because of unrealistic growth expectations. Gather evidence from financial statements, industry trends, management commentary, and competitor analysis. The thesis should be specific, testable, and include a timeline for catalysts. For entry‑level roles, demonstrating logical reasoning and the ability to articulate both upside and risks is key. Common mistakes include being too vague, ignoring contrary data, or relying on momentum without fundamental justification.",
    "scoringKeywords": [
      "hypothesis",
      "fundamental analysis",
      "catalysts",
      "risk assessment",
      "market mispricing"
    ],
    "detailedAnalysis": {
      "overview": "Tests critical thinking and synthesis skills—how to turn data into a coherent investment argument.",
      "commonMistakes": "Building a thesis solely on valuation multiples, neglecting competitive threats, or failing to define what would disprove the thesis."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "An investment thesis is built on a clear hypothesis about why a stock is mispriced, supported by qualitative and quantitative evidence. Start by identifying a gap between market perception and fundamental reality—e.g., undervalued due to temporary headwinds, or overvalued because of unrealistic growth expectations. Gather evidence from financial statements, industry trends, management commentary, and competitor analysis. The thesis should be specific, testable, and include a timeline for catalysts. For entry‑level roles, demonstrating logical reasoning and the ability to articulate both upside and risks is key. Common mistakes include being too vague, ignoring contrary data, or relying on momentum without fundamental justification.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• An investment thesis is built on a clear hypothesis about why a stock is mispriced, supported by qualitative and quantitative evidence.\n• Start by identifying a gap between market perception and fundamental reality—e.\n• , undervalued due to temporary headwinds, or overvalued because of unrealistic growth expectations.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1085,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Risk Assessment Frameworks",
    "question": "What are the main types of risk you consider when evaluating an investment?",
    "modelAnswer": "Investment risks can be categorized as market risk (broad economic movements), company‑specific risk (business model, management), liquidity risk (ability to sell quickly), credit risk (default), and operational risk (internal failures). For equities, beta measures market risk; for bonds, credit ratings assess default probability. Entry‑level candidates should also mention macroeconomic risks (interest rates, inflation) and geopolitical risks. A good risk assessment quantifies what can be quantified and qualitatively describes the rest. Diversification mitigates unsystematic risk, but systematic risk remains. Common mistakes include ignoring tail risks, conflating volatility with permanent loss, or not considering correlation.",
    "scoringKeywords": [
      "market risk",
      "company‑specific risk",
      "liquidity risk",
      "credit risk",
      "diversification"
    ],
    "detailedAnalysis": {
      "overview": "Tests awareness of the different dimensions of risk—a crucial part of investment analysis and portfolio construction.",
      "commonMistakes": "Focusing only on historical volatility, overlooking concentration risk, or treating all risks as equally important."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Investment risks can be categorized as market risk (broad economic movements), company‑specific risk (business model, management), liquidity risk (ability to sell quickly), credit risk (default), and operational risk (internal failures). For equities, beta measures market risk; for bonds, credit ratings assess default probability. Entry‑level candidates should also mention macroeconomic risks (interest rates, inflation) and geopolitical risks. A good risk assessment quantifies what can be quantified and qualitatively describes the rest. Diversification mitigates unsystematic risk, but systematic risk remains. Common mistakes include ignoring tail risks, conflating volatility with permanent loss, or not considering correlation.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• For equities, beta measures market risk; for bonds, credit ratings assess default probability\n• A good risk assessment quantifies what can be quantified and qualitatively describes the rest\n• Diversification mitigates unsystematic risk, but systematic risk remains",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1086,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Mentorship Seeking",
    "question": "How should a new finance professional go about finding and building a mentorship relationship?",
    "modelAnswer": "Look for mentors within your firm (senior colleagues, managers) or through alumni networks. Approach potential mentors respectfully, explaining why you admire their career path and seeking advice (not a job). Be specific about what you hope to learn. Schedule periodic check‑ins, come prepared with questions, and show appreciation for their time. Follow up on their suggestions. A good mentorship is reciprocal—offer to help with small tasks or share your fresh perspective. Common mistakes include being too demanding, not respecting boundaries, or expecting the mentor to solve all your problems.",
    "scoringKeywords": [
      "respectful approach",
      "specific learning goals",
      "prepared meetings",
      "reciprocity",
      "boundaries"
    ],
    "detailedAnalysis": {
      "overview": "Guidance on forming productive mentor‑mentee relationships, which are invaluable for career growth.",
      "commonMistakes": "Choosing a mentor solely based on title, not doing your homework beforehand, or failing to maintain the relationship over time."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Look for mentors within your firm (senior colleagues, managers) or through alumni networks. Approach potential mentors respectfully, explaining why you admire their career path and seeking advice (not a job). Be specific about what you hope to learn. Schedule periodic check‑ins, come prepared with questions, and show appreciation for their time. Follow up on their suggestions. A good mentorship is reciprocal—offer to help with small tasks or share your fresh perspective. Common mistakes include being too demanding, not respecting boundaries, or expecting the mentor to solve all your problems.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Look for mentors within your firm (senior colleagues, managers) or through alumni networks\n• Be specific about what you hope to learn\n• Schedule periodic check‑ins, come prepared with questions, and show appreciation for their time\n• A good mentorship is reciprocal—offer to help with small tasks or share your fresh perspective",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1087,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Cost of Capital Concepts",
    "question": "What is the weighted average cost of capital (WACC) and why is it important for a company?",
    "modelAnswer": "WACC is the average rate a company expects to pay to finance its assets, weighted by the proportion of debt and equity in its capital structure. It reflects the risk of the firm's operations and is used as a discount rate for evaluating investment projects. A lower WACC means cheaper financing and higher project valuations. Key components are cost of debt (after tax) and cost of equity (often estimated via CAPM). For entry‑level candidates, the key is to understand that WACC represents the minimum return a project must earn to create value. Mistakes include ignoring the tax shield on debt or using the wrong risk‑free rate in CAPM.",
    "scoringKeywords": [
      "WACC",
      "cost of debt",
      "cost of equity",
      "capital structure",
      "discount rate"
    ],
    "detailedAnalysis": {
      "overview": "A fundamental concept in corporate finance that ties together financing decisions and investment valuation.",
      "commonMistakes": "Forgetting to tax‑adjust the cost of debt, mixing up WACC with required return on equity, or applying WACC to projects with different risk profiles."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "WACC is the average rate a company expects to pay to finance its assets, weighted by the proportion of debt and equity in its capital structure. It reflects the risk of the firm's operations and is used as a discount rate for evaluating investment projects. A lower WACC means cheaper financing and higher project valuations. Key components are cost of debt (after tax) and cost of equity (often estimated via CAPM). For entry‑level candidates, the key is to understand that WACC represents the minimum return a project must earn to create value. Mistakes include ignoring the tax shield on debt or using the wrong risk‑free rate in CAPM.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• A lower WACC means cheaper financing and higher project valuations\n• Key components are cost of debt (after tax) and cost of equity (often estimated via CAPM)\n• Mistakes include ignoring the tax shield on debt or using the wrong risk‑free rate in CAPM.",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1088,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Algorithmic Trading Intro",
    "question": "What is algorithmic trading and what are its main advantages?",
    "modelAnswer": "Algorithmic trading uses computer programs to execute orders based on predefined rules (price, volume, timing). Advantages include speed, accuracy, reduced market impact, and ability to backtest strategies. Common algos include VWAP (volume‑weighted average price), TWAP (time‑weighted), and implementation shortfall. For entry‑level interviews, candidates should mention that algos are used by institutional investors to manage large orders efficiently. Risks include technology failures and unexpected market behavior. Common mistakes include thinking algos are only for high‑frequency trading, or assuming they always outperform human traders.",
    "scoringKeywords": [
      "execution algorithms",
      "market impact",
      "backtesting",
      "VWAP",
      "technology risk"
    ],
    "detailedAnalysis": {
      "overview": "A modern trading topic—relevant for quant trading, electronic execution, or buy‑side trading roles.",
      "commonMistakes": "Confusing algorithmic trading with high‑frequency trading, overlooking the importance of transaction cost analysis, or not considering regulatory scrutiny."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Algorithmic trading uses computer programs to execute orders based on predefined rules (price, volume, timing). Advantages include speed, accuracy, reduced market impact, and ability to backtest strategies. Common algos include VWAP (volume‑weighted average price), TWAP (time‑weighted), and implementation shortfall. For entry‑level interviews, candidates should mention that algos are used by institutional investors to manage large orders efficiently. Risks include technology failures and unexpected market behavior. Common mistakes include thinking algos are only for high‑frequency trading, or assuming they always outperform human traders.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Algorithmic trading uses computer programs to execute orders based on predefined rules (price, volume, timing).\n• Advantages include speed, accuracy, reduced market impact, and ability to backtest strategies.\n• Common algos include VWAP (volume‑weighted average price), TWAP (time‑weighted), and implementation shortfall.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1089,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Treasury Services",
    "question": "What treasury services do banks offer to corporate clients?",
    "modelAnswer": "Banks provide cash management (payments, collections, pooling), liquidity solutions (sweep accounts, notional pooling), trade finance (letters of credit, supply chain finance), foreign exchange, and risk management (hedging). These services help corporations optimize working capital, reduce transaction costs, and manage financial risks. For entry‑level interviews, candidates should emphasize that treasury services are fee‑based and relationship‑driven. Understanding the basics of a cash conversion cycle and how bank products address each stage is a plus. Common mistakes include confusing trade finance with traditional lending, or overlooking the importance of digital platforms.",
    "scoringKeywords": [
      "cash management",
      "liquidity solutions",
      "trade finance",
      "foreign exchange",
      "risk management"
    ],
    "detailedAnalysis": {
      "overview": "A practical question about a major revenue stream for commercial banks—relevant for corporate banking or transaction banking roles.",
      "commonMistakes": "Listing products without explaining their purpose, ignoring the technology aspect (APIs, platforms), or assuming all services are equally profitable."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Banks provide cash management (payments, collections, pooling), liquidity solutions (sweep accounts, notional pooling), trade finance (letters of credit, supply chain finance), foreign exchange, and risk management (hedging). These services help corporations optimize working capital, reduce transaction costs, and manage financial risks. For entry‑level interviews, candidates should emphasize that treasury services are fee‑based and relationship‑driven. Understanding the basics of a cash conversion cycle and how bank products address each stage is a plus. Common mistakes include confusing trade finance with traditional lending, or overlooking the importance of digital platforms.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Banks provide cash management (payments, collections, pooling), liquidity solutions (sweep accounts, notional pooling), trade finance (letters of credit, supply chain finance), foreign exchange, and risk management (hedging)\n• These services help corporations optimize working capital, reduce transaction costs, and manage financial risks\n• For entry‑level interviews, candidates should emphasize that treasury services are fee‑based and relationship‑driven\n• Understanding the basics of a cash conversion cycle and how bank products address each stage is a plus",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1090,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Order Types and Execution",
    "question": "What are the most common order types used in equity trading?",
    "modelAnswer": "Common order types include market orders (execute immediately at best available price), limit orders (execute only at specified price or better), stop‑loss orders (become market orders when price hits a trigger), and iceberg orders (show only part of the total quantity). Each serves different objectives: market orders prioritize speed, limit orders control price, stop‑loss limits downside. For entry‑level interviews, candidates should know that execution quality depends on liquidity and order type. Common mistakes include not understanding that stop‑loss orders do not guarantee execution price during gaps, or confusing a limit order with a stop‑limit order.",
    "scoringKeywords": [
      "market order",
      "limit order",
      "stop‑loss order",
      "iceberg order",
      "execution quality"
    ],
    "detailedAnalysis": {
      "overview": "Tests practical knowledge of how trades are placed—essential for any trading, execution, or portfolio management role.",
      "commonMistakes": "Overlooking the impact of hidden orders, assuming all orders are equally suitable, or not considering market impact when placing large orders."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Common order types include market orders (execute immediately at best available price), limit orders (execute only at specified price or better), stop‑loss orders (become market orders when price hits a trigger), and iceberg orders (show only part of the total quantity). Each serves different objectives: market orders prioritize speed, limit orders control price, stop‑loss limits downside. For entry‑level interviews, candidates should know that execution quality depends on liquidity and order type. Common mistakes include not understanding that stop‑loss orders do not guarantee execution price during gaps, or confusing a limit order with a stop‑limit order.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Common order types include market orders (execute immediately at best available price), limit orders (execute only at specified price or better), stop‑loss orders (become market orders when price hits a trigger), and iceberg orders (show only part of the total quantity)\n• Each serves different objectives: market orders prioritize speed, limit orders control price, stop‑loss limits downside\n• For entry‑level interviews, candidates should know that execution quality depends on liquidity and order type\n• Common mistakes include not understanding that stop‑loss orders do not guarantee execution price during gaps, or confusing a limit order with a stop‑limit order",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1091,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Industry Events and Conferences",
    "question": "How can entry‑level professionals benefit from attending finance conferences and events?",
    "modelAnswer": "Conferences provide networking opportunities, exposure to industry trends, and chances to learn from experts. To maximize value, research speakers and attendees beforehand, prepare elevator pitches, and set goals (e.g., meet three people from target firms). Participate in Q&A sessions and follow up with contacts afterward. Many conferences offer student discounts or volunteer opportunities. For entry‑level, attending even local CFA society events can build connections. Common mistakes include passively sitting through sessions, not engaging with others, or treating it as a vacation.",
    "scoringKeywords": [
      "networking",
      "industry trends",
      "speaker research",
      "elevator pitch",
      "follow‑up"
    ],
    "detailedAnalysis": {
      "overview": "Encourages proactive participation in professional gatherings—a key way to accelerate career development.",
      "commonMistakes": "Focusing only on free swag, failing to prepare questions, or not leveraging social media (e.g., conference hashtags) to connect."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Conferences provide networking opportunities, exposure to industry trends, and chances to learn from experts. To maximize value, research speakers and attendees beforehand, prepare elevator pitches, and set goals (e.g., meet three people from target firms). Participate in Q&A sessions and follow up with contacts afterward. Many conferences offer student discounts or volunteer opportunities. For entry‑level, attending even local CFA society events can build connections. Common mistakes include passively sitting through sessions, not engaging with others, or treating it as a vacation.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Participate in Q&A sessions and follow up with contacts afterward\n• Many conferences offer student discounts or volunteer opportunities\n• For entry‑level, attending even local CFA society events can build connections",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1092,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Commercial Banking vs Investment Banking",
    "question": "What are the key differences between commercial banking and investment banking?",
    "modelAnswer": "Commercial banking focuses on taking deposits and providing loans to individuals and businesses, generating revenue from interest rate spreads. Investment banking advises on M&A, capital raising (IPOs, bond issuance), and trading securities, earning fees and trading profits. Commercial banks have stable, recurring income but are heavily regulated; investment banks have higher volatility but potential for larger payouts. For entry‑level interviews, candidates should also mention the client base (retail/corporate vs. corporations/institutions) and risk profiles. Common mistakes include confusing retail banking with commercial banking, or thinking investment banks only do IPOs.",
    "scoringKeywords": [
      "deposits and loans",
      "M&A advisory",
      "capital raising",
      "interest spread",
      "fee‑based income"
    ],
    "detailedAnalysis": {
      "overview": "A foundational question for anyone targeting banking roles—clarifies two major career paths in finance.",
      "commonMistakes": "Overlooking the regulatory distinctions, assuming all banking is the same, or not mentioning the post‑2008 structural changes (Volcker Rule, etc.)."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Commercial banking focuses on taking deposits and providing loans to individuals and businesses, generating revenue from interest rate spreads. Investment banking advises on M&A, capital raising (IPOs, bond issuance), and trading securities, earning fees and trading profits. Commercial banks have stable, recurring income but are heavily regulated; investment banks have higher volatility but potential for larger payouts. For entry‑level interviews, candidates should also mention the client base (retail/corporate vs. corporations/institutions) and risk profiles. Common mistakes include confusing retail banking with commercial banking, or thinking investment banks only do IPOs.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Commercial banking focuses on taking deposits and providing loans to individuals and businesses, generating revenue from interest rate spreads.\n• Investment banking advises on M&A, capital raising (IPOs, bond issuance), and trading securities, earning fees and trading profits.\n• Commercial banks have stable, recurring income but are heavily regulated; investment banks have higher volatility but potential for larger payouts.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1093,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Financial Planning & Analysis",
    "question": "What are the main responsibilities of a financial planning and analysis (FP&A) team?",
    "modelAnswer": "FP&A teams are responsible for budgeting, forecasting, performance reporting, and decision support. They create annual budgets, update rolling forecasts, analyze variances between actual and planned results, and provide insights to senior management. Key activities include scenario modeling, profitability analysis, and capital allocation recommendations. For entry‑level roles, understanding how FP&A helps steer the business—linking financial data to operational drivers—is crucial. Tools commonly used are Excel, ERP systems, and BI platforms. Mistakes include focusing only on historical reporting without forward‑looking analysis.",
    "scoringKeywords": [
      "budgeting",
      "forecasting",
      "variance analysis",
      "decision support",
      "scenario modeling"
    ],
    "detailedAnalysis": {
      "overview": "A practical question about a core finance function that many entry‑level candidates join.",
      "commonMistakes": "Confusing FP&A with accounting, omitting the forward‑looking aspect, or not mentioning the link between financial and operational metrics."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "FP&A teams are responsible for budgeting, forecasting, performance reporting, and decision support. They create annual budgets, update rolling forecasts, analyze variances between actual and planned results, and provide insights to senior management. Key activities include scenario modeling, profitability analysis, and capital allocation recommendations. For entry‑level roles, understanding how FP&A helps steer the business—linking financial data to operational drivers—is crucial. Tools commonly used are Excel, ERP systems, and BI platforms. Mistakes include focusing only on historical reporting without forward‑looking analysis.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• FP&A teams are responsible for budgeting, forecasting, performance reporting, and decision support\n• Tools commonly used are Excel, ERP systems, and BI platforms\n• Mistakes include focusing only on historical reporting without forward‑looking analysis.",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1094,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Loan Structuring Basics",
    "question": "What are the main components of a commercial loan structure?",
    "modelAnswer": "A commercial loan structure includes the principal amount, interest rate (fixed or floating), repayment schedule (amortizing vs. bullet), maturity date, collateral, and covenants. Covenants are conditions the borrower must meet, such as maintaining certain financial ratios. Collateral secures the loan (real estate, inventory, receivables). Pricing depends on credit risk, market conditions, and relationship. For entry‑level interviews, candidates should mention the trade‑off between risk and return: higher risk loans have higher rates and stricter covenants. Common mistakes include forgetting about fees (origination, commitment) or not understanding the purpose of financial covenants.",
    "scoringKeywords": [
      "principal",
      "interest rate",
      "repayment schedule",
      "collateral",
      "covenants"
    ],
    "detailedAnalysis": {
      "overview": "Tests practical knowledge of how banks design loans—essential for commercial banking or credit analyst roles.",
      "commonMistakes": "Confusing amortization with interest‑only periods, overlooking the importance of collateral valuation, or assuming all loans are structured the same."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A commercial loan structure includes the principal amount, interest rate (fixed or floating), repayment schedule (amortizing vs. bullet), maturity date, collateral, and covenants. Covenants are conditions the borrower must meet, such as maintaining certain financial ratios. Collateral secures the loan (real estate, inventory, receivables). Pricing depends on credit risk, market conditions, and relationship. For entry‑level interviews, candidates should mention the trade‑off between risk and return: higher risk loans have higher rates and stricter covenants. Common mistakes include forgetting about fees (origination, commitment) or not understanding the purpose of financial covenants.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• bullet), maturity date, collateral, and covenants\n• Covenants are conditions the borrower must meet, such as maintaining certain financial ratios\n• Collateral secures the loan (real estate, inventory, receivables)\n• Pricing depends on credit risk, market conditions, and relationship",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1095,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Dividend Policy",
    "question": "What factors influence a company's decision to pay dividends versus retaining earnings?",
    "modelAnswer": "Companies decide on dividend policy based on profitability, cash flow stability, growth opportunities, and shareholder expectations. Mature firms with steady cash flows often pay regular dividends to return value to shareholders. High‑growth companies typically retain earnings to fund expansion. Other factors include tax considerations (dividends may be taxed higher than capital gains), signaling effects (dividend increases signal confidence), and contractual restrictions (debt covenants). For entry‑level interviews, candidates should mention the trade‑off between returning cash and reinvesting for future growth, as well as alternative uses like share buybacks.",
    "scoringKeywords": [
      "retained earnings",
      "cash flow stability",
      "growth opportunities",
      "shareholder expectations",
      "signaling"
    ],
    "detailedAnalysis": {
      "overview": "Tests understanding of how firms allocate profits between shareholders and internal reinvestment—a key corporate finance decision.",
      "commonMistakes": "Assuming all profitable companies pay dividends, overlooking the signaling aspect, or not mentioning share repurchases as an alternative."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "medium",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Companies decide on dividend policy based on profitability, cash flow stability, growth opportunities, and shareholder expectations. Mature firms with steady cash flows often pay regular dividends to return value to shareholders. High‑growth companies typically retain earnings to fund expansion. Other factors include tax considerations (dividends may be taxed higher than capital gains), signaling effects (dividend increases signal confidence), and contractual restrictions (debt covenants). For entry‑level interviews, candidates should mention the trade‑off between returning cash and reinvesting for future growth, as well as alternative uses like share buybacks.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Companies decide on dividend policy based on profitability, cash flow stability, growth opportunities, and shareholder expectations.\n• Mature firms with steady cash flows often pay regular dividends to return value to shareholders.\n• High‑growth companies typically retain earnings to fund expansion.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1096,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Financial Modeling Essentials",
    "question": "What are the key components of a basic three‑statement financial model?",
    "modelAnswer": "A three‑statement model integrates the income statement, balance sheet, and cash flow statement dynamically. Key components include historical financials, assumptions (revenue growth, margins, working capital ratios), forecasted statements, and supporting schedules (depreciation, debt, equity). The model ensures the balance sheet balances via a \"plug\" (cash or revolver). For entry‑level roles, understanding the linkages—net income flows to retained earnings, capex affects both cash and fixed assets—is critical. Common uses are valuation, budgeting, and scenario analysis. Mistakes include hard‑coding numbers instead of using formulas, or creating circular references unintentionally.",
    "scoringKeywords": [
      "income statement",
      "balance sheet",
      "cash flow statement",
      "assumptions",
      "linking"
    ],
    "detailedAnalysis": {
      "overview": "Tests practical modeling knowledge, a highly valued skill in investment banking, FP&A, and corporate finance.",
      "commonMistakes": "Forgetting to link the statements properly, omitting working capital adjustments, or building overly complex models for entry‑level questions."
    },
    "metadata": {
      "frequency": "high",
      "importance": "critical",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A three‑statement model integrates the income statement, balance sheet, and cash flow statement dynamically. Key components include historical financials, assumptions (revenue growth, margins, working capital ratios), forecasted statements, and supporting schedules (depreciation, debt, equity). The model ensures the balance sheet balances via a \"plug\" (cash or revolver). For entry‑level roles, understanding the linkages—net income flows to retained earnings, capex affects both cash and fixed assets—is critical. Common uses are valuation, budgeting, and scenario analysis. Mistakes include hard‑coding numbers instead of using formulas, or creating circular references unintentionally.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• A three‑statement model integrates the income statement, balance sheet, and cash flow statement dynamically.\n• Key components include historical financials, assumptions (revenue growth, margins, working capital ratios), forecasted statements, and supporting schedules (depreciation, debt, equity).\n• The model ensures the balance sheet balances via a \"plug\" (cash or revolver).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1097,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Stock Pitch Structure",
    "question": "What are the key components of a convincing stock pitch?",
    "modelAnswer": "A stock pitch typically includes an investment thesis, business overview, industry context, financial analysis, valuation, and catalysts. The thesis should be a clear, one‑sentence argument for why the stock is mispriced. The business overview explains what the company does and its competitive advantages. Financial analysis highlights relevant trends and metrics. Valuation compares the current price to intrinsic value using multiples or DCF. Catalysts are upcoming events that could drive the stock price. For entry‑level interviews, structuring the pitch logically and being prepared to defend assumptions is crucial. Common mistakes include weak thesis, ignoring risks, or over‑reliance on a single valuation method.",
    "scoringKeywords": [
      "investment thesis",
      "business overview",
      "financial analysis",
      "valuation",
      "catalysts"
    ],
    "detailedAnalysis": {
      "overview": "Tests ability to present an investment idea coherently—a core skill for equity research and portfolio management interviews.",
      "commonMistakes": "Omitting the risk section, using jargon without explanation, or failing to provide a clear price target."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A stock pitch typically includes an investment thesis, business overview, industry context, financial analysis, valuation, and catalysts. The thesis should be a clear, one‑sentence argument for why the stock is mispriced. The business overview explains what the company does and its competitive advantages. Financial analysis highlights relevant trends and metrics. Valuation compares the current price to intrinsic value using multiples or DCF. Catalysts are upcoming events that could drive the stock price. For entry‑level interviews, structuring the pitch logically and being prepared to defend assumptions is crucial. Common mistakes include weak thesis, ignoring risks, or over‑reliance on a single valuation method.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• The thesis should be a clear, one‑sentence argument for why the stock is mispriced\n• The business overview explains what the company does and its competitive advantages\n• Financial analysis highlights relevant trends and metrics\n• Valuation compares the current price to intrinsic value using multiples or DCF",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1098,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Liquidity Concepts",
    "question": "What is liquidity in financial markets, and why is it important?",
    "modelAnswer": "Liquidity refers to the ease with which an asset can be bought or sold without significantly affecting its price. High liquidity means tight bid‑ask spreads, deep order books, and low transaction costs. It is important because it reduces execution risk, enables efficient price discovery, and allows investors to enter/exit positions quickly. Illiquid assets often require price concessions or longer time frames. For entry‑level interviews, candidates should mention metrics like volume, turnover, and spread. Common mistakes include equating high trading volume with liquidity in all market conditions, or ignoring the difference between market liquidity and funding liquidity.",
    "scoringKeywords": [
      "bid‑ask spread",
      "order book depth",
      "transaction costs",
      "price impact",
      "market efficiency"
    ],
    "detailedAnalysis": {
      "overview": "A foundational market concept—critical for trading, risk management, and investment analysis.",
      "commonMistakes": "Assuming liquidity is constant, overlooking the role of market makers, or not considering liquidity during stress periods."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Liquidity refers to the ease with which an asset can be bought or sold without significantly affecting its price. High liquidity means tight bid‑ask spreads, deep order books, and low transaction costs. It is important because it reduces execution risk, enables efficient price discovery, and allows investors to enter/exit positions quickly. Illiquid assets often require price concessions or longer time frames. For entry‑level interviews, candidates should mention metrics like volume, turnover, and spread. Common mistakes include equating high trading volume with liquidity in all market conditions, or ignoring the difference between market liquidity and funding liquidity.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• High liquidity means tight bid‑ask spreads, deep order books, and low transaction costs\n• Illiquid assets often require price concessions or longer time frames\n• For entry‑level interviews, candidates should mention metrics like volume, turnover, and spread",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1099,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Company Valuation Overview",
    "question": "What are the main valuation methods used for a publicly traded company?",
    "modelAnswer": "Common valuation methods include comparable company analysis (trading multiples), precedent transactions (acquisition multiples), and discounted cash flow (DCF). Comparable analysis uses metrics like P/E, EV/EBITDA relative to peer group. Precedent transactions look at premiums paid in past M&A deals. DCF estimates intrinsic value by discounting future free cash flows. For entry‑level interviews, candidates should know the pros/cons of each: multiples are simple but rely on market sentiment; DCF is theoretically sound but sensitive to assumptions. A good analyst uses multiple methods to triangulate a value range. Mistakes include using mismatched multiples or ignoring the cost of capital in DCF.",
    "scoringKeywords": [
      "comparable company analysis",
      "precedent transactions",
      "DCF",
      "multiples",
      "intrinsic value"
    ],
    "detailedAnalysis": {
      "overview": "Tests core valuation knowledge—a must‑have for any finance interview involving investments or M&A.",
      "commonMistakes": "Confusing enterprise value with equity value, applying wrong multiples, or forgetting to normalize earnings in peer comparisons."
    },
    "metadata": {
      "frequency": "high",
      "importance": "critical",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Common valuation methods include comparable company analysis (trading multiples), precedent transactions (acquisition multiples), and discounted cash flow (DCF). Comparable analysis uses metrics like P/E, EV/EBITDA relative to peer group. Precedent transactions look at premiums paid in past M&A deals. DCF estimates intrinsic value by discounting future free cash flows. For entry‑level interviews, candidates should know the pros/cons of each: multiples are simple but rely on market sentiment; DCF is theoretically sound but sensitive to assumptions. A good analyst uses multiple methods to triangulate a value range. Mistakes include using mismatched multiples or ignoring the cost of capital in DCF.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Comparable analysis uses metrics like P/E, EV/EBITDA relative to peer group\n• Precedent transactions look at premiums paid in past M&A deals\n• DCF estimates intrinsic value by discounting future free cash flows\n• A good analyst uses multiple methods to triangulate a value range",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1100,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Trading Desk Roles",
    "question": "What are the main roles on a typical trading desk?",
    "modelAnswer": "A trading desk includes traders (execute orders, manage risk), sales traders (connect with clients), quantitative analysts (develop models), and desk strategists (provide market insights). Traders can be market‑makers (provide liquidity) or proprietary traders (take positions). Sales traders relay client orders and provide market color. Quants build pricing and risk models. For entry‑level interviews, candidates should understand the flow: client → sales → trader → market. Common mistakes include confusing sales with trading, or thinking all traders are speculators.",
    "scoringKeywords": [
      "traders",
      "sales traders",
      "quantitative analysts",
      "market‑making",
      "client flow"
    ],
    "detailedAnalysis": {
      "overview": "Tests familiarity with the structure of a trading floor—useful for interviews in sales & trading or market‑related roles.",
      "commonMistakes": "Omitting the support roles (operations, IT), not mentioning the separation between flow and proprietary trading, or assuming all desks are the same."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A trading desk includes traders (execute orders, manage risk), sales traders (connect with clients), quantitative analysts (develop models), and desk strategists (provide market insights). Traders can be market‑makers (provide liquidity) or proprietary traders (take positions). Sales traders relay client orders and provide market color. Quants build pricing and risk models. For entry‑level interviews, candidates should understand the flow: client → sales → trader → market. Common mistakes include confusing sales with trading, or thinking all traders are speculators.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Traders can be market‑makers (provide liquidity) or proprietary traders (take positions)\n• Sales traders relay client orders and provide market color\n• Quants build pricing and risk models\n• For entry‑level interviews, candidates should understand the flow: client → sales → trader → market",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 1101,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Relationship Management",
    "question": "What does a relationship manager in a bank do, and what skills are important for success?",
    "modelAnswer": "A relationship manager (RM) is the primary point of contact for corporate clients, responsible for understanding their needs, cross‑selling banking products, and ensuring satisfaction. Key tasks include credit analysis, pitching solutions, negotiating terms, and monitoring portfolio performance. Success requires strong interpersonal skills, financial acumen, industry knowledge, and the ability to balance client advocacy with bank risk policies. For entry‑level interviews, candidates should mention that RMs often work with product specialists (treasury, trade) to deliver comprehensive solutions. Common mistakes include thinking RMs only socialize, or underestimating the importance of compliance and risk management.",
    "scoringKeywords": [
      "client advocacy",
      "cross‑selling",
      "credit analysis",
      "industry knowledge",
      "risk management"
    ],
    "detailedAnalysis": {
      "overview": "Tests understanding of a key client‑facing role in banking—relevant for corporate banking, commercial banking, or private banking careers.",
      "commonMistakes": "Focusing only on sales, ignoring the credit‑risk dimension, or not mentioning the need for long‑term relationship building."
    },
    "metadata": {
      "frequency": "medium",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "A relationship manager (RM) is the primary point of contact for corporate clients, responsible for understanding their needs, cross‑selling banking products, and ensuring satisfaction. Key tasks include credit analysis, pitching solutions, negotiating terms, and monitoring portfolio performance. Success requires strong interpersonal skills, financial acumen, industry knowledge, and the ability to balance client advocacy with bank risk policies. For entry‑level interviews, candidates should mention that RMs often work with product specialists (treasury, trade) to deliver comprehensive solutions. Common mistakes include thinking RMs only socialize, or underestimating the importance of compliance and risk management.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• A relationship manager (RM) is the primary point of contact for corporate clients, responsible for understanding their needs, cross‑selling banking products, and ensuring satisfaction\n• Key tasks include credit analysis, pitching solutions, negotiating terms, and monitoring portfolio performance\n• Success requires strong interpersonal skills, financial acumen, industry knowledge, and the ability to balance client advocacy with bank risk policies\n• For entry‑level interviews, candidates should mention that RMs often work with product specialists (treasury, trade) to deliver comprehensive solutions",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1102,
    "role": "ib",
    "category": "technical",
    "difficulty": "medium",
    "title": "Asset Allocation Principles",
    "question": "What is asset allocation and why is it important for long‑term investment success?",
    "modelAnswer": "Asset allocation is the process of dividing investments among different asset classes (stocks, bonds, cash, alternatives) to balance risk and return. It is the primary driver of portfolio performance over time, more important than individual security selection. Strategic asset allocation sets long‑term targets based on an investor's risk tolerance, time horizon, and goals. Tactical allocation adjusts short‑term for market views. Diversification across uncorrelated assets reduces overall volatility. For entry‑level interviews, candidates should mention the role of correlation, rebalancing, and the impact of inflation. Common mistakes include chasing past performance, ignoring costs, or setting allocation without considering liquidity needs.",
    "scoringKeywords": [
      "asset classes",
      "risk‑return trade‑off",
      "diversification",
      "strategic allocation",
      "rebalancing"
    ],
    "detailedAnalysis": {
      "overview": "A core concept in portfolio management—demonstrates understanding of how to construct a robust investment plan.",
      "commonMistakes": "Equating asset allocation with stock picking, underestimating the impact of fees, or not aligning allocation with the investor's time horizon."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "medium",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Asset allocation is the process of dividing investments among different asset classes (stocks, bonds, cash, alternatives) to balance risk and return. It is the primary driver of portfolio performance over time, more important than individual security selection. Strategic asset allocation sets long‑term targets based on an investor's risk tolerance, time horizon, and goals. Tactical allocation adjusts short‑term for market views. Diversification across uncorrelated assets reduces overall volatility. For entry‑level interviews, candidates should mention the role of correlation, rebalancing, and the impact of inflation. Common mistakes include chasing past performance, ignoring costs, or setting allocation without considering liquidity needs.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Asset allocation is the process of dividing investments among different asset classes (stocks, bonds, cash, alternatives) to balance risk and return.\n• It is the primary driver of portfolio performance over time, more important than individual security selection.\n• Strategic asset allocation sets long‑term targets based on an investor's risk tolerance, time horizon, and goals.",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 1103,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Interview Preparation Checklist",
    "question": "What should an entry‑level candidate do to prepare for a finance interview?",
    "modelAnswer": "Preparation should include researching the firm (recent deals, culture, competitors), reviewing technical concepts (accounting, valuation, market knowledge), practicing behavioral questions (STAR method), preparing thoughtful questions for the interviewer, and conducting mock interviews. Also, know your resume inside out and be ready to discuss any item. Dress professionally, arrive early (virtually or in person), and bring copies of your resume. For entry‑level, showing enthusiasm and curiosity is as important as technical accuracy. Common mistakes include winging it, not having a \"why this firm\" answer, or freezing on basic technical questions.",
    "scoringKeywords": [
      "firm research",
      "technical review",
      "behavioral practice",
      "mock interviews",
      "professional presentation"
    ],
    "detailedAnalysis": {
      "overview": "A comprehensive checklist to help candidates approach interviews systematically and confidently.",
      "commonMistakes": "Over‑preparing on technicals while neglecting behavioral, not tailoring answers to the specific role, or failing to rehearse aloud."
    },
    "metadata": {
      "frequency": "high",
      "importance": "high",
      "practicality": "high",
      "specificity": "general",
      "complexity": "low",
      "recency": "timeless"
    },
    "entryLevel": true,
    "stars": 3,
    "expectedStructure": [],
    "answers": {
      "detailed": {
        "answer": "Preparation should include researching the firm (recent deals, culture, competitors), reviewing technical concepts (accounting, valuation, market knowledge), practicing behavioral questions (STAR method), preparing thoughtful questions for the interviewer, and conducting mock interviews. Also, know your resume inside out and be ready to discuss any item. Dress professionally, arrive early (virtually or in person), and bring copies of your resume. For entry‑level, showing enthusiasm and curiosity is as important as technical accuracy. Common mistakes include winging it, not having a \"why this firm\" answer, or freezing on basic technical questions.",
        "format": "detailed",
        "source": "original"
      },
      "concise": {
        "answer": "• Also, know your resume inside out and be ready to discuss any item\n• Dress professionally, arrive early (virtually or in person), and bring copies of your resume\n• For entry‑level, showing enthusiasm and curiosity is as important as technical accuracy",
        "format": "concise",
        "source": "simplified"
      }
    }
  },
  {
    "id": 2000,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Key motivations for mergers and acquisitions",
    "question": "What are the primary strategic motivations behind mergers and acquisitions?",
    "modelAnswer": "The main motivations include: 1) Synergy creation (cost and revenue), 2) Market expansion, 3) Diversification, 4) Acquiring technology or talent, 5) Eliminating competition. Financial motivations include boosting EPS and tax benefits.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "The main motivations include: 1) Synergy creation (cost and revenue), 2) Market expansion, 3) Diversification, 4) Acquiring technology or talent, 5) Eliminating competition. Financial motivations include boosting EPS and tax benefits.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Synergy creation (cost savings and revenue synergies).\n• Market expansion\n• Diversification\n• Acquiring technology or talent\n• Eliminating competition",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2001,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Types of M&A transactions",
    "question": "Explain the different types of M&A transactions.",
    "modelAnswer": "M&A deals can be categorized by: 1) Horizontal (same industry), 2) Vertical (supply chain), 3) Conglomerate (unrelated industries). By structure: asset purchase vs. stock purchase. By attitude: friendly vs. hostile.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "M&A deals can be categorized by: 1) Horizontal (same industry), 2) Vertical (supply chain), 3) Conglomerate (unrelated industries). By structure: asset purchase vs. stock purchase. By attitude: friendly vs. hostile.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• M&A deals can be categorized by: 1) Horizontal (same industry), 2) Vertical (supply chain), 3) Conglomerate (unrelated industries)\n• By structure: asset purchase vs\n• By attitude: friendly vs",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2002,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "M&A process steps",
    "question": "Outline the typical steps in an M&A transaction.",
    "modelAnswer": "Key steps: 1) Strategy and target identification, 2) Preliminary valuation, 3) Initial contact and NDA, 4) Due diligence, 5) Definitive agreement, 6) Regulatory approvals, 7) Closing and integration.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Key steps: 1) Strategy and target identification, 2) Preliminary valuation, 3) Initial contact and NDA, 4) Due diligence, 5) Definitive agreement, 6) Regulatory approvals, 7) Closing and integration.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Strategy and target identification,\n• Preliminary valuation,\n• Initial contact and NDA,\n• Due diligence,\n• Definitive agreement,\n• Regulatory approvals,\n• Closing and integration",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2003,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Due diligence components",
    "question": "What are the key areas of due diligence in an M&A deal?",
    "modelAnswer": "Due diligence covers: 1) Financial (audits, projections), 2) Legal (contracts, litigation), 3) Operational (processes, systems), 4) Commercial (market position), 5) HR (key employees), 6) IT (systems security).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Due diligence covers: 1) Financial (audits, projections), 2) Legal (contracts, litigation), 3) Operational (processes, systems), 4) Commercial (market position), 5) HR (key employees), 6) IT (systems security).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Financial (audits, financial projections).\n• Legal (contracts, litigation)\n• Operational (processes, systems).\n• Commercial (market position)\n• HR (key employees)\n• IT (systems security)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2004,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Synergy valuation",
    "question": "How do you value synergies in an M&A deal?",
    "modelAnswer": "Synergies are valued by estimating cost savings (redundancies, economies of scale) and revenue enhancements (cross-selling, market share). These future cash flows are discounted to present value using WACC.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Synergies are valued by estimating cost savings (redundancies, economies of scale) and revenue enhancements (cross-selling, market share). These future cash flows are discounted to present value using WACC.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Synergies are valued by estimating cost savings (redundancies, economies of scale) and revenue enhancements (cross-selling, market share)\n• These future cash flows are discounted to present value using WACC",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2005,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "DCF core components",
    "question": "What are the three main components of a DCF valuation?",
    "modelAnswer": "1) Free Cash Flow projections, 2) Terminal Value calculation, 3) Discount Rate (WACC). FCF is projected for 5-10 years, terminal value captures value beyond, and WACC reflects risk.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Free Cash Flow projections, 2) Terminal Value calculation, 3) Discount Rate (WACC). FCF is projected for 5-10 years, terminal value captures value beyond, and WACC reflects risk.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• 1) Free Cash Flow projections, 2) Terminal Value calculation, 3) Discount Rate (WACC)\n• FCF is projected for 5-10 years, terminal value captures value beyond, and WACC reflects risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2006,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "WACC calculation",
    "question": "How do you calculate Weighted Average Cost of Capital (WACC)?",
    "modelAnswer": "WACC = (E/V * Re) + (D/V * Rd * (1 - Tc)). E = equity value, D = debt value, V = total capital, Re = cost of equity (CAPM), Rd = cost of debt, Tc = corporate tax rate.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "WACC = (E/V * Re) + (D/V * Rd * (1 - Tc)). E = equity value, D = debt value, V = total capital, Re = cost of equity (CAPM), Rd = cost of debt, Tc = corporate tax rate.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• WACC = (E/V * Re) + (D/V * Rd * (1 - Tc))\n• E = equity value, D = debt value, V = total capital, Re = cost of equity (CAPM), Rd = cost of debt, Tc = corporate tax rate",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2007,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Terminal value methods",
    "question": "Describe the two common methods for calculating terminal value in DCF.",
    "modelAnswer": "1) Perpetuity growth method: TV = FCFn * (1+g) / (WACC - g). 2) Exit multiple method: TV = EBITDA_n * trading multiple. Both assume steady state after projection period.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Perpetuity growth method: TV = FCFn * (1+g) / (WACC - g). 2) Exit multiple method: TV = EBITDA_n * trading multiple. Both assume steady state after projection period.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• 1) Perpetuity growth method: TV = FCFn * (1+g) / (WACC - g)\n• 2) Exit multiple method: TV = EBITDA_n * trading multiple\n• Both assume steady state after projection period",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2008,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Free Cash Flow definition",
    "question": "What is Free Cash Flow to the Firm (FCFF) and how is it calculated?",
    "modelAnswer": "FCFF = EBIT * (1 - tax) + Depreciation - Capex - Change in NWC. It's the cash available to all investors (debt and equity holders) after reinvestment.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "FCFF = EBIT * (1 - tax) + Depreciation - Capex - Change in NWC. It's the cash available to all investors (debt and equity holders) after reinvestment.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• FCFF = EBIT * (1 - tax) + Depreciation - Capex - Change in NWC\n• It's the cash available to all investors (debt and equity holders) after reinvestment",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2009,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "DCF sensitivity analysis",
    "question": "Why is sensitivity analysis important in DCF valuation?",
    "modelAnswer": "DCF relies on assumptions (growth, WACC). Sensitivity analysis shows how valuation changes with varying inputs, highlighting key drivers and providing a valuation range.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "DCF relies on assumptions (growth, WACC). Sensitivity analysis shows how valuation changes with varying inputs, highlighting key drivers and providing a valuation range.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• DCF relies on assumptions (growth, WACC)\n• Sensitivity analysis shows how valuation changes with varying inputs, highlighting key drivers and providing a valuation range",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2010,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "LBO structure",
    "question": "What is the typical capital structure in an LBO?",
    "modelAnswer": "LBO uses high debt (60-80%) and minimal equity (20-40%). Debt includes senior secured (bank loans), mezzanine (subordinated), and high-yield bonds. Equity comes from PE fund and management.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "LBO uses high debt (60-80%) and minimal equity (20-40%). Debt includes senior secured (bank loans), mezzanine (subordinated), and high-yield bonds. Equity comes from PE fund and management.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• LBO uses high debt (60-80%) and minimal equity (20-40%)\n• Debt includes senior secured (bank loans), mezzanine (subordinated), and high-yield bonds",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2011,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "LBO returns drivers",
    "question": "What are the main drivers of returns in an LBO?",
    "modelAnswer": "1) Financial leverage (amplifies equity returns), 2) Operational improvements (cost cutting, revenue growth), 3) Multiple expansion (buy low, sell high), 4) Debt paydown (increases equity value).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Financial leverage (amplifies equity returns), 2) Operational improvements (cost cutting, revenue growth), 3) Multiple expansion (buy low, sell high), 4) Debt paydown (increases equity value).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Financial leverage (amplifies equity returns).\n• Operational improvements (cost cutting, revenue growth).\n• Multiple expansion (buy low, sell high).\n• Debt paydown (increases equity value).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2012,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Ideal LBO candidate characteristics",
    "question": "What makes a company a good LBO candidate?",
    "modelAnswer": "Stable cash flows, low capex, strong asset base (collateral), experienced management, growth potential, and industry resilience. Defensive sectors like healthcare and consumer staples are favored.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Stable cash flows, low capex, strong asset base (collateral), experienced management, growth potential, and industry resilience. Defensive sectors like healthcare and consumer staples are favored.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Stable cash flows, low capex, strong asset base (collateral), experienced management, growth potential, and industry resilience\n• Defensive sectors like healthcare and consumer staples are favored",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2013,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Debt covenants",
    "question": "What are typical debt covenants in LBO financing?",
    "modelAnswer": "Covenants include: 1) Leverage ratio (debt/EBITDA), 2) Interest coverage (EBIT/interest), 3) Debt service coverage (cash flow/debt payments). Breaching covenants can trigger defaults.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Covenants include: 1) Leverage ratio (debt/EBITDA), 2) Interest coverage (EBIT/interest), 3) Debt service coverage (cash flow/debt payments). Breaching covenants can trigger defaults.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Leverage ratio (debt/EBITDA ratio).\n• Interest coverage (EBIT/interest).\n• Debt service coverage (cash flow/debt payments).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2014,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Exit strategies",
    "question": "What are common exit strategies for LBO investors?",
    "modelAnswer": "1) Sale to strategic buyer, 2) Sale to another PE fund (secondary buyout), 3) IPO, 4) Recapitalization (refinancing to take dividends). Exits typically occur in 3-7 years.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Sale to strategic buyer, 2) Sale to another PE fund (secondary buyout), 3) IPO, 4) Recapitalization (refinancing to take dividends). Exits typically occur in 3-7 years.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Sale to strategic buyer\n• Sale to another PE fund (secondary buyout).\n• IPO\n• Recapitalization (refinancing to take dividends).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2015,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Three-statement model linkage",
    "question": "How are the income statement, balance sheet, and cash flow statement linked in a financial model?",
    "modelAnswer": "Net income flows to retained earnings on balance sheet. Changes in balance sheet accounts drive cash flow statement items. The model must balance (assets = liabilities + equity).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Net income flows to retained earnings on balance sheet. Changes in balance sheet accounts drive cash flow statement items. The model must balance (assets = liabilities + equity).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Net income flows to retained earnings on balance sheet\n• Changes in balance sheet accounts drive cash flow statement items",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2016,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Debt schedule purpose",
    "question": "What is the purpose of a debt schedule in a financial model?",
    "modelAnswer": "A debt schedule tracks: 1) Debt balances, 2) Interest expense (based on rates), 3) Principal repayments, 4) Covenants. It ensures accurate interest calculation and debt capacity analysis.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "A debt schedule tracks: 1) Debt balances, 2) Interest expense (based on rates), 3) Principal repayments, 4) Covenants. It ensures accurate interest calculation and debt capacity analysis.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• A debt schedule tracks: 1) Debt balances, 2) Interest expense (based on rates), 3) Principal repayments, 4) Covenants\n• It ensures accurate interest calculation and debt capacity analysis",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2017,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Circular reference handling",
    "question": "What common circular references occur in financial models and how are they resolved?",
    "modelAnswer": "Circularities arise from: 1) Interest expense depending on debt, which depends on cash flow. Solved by using average debt or iterative calculation (Excel iterative enabled).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Circularities arise from: 1) Interest expense depending on debt, which depends on cash flow. Solved by using average debt or iterative calculation (Excel iterative enabled).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Circularities arise from: 1) Interest expense depending on debt, which depends on cash flow\n• Solved by using average debt or iterative calculation (Excel iterative enabled)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2018,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Model assumptions best practices",
    "question": "What are best practices for documenting model assumptions?",
    "modelAnswer": "Assumptions should be: 1) Clearly labeled and separate from calculations, 2) Realistic and benchmarked, 3) Include historical averages, 4) Have sensitivity ranges, 5) Source references.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Assumptions should be: 1) Clearly labeled and separate from calculations, 2) Realistic and benchmarked, 3) Include historical averages, 4) Have sensitivity ranges, 5) Source references.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Clearly labeled and separate from calculations,\n• Realistic and benchmarked,\n• Include historical averages,\n• Have sensitivity ranges,\n• Source references",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2019,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Model validation techniques",
    "question": "How do you validate a financial model for accuracy?",
    "modelAnswer": "1) Check balancing (balance sheet balances), 2) Sensibility checks (margins, growth rates), 3) Stress testing (extreme scenarios), 4) Compare to historicals, 5) Peer review.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Check balancing (balance sheet balances), 2) Sensibility checks (margins, growth rates), 3) Stress testing (extreme scenarios), 4) Compare to historicals, 5) Peer review.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Check balancing (balance sheet balances).\n• Sensibility checks (margins, growth rates).\n• Stress testing (extreme scenarios).\n• Compare to historicals\n• Peer review",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2020,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Selection criteria for comps",
    "question": "What criteria do you use to select comparable companies?",
    "modelAnswer": "Criteria: 1) Same industry/sub-sector, 2) Similar size (revenue, market cap), 3) Geographic overlap, 4) Business model, 5) Growth profile, 6) Profitability. Aim for 5-15 peers.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Criteria: 1) Same industry/sub-sector, 2) Similar size (revenue, market cap), 3) Geographic overlap, 4) Business model, 5) Growth profile, 6) Profitability. Aim for 5-15 peers.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Same industry/sub-sector\n• Similar size (revenue, market cap).\n• Geographic overlap\n• Business model\n• Growth profile\n• Profitability",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2021,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Common valuation multiples",
    "question": "List the most commonly used trading multiples in comparable company analysis.",
    "modelAnswer": "Equity multiples: P/E, P/B, P/S. Enterprise value multiples: EV/EBITDA, EV/EBIT, EV/Sales, EV/FCF. Choice depends on industry and profitability.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Equity multiples: P/E, P/B, P/S. Enterprise value multiples: EV/EBITDA, EV/EBIT, EV/Sales, EV/FCF. Choice depends on industry and profitability.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Equity multiples: P/E, P/B, P/S\n• Enterprise value multiples: EV/EBITDA, EV/EBIT, EV/Sales, EV/FCF",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2022,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Normalizing adjustments",
    "question": "Why might you adjust financials when calculating multiples?",
    "modelAnswer": "Adjustments normalize for one-time items (restructuring, gains/losses) and ensure comparability. Examples: removing non-recurring expenses, adjusting for different fiscal years, and treating leases consistently.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Adjustments normalize for one-time items (restructuring, gains/losses) and ensure comparability. Examples: removing non-recurring expenses, adjusting for different fiscal years, and treating leases consistently.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Adjustments normalize for one-time items (restructuring, gains/losses) and ensure comparability\n• Examples: removing non-recurring expenses, adjusting for different fiscal years, and treating leases consistently",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2023,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Multiples interpretation",
    "question": "How do you interpret a company trading at a premium to its peers?",
    "modelAnswer": "A premium may reflect: 1) Higher growth expectations, 2) Superior margins, 3) Stronger market position, 4) Better management, 5) Unique assets. Need to assess whether premium is justified.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "A premium may reflect: 1) Higher growth expectations, 2) Superior margins, 3) Stronger market position, 4) Better management, 5) Unique assets. Need to assess whether premium is justified.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Higher growth expectations,\n• Superior margins,\n• Stronger market position,\n• Better management,\n• Unique assets",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2024,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Limitations of comps analysis",
    "question": "What are the limitations of comparable company analysis?",
    "modelAnswer": "Limitations: 1) No perfect comparables, 2) Market sentiment influences multiples, 3) Differences in accounting, 4) Cyclical distortions, 5) May not capture future potential. Should be used with other methods.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Limitations: 1) No perfect comparables, 2) Market sentiment influences multiples, 3) Differences in accounting, 4) Cyclical distortions, 5) May not capture future potential. Should be used with other methods.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• No perfect comparables,\n• Market sentiment influences multiples,\n• Differences in accounting,\n• Cyclical distortions,\n• May not capture future potential",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2025,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Transaction multiples vs. trading multiples",
    "question": "How do precedent transaction multiples differ from trading multiples?",
    "modelAnswer": "Transaction multiples reflect control premium (typically 20-30% higher), include synergies, and are based on actual deal prices. Trading multiples reflect minority, liquid positions without control.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Transaction multiples reflect control premium (typically 20-30% higher), include synergies, and are based on actual deal prices. Trading multiples reflect minority, liquid positions without control.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Transaction multiples reflect control premium (typically 20-30% higher), include synergies, and are based on actual deal prices\n• Trading multiples reflect minority, liquid positions without control",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2026,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Deal sourcing for precedent analysis",
    "question": "Where do you source data for precedent transaction analysis?",
    "modelAnswer": "Sources: 1) Deal databases (Capital IQ, Mergermarket), 2) SEC filings (M&A documents), 3) Press releases, 4) Industry reports. Filter by recent deals (past 2-3 years) and relevant industry.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Sources: 1) Deal databases (Capital IQ, Mergermarket), 2) SEC filings (M&A documents), 3) Press releases, 4) Industry reports. Filter by recent deals (past 2-3 years) and relevant industry.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Deal databases (Capital IQ, Mergermarket).\n• SEC filings (M&A documents)\n• Press releases\n• Industry reports",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2027,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Deal size relevance",
    "question": "Why is deal size important when selecting precedent transactions?",
    "modelAnswer": "Larger deals may have different multiples due to scale, financing availability, and strategic importance. Small deals may not be comparable. Aim for deals of similar size to target.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Larger deals may have different multiples due to scale, financing availability, and strategic importance. Small deals may not be comparable. Aim for deals of similar size to target.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Larger deals may have different multiples due to scale, financing availability, and strategic importance\n• Small deals may not be comparable",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2028,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Premium paid analysis",
    "question": "What does 'premium paid' mean in M&A and how is it calculated?",
    "modelAnswer": "Premium paid = (Offer price per share - Pre‑announcement stock price) / Pre‑announcement price. It represents the extra amount acquirer pays for control, typically 20-40%.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Premium paid = (Offer price per share - Pre‑announcement stock price) / Pre‑announcement price. It represents the extra amount acquirer pays for control, typically 20-40%.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Premium paid = (Offer price per share - Pre‑announcement stock price) / Pre‑announcement price\n• It represents the extra amount acquirer pays for control, typically 20-40%",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2029,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Transaction adjustments",
    "question": "What adjustments are made to financials in precedent transaction analysis?",
    "modelAnswer": "Adjust for: 1) Pro forma synergies, 2) One-time costs, 3) Different reporting dates, 4) Non‑operating assets/liabilities. Goal is to compare underlying operating performance.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Adjust for: 1) Pro forma synergies, 2) One-time costs, 3) Different reporting dates, 4) Non‑operating assets/liabilities. Goal is to compare underlying operating performance.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Pro forma synergies,\n• One-time costs,\n• Different reporting dates,\n• Non‑operating assets/liabilities",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2030,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "IPO key participants",
    "question": "Who are the key participants in an IPO process?",
    "modelAnswer": "1) Issuing company, 2) Investment banks (underwriters), 3) Legal counsel, 4) Auditors, 5) SEC (regulator), 6) Investors (institutional, retail), 7) Stock exchange.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Issuing company, 2) Investment banks (underwriters), 3) Legal counsel, 4) Auditors, 5) SEC (regulator), 6) Investors (institutional, retail), 7) Stock exchange.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Issuing company\n• Investment banks (underwriters).\n• Legal counsel\n• Auditors\n• SEC (regulator)\n• Investors (institutional, retail).\n• Stock exchange",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2031,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Bookbuilding process",
    "question": "What is bookbuilding in an IPO?",
    "modelAnswer": "Bookbuilding is the process where underwriters gather investor indications of interest to determine demand and set the offer price. It involves roadshows, collecting bids, and allocating shares.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Bookbuilding is the process where underwriters gather investor indications of interest to determine demand and set the offer price. It involves roadshows, collecting bids, and allocating shares.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Bookbuilding is the process where underwriters gather investor indications of interest to determine demand and set the offer price\n• It involves roadshows, collecting bids, and allocating shares",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2032,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Underwriting fees",
    "question": "How are underwriting fees structured in an IPO?",
    "modelAnswer": "Fees typically 2-7% of gross proceeds, paid as: 1) Management fee (coordinating), 2) Underwriting fee (risk-bearing), 3) Selling concession (distribution). Fees vary by deal size and risk.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Fees typically 2-7% of gross proceeds, paid as: 1) Management fee (coordinating), 2) Underwriting fee (risk-bearing), 3) Selling concession (distribution). Fees vary by deal size and risk.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Fees typically 2-7% of gross proceeds, paid as: 1) Management fee (coordinating), 2) Underwriting fee (risk-bearing), 3) Selling concession (distribution)\n• Fees vary by deal size and risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2033,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Lock-up period",
    "question": "What is a lock-up period and why is it important?",
    "modelAnswer": "Lock-up period (usually 90‑180 days) restricts insiders and pre‑IPO shareholders from selling shares post‑IPO. It prevents immediate flooding of market and supports stock price stability.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Lock-up period (usually 90‑180 days) restricts insiders and pre‑IPO shareholders from selling shares post‑IPO. It prevents immediate flooding of market and supports stock price stability.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Lock-up period (usually 90‑180 days) restricts insiders and pre‑IPO shareholders from selling shares post‑IPO\n• It prevents immediate flooding of market and supports stock price stability",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2034,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "IPO valuation methods",
    "question": "What valuation methods are used for IPO pricing?",
    "modelAnswer": "Methods include: 1) DCF, 2) Comparable public companies, 3) Precedent transactions, 4) Roadshow feedback (investor demand). Final price is a blend of fundamental value and market appetite.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Methods include: 1) DCF, 2) Comparable public companies, 3) Precedent transactions, 4) Roadshow feedback (investor demand). Final price is a blend of fundamental value and market appetite.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• DCF\n• Comparable public companies\n• Precedent transactions\n• Roadshow feedback (investor demand).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2035,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Senior vs subordinated debt",
    "question": "What is the difference between senior and subordinated debt?",
    "modelAnswer": "Senior debt has first claim on assets in liquidation, lower risk, lower yield. Subordinated debt ranks below, higher risk, higher yield. Sub debt includes mezzanine and high‑yield bonds.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Senior debt has first claim on assets in liquidation, lower risk, lower yield. Subordinated debt ranks below, higher risk, higher yield. Sub debt includes mezzanine and high‑yield bonds.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Senior debt has first claim on assets in liquidation, lower risk, lower yield\n• Subordinated debt ranks below, higher risk, higher yield",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2036,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Bond covenants",
    "question": "What are affirmative and negative covenants in bond agreements?",
    "modelAnswer": "Affirmative covenants require actions (financial reporting, insurance). Negative covenants restrict actions (additional debt, dividends, asset sales). Covenants protect bondholders.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Affirmative covenants require actions (financial reporting, insurance). Negative covenants restrict actions (additional debt, dividends, asset sales). Covenants protect bondholders.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Affirmative covenants require actions (financial reporting, insurance)\n• Negative covenants restrict actions (additional debt, dividends, asset sales)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2037,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Credit rating impact",
    "question": "How does a credit rating affect debt financing?",
    "modelAnswer": "Higher rating (AAA‑A) means lower interest cost, wider investor base, easier access. Lower rating (BBB‑C) increases cost, may require covenants, limits investor pool. Rating agencies: Moody's, S&P, Fitch.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Higher rating (AAA‑A) means lower interest cost, wider investor base, easier access. Lower rating (BBB‑C) increases cost, may require covenants, limits investor pool. Rating agencies: Moody's, S&P, Fitch.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Higher rating (AAA‑A) means lower interest cost, wider investor base, easier access\n• Lower rating (BBB‑C) increases cost, may require covenants, limits investor pool",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2038,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Syndicated loan process",
    "question": "What is a syndicated loan and how does it work?",
    "modelAnswer": "A syndicated loan is provided by a group of lenders (syndicate) led by arrangers. Process: mandate, underwriting, syndication, closing. Allows large loans, risk sharing, and flexible terms.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "A syndicated loan is provided by a group of lenders (syndicate) led by arrangers. Process: mandate, underwriting, syndication, closing. Allows large loans, risk sharing, and flexible terms.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• A syndicated loan is provided by a group of lenders (syndicate) led by arrangers\n• Process: mandate, underwriting, syndication, closing",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2039,
    "role": "ib",
    "category": "technical",
    "difficulty": "easy",
    "title": "Debt refinancing motivations",
    "question": "Why might a company refinance its existing debt?",
    "modelAnswer": "Motivations: 1) Lower interest rates, 2) Extend maturity, 3) Improve covenants, 4) Change currency, 5) Raise additional funds. Refinancing can reduce cost and improve flexibility.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Motivations: 1) Lower interest rates, 2) Extend maturity, 3) Improve covenants, 4) Change currency, 5) Raise additional funds. Refinancing can reduce cost and improve flexibility.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Lower interest rates,\n• Extend maturity,\n• Improve covenants,\n• Change currency,\n• Raise additional funds",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2040,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Modern Portfolio Theory",
    "question": "Explain the key concept behind Modern Portfolio Theory (MPT).",
    "modelAnswer": "MPT, by Harry Markowitz, shows that diversification reduces risk without sacrificing return. The efficient frontier represents optimal portfolios offering highest return for given risk. Investors choose based on risk tolerance.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "MPT, by Harry Markowitz, shows that diversification reduces risk without sacrificing return. The efficient frontier represents optimal portfolios offering highest return for given risk. Investors choose based on risk tolerance.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• MPT, by Harry Markowitz, shows that diversification reduces risk without sacrificing return\n• The efficient frontier represents optimal portfolios offering highest return for given risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2041,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Diversification benefits",
    "question": "Why does diversification reduce portfolio risk?",
    "modelAnswer": "Diversification reduces unsystematic (idiosyncratic) risk because asset returns are not perfectly correlated. When one asset falls, others may rise, smoothing overall returns. Systematic risk (market) cannot be diversified.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Diversification reduces unsystematic (idiosyncratic) risk because asset returns are not perfectly correlated. When one asset falls, others may rise, smoothing overall returns. Systematic risk (market) cannot be diversified.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Diversification reduces unsystematic (idiosyncratic) risk because asset returns are not perfectly correlated\n• When one asset falls, others may rise, smoothing overall returns",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2042,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Active vs passive management",
    "question": "Compare active and passive portfolio management.",
    "modelAnswer": "Active management aims to beat the market through stock selection and timing, higher fees. Passive management tracks an index, lower fees, and typically outperforms active over long term after fees.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Active management aims to beat the market through stock selection and timing, higher fees. Passive management tracks an index, lower fees, and typically outperforms active over long term after fees.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Active management aims to beat the market through stock selection and timing, higher fees\n• Passive management tracks an index, lower fees, and typically outperforms active over long term after fees",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2043,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Rebalancing strategies",
    "question": "What is portfolio rebalancing and why is it important?",
    "modelAnswer": "Rebalancing involves adjusting portfolio weights back to target allocation after market movements. It maintains risk profile, enforces discipline (buy low, sell high), and prevents drift.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Rebalancing involves adjusting portfolio weights back to target allocation after market movements. It maintains risk profile, enforces discipline (buy low, sell high), and prevents drift.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Rebalancing involves adjusting portfolio weights back to target allocation after market movements\n• It maintains risk profile, enforces discipline (buy low, sell high), and prevents drift",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2044,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Core-satellite approach",
    "question": "Describe the core-satellite portfolio construction approach.",
    "modelAnswer": "Core (70-80%) is passive index funds for market exposure. Satellite (20-30%) is active strategies (thematic, alpha-seeking) for outperformance. Combines cost efficiency with potential alpha.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Core (70-80%) is passive index funds for market exposure. Satellite (20-30%) is active strategies (thematic, alpha-seeking) for outperformance. Combines cost efficiency with potential alpha.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Core (70-80%) is passive index funds for market exposure\n• Satellite (20-30%) is active strategies (thematic, alpha-seeking) for outperformance",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2045,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Types of investment risk",
    "question": "What are the main types of risk in portfolio management?",
    "modelAnswer": "1) Market risk (systematic), 2) Credit risk, 3) Liquidity risk, 4) Operational risk, 5) Currency risk, 6) Interest rate risk, 7) Inflation risk. Diversification addresses unsystematic risk.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Market risk (systematic), 2) Credit risk, 3) Liquidity risk, 4) Operational risk, 5) Currency risk, 6) Interest rate risk, 7) Inflation risk. Diversification addresses unsystematic risk.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Market risk (systematic)\n• Credit risk\n• Liquidity risk\n• Operational risk\n• Currency risk\n• Interest rate risk\n• Inflation risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2046,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Risk-adjusted returns",
    "question": "What is a risk-adjusted return and name two measures.",
    "modelAnswer": "Risk-adjusted return evaluates performance relative to risk taken. Measures: Sharpe ratio (excess return per unit of total risk), Sortino ratio (downside risk only), Treynor ratio (systematic risk).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Risk-adjusted return evaluates performance relative to risk taken. Measures: Sharpe ratio (excess return per unit of total risk), Sortino ratio (downside risk only), Treynor ratio (systematic risk).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Risk-adjusted return evaluates performance relative to risk taken\n• Measures: Sharpe ratio (excess return per unit of total risk), Sortino ratio (downside risk only), Treynor ratio (systematic risk)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2047,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Value at Risk (VaR)",
    "question": "Explain Value at Risk (VaR) as a risk measure.",
    "modelAnswer": "VaR estimates maximum loss over a given time period at a certain confidence level (e.g., 95% VaR of $1M means 5% chance of losing >$1M in a day). Limitations: assumes normal distribution, ignores tail risk.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "VaR estimates maximum loss over a given time period at a certain confidence level (e.g., 95% VaR of $1M means 5% chance of losing >$1M in a day). Limitations: assumes normal distribution, ignores tail risk.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• VaR estimates maximum loss over a given time period at a certain confidence level (e\n• , 95% VaR of $1M means 5% chance of losing >$1M in a day)\n• Limitations: assumes normal distribution, ignores tail risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2048,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Stress testing",
    "question": "What is stress testing in risk management?",
    "modelAnswer": "Stress testing assesses portfolio impact under extreme scenarios (market crash, recession, geopolitical events). It complements VaR by capturing tail risks and revealing vulnerabilities.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Stress testing assesses portfolio impact under extreme scenarios (market crash, recession, geopolitical events). It complements VaR by capturing tail risks and revealing vulnerabilities.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Stress testing assesses portfolio impact under extreme scenarios (market crash, recession, geopolitical events)\n• It complements VaR by capturing tail risks and revealing vulnerabilities",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2049,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Hedging strategies",
    "question": "How can derivatives be used for hedging portfolio risk?",
    "modelAnswer": "Derivatives (options, futures, swaps) can hedge: 1) Equity risk (put options), 2) Interest rate risk (interest rate swaps), 3) Currency risk (forward contracts), 4) Commodity risk (futures).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Derivatives (options, futures, swaps) can hedge: 1) Equity risk (put options), 2) Interest rate risk (interest rate swaps), 3) Currency risk (forward contracts), 4) Commodity risk (futures).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Equity risk (put options)\n• Interest rate risk (interest rate swaps).\n• Currency risk (forward contracts).\n• Commodity risk (futures)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2050,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Strategic vs tactical allocation",
    "question": "Differentiate between strategic and tactical asset allocation.",
    "modelAnswer": "Strategic allocation is long-term target based on investor goals and risk tolerance. Tactical allocation involves short-term deviations to capitalize on market opportunities, adding alpha.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Strategic allocation is long-term target based on investor goals and risk tolerance. Tactical allocation involves short-term deviations to capitalize on market opportunities, adding alpha.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Strategic allocation is long-term target based on investor goals and risk tolerance\n• Tactical allocation involves short-term deviations to capitalize on market opportunities, adding alpha",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2051,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Lifecycle investing",
    "question": "What is lifecycle investing in asset allocation?",
    "modelAnswer": "Lifecycle investing adjusts asset allocation as investor ages: younger investors hold more equities (growth), shifting to bonds (income and safety) near retirement. Reduces risk as time horizon shortens.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Lifecycle investing adjusts asset allocation as investor ages: younger investors hold more equities (growth), shifting to bonds (income and safety) near retirement. Reduces risk as time horizon shortens.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Lifecycle investing adjusts asset allocation as investor ages: younger investors hold more equities (growth), shifting to bonds (income and safety) near retirement\n• Reduces risk as time horizon shortens",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2052,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Risk parity approach",
    "question": "Explain the risk parity asset allocation approach.",
    "modelAnswer": "Risk parity allocates capital based on risk contribution, not dollar amount. Equities are risky, so portfolio uses leverage on bonds to equalize risk. Aims for better risk-adjusted returns than 60/40.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Risk parity allocates capital based on risk contribution, not dollar amount. Equities are risky, so portfolio uses leverage on bonds to equalize risk. Aims for better risk-adjusted returns than 60/40.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Risk parity allocates capital based on risk contribution, not dollar amount\n• Equities are risky, so portfolio uses leverage on bonds to equalize risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2053,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Inflation-protected assets",
    "question": "What assets are effective hedges against inflation?",
    "modelAnswer": "Inflation hedges: 1) TIPS (Treasury Inflation-Protected Securities), 2) Commodities (gold, oil), 3) Real estate, 4) Infrastructure, 5) Equities (companies with pricing power).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Inflation hedges: 1) TIPS (Treasury Inflation-Protected Securities), 2) Commodities (gold, oil), 3) Real estate, 4) Infrastructure, 5) Equities (companies with pricing power).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• TIPS (Treasury Inflation-Protected Securities).\n• Commodities (gold, oil)\n• Real estate\n• Infrastructure\n• Equities (companies with pricing power).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2054,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Currency hedging decision",
    "question": "When should you hedge currency exposure in a global portfolio?",
    "modelAnswer": "Hedge if: 1) Currency volatility is high, 2) Portfolio has low risk tolerance, 3) Cost of hedging is low. Do not hedge if: 1) Long-term horizon (currencies mean revert), 2) Hedging cost exceeds benefit.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Hedge if: 1) Currency volatility is high, 2) Portfolio has low risk tolerance, 3) Cost of hedging is low. Do not hedge if: 1) Long-term horizon (currencies mean revert), 2) Hedging cost exceeds benefit.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Currency volatility is high\n• Portfolio has low risk tolerance.\n• Cost of hedging is low\n• Long-term horizon (currencies mean revert).\n• Hedging cost exceeds benefit",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2055,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Alpha and beta",
    "question": "Define alpha and beta in portfolio performance.",
    "modelAnswer": "Beta measures portfolio sensitivity to market movements (systematic risk). Alpha measures excess return over market, adjusted for beta (skill-based). Positive alpha indicates outperformance.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Beta measures portfolio sensitivity to market movements (systematic risk). Alpha measures excess return over market, adjusted for beta (skill-based). Positive alpha indicates outperformance.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Beta measures portfolio sensitivity to market movements (systematic risk)\n• Alpha measures excess return over market, adjusted for beta (skill-based)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2056,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Benchmark selection",
    "question": "What makes a good benchmark for performance evaluation?",
    "modelAnswer": "A good benchmark is: 1) Investable, 2) Representative of portfolio style, 3) Transparent, 4) Published regularly. Examples: S&P 500 for US large-cap, Barclays Agg for bonds.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "A good benchmark is: 1) Investable, 2) Representative of portfolio style, 3) Transparent, 4) Published regularly. Examples: S&P 500 for US large-cap, Barclays Agg for bonds.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• A good benchmark is: 1) Investable, 2) Representative of portfolio style, 3) Transparent, 4) Published regularly\n• Examples: S&P 500 for US large-cap, Barclays Agg for bonds",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2057,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Information ratio",
    "question": "What does the Information Ratio measure?",
    "modelAnswer": "Information Ratio = (Portfolio return - Benchmark return) / Tracking error. Measures active manager's consistency in generating alpha per unit of active risk. Higher is better.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Information Ratio = (Portfolio return - Benchmark return) / Tracking error. Measures active manager's consistency in generating alpha per unit of active risk. Higher is better.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Information Ratio = (Portfolio return - Benchmark return) / Tracking error\n• Measures active manager's consistency in generating alpha per unit of active risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2058,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Attribution analysis",
    "question": "What is performance attribution analysis?",
    "modelAnswer": "Attribution breaks down excess return into components: 1) Asset allocation (sector weights), 2) Security selection (stock picking), 3) Currency effects, 4) Interaction. Identifies sources of alpha.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Attribution breaks down excess return into components: 1) Asset allocation (sector weights), 2) Security selection (stock picking), 3) Currency effects, 4) Interaction. Identifies sources of alpha.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Asset allocation (sector weights).\n• Security selection (stock picking).\n• Currency effects\n• Interaction",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2059,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Survivorship bias",
    "question": "How does survivorship bias affect performance data?",
    "modelAnswer": "Survivorship bias occurs when only surviving funds are included in databases, excluding failed funds. This inflates historical average returns, making managers appear better than reality.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Survivorship bias occurs when only surviving funds are included in databases, excluding failed funds. This inflates historical average returns, making managers appear better than reality.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Survivorship bias occurs when only surviving funds are included in databases, excluding failed funds\n• This inflates historical average returns, making managers appear better than reality",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2060,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "ESG integration approaches",
    "question": "What are the main approaches to ESG investing?",
    "modelAnswer": "1) Integration (ESG factors in analysis), 2) Screening (exclude controversial sectors), 3) Thematic (focus on ESG themes), 4) Impact investing (target social/environmental outcomes), 5) Engagement (active ownership).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Integration (ESG factors in analysis), 2) Screening (exclude controversial sectors), 3) Thematic (focus on ESG themes), 4) Impact investing (target social/environmental outcomes), 5) Engagement (active ownership).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Integration (ESG factors in analysis).\n• Screening (exclude controversial sectors).\n• Thematic (focus on ESG themes)\n• Impact investing (target social/environmental outcomes).\n• Engagement (active ownership)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2061,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Materiality in ESG",
    "question": "What is materiality in the context of ESG?",
    "modelAnswer": "Material ESG factors are those that could significantly impact financial performance. Varies by industry: carbon emissions for energy, data privacy for tech. Investors focus on material issues.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Material ESG factors are those that could significantly impact financial performance. Varies by industry: carbon emissions for energy, data privacy for tech. Investors focus on material issues.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Material ESG factors are those that could significantly impact financial performance\n• Varies by industry: carbon emissions for energy, data privacy for tech",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2062,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Greenwashing risks",
    "question": "What is greenwashing and how can investors detect it?",
    "modelAnswer": "Greenwashing is misleading ESG claims without substance. Detection: 1) Scrutinize ESG reports, 2) Check third-party ratings, 3) Look for concrete actions vs. vague statements, 4) Assess transparency.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Greenwashing is misleading ESG claims without substance. Detection: 1) Scrutinize ESG reports, 2) Check third-party ratings, 3) Look for concrete actions vs. vague statements, 4) Assess transparency.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Scrutinize ESG reports,\n• Check third-party ratings,\n• Look for concrete actions vs\n• Assess transparency",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2063,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "ESG performance debate",
    "question": "Does ESG investing lead to lower returns?",
    "modelAnswer": "Studies show ESG portfolios can match or exceed conventional returns because: 1) Better risk management, 2) Avoiding stranded assets, 3) Aligning with regulatory trends. Short-term may underperform during transitions.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Studies show ESG portfolios can match or exceed conventional returns because: 1) Better risk management, 2) Avoiding stranded assets, 3) Aligning with regulatory trends. Short-term may underperform during transitions.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Studies show ESG portfolios can match or exceed conventional returns because: 1) Better risk management, 2) Avoiding stranded assets, 3) Aligning with regulatory trends\n• Short-term may underperform during transitions",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2064,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Regulatory frameworks",
    "question": "Name two major global ESG disclosure frameworks.",
    "modelAnswer": "1) SASB (Sustainability Accounting Standards Board) – industry‑specific material issues. 2) TCFD (Task Force on Climate‑Related Financial Disclosures) – climate risk. Also GRI, CDP.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) SASB (Sustainability Accounting Standards Board) – industry‑specific material issues. 2) TCFD (Task Force on Climate‑Related Financial Disclosures) – climate risk. Also GRI, CDP.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• SASB (Sustainability Accounting Standards Board).\n• TCFD (Task Force on Climate‑Related Financial Disclosures).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2065,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Hedge fund strategies",
    "question": "List three common hedge fund strategies.",
    "modelAnswer": "1) Long/short equity (buy undervalued, short overvalued), 2) Event‑driven (merger arbitrage, distressed), 3) Global macro (bet on macroeconomic trends), 4) Relative value (exploit pricing discrepancies).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Long/short equity (buy undervalued, short overvalued), 2) Event‑driven (merger arbitrage, distressed), 3) Global macro (bet on macroeconomic trends), 4) Relative value (exploit pricing discrepancies).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Long/short equity (buy undervalued, short overvalued).\n• Event‑driven (merger arbitrage, distressed).\n• Global macro (bet on macroeconomic trends).\n• Relative value (exploit pricing discrepancies).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2066,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Private equity vs venture capital",
    "question": "Differentiate private equity and venture capital.",
    "modelAnswer": "PE buys mature companies using leverage, aims to improve operations and sell. VC invests in early‑stage startups for high growth, high risk. PE targets steady cash flows, VC targets disruptive innovation.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "PE buys mature companies using leverage, aims to improve operations and sell. VC invests in early‑stage startups for high growth, high risk. PE targets steady cash flows, VC targets disruptive innovation.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• PE buys mature companies using leverage, aims to improve operations and sell\n• VC invests in early‑stage startups for high growth, high risk",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2067,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Real estate investment vehicles",
    "question": "What are the main ways to invest in real estate?",
    "modelAnswer": "1) Direct ownership, 2) REITs (publicly traded, liquid), 3) Real estate funds (private equity style), 4) Crowdfunding. REITs offer diversification, dividends, and professional management.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Direct ownership, 2) REITs (publicly traded, liquid), 3) Real estate funds (private equity style), 4) Crowdfunding. REITs offer diversification, dividends, and professional management.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Direct ownership\n• REITs (publicly traded, liquid).\n• Real estate funds (private equity style).\n• Crowdfunding",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2068,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Commodities as inflation hedge",
    "question": "Why are commodities considered a good inflation hedge?",
    "modelAnswer": "Commodity prices often rise with inflation (input costs). They have low correlation with stocks/bonds, providing diversification. Gold is a classic store of value during uncertainty.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Commodity prices often rise with inflation (input costs). They have low correlation with stocks/bonds, providing diversification. Gold is a classic store of value during uncertainty.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Commodity prices often rise with inflation (input costs)\n• They have low correlation with stocks/bonds, providing diversification",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2069,
    "role": "am",
    "category": "technical",
    "difficulty": "easy",
    "title": "Due diligence for alternatives",
    "question": "What extra due diligence is needed for alternative investments?",
    "modelAnswer": "1) Manager track record (authenticity), 2) Fee structure (2/20 typical), 3) Liquidity terms (lock‑ups, gates), 4) Strategy capacity, 5) Regulatory compliance, 6) Operational infrastructure.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Manager track record (authenticity), 2) Fee structure (2/20 typical), 3) Liquidity terms (lock‑ups, gates), 4) Strategy capacity, 5) Regulatory compliance, 6) Operational infrastructure.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Manager track record (authenticity).\n• Fee structure ()\n• Liquidity terms (lock‑ups, gates).\n• Strategy capacity\n• Regulatory compliance\n• Operational infrastructure",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2070,
    "role": "risk",
    "category": "market",
    "difficulty": "easy",
    "title": "Types of market risk",
    "question": "What are the primary components of market risk?",
    "modelAnswer": "Market risk includes: 1) Equity risk (stock prices), 2) Interest rate risk (yield changes), 3) Currency risk (FX rates), 4) Commodity risk (price moves), 5) Volatility risk (options).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Market risk includes: 1) Equity risk (stock prices), 2) Interest rate risk (yield changes), 3) Currency risk (FX rates), 4) Commodity risk (price moves), 5) Volatility risk (options).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Equity risk (stock prices)\n• Interest rate risk (yield changes).\n• Currency risk (FX rates)\n• Commodity risk (price moves)\n• Volatility risk (options)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2071,
    "role": "risk",
    "category": "market",
    "difficulty": "easy",
    "title": "Beta as market risk measure",
    "question": "How is beta used to measure market risk?",
    "modelAnswer": "Beta measures a stock's sensitivity to market movements. Beta = 1 moves with market, >1 more volatile, <1 less volatile. Used in CAPM to calculate expected return: E(R) = Rf + β*(Rm - Rf).",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Beta measures a stock's sensitivity to market movements. Beta = 1 moves with market, >1 more volatile, <1 less volatile. Used in CAPM to calculate expected return: E(R) = Rf + β*(Rm - Rf).",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Beta measures a stock's sensitivity to market movements\n• Beta = 1 moves with market, >1 more volatile, <1 less volatile",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2072,
    "role": "risk",
    "category": "market",
    "difficulty": "easy",
    "title": "Duration and interest rate risk",
    "question": "What is duration and how does it measure interest rate risk?",
    "modelAnswer": "Duration measures bond price sensitivity to interest rate changes. For each 1% rate increase, price falls by duration percent. Modified duration accounts for yield. Long duration = higher risk.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Duration measures bond price sensitivity to interest rate changes. For each 1% rate increase, price falls by duration percent. Modified duration accounts for yield. Long duration = higher risk.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Duration measures bond price sensitivity to interest rate changes\n• For each 1% rate increase, price falls by duration percent",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2073,
    "role": "risk",
    "category": "market",
    "difficulty": "easy",
    "title": "Stress testing market risk",
    "question": "What is a stress test scenario for market risk?",
    "modelAnswer": "Example: 2008‑style financial crisis with 30% equity drop, 20% bond sell‑off, 10% currency move. Tests portfolio losses under extreme but plausible events, revealing hidden exposures.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Example: 2008‑style financial crisis with 30% equity drop, 20% bond sell‑off, 10% currency move. Tests portfolio losses under extreme but plausible events, revealing hidden exposures.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Example: 2008‑style financial crisis with 30% equity drop, 20% bond sell‑off, 10% currency move\n• Tests portfolio losses under extreme but plausible events, revealing hidden exposures",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2074,
    "role": "risk",
    "category": "market",
    "difficulty": "easy",
    "title": "Hedging market risk",
    "question": "How can you hedge equity market risk?",
    "modelAnswer": "Hedge with: 1) Put options on index, 2) Futures short positions, 3) Inverse ETFs, 4) Diversification into uncorrelated assets. Cost of hedging (premium) vs. protection trade‑off.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Hedge with: 1) Put options on index, 2) Futures short positions, 3) Inverse ETFs, 4) Diversification into uncorrelated assets. Cost of hedging (premium) vs. protection trade‑off.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Put options on index,\n• Futures short positions,\n• Inverse ETFs,\n• Diversification into uncorrelated assets",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2075,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Default probability",
    "question": "How is probability of default (PD) estimated?",
    "modelAnswer": "PD estimated via: 1) Credit ratings, 2) Structural models (Merton), 3) Reduced‑form models, 4) Historical default rates, 5) Market‑based (CDS spreads). PD increases with leverage, volatility.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "PD estimated via: 1) Credit ratings, 2) Structural models (Merton), 3) Reduced‑form models, 4) Historical default rates, 5) Market‑based (CDS spreads). PD increases with leverage, volatility.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Credit ratings\n• Structural models (Merton)\n• Reduced‑form models\n• Historical default rates\n• Market‑based (CDS spreads)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2076,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Loss given default",
    "question": "What is Loss Given Default (LGD) and how is it calculated?",
    "modelAnswer": "LGD = 1 - Recovery rate. Recovery rate is percentage of exposure recovered after default (via collateral, liquidation). LGD depends on seniority, collateral, and economic cycle.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "LGD = 1 - Recovery rate. Recovery rate is percentage of exposure recovered after default (via collateral, liquidation). LGD depends on seniority, collateral, and economic cycle.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• LGD = 1 - Recovery rate\n• Recovery rate is percentage of exposure recovered after default (via collateral, liquidation)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2077,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Credit spreads",
    "question": "What do credit spreads indicate about credit risk?",
    "modelAnswer": "Credit spread = yield of corporate bond - risk‑free rate. Widening spreads indicate higher perceived default risk, worsening economic outlook. Narrowing spreads indicate improving credit conditions.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Credit spread = yield of corporate bond - risk‑free rate. Widening spreads indicate higher perceived default risk, worsening economic outlook. Narrowing spreads indicate improving credit conditions.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Credit spread = yield of corporate bond - risk‑free rate\n• Widening spreads indicate higher perceived default risk, worsening economic outlook",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2078,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Counterparty risk",
    "question": "What is counterparty risk in derivatives?",
    "modelAnswer": "Counterparty risk is the risk that the other party in a derivative contract defaults before settlement. Mitigated by collateral (margin), clearinghouses, netting agreements, and credit limits.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Counterparty risk is the risk that the other party in a derivative contract defaults before settlement. Mitigated by collateral (margin), clearinghouses, netting agreements, and credit limits.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Counterparty risk is the risk that the other party in a derivative contract defaults before settlement\n• Mitigated by collateral (margin), clearinghouses, netting agreements, and credit limits",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2079,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Credit risk mitigation techniques",
    "question": "List three techniques to mitigate credit risk.",
    "modelAnswer": "1) Collateralization (post collateral), 2) Netting (offsetting exposures), 3) Credit derivatives (CDS), 4) Diversification across obligors, 5) Covenants in loan agreements.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Collateralization (post collateral), 2) Netting (offsetting exposures), 3) Credit derivatives (CDS), 4) Diversification across obligors, 5) Covenants in loan agreements.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Collateralization (post collateral).\n• Netting (offsetting exposures)\n• Credit derivatives (CDS)\n• Diversification across obligors.\n• Covenants in loan agreements",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2080,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Operational risk definition",
    "question": "Define operational risk and give examples.",
    "modelAnswer": "Operational risk is loss from inadequate processes, people, systems, or external events. Examples: fraud, system failures, legal risk, cyber attacks, natural disasters, human error.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Operational risk is loss from inadequate processes, people, systems, or external events. Examples: fraud, system failures, legal risk, cyber attacks, natural disasters, human error.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Operational risk is loss from inadequate processes, people, systems, or external events\n• Examples: fraud, system failures, legal risk, cyber attacks, natural disasters, human error",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2081,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Basel II operational risk approaches",
    "question": "What are the three approaches to operational risk under Basel II?",
    "modelAnswer": "1) Basic Indicator Approach (15% of gross income), 2) Standardized Approach (business line factors), 3) Advanced Measurement Approach (internal models). Higher sophistication reduces capital charge.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Basic Indicator Approach (15% of gross income), 2) Standardized Approach (business line factors), 3) Advanced Measurement Approach (internal models). Higher sophistication reduces capital charge.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Basic Indicator Approach ()\n• Standardized Approach (business line factors).\n• Advanced Measurement Approach (internal models).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2082,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Key risk indicators",
    "question": "What are Key Risk Indicators (KRIs) for operational risk?",
    "modelAnswer": "KRIs are metrics predicting potential operational losses. Examples: employee turnover, failed trades, system downtime, audit findings, complaint volume. Used for early warning.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "KRIs are metrics predicting potential operational losses. Examples: employee turnover, failed trades, system downtime, audit findings, complaint volume. Used for early warning.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• KRIs are metrics predicting potential operational losses\n• Examples: employee turnover, failed trades, system downtime, audit findings, complaint volume",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2083,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Business continuity planning",
    "question": "Why is business continuity planning important for operational risk?",
    "modelAnswer": "BCP ensures critical operations continue during disruptions (cyber attack, disaster). Includes backup systems, alternate sites, recovery procedures. Reduces financial and reputational damage.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "BCP ensures critical operations continue during disruptions (cyber attack, disaster). Includes backup systems, alternate sites, recovery procedures. Reduces financial and reputational damage.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• BCP ensures critical operations continue during disruptions (cyber attack, disaster)\n• Includes backup systems, alternate sites, recovery procedures",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2084,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Three lines of defense",
    "question": "Explain the three lines of defense model for risk management.",
    "modelAnswer": "1) First line: business units (own risks), 2) Second line: risk/compliance (oversight), 3) Third line: internal audit (independent assurance). Clarifies roles and strengthens governance.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) First line: business units (own risks), 2) Second line: risk/compliance (oversight), 3) Third line: internal audit (independent assurance). Clarifies roles and strengthens governance.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• First line: business units (own risks).\n• Second line: risk/compliance (oversight).\n• Third line: internal audit (independent assurance).",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2085,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Parametric VaR method",
    "question": "Explain the parametric (variance‑covariance) method for VaR.",
    "modelAnswer": "Parametric VaR assumes normal distribution. VaR = Z‑score * portfolio standard deviation * sqrt(time). Example: 95% VaR (Z=1.65) for 1‑day. Simple but inaccurate for non‑normal tails.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Parametric VaR assumes normal distribution. VaR = Z‑score * portfolio standard deviation * sqrt(time). Example: 95% VaR (Z=1.65) for 1‑day. Simple but inaccurate for non‑normal tails.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Parametric VaR assumes normal distribution\n• VaR = Z‑score * portfolio standard deviation * sqrt(time)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2086,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Historical simulation VaR",
    "question": "How is historical simulation VaR calculated?",
    "modelAnswer": "Use historical returns of portfolio, sort them, pick the percentile loss. For 95% 1‑day VaR, take 5th worst historical daily loss. No distribution assumption, but past may not predict future.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Use historical returns of portfolio, sort them, pick the percentile loss. For 95% 1‑day VaR, take 5th worst historical daily loss. No distribution assumption, but past may not predict future.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Use historical returns of portfolio, sort them, pick the percentile loss\n• For 95% 1‑day VaR, take 5th worst historical daily loss",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2087,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Monte Carlo VaR",
    "question": "What is Monte Carlo simulation for VaR?",
    "modelAnswer": "Monte Carlo generates thousands of random future return scenarios based on statistical models, calculates portfolio value each scenario, then picks percentile loss. Flexible but computationally heavy.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Monte Carlo generates thousands of random future return scenarios based on statistical models, calculates portfolio value each scenario, then picks percentile loss. Flexible but computationally heavy.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Monte Carlo generates thousands of random future return scenarios based on statistical models, calculates portfolio value each scenario, then picks percentile loss\n• Flexible but computationally heavy",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2088,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "VaR limitations",
    "question": "What are the main limitations of VaR?",
    "modelAnswer": "1) Does not measure loss beyond VaR (tail risk), 2) Assumes normal distribution (underestimates extreme events), 3) Not sub‑additive (portfolio VaR can exceed sum), 4) Backward‑looking.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "1) Does not measure loss beyond VaR (tail risk), 2) Assumes normal distribution (underestimates extreme events), 3) Not sub‑additive (portfolio VaR can exceed sum), 4) Backward‑looking.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Does not measure loss beyond VaR (tail risk).\n• Assumes normal distribution (underestimates extreme events).\n• Not sub‑additive (portfolio VaR can exceed sum).\n• Backward‑looking",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2089,
    "role": "risk",
    "category": "technical",
    "difficulty": "easy",
    "title": "Expected Shortfall",
    "question": "How does Expected Shortfall (CVaR) improve upon VaR?",
    "modelAnswer": "Expected Shortfall calculates average loss given that loss exceeds VaR. Captures tail risk, is sub‑additive (coherent), and provides better risk measure for extreme events.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Expected Shortfall calculates average loss given that loss exceeds VaR. Captures tail risk, is sub‑additive (coherent), and provides better risk measure for extreme events.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Expected Shortfall calculates average loss given that loss exceeds VaR\n• Captures tail risk, is sub‑additive (coherent), and provides better risk measure for extreme events",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2090,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Pairs trading strategy",
    "question": "Explain the pairs trading statistical arbitrage strategy.",
    "modelAnswer": "Pairs trading identifies two historically correlated stocks. When spread diverges (one over‑/under‑valued), short the outperformer, long the underperformer. Bet on reversion to mean. Requires cointegration.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Pairs trading identifies two historically correlated stocks. When spread diverges (one over‑/under‑valued), short the outperformer, long the underperformer. Bet on reversion to mean. Requires cointegration.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Pairs trading identifies two historically correlated stocks\n• When spread diverges (one over‑/under‑valued), short the outperformer, long the underperformer",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2091,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Mean reversion vs momentum",
    "question": "Contrast mean reversion and momentum in quantitative strategies.",
    "modelAnswer": "Mean reversion assumes prices revert to historical average (short‑term). Momentum assumes trends persist (medium‑term). Statistical arbitrage uses mean reversion; trend‑following uses momentum.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Mean reversion assumes prices revert to historical average (short‑term). Momentum assumes trends persist (medium‑term). Statistical arbitrage uses mean reversion; trend‑following uses momentum.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Mean reversion assumes prices revert to historical average (short‑term)\n• Momentum assumes trends persist (medium‑term)",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2092,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Factor models in stat arb",
    "question": "How are factor models used in statistical arbitrage?",
    "modelAnswer": "Factor models (Fama‑French) explain stock returns via exposures to factors (market, size, value). Stat arb identifies stocks with abnormal returns (alpha) after controlling for factors, betting on correction.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Factor models (Fama‑French) explain stock returns via exposures to factors (market, size, value). Stat arb identifies stocks with abnormal returns (alpha) after controlling for factors, betting on correction.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Factor models (Fama‑French) explain stock returns via exposures to factors (market, size, value)\n• Stat arb identifies stocks with abnormal returns (alpha) after controlling for factors, betting on correction",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2093,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Black‑Scholes assumptions",
    "question": "List the key assumptions of the Black‑Scholes option pricing model.",
    "modelAnswer": "Assumptions: 1) No arbitrage, 2) Constant volatility, 3) Log‑normal stock returns, 4) No dividends, 5) Risk‑free rate constant, 6) Continuous trading, 7) No transaction costs.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Assumptions: 1) No arbitrage, 2) Constant volatility, 3) Log‑normal stock returns, 4) No dividends, 5) Risk‑free rate constant, 6) Continuous trading, 7) No transaction costs.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• No arbitrage,\n• Constant volatility,\n• Log‑normal stock returns,\n• No dividends,\n• Risk‑free rate constant,\n• Continuous trading,\n• No transaction costs",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2094,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Greeks definition",
    "question": "What are the option 'Greeks' and why are they important?",
    "modelAnswer": "Greeks measure sensitivity: Delta (price), Gamma (delta change), Theta (time decay), Vega (volatility), Rho (interest rates). Used for hedging and risk management.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Greeks measure sensitivity: Delta (price), Gamma (delta change), Theta (time decay), Vega (volatility), Rho (interest rates). Used for hedging and risk management.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Greeks measure sensitivity: Delta (price), Gamma (delta change), Theta (time decay), Vega (volatility), Rho (interest rates)\n• Used for hedging and risk management",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2095,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Implied volatility",
    "question": "What is implied volatility and how is it derived?",
    "modelAnswer": "Implied volatility is the volatility parameter that makes Black‑Scholes price equal market price. Derived via inversion. Reflects market's expectation of future volatility (the 'fear gauge').",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Implied volatility is the volatility parameter that makes Black‑Scholes price equal market price. Derived via inversion. Reflects market's expectation of future volatility (the 'fear gauge').",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Implied volatility is the volatility parameter that makes Black‑Scholes price equal market price\n• Derived via inversion",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2096,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "VWAP execution strategy",
    "question": "What is VWAP and how is it used in algorithmic trading?",
    "modelAnswer": "VWAP = Volume Weighted Average Price. VWAP algorithms break large orders into smaller chunks traded throughout day to match or beat VWAP. Reduces market impact.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "VWAP = Volume Weighted Average Price. VWAP algorithms break large orders into smaller chunks traded throughout day to match or beat VWAP. Reduces market impact.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• VWAP = Volume Weighted Average Price\n• VWAP algorithms break large orders into smaller chunks traded throughout day to match or beat VWAP",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2097,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Market making algorithms",
    "question": "How do market making algorithms work?",
    "modelAnswer": "Market makers provide liquidity by continuously quoting bid‑ask spreads. Algorithms adjust quotes based on inventory, volatility, and adverse selection. Profit from spread, risk from inventory imbalance.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Market makers provide liquidity by continuously quoting bid‑ask spreads. Algorithms adjust quotes based on inventory, volatility, and adverse selection. Profit from spread, risk from inventory imbalance.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Market makers provide liquidity by continuously quoting bid‑ask spreads\n• Algorithms adjust quotes based on inventory, volatility, and adverse selection",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2098,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Latency arbitrage",
    "question": "What is latency arbitrage in algorithmic trading?",
    "modelAnswer": "Latency arbitrage exploits speed differences to capture tiny price discrepancies across venues. Requires co‑location, fast data feeds, and low‑latency execution. Controversial, may harm liquidity.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Latency arbitrage exploits speed differences to capture tiny price discrepancies across venues. Requires co‑location, fast data feeds, and low‑latency execution. Controversial, may harm liquidity.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Latency arbitrage exploits speed differences to capture tiny price discrepancies across venues\n• Requires co‑location, fast data feeds, and low‑latency execution",
        "format": "concise",
        "source": "generated"
      }
    }
  },
  {
    "id": 2099,
    "role": "quant",
    "category": "technical",
    "difficulty": "easy",
    "title": "Backtesting pitfalls",
    "question": "What are common pitfalls in backtesting trading strategies?",
    "modelAnswer": "Pitfalls: 1) Look‑ahead bias (using future data), 2) Overfitting (curve‑fitting noise), 3) Ignoring transaction costs, 4) Survivorship bias, 5) Assuming perfect execution. Robust backtesting uses out‑of‑sample data.",
    "entryLevel": true,
    "stars": 3,
    "scoringKeywords": {},
    "expectedStructure": [],
    "detailedAnalysis": {
      "overview": "Entry-level question covering fundamental concepts.",
      "whyWorks": "Tests basic understanding of key concepts.",
      "commonMistakes": "Common mistakes include missing key points or oversimplifying.",
      "improvementTips": "Review core concepts and practice applying them."
    },
    "metadata": {
      "generatedBy": "finterview_batch_generator",
      "generatedAt": "2026-03-10T00:00:00Z",
      "confidence": "medium",
      "sources": [
        "Standard finance textbooks"
      ],
      "needsReview": true,
      "reviewedBy": null,
      "reviewedAt": null,
      "ratingDimensions": {
        "frequency": 70,
        "differentiation": 60,
        "sourceAuthority": 70,
        "answerClarity": 75,
        "marketRelevance": 70,
        "regionalApplicability": 65,
        "difficulty": 40
      },
      "weightedScore": 67,
      "starRating": 3,
      "tags": [
        "entry",
        "基础题"
      ]
    },
    "answers": {
      "detailed": {
        "answer": "Pitfalls: 1) Look‑ahead bias (using future data), 2) Overfitting (curve‑fitting noise), 3) Ignoring transaction costs, 4) Survivorship bias, 5) Assuming perfect execution. Robust backtesting uses out‑of‑sample data.",
        "format": "detailed",
        "source": "generated"
      },
      "concise": {
        "answer": "• Look‑ahead bias (using future data).\n• Overfitting (curve‑fitting noise).\n• Ignoring transaction costs\n• Survivorship bias\n• Assuming perfect execution",
        "format": "concise",
        "source": "generated"
      }
    }
  }

];

// Export for use in browser
if (typeof window !== "undefined") {
    window.questionBank = questionBank;
}
