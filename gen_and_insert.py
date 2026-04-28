#!/usr/bin/env python3
"""Generate and append 20 hard technical questions to questions.js"""

import json
import re

QUESTIONS_FILE = "/Users/yangjiarong/.openclaw/workspace/finterview-prototype/questions.js"

questions = []

def q(id_, role, title, question, expected_structure, scoring_keywords, answer_text, stars=5):
    """Build a question dict with proper nesting."""
    return {
        "id": id_,
        "role": role,
        "category": "technical",
        "difficulty": "hard",
        "title": title,
        "question": question,
        "expectedStructure": expected_structure,
        "scoringKeywords": scoring_keywords,
        "answers": {
            "concise": {
                "answer": answer_text,
                "format": "concise",
                "source": "generated"
            }
        },
        "stars": stars,
        "entryLevel": False
    }

# ===== QUANT (5 hard) =====

questions.append(q(3000, "quant",
    "Variance Gamma Process Calibration",
    "You are calibrating a Variance Gamma process to 3-month S&P 500 options. Describe how you would estimate the three VG parameters (sigma, nu, theta) from market data, and explain how the VG model captures skewness and kurtosis compared to the Black-Scholes model.",
    ["VG process definition", "Characteristic function", "Calibration methodology", "Skewness via theta", "Kurtosis via nu", "Comparison to BS"],
    {"variance gamma": 15, "characteristic function": 10, "calibration": 15, "theta skewness": 15, "nu kurtosis": 20, "Levy process": 10, "FFT pricing": 15},
    "\u2022 Variance Gamma is a pure-jump Levy process X(t;s,nu,theta) = theta*G(t;nu) + sigma*W(G(t;nu)) where G(t;nu) ~ Gamma(t/nu, nu) - subordinated Brownian motion with gamma-distributed time change\n\u2022 Parameters: theta controls skewness (theta<0 = negative skew consistent with equity index options), nu controls kurtosis (nu>0 adds excess kurtosis beyond Gaussian), sigma controls overall volatility\n\u2022 Calibration: minimize RMSE between model and market implied vols. Use FFT to price European options via the characteristic function phi_VG(u) = exp(-t/nu * log(1 - i*u*theta*nu + 0.5*sigma^2*nu*u^2))\n\u2022 The VG model generates a volatility smile without stochastic volatility - nu=0.1-0.3 on SPX captures the kurtosis of log returns (~4-6 vs 3 in BS)\n\u2022 Practical: calibrate on liquid ATM/OTM puts, fix nu=0.2 as reasonable starting point, then fit theta and sigma to minimize pricing error across 10-30 delta puts"
))

questions.append(q(3001, "quant",
    "CDS Basis Trade P&L Attribution",
    "An investment-grade CDS index trades at 65bp while the underlying bond index yield spread is 92bp over swaps. Decompose the CDS-bond basis into its components and quantify how each contributes to the basis, assuming a 5-year maturity, recovery rate of 40%, and swap rate of 4.2%.",
    ["Basis definition", "Funding cost component", "Cheapest-to-deliver option", "Counterparty risk", "Liquidity premium"],
    {"CDS-bond basis": 20, "funding cost": 15, "cheapest-to-deliver": 15, "counterparty risk": 15, "liquidity premium": 15, "recovery rate": 10, "LGD": 10},
    "\u2022 CDS-bond basis = Bond spread (92bp) - CDS premium (65bp) = 27bp positive. Theoretical basis should be zero in a frictionless market but real frictions create this wedge\n\u2022 Funding cost: if repo rate > swap rate, the cash bond requires funding; at a repo rate of 4.8% vs swap at 4.2%, funding cost adds 0.6% x duration ~ 5bp negative carry on the bond leg\n\u2022 Cheapest-to-deliver (CTD) option: the protection buyer can deliver any of typically 3-5 bonds; the CTD option inflates CDS premium by roughly 5-10bp for IG names\n\u2022 Counterparty risk: CDS subject to jump-to-default risk if the counterparty fails; post-crisis clearing reduces this but CSA thresholds add 1-3bp\n\u2022 Liquidity and financing: bond liquidity premium ~5-10bp, plus the cash bond earns repo specialness of ~3bp if on special; net, liquidity accounts for 8-13bp of the basis"
))

questions.append(q(3002, "quant",
    "Heston Model Delta and Gamma Calculation",
    "Explain how you would compute delta and gamma for a European option under the Heston stochastic volatility model. Describe the numerical methods involved and how these Greeks differ from Black-Scholes, particularly for short-dated OTM options.",
    ["Heston SDEs", "Characteristic function", "Delta via Fourier inversion", "Gamma via Fourier inversion", "Comparison to BS"],
    {"Heston SDEs": 15, "characteristic function": 15, "delta Fourier": 20, "gamma Fourier": 20, "vol of vol": 15, "correlation rho": 15},
    "\u2022 Heston model: dS/S = mu*dt + sqrt(v)*dW1, dv = kappa*(theta - v)*dt + sigma*sqrt(v)*dW2, with E[dW1 dW2] = rho*dt\n\u2022 Delta = dV/dS: use the Carr-Madan or Lewis Fourier transform approach. Price V(S0,v0) = S0*P1 - K*exp(-rT)*P2 where P1,P2 are risk-neutral probabilities computed via inverse Fourier of the characteristic function phi(u) = exp(C(T,u) + D(T,u)*v0 + i*u*ln(S0))\n\u2022 Delta = P1 (the first risk-neutral probability) plus sensitivity through phi: dP1/dS0 involves derivative of the CF wrt S0 which is just i*u*P1\n\u2022 Gamma = d2V/dS2: differentiate delta numerically (finite difference) or analytically via the Fourier integrand with factor (i*u)*(i*u-1)/S02; analytical gamma is more stable\n\u2022 Key difference: short-dated deep OTM puts have BS delta ~0.05 but Heston delta can be 0.07-0.09 due to negative rho and vol-of-vol contribution"
))

questions.append(q(3003, "quant",
    "XVA with Wrong-Way Risk",
    "You are pricing a 5-year interest rate swap with a counterparty whose credit quality is correlated with interest rates. Derive the CVA and DVA formulas incorporating wrong-way risk, and explain how you would model the dependency between counterparty default probability and the swap's mark-to-market.",
    ["CVA formula", "DVA formula", "Wrong-way risk definition", "Copula modeling", "Stochastic hazard rate"],
    {"CVA": 15, "DVA": 15, "wrong-way risk": 20, "Gaussian copula": 15, "stochastic hazard rate": 15, "EEPE": 10, "Monte Carlo": 10},
    "\u2022 CVA = (1-R) * integral_0^T E[Q(tau>t) * DF(t) * EPE(t)] dt where EPE(t) = E[max(NPV(t), 0)], R = recovery rate (typically 40% for senior unsecured)\n\u2022 DVA = (1-R') * integral_0^T E[Q'(tau'>t) * DF(t) * ENE(t)] dt where ENE(t) = E[max(-NPV(t), 0)]\n\u2022 Wrong-way risk: when counterparty credit deteriorates as the swap becomes in-the-money. For a fixed-rate payer receiving floating: if rates fall, the swap NPV rises AND the counterparty's credit quality may worsen due to rate-sensitive balance sheet\n\u2022 Model approaches: (1) stochastic hazard rate h(t) = h0*exp(beta*r(t)) where beta captures sensitivity, calibrated to CDS-bond basis during stress (beta ~ 2-4 for banks); (2) Gaussian copula with correlation rho between default intensity and the swap's underlying rates - rho=0.3-0.5 represents material WWR\n\u2022 Implementation: Monte Carlo with 100,000 paths, joint simulation of rates (Hull-White) and hazard rates (CIR with correlated increments); wrong-way risk can increase CVA by 30-60% vs independence assumption"
))

questions.append(q(3004, "quant",
    "Mortgage Prepayment OAS Decomposition",
    "A current-coupon 30-year fixed-rate mortgage pool is priced at 102.5 with a WAC of 5.5%. If the current 10-year Treasury is 4.2%, decompose the OAS into its prepayment risk, extension risk, and optionality components using a single-factor short-rate model.",
    ["OAS definition", "Prepayment model", "Interest rate modeling", "Decomposition methodology", "S-Curve analysis"],
    {"OAS": 15, "prepayment risk": 15, "extension risk": 15, "S-curve": 15, "Hull-White": 15, "CPR": 10, "WAL": 15},
    "\u2022 OAS = 128bp (102.5 price vs Treasury curve at 4.2% implies yield of 5.48%, minus option cost). Z-spread = 138bp, OAS = 128bp means option cost = 10bp\n\u2022 Prepayment: at 5.5% WAC vs 4.2% current coupon, no refi incentive. Base CPR = 6% PSA with seasoning ramp; housing turnover adds 2% CPR; burnout reduces by factor exp(-cumulative prepay/0.3) ~ 0.92\n\u2022 Hull-White dr = (theta(t)-a*r)dt+sigma*dW, a=0.05, sigma=0.012 calibrated to swaption vol. Simulate 1,000 rate paths over 360 months\n\u2022 Decomposition: (1) pure rate risk = Z-spread minus Treasury = 138bp; (2) prepayment option cost = 10bp; (3) extension risk when rates rise 200bp: WAL extends from 6.2yr to 11.4yr adding 15bp; (4) negative convexity = 5bp when rates fall\n\u2022 Net: Prepayment risk = 10bp, extension risk = 15bp, negative convexity = 5bp, residual OAS = 128bp reflects credit and liquidity risk premium"
))

# ===== IB (3 hard) =====

questions.append(q(3005, "ib",
    "Accretion Dilution with Earnout Structure",
    "Company A (EPS $4.50, P/E 18x) acquires Company B (EPS $2.80, P/E 22x) in an all-stock deal with an additional earnout of $150M payable in cash if B achieves $50M EBITDA in year 3. Assume A has 100M shares, B has 30M shares, and the deal closes at a 15% premium to B's current price of $61.60. Calculate the pro-forma EPS for year 1 including the earnout probability-weighted impact at 60% likelihood.",
    ["Exchange ratio calculation", "Pro-forma shares outstanding", "Combined earnings", "PV of earnout impact", "Dilution check"],
    {"exchange ratio": 15, "pro-forma EPS": 20, "earnout PV": 20, "probability weighting": 15, "dilution": 15, "synergies": 15},
    "\u2022 B's offer price = $61.60 x 1.15 = $70.84. Exchange ratio = $70.84 / (A's share price = $4.50x18 = $81.00) = 0.8746 shares of A per B share\n\u2022 New shares issued = 30M x 0.8746 = 26.24M. Total shares = 100M + 26.24M = 126.24M\n\u2022 Combined net income: A's NI = $4.50 x 100M = $450M. B's NI = $2.80 x 30M = $84M. Combined = $534M. Pro-forma EPS = $534M/126.24M = $4.23 vs A's standalone $4.50 - deal is 6.0% dilutive in year 1\n\u2022 Earnout NPV: $150M x 60% probability = $90M PV discounted at A's WACC of 9% for 3yr = $69.5M. This is a contingent consideration liability per ASC 805; accretion amortization of ~$23.2M/year non-cash charge reduces combined NI to $510.8M\n\u2022 Adjusted EPS = $510.8M/126.24M = $4.05 (10% dilution). Breakeven: need ~$120M pre-tax synergies (~8% of combined cost base) for EPS neutrality"
))

questions.append(q(3006, "ib",
    "LBO Model with PIK Toggle Notes",
    "Build an LBO of a $2B EBITDA company purchased at 11x EBITDA with 55% total leverage. The debt package includes a $600M PIK toggle note at 12% with a 7% cash pay / 5% PIK toggle and 6.5x Senior Secured Notes at SOFR+350bp. Model the impact if the sponsor chooses 100% PIK for the first 3 years and calculate MOIC assuming exit at 10x EBITDA in year 5 with EBITDA growth of 3% CAGR.",
    ["Capital structure build", "PIK interest mechanics", "Cash flow waterfall", "Exit calculation", "MOIC decomposition"],
    {"leverage 11x": 10, "PIK toggle": 20, "debt repayment": 15, "exit EBITDA": 15, "MOIC": 20, "sponsor equity": 10, "cash interest": 10},
    "\u2022 Purchase price = $2B x 11x = $22B. Sponsor equity = 45% x $22B = $9.9B. Total debt = 55% x $22B = $12.1B\n\u2022 Debt: Senior Secured = $9B (SOFR 5%+3.5%=8.5%), Senior Notes = $2.5B (9.5%), PIK toggle = $600M\n\u2022 PIK: Year 1: $600M x 5% = $30M added to principal -> $630M. Cash interest = $600M x 7% = $42M. Year 2: $630M x 5% = $31.5M -> $661.5M. Year 3: $661.5M x 5% = $33.1M -> $694.6M\n\u2022 Total interest Y1 = $9Bx8.5% + $2.5Bx9.5% + $42M = $1,044.5M. EBITDA Y1 = $2,060M (3% CAGR). FCF after capex/taxes = $649.1M - fully directed to Senior Secured repayment\n\u2022 Exit Y5: EBITDA = $2B x (1.03^5) = $2,318.5M. EV = $2,318.5M x 10x = $23,185M. Net debt = $12.1B - $3.8B FCF + $94.6M PIK = $8.36B. Exit equity = $14.825B. MOIC = $14.825B/$9.9B = 1.50x (8.2% EMIRR). At 9x exit, MOIC drops to 1.12x"
))

questions.append(q(3007, "ib",
    "Cross-Border M&A Structuring with Tax Inversions",
    "A US pharmaceutical company trading at 14x P/E acquires a UK target with a 5% effective tax rate via a UK-incorporated inversion structure. The US buyer's current tax rate is 21%. Model the EPS accretion assuming $500M combined pre-tax earnings (60% US, 40% UK), and quantify the value of the tax shield from the inversion including GILTI and BEAT implications.",
    ["Inversion mechanics", "Pro-forma tax rate", "EPS calculation", "GILTI impact", "BEAT implications"],
    {"tax inversion": 15, "effective tax rate": 15, "GILTI": 20, "BEAT": 15, "EPS accretion": 20, "FTC": 15},
    "\u2022 Pre-inversion: Combined pre-tax $500M. US portion $300M at 21% = $63M. UK portion $200M at 5% = $10M. Total tax = $73M. Effective rate = 14.6%\n\u2022 Post-inversion: UK parent owns US OpCo. US pays tax-deductible royalty to UK, reducing US taxable income to $200M. US tax = $200M x 21% = $42M. UK tax on $100M royalty at 5% = $5M + $200M UK op income at 5% = $10M. Total tax = $57M, effective rate = 11.4% - savings of $16M\n\u2022 GILTI: tested income $200M less 10% x QBAI $100M = $190M inclusion. US tax at 21% x 80% deduction = 10.5% effective. FTC at 80% x 5% = 4%, net GILTI = 6.5% x $190M = $12.35M\n\u2022 BEAT: 10% on base erosion payments exceeding 3% of deductions. $100M royalty at 25% of $400M deductions triggers BEAT, adding ~$7M\n\u2022 Net: Total tax = $57M + $12.35M + $7M = $76.35M, effective rate = 15.3%. On 50M shares, EPS = ($500M-$76.35M)/50M = $8.47 vs combined standalone $8.54 - $0.07 dilution, needs further optimization"
))

# ===== AM (3 hard) =====

questions.append(q(3008, "am",
    "Smart Beta Factor Timing with Macro Regimes",
    "You manage a multi-factor smart beta portfolio allocating across Value (4.5% div yield, P/B 0.8), Momentum (6-month return 15%), Quality (ROE 18%), and Low Vol (beta 0.65) factors. Current macro conditions show GDP growth at 2.8% (above trend), inflation at 3.9% (sticky), and VIX at 15. Using a regime-switching framework, determine the optimal factor allocation and justify your weights.",
    ["Macro regime identification", "Factor cyclicality analysis", "Regime probability estimation", "Weight optimization", "Rebalancing frequency"],
    {"regime-switching": 15, "factor cyclicality": 20, "Value pro-cyclical": 15, "Momentum persistence": 15, "Low Vol defensive": 15, "Quality stability": 10, "turnover cost": 10},
    "\u2022 Current signals: GDP 2.8% above 2% trend (expansion), inflation 3.9% above 3% target (mid-cycle), VIX 15 (risk-on). Regime probability: Expansion 65%, Slowdown 20%, Recession 10%, Recovery 5% using Markov switching on GDP surprise and CPI momentum\n\u2022 Factor performance by regime: Value +4.2% annually in GDP>2.5%, Momentum +6.8% in mid-cycle, Quality Sharpe 0.4-0.6 across regimes, Low Vol -1.8% relative in risk-on\n\u2022 Allocation: Value 30% (rising rates favor pricing power), Quality 25% (sticky inflation protects margins), Momentum 20% (slowdown hedge, monitor crowding at 12% AUM share vs 8% avg), Low Vol 15% (reduced due to VIX 15), Cash 10% (macro uncertainty)\n\u2022 Risk budgeting: target TE 2.5% vs cap-weighted. Marginal risk contribution: Value 32%, Quality 22%, Momentum 28%, Low Vol 18% after correlation scaling (corr(Value,Momentum)=-0.12)\n\u2022 Rebalancing: monthly, 20% corridor bands, ~40% annual factor portfolio turnover, 25bp implementation shortfall per rebalance"
))

questions.append(q(3009, "am",
    "Convertible Arbitrage Delta Hedging P&L",
    "A $100M convertible bond with a 3.5% coupon, 5-year maturity, conversion price of $45, and current stock price of $38 has an implied volatility of 38% vs stock realized vol of 28%. Calculate the expected monthly P&L from a delta-hedged convertible arbitrage position, including the gamma and vega carry. Current risk-free rate is 4.5% and credit spread is 200bp.",
    ["Bond valuation split", "Delta and gamma calculation", "Theta decay", "Gamma scalping P&L", "Vega carry P&L"],
    {"conversion premium": 15, "delta": 15, "gamma scalping": 20, "volatility carry": 20, "theta": 15, "credit spread": 15},
    "\u2022 Straight bond value = 3.5/(1.065)^1 + ... + 103.5/(1.065)^5 = $87.50 (yield = 6.5%). Option value = $12.50 per $100 par. Conversion value = $38/45 x 100 = $84.44. Bond trades at 18.4% conversion premium\n\u2022 BS delta: d1 = (ln(38/45)+(0.045-0.035+0.5x0.382)x5)/(0.38xsqrt5) = 0.47, delta = N(0.47) = 0.68. Gamma = N'(d1)/(SxsigmaxsqrtT) = 0.0111\n\u2022 Hedge: short 680 shares per bond at $38 = $25,840. Net cash outflow $74,160 at 4.5% = $278/month interest cost\n\u2022 Gamma scalping: monthly P&L = 0.5 x gamma x S2 x (daily ret2 - IV2/day) x 252 = -$125/bond. Vega carry: implied 38% vs realized 28% at vega 30.42 adds -$0.25\n\u2022 Theta + coupon: $291.67 coupon + $180 theta - $125 gamma - $278 financing = $68.67/bond/month. On 1,000 bonds = $68,670/month = 8.2% annualized. Risk: credit spread widening 100bp wipes ~5 months P&L"
))

questions.append(q(3010, "am",
    "Pension Liability-Driven Investing with LDI",
    "A $5B corporate pension fund is 82% funded with a duration gap of 6.5 years (liability duration 14.2 years, asset duration 7.7 years). Design an LDI strategy using Treasury strips, interest rate swaps, and corporate bonds. Quantify the hedge required in DV01 terms, and model the impact of a parallel 50bp yield curve shift on funding status.",
    ["Liability duration analysis", "DV01 gap calculation", "Hedge instrument selection", "Implementation cost", "Funding ratio sensitivity"],
    {"liability duration": 15, "DV01": 20, "LDI hedge": 20, "swap overlay": 15, "funding ratio": 15, "leverage ratio": 15},
    "\u2022 Liabilities = $5B/0.82 = $6.1B PV. Effective duration gap = 14.2 - (5.0/6.1 x 7.7) = 14.2 - 6.3 = 7.9 years (82% funding creates leverage effect)\n\u2022 DV01 gap: liability = $6.1B x 14.2 x 0.0001 = $8.66M/bp. Asset = $5B x 7.7 x 0.0001 = $3.85M/bp. Shortfall = $4.81M/bp - 1bp rate drop improves funding by $4.81M\n\u2022 30yr Treasury strips: DV01/$100M = $100M x 30 x 0.0001 = $300K. Need $4.81M/$300K = $1.6B notional. Alternatively receive-fixed 30yr swaps: DV01 ~$22K per $100M notional, need ~$21.9B gross notional\n\u2022 Practical: shift $2B from equity to long-corporates (duration 12yr, DV01 = $2.4M/bp). Gap reduces to $2.41M. Cover with 30yr receive-fixed swaps: $2.41M/($30K per $100M) = ~$8B notional\n\u2022 50bp down: liability +$433M, asset+swap = $5B+$312.5M = $5.3125B. Funding ratio = $5.3125/$6.533 = 81.3% - slight worsening from convexity mismatch. Target hedge ratio 85-95%, residual gap left for spread pickup"
))

# ===== MARKETS (3 hard) =====

questions.append(q(3011, "markets",
    "FX Carry Trade with Skew Risk Adjustment",
    "You are running a long USDZAR / short CHFJPY carry trade. USDZAR overnight swap is 7.8% (long USD), CHFJPY is -2.3% (short CHF, long JPY). Current 3-month 25-delta risk reversals: USDZAR RR = -1.8 (puts expensive), CHFJPY RR = -0.5 (puts cheap). Calculate the volatility-adjusted carry and determine whether the trade still has positive expected return after hedging tail risk with 5% cost out-of-money puts.",
    ["Carry calculation", "Risk reversal interpretation", "Volatility-adjusted carry", "Tail hedge cost", "Expected return assessment"],
    {"FX carry": 15, "risk reversal": 20, "vol-adjusted carry": 20, "tail hedge": 15, "Vanna-Volga": 15, "expected return": 15},
    "\u2022 Gross carry: long USDZAR net carry = ZAR 7.8% - USD 5% = 2.8%. Short CHFJPY: pay CHF 1.6% + receive JPY 0.5% = -1.1%. Combined 50/50 = 0.85% annualized\n\u2022 Risk reversals: USDZAR RR = -1.8 vol (ZAR puts expensive). Cost of negative skew = 1.8% vol / 4 quarters = 0.45% per 3 months. CHFJPY RR = -0.5 (neutral)\n\u2022 Vol-adjusted carry = 0.85% - 0.45% = 0.40% annualized. On $100M notional, expected profit = $100K over 3 months\n\u2022 Tail hedge: 5% OTM USD put / ZAR call. ATM vol 18%, 5%-OTM vol ~18.9%. BS premium = 0.316% of notional = $316K. Net = $100K - $316K = -$216K\n\u2022 Conclusion: trade has negative expected return after tail hedging. A cheaper 10% OTM put (0.12% = $120K) still nets -$20K. Only viable if RR compresses or carry increases; otherwise avoid"
))

questions.append(q(3012, "markets",
    "Treasury Basis Trade with Futures Delivery Option",
    "The 10-year Treasury note futures (TY contract) cheapest-to-deliver is the 4.0% 15-May-2035 note, currently trading at 98-12 with an OTR yield of 4.35%. The futures contract is priced at 112-08 with a conversion factor of 0.9254. Calculate the gross basis, net basis, and value of the delivery option. Assume repo rate is 4.75% and next delivery date is in 45 days.",
    ["Gross basis calculation", "Carry calculation", "Net basis derivation", "Delivery option pricing", "CTD switching risk"],
    {"gross basis": 20, "net basis": 20, "delivery option": 20, "conversion factor": 15, "CTD": 15, "implied repo rate": 10},
    "\u2022 Bond = 98 + 12/32 = 98.375. Futures = 112 + 8/32 = 112.25. CF = 0.9254. Gross basis = 98.375 - (112.25x0.9254) = 98.375 - 103.88 = -5.505 (cash bond cheap vs futures)\n\u2022 Full price = 98.375 + 0.50 accrued = 98.875. Financing at 4.75% for 45d = 98.875 x 4.75% x 45/360 = 0.587. Net carry = 0 - 0.587 = -0.587\n\u2022 Net basis = -5.505 - (-0.587) = -4.918. Negative implies arbitrage: buy cash bond at 98.375, sell futures at 103.88, finance at 4.75%, profit = $49,180 per $1M\n\u2022 Delivery option: if yields rise 50bp, higher-coupon bond becomes CTD. Quality option using Black model, T=45/365, worth 30-45bp per $100 notional = $300-450 per $1M\n\u2022 Implied repo rate = (98.375-103.88)/98.375 x 360/45 - 1 = -44.8%. Net basis adjusted for delivery option = -4.6 points; still arbitrageable assuming perfect CTD delivery"
))

questions.append(q(3013, "markets",
    "Commodity Calendar Spread with Storage Cost",
    "WTI crude oil front-month (Jun) is $78.50/bbl and the Dec contract is $74.20/bbl. Current storage cost is $0.45/bbl/month, tanker rates are $0.15/bbl/month, and the financing rate is 5.2%. Is there a contango arbitrage opportunity? Calculate the breakeven storage period and the maximum allowable storage cost for a profitable calendar spread.",
    ["Calendar spread definition", "Full carry calculation", "Convenience yield estimation", "Breakeven analysis", "Operational constraints"],
    {"contango": 15, "full carry": 20, "storage cost": 20, "convenience yield": 15, "breakeven": 15, "inventory levels": 15},
    "\u2022 Dec $74.20 < Jun $78.50, market is backwardated by $4.30. Full carry Jun->Dec (6 months): storage 6x$0.45=$2.70, tanker 6x$0.15=$0.90, financing $78.50x5.2%x0.5=$2.04, total = $5.64\n\u2022 Since backwardation $4.30 < full carry $5.64, no profitable storage arbitrage exists. The spread is insufficient to compensate for carrying costs\n\u2022 Breakeven storage cost: solve 6S + $0.90 + $2.04 = $4.30 -> 6S = $1.36 -> S = $0.227/bbl/month. Actual $0.45 > $0.227, makes storage unprofitable\n\u2022 Convenience yield = full carry - spread = $5.64 - $4.30 = $1.34/bbl, indicating physical scarcity justifies keeping inventory\n\u2022 Trade: no contango arbitrage; sell spot, buy deferred only if you hold physical inventory and want to monetize backwardation (avoid $5.64 carry cost, earn $4.30 spread = -$1.34 loss). Not profitable"
))

# ===== RISK (3 hard) =====

questions.append(q(3014, "risk",
    "FRTB-SA Sensitivities-Based Delta Risk Charge",
    "A trading desk holds a portfolio consisting of a EUR-denominated 10-year government bond (CS01 85K), a 3x5 EUR swaption (vega 12K), and a credit index CDS (CS01 45K, JDCR 20K). Calculate the FRTB-SA sensitivities-based delta charge for GIRR (general interest rate risk) and CS (credit spread). EUR curve has 26 tenor buckets. Apply the correlation parameters from the FRTB framework.",
    ["FRTB-SA framework overview", "Sensitivities aggregation by bucket", "Correlation within bucket", "Cross-bucket aggregation", "Capital charge calculation"],
    {"FRTB-SA": 15, "delta sensitivity": 15, "risk weight": 15, "correlation rho": 20, "curvature charge": 15, "bucket aggregation": 20},
    "\u2022 FRTB-SA GIRR: EUR zone 2 (non-USD G10), RW = 1.7%. 10yr bond delta = CS01/T = 85K/0.0001 = 850M sensitivity. Capital = 850M x 0.017 = $14.45M within >5yr bucket\n\u2022 Swaption: vega is separate risk class. Swaption's delta sensitivity notional = 12K/0.002 = 6M, delta ~0.5, capital = 6M x 0.5 x 0.017 = 51K. Within-bucket K = sqrt(14.45M2 + (51K)2 + 2x1x14.45Mx51K) = $14.59M\n\u2022 CS charge: bond CS01 85K + CDS CS01 45K = 130K total for EUR sovereign bucket. RW = 1.5% (sovereign). K_CS = 130K/0.0001 x 1.5% = $19.5M. JDCR = 20K additional = $200K\n\u2022 Total SA delta charge = GIRR $14.59M + CS $19.5M + JDCR $0.2M = $34.29M. Vega charge on swaption: 1.7% x 12K = 20.4K (negligible)\n\u2022 FRTB-SA capital ~20-30% higher than IMM internal model for mixed desks; desk would need IMA approval to reduce capital from $34M to ~$25M"
))

questions.append(q(3015, "risk",
    "Liquidity-Adjusted VaR with AMA",
    "A portfolio has daily P&L with a mean of $0 and a 99% parametric VaR of $12.5M using a 1-day holding period. The portfolio holds 40% in large-cap equities (bid-ask spread 0.08%, volume 0.5% of ADV), 35% in HY bonds (spread 85bp, volume 0.8% of market cap), and 25% in EM sovereigns (spread 120bp, volume 0.3%). Apply the Asset Management Approach (AMA) to compute the 10-day 99% liquidity-adjusted VaR.",
    ["VaR scaling approach", "Liquidity adjustment factors", "Bid-ask spread cost", "Time to liquidate", "LVaR formula"],
    {"VaR scaling": 15, "LVaR": 20, "bid-ask spread": 20, "liquidation horizon": 20, "market impact": 15, "AMA decomposition": 10},
    "\u2022 10-day VaR naive scaling: $12.5M x sqrt(10) = $39.53M. AMA adjusts holding period per asset class for time-to-liquidate and spread costs\n\u2022 Equities (40%, $40M): sigma_day = $12.5M/(2.33x1) = 5.36M total, equity sigma = 5.36%. Time to liquidate = 2 days, adj holding = 6 days. LVaR = 2.33x0.0536xsqrt(6)x$40M + 0.5x0.08%x$40M = $12.24M + $0.016M = $12.26M\n\u2022 HY bonds (35%, $35M): spread 85bp. 7 days to liquidate, adj 21 days. Daily vol 0.4%. LVaR = 2.33x0.004xsqrt(21)x$35M + 0.5x0.85%x$35M = $1.49M + $0.149M = $1.64M\n\u2022 EM sovereigns (25%, $25M): spread 120bp. 8.3 days, adj 25 days. Daily vol 0.7%. LVaR = 2.33x0.007x5.0x$25M + 0.5x1.2%x$25M = $2.04M + $0.15M = $2.19M\n\u2022 Total LVaR = $12.26M + $1.64M + $2.19M = $16.09M vs naive $39.53M (59% reduction). Under stress, bid-ask spreads widen 3-5x requiring stress multipliers"
))

questions.append(q(3016, "risk",
    "Counterparty Credit Risk EPE with Netting",
    "A bank has two trades with the same counterparty: a 5-year USD interest rate swap (notional $200M, mark-to-market +$5M) and a 2-year EUR FX forward (notional equivalent $150M, MtM -$2M). With netting agreement in place, calculate the Expected Positive Exposure (EPE) and Potential Future Exposure (PFE) at 95% confidence under ISDA standard initial margin model (SIMM). Current USD discount curve is at 4.2%.",
    ["Netting agreement mechanics", "EPE calculation", "PFE calculation", "Netting factor", "SIMM margin"],
    {"EPE": 20, "PFE": 15, "netting agreement": 15, "netting factor": 15, "SIMM": 15, "Monte Carlo simulation": 10, "exposure profile": 10},
    "\u2022 Current exposure with netting: max($5M-$2M, 0) = $3M vs $5M without netting (40% netting benefit)\n\u2022 IRS exposure peaks Y3: $200M x 1.2% x sqrt(3) = $4.16M. FX forward peaks Y1: $150M x 8% x 1.0 = $12M. Combined with rho=-0.15: Y1 net = sqrt($3.6M2+$12M2+2x(-0.15)x$3.6Mx$12M) = $12M (low netting benefit due to low correlation)\n\u2022 Net EPE = avg over 0-5yr: ($3M/2 + $12M + $10.5M + $4.16M + $2.8M + $0/2)/5 = $5.69M\n\u2022 PFE 95% at Y1: $12M x exp(1.645x0.075 - 0.5x0.075squared) = $12M x 1.128 = $13.54M\n\u2022 SIMM: IRS $3.2M + FX $4.5M, netting factor psi=13% -> sqrt($10.24M+$20.25M+2x0.13x$3.2Mx$4.5M) = $5.85M. CVA capital = $5.69M x (1-40%) x 0.012 x 0.046 = $157K annual"
))

# ===== PE (3 hard) =====

questions.append(q(3017, "pe",
    "Club Deal Economics with Co-Investment Rights",
    "A $4B buyout of a logistics company is structured as a club deal: Lead sponsor puts in $200M (carry 25% on total fund), two co-sponsors each put in $150M (no carry, co-invest side-pockets with 2% management fee only). The GP commits $50M. Total equity is $1.8B with 55% leverage. Model the LP waterfall assuming 8% hurdle, 80/20 split with 200% catch-up, and exit at 3.5x MOIC in year 4. Show the GP vs LP split.",
    ["Club structure overview", "Waterfall mechanics", "Hurdle calculation", "Catch-up computation", "GP/LP attribution"],
    {"club deal": 10, "waterfall": 20, "hurdle rate": 15, "catch-up": 20, "carried interest": 20, "co-investment": 15},
    "\u2022 Capital: Lead $200M + CoS1 $150M + CoS2 $150M + GP $50M + LP $1.25B = $1.8B equity. Debt $2.2B (55%). Exit at $14B EV -> $11.8B equity -> 6.56x gross. Co-sponsors get 6.56x (no carry, 2% mgmt fee only)\n\u2022 Lead fund capital = $1.25B LP + $0.2B Lead = $1.45B. Allocation: 80.6% of $11.8B = $9.5B. Return = 6.55x\n\u2022 Hurdle: 8% x 4yr compounded = 36.05%. Required return = $1.45B x 1.3605 = $1.972B. Step 1: return capital $1.45B. Step 2: pref return = $523M\n\u2022 Catch-up: GP gets 100% until 20% of profits. Total carry = 20% x ($9.5B - $1.45B - $523M) = 20% x $7.53B = $1.506B to GP\n\u2022 LP gets $9.5B - $1.506B = $8.0B (MOIC 6.15x). GP fund MOIC = $1.5B/$0.2B = 7.5x. Co-sponsors: $983M each (6.56x). Total dist: $8.0B+$1.5B+$1.967B+$328M = $11.8B"
))

questions.append(q(3018, "pe",
    "Minority Growth Equity Staging with Milestones",
    "A PE firm invests $250M for 30% of a fintech company at a $700M post-money valuation, structured in three tranches: $100M upfront, $75M at revenue milestone of $200M ARR, $75M at positive EBITDA milestone. First tranche carries a 2x participating preference. Model the outcomes at exit (3x pre-money, $3B exit valuation) if milestones are met at 70% probability each, and calculate the expected MOIC.",
    ["Tranche structure", "Preference mechanics", "Milestone probability tree", "Exit scenario analysis", "Expected MOIC calculation"],
    {"participating preference": 20, "tranche staging": 15, "milestone probability": 15, "exit waterfall": 20, "MOIC": 15, "anti-dilution": 15},
    "\u2022 Initial: $250M for 30% at $700M post. First tranche $100M/14.3% with 2x participating preference: greater of 2x=$200M or pro-rata + participate in remaining\n\u2022 Scenario 1 (49% prob): all milestones met, $250M for 30%. Exit $3B. Pref = $200M + 30%x$2.8B = $1.04B vs plain 30%x$3B=$900M. Choose pref -> MOIC = $1.04B/$250M = 4.16x\n\u2022 Scenario 2 (21%): 2 tranches, $175M for 22.6%. Pref = $200M + 22.6%x$2.8B = $833M vs plain $678M -> MOIC = 4.76x\n\u2022 Scenario 3 (30%): 1st tranche only, $100M for 14.3%. Pref = $200M + 14.3%x$2.8B = $600M vs plain $429M -> MOIC = 6.0x\n\u2022 Expected MOIC = (0.49x4.16 + 0.21x4.76 + 0.30x6.0) = 4.84x. Cash-weighted expected MOIC = $865M/$189.25M = 4.57x. Risk: at <$500M exit, preference consumes all proceeds, founders get zero"
))

questions.append(q(3019, "pe",
    "Dividend Recapitalization LBO Analysis",
    "A PE firm acquired a manufacturing company 2 years ago for $1.5B (5.5x EBITDA of $273M) with 60% leverage. Current EBITDA has grown at 8% CAGR and leverage has been repaid to 35%. The GP now executes a $350M dividend recap. Model the impact on equity value assuming exit multiples of 6.5x and 5.5x in year 5, and calculate the IRR improvement from the dividend recap.",
    ["Original LBO structure", "Current capitalization", "Dividend recap mechanics", "Exit scenario analysis", "IRR decomposition"],
    {"dividend recap": 20, "leverage": 15, "EBITDA growth": 15, "exit multiple": 20, "IRR improvement": 15, "deal IRR": 15},
    "\u2022 Original: $1.5B at 5.5x EBITDA. Debt $900M, equity $600M. After 2yr: EBITDA $318.5M (8% CAGR), debt repaid to $724M, equity = $1.346B\n\u2022 Dividend recap: add $350M debt. New debt $1.074B (51.9% leverage). Interest coverage = $318.5M/($1.074Bx8.5%) = 3.5x, comfortable above 2.0x\n\u2022 Exit Y5 (3yr post-recap): EBITDA $401M (3% CAGR). Scenario A (6.5x): EV $2.607B, debt $894M, equity $1.713B. Total return = $350M div + $1.713B = $2.063B. MOIC = 3.44x\n\u2022 IRR with recap: -$600M + $350M/(1+r)2 + $1,713M/(1+r)5 = 0 -> ~32%. Without recap: $2.063B at Y5, IRR = 28%. Improvement = 4pp\n\u2022 Scenario B (5.5x): EV $2.206B, equity $1.312B. Total $1.662B. MOIC 2.77x. IRR with recap ~23% vs 22.6% without. Same 4pp improvement. Dividend recap accelerates distributions and improves IRR without changing total MOIC"
))

# ===== Main script =====

def read_questions_file(path):
    with open(path, 'r') as f:
        return f.read()

def write_questions_file(path, content):
    with open(path, 'w') as f:
        f.write(content)

def validate_questions(questions):
    for q in questions:
        assert isinstance(q.get('id'), int), f"Q{q.get('id')}: id must be int"
        assert q.get('role') in ('quant', 'ib', 'am', 'markets', 'risk', 'pe'), f"Q{q['id']}: invalid role"
        assert q.get('category') == 'technical'
        assert q.get('difficulty') == 'hard'
        assert q.get('title')
        assert q.get('question')
        assert q.get('expectedStructure')
        assert q.get('scoringKeywords')
        assert 'answers' in q
        assert 'concise' in q['answers']
        assert 'answer' in q['answers']['concise']
        assert q['answers']['concise'].get('format') == 'concise'
        assert q['answers']['concise'].get('source') == 'generated'
        assert q.get('stars') in (4, 5)
        assert q.get('entryLevel') == False
        assert 'modelAnswer' not in q
        assert 'detailedAnalysis' not in q
        wc = len(q['answers']['concise']['answer'].split())
        print(f"  \u2713 ID={q['id']} ({q['role']}): {q['title']} - {wc} words")
    print(f"\nAll {len(questions)} validated \u2713")

def main():
    print("=" * 60)
    print("Generating 20 hard finance interview questions")
    print("=" * 60)
    
    print("\nValidating questions...")
    validate_questions(questions)
    
    print(f"\nReading {QUESTIONS_FILE}...")
    content = read_questions_file(QUESTIONS_FILE)
    
    # Build JS string for all 20 questions
    js_items = []
    for q in questions:
        js = json.dumps(q, indent=2)
        js_items.append(js)
    js_insert = ",\n".join(js_items)
    
    # Find the end of the array (closing ]);
    closing_pos = content.rfind("\n];\n\n// Export")
    
    if closing_pos == -1:
        print("ERROR: Could not find array closing marker")
        return
    
    before = content[:closing_pos].rstrip()
    after = content[closing_pos:]
    
    if before.endswith("}"):
        new_content = before + ",\n" + js_insert + "\n" + after
    else:
        new_content = before + "\n" + js_insert + "\n" + after
    
    write_questions_file(QUESTIONS_FILE, new_content)
    
    # Verify
    print("\nVerifying inserted questions...")
    new_content_verify = read_questions_file(QUESTIONS_FILE)
    verify_in_new = sum(1 for q in questions if f'"id": {q["id"]}' in new_content_verify)
    print(f"Questions found in file: {verify_in_new}/{len(questions)}")
    
    role_counts = {}
    for q in questions:
        role_counts[q['role']] = role_counts.get(q['role'], 0) + 1
    print(f"\nDistribution by role: {json.dumps(role_counts)}")
    print(f"\nDone! Successfully inserted {len(questions)} questions.")

if __name__ == "__main__":
    main()
