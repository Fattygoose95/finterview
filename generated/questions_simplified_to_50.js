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
// Question Bank - 简洁答案版本 (处理到第50题)
// 包含conciseAnswer字段，保留原modelAnswer
// 生成时间: 2026-03-11T03:53:02.598Z

const questionBank = [
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
    "conciseAnswer": "• Comparable analysis uses valuation multiples (P/E, EV/EBITDA) of similar public companies\n• Precedent transactions look at multiples paid in recent acquisitions\n• DCF estimates intrinsic value based on projected cash flows\n• In practice, analysts use a combination to triangulate a fair value range"
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
    "conciseAnswer": "• Key steps: 1) Project free cash flows for 5-10 years based on revenue growth and margins\n• 2) Estimate terminal value using a perpetual growth formula\n• 3) Determine the discount rate (weighted average cost of capital)\n• 4) Discount all cash flows to present value"
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
    "conciseAnswer": "• GDP growth, inflation (CPI), and unemployment rate are three critical indicators\n• For example, the Fed watches these indicators to set monetary policy"
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
    "conciseAnswer": "• Financial regulators protect investors, ensure market integrity, and promote stability\n• The SEC oversees securities markets, requiring disclosure to prevent fraud\n• FINRA regulates brokerage firms and enforces fair practices\n• Regulations also aim to prevent systemic risk, as seen after the 2008 crisis"
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
    "conciseAnswer": "• They profit from the spread and from inventory management (holding securities temporarily)\n• Market makers also hedge their positions to reduce directional risk"
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
    "conciseAnswer": "• They introduce minimum capital requirements, leverage ratios, and liquidity standards (LCR, NSFR)"
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
    "conciseAnswer": "• Credit analysis evaluates a borrower's ability to repay debt\n• Analysts review historical and projected financial statements, debt structure, and collateral\n• Understanding credit ratings (investment grade vs\n• speculative) and basic covenant terms is also valuable"
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
    "conciseAnswer": "• Commodities are split into hard (energy, metals) and soft (agricultural, livestock)\n• Trading occurs via futures contracts on exchanges (e.g., CME, ICE)"
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
    "conciseAnswer": "• Treasury also ensures compliance with debt covenants and maintains relationships with banks\n• Knowledge of basic instruments (e.g., forward contracts, commercial paper) is a plus."
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
    "conciseAnswer": "• For entry‑level interviews, candidates should note that many investors blend both styles"
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
    "conciseAnswer": "• Hedging involves taking offsetting positions"
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
    "conciseAnswer": "• Financial benchmarking of companies within the sector helps identify outliers\n• Important metrics vary by sector—e.g., same‑store sales for retail, loan loss provisions for banks"
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
    "conciseAnswer": "• Products are tailored to mid‑sized and large corporations\n• Relationship managers coordinate offerings to meet client needs\n• Common mistakes include listing retail products, or not mentioning the cross‑sell strategy."
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
    "conciseAnswer": "• Drawdown shows the largest peak‑to‑trough decline, important for understanding downside risk\n• Tracking error indicates how closely the portfolio follows its benchmark"
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
    "conciseAnswer": "• The FRM (Financial Risk Manager) focuses on risk management (banking, hedge funds, regulatory)\n• The CPA (Certified Public Accountant) is accounting‑focused (audit, tax, corporate finance)\n• Each requires passing rigorous exams and work experience\n• For entry‑level candidates, pursuing these signals commitment and builds knowledge"
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
    "conciseAnswer": "• Close with a call to action (request for interview)\n• For entry‑level candidates, enthusiasm and attention to detail matter\n• Avoid generic templates; personalize each letter"
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
    "conciseAnswer": ""
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
    "conciseAnswer": "• Research market rates for the role/location using Glassdoor, industry surveys, and alumni\n• Consider the total package (base, bonus, benefits, perks)\n• Express enthusiasm for the role before negotiating\n• Frame requests based on value and market data, not personal need"
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
    "conciseAnswer": "• Offer value where possible (e.g., sharing an interesting article)\n• Build relationships over time, not just when you need a job\n• For entry‑level, focus on learning rather than asking for a referral immediately"
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
    "conciseAnswer": "• They then conduct deep dive into the company's business model, competitive position, and financials\n• Building a detailed forecast model leads to a valuation using multiples, DCF, or other methods\n• Finally, they produce a research report with a buy/hold/sell recommendation and target price"
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
    "conciseAnswer": "• Poor management can lead to cash shortages even if the business is profitable on paper\n• Key metrics include the current ratio and quick ratio."
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
    "conciseAnswer": "• Liquidity varies greatly by issuer and maturity\n• Trading desks often act as principals (hold inventory) rather than pure agents"
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
    "conciseAnswer": "• An LC ensures the seller gets paid upon presenting compliant shipping documents\n• Bank guarantees provide assurance of performance or payment\n• Supply chain finance allows suppliers to receive early payment at a discount"
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
    "conciseAnswer": "• It balances the interests of shareholders, management, and other stakeholders\n• For investors, strong governance reduces agency costs and the risk of fraud or mismanagement"
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
    "conciseAnswer": "• Options have asymmetric payoff; futures have symmetric"
  }
];

if (typeof window !== 'undefined') {
  window.questionBank = questionBank;
}