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
// finterview Question Bank - 完整简洁答案版本
// 包含所有79个题目的conciseAnswer字段
// 生成时间: 2026-03-11T03:53:57.270Z
// 算法: 混合算法 (标题+关键描述)

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
    "conciseAnswer": "• Financial motivations include using excess cash or cheap debt to create value\n• Understanding basic valuation metrics (acquisition multiples, premium paid) is also useful."
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
    "conciseAnswer": "• Research career paths and talk to professionals in those roles\n• Set short‑term goals (skills, certifications) and long‑term aspirations (role in 5‑10 years)\n• Seek roles that provide relevant experience and mentorship\n• Regularly reassess and adapt as the industry evolves"
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
    "conciseAnswer": "• Provision for loan losses is a major expense reflecting expected credit losses\n• The balance sheet is larger relative to equity due to leverage\n• Regulatory capital (Tier 1, Tier 2) is a key metric"
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
    "conciseAnswer": "• The FX market is the largest and most liquid financial market, operating 24 hours globally\n• It is primarily OTC, with major currency pairs (EUR/USD, USD/JPY) having tight spreads\n• Participants include central banks, corporations, investors, and speculators\n• Drivers include interest rate differentials, economic data, geopolitical events, and ca"
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
    "conciseAnswer": "• Use action verbs and numbers (e.g., \"built a DCF model that valued a $50M company\")\n• Tailor to the specific role (investment banking vs\n• Avoid typos, excessive length, or irrelevant details\n• For entry‑level, demonstrating passion for markets and technical readiness is key"
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
    "conciseAnswer": "• Build relationships with colleagues and mentors\n• Deliver high‑quality work, meet deadlines, and go beyond the assignment when appropriate\n• Demonstrate curiosity about the business and industry\n• Keep a record of accomplishments for your final review"
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
    "conciseAnswer": "• Key ratios include debt‑to‑EBITDA, interest coverage, and current ratio\n• Banks also consider collateral quality and secondary repayment sources"
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
    "conciseAnswer": "• NPV discounts future cash flows to today's value; a positive NPV indicates value creation"
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
    "conciseAnswer": "• Market microstructure studies the process and rules by which securities are traded\n• Different market models exist: auction (NYSE) vs"
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
    "conciseAnswer": "• The thesis should be specific, testable, and include a timeline for catalysts"
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
    "conciseAnswer": "• For equities, beta measures market risk; for bonds, credit ratings assess default probability\n• A good risk assessment quantifies what can be quantified and qualitatively describes the rest\n• Diversification mitigates unsystematic risk, but systematic risk remains"
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
    "conciseAnswer": "• Look for mentors within your firm (senior colleagues, managers) or through alumni networks\n• Be specific about what you hope to learn\n• Schedule periodic check‑ins, come prepared with questions, and show appreciation for their time\n• A good mentorship is reciprocal—offer to help with small tasks or share your fresh perspective"
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
    "conciseAnswer": "• A lower WACC means cheaper financing and higher project valuations\n• Key components are cost of debt (after tax) and cost of equity (often estimated via CAPM)\n• Mistakes include ignoring the tax shield on debt or using the wrong risk‑free rate in CAPM."
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
    "conciseAnswer": "• Advantages include speed, accuracy, reduced market impact, and ability to backtest strategies\n• Risks include technology failures and unexpected market behavior"
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
    "conciseAnswer": ""
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
    "conciseAnswer": ""
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
    "conciseAnswer": "• Participate in Q&A sessions and follow up with contacts afterward\n• Many conferences offer student discounts or volunteer opportunities\n• For entry‑level, attending even local CFA society events can build connections"
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
    "conciseAnswer": "• For entry‑level interviews, candidates should also mention the client base (retail/corporate vs\n• corporations/institutions) and risk profiles"
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
    "conciseAnswer": "• FP&A teams are responsible for budgeting, forecasting, performance reporting, and decision support\n• Tools commonly used are Excel, ERP systems, and BI platforms\n• Mistakes include focusing only on historical reporting without forward‑looking analysis."
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
    "conciseAnswer": "• bullet), maturity date, collateral, and covenants\n• Covenants are conditions the borrower must meet, such as maintaining certain financial ratios\n• Collateral secures the loan (real estate, inventory, receivables)\n• Pricing depends on credit risk, market conditions, and relationship"
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
    "conciseAnswer": "• Mature firms with steady cash flows often pay regular dividends to return value to shareholders\n• High‑growth companies typically retain earnings to fund expansion"
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
    "conciseAnswer": "• The model ensures the balance sheet balances via a \"plug\" (cash or revolver)\n• Common uses are valuation, budgeting, and scenario analysis"
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
    "conciseAnswer": "• The thesis should be a clear, one‑sentence argument for why the stock is mispriced\n• The business overview explains what the company does and its competitive advantages\n• Financial analysis highlights relevant trends and metrics\n• Valuation compares the current price to intrinsic value using multiples or DCF"
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
    "conciseAnswer": "• High liquidity means tight bid‑ask spreads, deep order books, and low transaction costs\n• Illiquid assets often require price concessions or longer time frames\n• For entry‑level interviews, candidates should mention metrics like volume, turnover, and spread"
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
    "conciseAnswer": "• Comparable analysis uses metrics like P/E, EV/EBITDA relative to peer group\n• Precedent transactions look at premiums paid in past M&A deals\n• DCF estimates intrinsic value by discounting future free cash flows\n• A good analyst uses multiple methods to triangulate a value range"
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
    "conciseAnswer": "• Traders can be market‑makers (provide liquidity) or proprietary traders (take positions)\n• Sales traders relay client orders and provide market color\n• Quants build pricing and risk models\n• For entry‑level interviews, candidates should understand the flow: client → sales → trader → market"
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
    "conciseAnswer": ""
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
    "conciseAnswer": "• Tactical allocation adjusts short‑term for market views\n• Diversification across uncorrelated assets reduces overall volatility"
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
    "conciseAnswer": "• Also, know your resume inside out and be ready to discuss any item\n• Dress professionally, arrive early (virtually or in person), and bring copies of your resume\n• For entry‑level, showing enthusiasm and curiosity is as important as technical accuracy"
  }
];

if (typeof window !== 'undefined') {
  window.questionBank = questionBank;
}