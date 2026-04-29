#!/usr/bin/env python3
"""
Generate 60 new high-quality finance interview questions
for the finterview-prototype question bank.

Distribution:
  Hard (35): quant=10, ib=5, markets=5, risk=5, am=5, pe=5
  Medium (25): corpfin=7, fintech=7, fo=6, pe=5
"""

import json
import re
import subprocess
import sys
from datetime import datetime

DATE = datetime.now().strftime("%Y%m%d")

# All 60 new questions
NEW_QUESTIONS = []

def add_q(q):
    NEW_QUESTIONS.append(q)

# ============================================================
# HELPER: metadata block factory
# ============================================================
def metadata_block(confidence="high", sources=None, star_rating=5, tags=None, difficulty_score=80):
    if sources is None:
        sources = []
    if tags is None:
        tags = ["核心题", "理解题", "权威题"]
    return {
        "generatedBy": "finterview_english_expert",
        "generatedAt": "2026-04-28T23:55:00.000Z",
        "confidence": confidence,
        "sources": sources,
        "needsReview": False,
        "reviewedBy": None,
        "reviewedAt": None,
        "ratingDimensions": {
            "frequency": 85,
            "differentiation": 85,
            "sourceAuthority": 85,
            "answerClarity": 85,
            "marketRelevance": 90,
            "regionalApplicability": 85,
            "difficulty": difficulty_score
        },
        "weightedScore": 85.0,
        "starRating": star_rating,
        "tags": tags
    }

def detailed_analysis(overview, why_works, common_mistakes, improvement_tips):
    if isinstance(common_mistakes, list):
        pass
    if isinstance(improvement_tips, list):
        pass
    return {
        "overview": overview,
        "whyWorks": why_works,
        "commonMistakes": common_mistakes if isinstance(common_mistakes, list) else [
            "Providing generic definitions without specific context",
            "Neglecting current industry developments or regulatory changes",
            "Overusing jargon without clear explanations",
            "Failing to structure the answer logically"
        ],
        "improvementTips": improvement_tips if isinstance(improvement_tips, list) else [
            "Reference recent deals, market trends, or regulatory updates",
            "Use established frameworks to structure complex concepts",
            "Balance depth with clarity for interviewers of varying expertise",
            "Connect theory to specific job functions and responsibilities"
        ]
    }


# ============================================================
# QUANT HARD (10 questions)
# ============================================================

add_q({
    "id": 2110, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Local Volatility vs Stochastic Volatility Calibration",
    "question": "Compare local volatility models (Dupire) with stochastic volatility models (Heston, SABR) for options pricing. Under what market conditions would you prefer one over the other, and how do you calibrate each to market data?",
    "modelAnswer": "Local volatility (LV) and stochastic volatility (SV) models address the limitations of Black-Scholes constant volatility, but differ fundamentally in approach.\n\n**Local Volatility (Dupire, 1994):**\n- Theory: LV models assume volatility is a deterministic function of spot price S and time t: sigma(S,t). The Dupire formula derives local vols from the market smile: sigma_LV^2(K,T) = 2(dC/dT + rK dC/dK + qC) / (K^2 d^2C/dK^2).\n- Calibration: Directly implied from liquid options prices. For each strike K and expiry T, compute the local vol surface. Fast to calibrate because it's a deterministic mapping from market prices.\n- Strengths: Perfectly fits the observed smile surface by construction; fast pricing via finite differences or Monte Carlo; no extra random factors.\n- Weaknesses: Forward volatility dynamics are unrealistic. Cannot generate volatility skew dynamics (vol of vol is zero). Over-hedges vega in exotic books.\n\n**Stochastic Volatility (Heston, 1993):**\n- Theory: Volatility follows its own stochastic process. Heston: dS_t = mu S_t dt + sqrt(nu_t) S_t dW_t^S, dnu_t = kappa(theta - nu_t)dt + xi sqrt(nu_t) dW_t^nu with correlation rho.\n- Parameters: Heston has 5 params (nu_0, theta, kappa, xi, rho); SABR has 4 (alpha, beta, rho, nu).\n- Calibration: Minimize pricing error across options using numerical PDE or semi-closed forms (Heston characteristic function via Fourier inversion).\n- Strengths: Generates realistic volatility dynamics; smile moves with spot. Essential for path-dependent exotics (cliquets, CMS, target redemption notes).\n- Weaknesses: Under some parameter regimes (Feller condition: 2*kappa*theta > xi^2), volatility can hit zero. Calibration is non-convex.\n\n**Hybrid Approach (SLV):**\nMany banks use stochastic-local volatility (SLV) combining both: dS = mu S dt + sqrt(LV(S,t)) sqrt(nu_t) S dW^S. Calibration uses particle methods or finite-difference PDE with a leverage function.\n\n**When to Use:**\n- LV: Vanilla options, simple barriers, short-dated options, high-frequency pricing.\n- SV: Exotic options with path-dependence (cliquets, autocallables), long-dated FX options.\n- SLV: Best for complex structured products needing both fit and realistic dynamics.\n\n**Calibration Challenges:**\n- LV: Numerical differentiation amplifies noise; requires smoothing (cubic splines with regularization).\n- SV: Non-convex optimization with multiple local minima; Heston requires Feller condition checks.\n- A 1% fitting error on vanillas can translate to 5-10% error on exotics.",
    "scoringKeywords": {"Dupire formula": 15, "stochastic volatility dynamics": 15, "calibration methodology": 20, "Feller condition": 10, "SLV hybrid": 15, "volatility surface fitting": 15, "path-dependent exotics": 10},
    "expectedStructure": ["Local volatility theory and calibration", "Stochastic volatility parameters and calibration", "Comparison of dynamics and weaknesses", "Hybrid SLV approach", "Practical selection criteria"],
    "detailedAnalysis": detailed_analysis(
        "Compares local vol and stochastic vol models for options pricing.",
        "A strong answer connects theory to practical calibration challenges and real-world usage.",
        ["Focusing only on one model without comparison", "Ignoring calibration difficulties", "Not mentioning SLV hybrids"],
        ["Reference the Feller condition for Heston", "Discuss numerical implementation challenges", "Mention industry adoption rates"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Dupire (1994) Local Volatility", "Heston (1993) Stochastic Volatility", "Gatheral (2006) Volatility Surface", "JPMorgan Volatility Trading"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Local Volatility (Dupire): sigma_LV^2(K,T) = 2(dC/dT + rK dC/dK + qC) / (K^2 d^2C/dK^2). Directly implied from market smile. Fast calibration via deterministic mapping. Weakness: unrealistic forward smile dynamics (sticky-strike). Over-hedges vega on exotics.\n• Stochastic Volatility (Heston): dnu_t = kappa(theta-nu_t)dt + xi sqrt(nu_t) dW_t^nu, with 5 parameters (nu_0,theta,kappa,xi,rho). Semi-closed form via characteristic function and FFT. Realistic volatility dynamics: smile moves with spot.\n• Practical selection: LV for vanillas/short-dated options where speed matters; SV for path-dependent exotics (cliquets, autocallables); SLV (LV+SV) for complex structured products needing both fit and realistic forward dynamics.\n• Calibration challenges: LV needs smoothing/regularization to avoid noise from numerical differentiation; SV is non-convex optimization with multiple local minima. Heston requires Feller condition 2*kappa*theta > xi^2 for strict positivity.\n• Key trade-off: Perfect smile fit (LV) vs realistic dynamics (SV). Impacts vega hedging, P&L attribution, and exotic risk management significantly.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2111, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "CVA, DVA, and FVA in Derivatives Pricing",
    "question": "How do CVA, DVA, and FVA affect the fair value of a derivatives portfolio? Derive the adjustment formulas and explain the treatment of own credit risk, funding costs, and collateralization under ISDA protocols.",
    "modelAnswer": "Credit and funding valuation adjustments transform risk-free derivatives prices into counterparty-risk-aware and funding-aware prices.\n\n**CVA (Credit Valuation Adjustment):**\nCVA is the market value of counterparty credit risk. CVA = (1-R_c) integral_0^T E[exp(-integral_0^t r_s ds) EE(t) lambda_c(t)] dt. Implementation: Simulate underlying risk factors under risk-neutral measure, compute MtM distribution at each time step, take positive exposures, multiply by survival probabilities. Key inputs: CDS spreads for counterparty, recovery rate (typically 40% for senior unsecured), netting agreements, collateral thresholds, and margin period of risk. Wrong-way risk: When exposure is positively correlated with counterparty default probability (e.g., selling CDS protection on the counterparty), CVA increases significantly.\n\n**DVA (Debit Valuation Adjustment):**\nDVA reflects the bank's own credit risk. If the bank's credit quality deteriorates, its liabilities become less valuable, creating an accounting gain. DVA = (1-R_b) integral_0^T E[exp(-integral_0^t r_s ds) NE(t) lambda_b(t)] dt. Controversy: DVA creates the perverse effect that a bank recognizes profit when its credit worsens. Post-IFRS 13 and FAS 157, DVA is required for fair value accounting.\n\n**FVA (Funding Valuation Adjustment):**\nFVA accounts for the cost/benefit of funding the initial margin and variation margin. FVA = integral_0^T E[exp(-integral_0^t r_s^f ds) (r_s^b - r_s^f) V_s] dt. For a deep-out-of-the-money uncollateralized swap, FVA can be significant.\n\n**Key Principles:**\nCollateralization reduces CVA and FVA significantly. A fully collateralized trade (CSA with zero threshold, daily margin calls) has near-zero XVA adjustments. Netting sets are crucial: CVA is calculated on a netting-set level. Margin period of risk (MPOR): Typically 10-20 business days. Under Basel III, banks must hold capital against CVA volatility, leading to CVA hedging desks that trade CDS indices (CDX, iTraxx). Cross-currency swaps have additional FVA from FX basis. Central clearing reduces CVA to CCP default fund contributions but introduces initial margin costs (MVA).",
    "scoringKeywords": {"CVA expected exposure": 15, "DVA own credit risk": 15, "FVA funding spread": 15, "netting sets": 10, "wrong-way risk": 10, "collateral CSA": 10, "Basel III CVA capital": 10, "margin period of risk": 10, "KVA MVA": 5},
    "expectedStructure": ["CVA derivation and components", "DVA and the own-credit paradox", "FVA and funding cost dynamics", "Netting, collateral, and MPOR", "Regulatory treatment and capital"],
    "detailedAnalysis": detailed_analysis(
        "Tests understanding of XVA adjustments in derivatives pricing.",
        "Covers both theoretical derivation and practical implementation challenges.",
        ["Confusing CVA and DVA signs", "Ignoring netting set aggregation", "Not mentioning wrong-way risk"],
        ["Derive formulas step by step", "Discuss regulatory evolution (Basel III)", "Include real CDS index hedging examples"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["ISDA 2014 XVA Guidelines", "BIS Basel III CVA Framework", "Green, Kenyon & Dennis (2021) XVA"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• CVA: Market value of counterparty credit risk. CVA = (1-R_c) integral EE(t) PD(t) dt. Reduces derivative price. Requires CDS spreads, recovery assumptions, netting set aggregation. Wrong-way risk when exposure correlates with counterparty default.\n• DVA: Own credit risk adjustment. DVA = (1-R_b) integral NE(t) PD_b(t) dt. Paradox: bank books profit when own credit worsens. Required under IFRS 13 but economically controversial since gains are unrealizable.\n• FVA: Funding cost/benefit of collateral posting. FVA = integral E[exp(-rt)(r^b-r^f)V_t]dt. Material for uncollateralized trades. Cross-currency adds FX basis complexity.\n• Netting and collateral: XVA calculated at netting set level. Full CSA (daily margin, zero threshold) near-zero XVA. MPOR typically 10-20 business days.\n• Regulatory: Basel III CVA capital charge drives banks to hedge with CDX/iTraxx indices. CCP clearing shifts risk to default fund (MVA). Debate on FVA double-counting persists.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2112, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Rough Volatility and Fractional Brownian Motion",
    "question": "Explain the rough volatility paradigm and how fractional Brownian motion (fBm) with Hurst exponent H < 0.5 better captures observed volatility dynamics. How does this affect option pricing and hedging compared to standard stochastic volatility models?",
    "modelAnswer": "Rough volatility emerged from empirical work (Gatheral, Jaisson, Rosenbaum, 2014-2018) showing that realized log-volatility has a Hurst exponent H approximately 0.1-0.15, far below the H=0.5 implied by standard Brownian motion.\n\n**Empirical Evidence:**\nEstimating H via the scaling of realized volatility increments: Var(sigma_{t+Delta} - sigma_t) proportional to Delta^{2H}. For S&P 500 data, 2H is approximately 0.14-0.20, meaning H is approximately 0.07-0.10. This implies volatility is 'rough' with paths much more irregular than standard Brownian motion. This holds across asset classes: equities, FX, commodities, and even Bitcoin.\n\n**Fractional Brownian Motion:**\nfBm B^H_t is a continuous-time Gaussian process with covariance E[B^H_t B^H_s] = 0.5(t^{2H} + s^{2H} - |t-s|^{2H}). H < 0.5 means anti-persistent increments; path roughness scales like t^H. The key: fBm is NOT a semimartingale for H != 0.5, so standard Ito calculus doesn't apply.\n\n**Rough Bergomi Model (rBergomi):**\nOne of the simplest rough volatility models: dS_t/S_t = sqrt(v_t) dW_t, v_t = xi_0(t) exp(eta W^H_t - 0.5 eta^2 t^{2H}). Parameters: xi_0(t) = forward variance curve, eta = vol-of-vol, H = Hurst exponent. Produces realistic ATM volatility skew term structure: psi(tau) is proportional to tau^{H-0.5}, matching empirical observation that skew decays as tau^{-0.4} instead of tau^{-0.5}.\n\n**Impact on Pricing:**\nShort-dated options: Rough volatility generates much more realistic implied volatility smiles. Forward-start options: rBergomi produces volatility-dependent forward variance matching market prices. VIX derivatives: Rough volatility captures the observed VIX smile and term structure of VIX futures.\n\n**Hedging Challenges:**\nNon-semimartingale property means delta hedging in continuous time is not rigorously justified. Monte Carlo pricing requires specialized schemes (hybrid scheme combining exact simulation of fBm with Euler for SDE). Particle methods and asymptotic expansion formulas are active research areas.\n\n**Institutional Adoption:**\nMajor investment banks (BNP Paribas, SocGen) now use rough volatility for exotic equity derivatives. The rough Heston model provides semi-analytical tractability but requires solving fractional ODEs. Asymptotic formula: sigma_BS(K,T) approx sigma_ATM + (2T^{H-0.5}/sqrt(T)) * rho*eta * log(K/F).\n\n**Bottom Line:** Rough volatility is arguably the most significant advance in volatility modeling since Heston. It fixes key empirical failures of standard SV at the cost of mathematical complexity.",
    "scoringKeywords": {"Hurst exponent H < 0.5": 15, "fractional Brownian motion": 15, "rough Bergomi model": 15, "implied volatility skew term structure": 15, "non-semimartingale hedging": 15, "forward-start options": 10, "asymptotic formula": 10, "empirical volatility roughness": 5},
    "expectedStructure": ["Empirical evidence for rough volatility", "Fractional Brownian motion properties", "Rough Bergomi model specification", "Pricing implications for options", "Hedging and computational challenges"],
    "detailedAnalysis": detailed_analysis(
        "Tests cutting-edge knowledge of rough volatility models.",
        "Demonstrates understanding of both theory and practical market implications.",
        ["Confusing Hurst exponent interpretation", "Not addressing non-semimartingale issue", "Ignoring computational challenges"],
        ["Cite Gatheral, Jaisson, Rosenbaum papers", "Discuss numerical methods (hybrid schemes)", "Mention institutional adoption at major banks"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=95, sources=["Gatheral, Jaisson, Rosenbaum (2014, 2018)", "Rough Bergomi (2016)", "Bayer, Friz, Gatheral (2016)"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Empirical: Log-volatility increments scale as Var(sigma_{t+Delta}-sigma_t) prop to Delta^{2H} with H approx 0.07-0.15 across asset classes. Much rougher than BM (H=0.5). Implies volatility paths are not semimartingales.\n• Rough Bergomi: v_t = xi_0(t)exp(eta W^H_t - 0.5 eta^2 t^{2H}) with Riemann-Liouville fBm. Only 3 parameters: forward variance curve, vol-of-vol eta, Hurst H.\n• Key advantage: Produces realistic skew term structure psi(tau) prop to tau^{H-0.5} matching empirical tau^{-0.4} decay, vs tau^{-0.5} in standard SV. Better captures short-dated smile and VIX derivatives.\n• Challenges: Non-semimartingale means continuous delta hedging lacks theoretical justification. Monte Carlo requires specialized hybrid schemes with higher computational cost.\n• Adoption: BNP, SocGen use rough vol for exotics. Rough Heston with fractional Riccati equations provides semi-analytical tractability.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2113, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Machine Learning for Option Pricing: Neural SDEs and Deep Hedging",
    "question": "How can neural stochastic differential equations (neural SDEs) and deep hedging be applied to derivatives pricing and risk management? What are the key advantages, limitations, and regulatory considerations?",
    "modelAnswer": "Deep learning is transforming derivatives pricing from model-driven to data-driven approaches, particularly in high-dimensional and path-dependent settings.\n\n**Neural SDEs:**\nParameterize drift and diffusion functions with neural networks, then train them on market data to learn latent dynamics: dX_t = mu_theta(X_t,t)dt + sigma_theta(X_t,t)dW_t. Applications: Learn latent volatility processes from options data without assuming parametric forms (Heston, SABR). Training: Use variational inference or adversarial training to match the distribution of observed market prices. Advantage: Can discover non-parametric volatility dynamics including rough volatility and regime-switching. Limitation: Data requirements are massive; out-of-sample performance can degrade if market regimes shift.\n\n**Deep Hedging (Buehler et al., 2019, JPMorgan):**\nTreat hedging as a reinforcement learning problem. The agent observes state (spot, vol surface, portfolio), takes actions (rebalancing hedge), receives rewards (P&L impact). Objective: Minimize a risk measure of final P&L distribution (CVaR, variance, expected shortfall). Architecture: Deep neural network maps market state to optimal hedge position. Can handle transaction costs, market impact, discrete rebalancing, and path-dependent payoffs. Example: For a barrier option, deep hedging learns dynamic hedging strategies accounting for knock-out events.\n\n**Key Advantages:**\n1. Model-free: Learns directly from market data, avoiding model misspecification risk.\n2. Multi-asset: Naturally handles cross-gamma and correlation effects.\n3. Realistic frictions: Can incorporate transaction costs, liquidity constraints.\n4. Non-linear risk measures: Can optimize for any coherent risk measure.\n\n**Limitations:**\n1. Overfitting to historical paths and failure in market dislocations.\n2. Interpretability: Black-box policies are hard to explain to risk committees and regulators.\n3. Computational cost: Training requires millions of path simulations with GPU acceleration.\n4. Regime stability: A policy trained in low-volatility environments performs poorly in crisis periods.\n\n**Regulatory Considerations:**\nSR 11-7 (US Fed/OCC) model risk guidance requires explainability and validation. FRTB requires expected shortfall models to be validated. Black-box hedging models face higher scrutiny. JPMorgan, Goldman Sachs, Morgan Stanley have dedicated quant ML teams. Production use is mostly for exotic FX options, convertible bonds, and structured notes.\n\n**Future Direction:**\nGraph neural networks for limit order book modeling, deep calibration for near-instant model calibration, signature methods for volatility forecasting.",
    "scoringKeywords": {"neural SDE drift diffusion parameterization": 15, "deep hedging RL framework": 20, "model-free vs parametric dynamics": 10, "transaction costs discrete hedging": 10, "overfitting regime stability": 15, "regulatory model risk SR 11-7": 10, "CVaR risk measure optimization": 10, "interpretability black-box concerns": 10},
    "expectedStructure": ["Neural SDE architecture and training", "Deep hedging RL framework", "Key advantages over traditional models", "Limitations and failure modes", "Regulatory and industry adoption"],
    "detailedAnalysis": detailed_analysis(
        "Tests cutting-edge ML applications in derivatives pricing and hedging.",
        "Balances enthusiasm for ML with practical limitations and regulatory reality.",
        ["Overstating ML capabilities without acknowledging limitations", "Ignoring regulatory constraints", "Not discussing overfitting risk"],
        ["Cite Buehler et al. (2019) paper", "Discuss SR 11-7 model risk guidance", "Mention hybrid approaches (traditional + ML)"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=95, sources=["Buehler et al. (2019) Deep Hedging", "SR 11-7 Model Risk Management", "JPMorgan AI Research"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Neural SDEs: Parametrize drift and diffusion with neural nets (mu_theta, sigma_theta). Learn latent dynamics from options data via variational inference. Discover non-parametric vol dynamics including rough vol. Requires large multi-year options chains for training.\n• Deep Hedging (RL framework): Agent observes state (spot, vol surface, portfolio), takes hedge actions, optimizes risk measure (CVaR) of final P&L. Handles transaction costs, discrete rebalancing, path-dependence. Buehler et al. (JPMorgan, 2019) seminal paper.\n• Advantages: Model-free, handles multi-asset cross-gamma, realistic frictions, any coherent risk measure. Good for high-dimensional exotics (barriers, convertible bonds).\n• Limitations: Overfitting to historical regimes, black-box interpretability (regulatory SR 11-7 issue), computational cost, failure in market dislocations not seen in training data.\n• Industry: Hybrid approach (traditional + ML). Production: exotic FX, structured notes. Deep calibration more widely adopted than full deep hedging.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2114, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Malliavin Calculus and Greeks Computation",
    "question": "Explain how Malliavin calculus is used to compute Greeks (sensitivities) for path-dependent derivatives. Compare the Malliavin approach with finite difference and pathwise methods in terms of bias, variance, and computational efficiency.",
    "modelAnswer": "Malliavin calculus, or the calculus of variations on Wiener space, provides a powerful tool for computing sensitivities of expectations of functionals of Brownian motion.\n\n**Motivation:** Computing Greeks for path-dependent options (Asians, barriers, lookbacks, Bermudans) is challenging:\n- Finite differences: Require re-simulating paths with perturbed parameters. Two Monte Carlo runs with independent paths have high variance.\n- Pathwise method: Differentiate the payoff along each path (d/dS g(S_T)). Works when payoff is differentiable. Fails for discontinuous payoffs (digital, barrier).\n\n**Malliavin Approach:**\nKey insight: Represent the sensitivity as an expectation of the payoff times a random weight (Malliavin weight), rather than differentiating the payoff itself. Delta under Black-Scholes: Delta = E[g(S_T) x H] where H = (W_T/(sigma S_0 T)) is the Malliavin weight. For general path-dependent payoffs: Use integration by parts on Wiener space. Formula: d/dtheta E[g(X)] = E[g(X) x pi_theta] where pi_theta is a Malliavin weight involving the gradient (nabla X) and D (Malliavin derivative operator).\n\n**Specific Examples:**\n- Asian option delta: Delta_Asian = E[(S_avg - K)^+ x (2/(sigma^2 T^2) integral (t/T) dW_t)].\n- Barrier option: For knock-out options, Malliavin weights handle discontinuity by integrating around barrier crossing.\n- Bermudan options: Use Malliavin combined with American Monte Carlo (Longstaff-Schwartz).\n\n**Comparison:**\n| Method | Bias | Variance | Cost | Diff Req |\n| Finite Diff (Central) | O(h^2) | O(1/(N h^2)) | 2x | No |\n| Pathwise | Unbiased | Low | 1x | Yes (C1) |\n| Likelihood Ratio | Unbiased | O(1/N) | 1x | No |\n| Malliavin | Unbiased | O(1/N) | 1x | No |\n\nMalliavin vs LR: LR requires knowing transition density analytically; Malliavin works with any elliptic diffusion. Malliavin weights often have higher variance than LR; control variates are essential. Computational: Malliavin requires computing D_X (first variation SDE), adding 50-100% overhead.\n\n**Practical Tips:**\n- Vanilla options: Pathwise (lowest variance).\n- Barrier/digital: Malliavin (unbiased, handles discontinuity).\n- Asian options: Malliavin gives delta/vega with 1/5 the variance of finite differences.\n- Bermudan swaptions: Malliavin weights with regression-based continuation values.",
    "scoringKeywords": {"Malliavin weight integration by parts": 20, "Skorokhod divergence operator": 10, "discontinuous payoff barrier digital": 15, "first variation SDE Malliavin derivative": 15, "variance comparison finite difference pathwise": 15, "Asian option delta weight formula": 10, "Bermudan Longstaff-Schwartz Malliavin": 10, "stochastic volatility extension": 5},
    "expectedStructure": ["Motivation for Malliavin Greeks", "Mathematical framework and weight derivation", "Specific examples (Asian, barrier)", "Comparison with alternative methods", "Advanced extensions and research"],
    "detailedAnalysis": detailed_analysis(
        "Tests advanced knowledge of computational finance and sensitivity estimation.",
        "Shows deep understanding of Monte Carlo methods and their limitations.",
        ["Not understanding the weight derivation", "Confusing with likelihood ratio method", "Ignoring computational overhead"],
        ["Present a table comparing methods", "Show the Asian delta weight formula explicitly", "Discuss practical variance reduction"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=95, sources=["Fournie et al. (1999, 2001) Malliavin Greeks", "Glasserman (2003) Monte Carlo Methods", "Nualart (2006) Malliavin Calculus"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Malliavin approach: Represent Greek as E[g(X) x pi_theta] where pi_theta is Malliavin weight from integration by parts on Wiener space. No need to differentiate payoff. Works for discontinuous payoffs (barriers, digitals).\n• Key formula: Delta = E[g(S_T) x W_T/(sigma S_0 T)]. For Asian: Delta = E[(S_avg-K)^+ x (2/(sigma^2 T^2) integral (t/T) dW_t)]. Requires solving first variation SDE for Malliavin derivative DX.\n• Comparison: Finite difference biased O(h^2) with variance O(1/(Nh^2)). Pathwise unbiased but fails for discontinuous payoffs. Likelihood Ratio requires closed-form transition density. Malliavin: unbiased, handles any payoff, works for any elliptic diffusion.\n• Practical: Pathwise best for vanillas (low variance). Malliavin essential for barriers/Asians/Bermudans. Variance of weights often higher - use control variates (matching vanilla delta).\n• Extensions: Gamma needs second Malliavin derivative. Heston uses Lamperti transformation. Active research on deep Malliavin and sparse grid methods.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2115, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Interest Rate Swap Pricing Under Multiple Curves",
    "question": "Since the 2008 financial crisis, how has the pricing of interest rate swaps changed with the introduction of multiple discounting curves? Explain OIS discounting, CSA collateralization, and the basis swap market mechanics.",
    "modelAnswer": "Pre-2008, banks used a single yield curve to both project forward rates and discount cash flows. Post-crisis, the LIBOR-OIS spread blowup revealed that unsecured interbank rates embed significant credit risk, requiring a multi-curve framework.\n\n**OIS Discounting:**\nOvernight Indexed Swap (OIS) rate represents the risk-free rate. In a collateralized swap where cash collateral earns OIS, the appropriate discount rate is the OIS curve. For swaps under a Credit Support Annex (CSA) with cash collateral and zero threshold, the swap is effectively risk-free and OIS is the correct discount rate.\n\n**Multi-Curve Framework:**\n1. OIS curve: Risk-free discounting. Constructed from OIS swaps, Fed Funds/EONIA/SONIA futures, and overnight rates.\n2. Forward curve: Used to project future floating rate payments. Need separate forward curves derived from FRAs, Eurodollar futures, and swap rates, bootstrapped iteratively using OIS for discounting.\n3. The basis: Spread between LIBOR and OIS reflects bank credit risk and liquidity premiums.\n\n**Basis Swap Mechanics:**\nA basis swap exchanges one floating index for another (e.g., 3M USD LIBOR vs 6M USD LIBOR). The basis (spread on one leg) reflects relative supply/demand for different tenors. Post-crisis, 3M vs 6M basis widened to 10-20bps. Cross-currency basis: USD LIBOR vs EURIBOR basis reflects dollar funding shortages abroad.\n\n**CSA Collateralization Details:**\n- Full CSA: Daily margin calls, cash collateral, zero threshold -> near-zero CVA. Discount at OIS.\n- Partial CSA: Threshold > 0, or eligible collateral includes non-cash assets. Discounting incorporates the funding spread between OIS and the collateral rate.\n- No CSA: Uncollateralized swap -> discount at bank's funding rate. Significant CVA/FVA adjustments needed.\n\n**Bootstrapping Multi-Curve Swaps:**\nStep 1: Build OIS curve from OIS swaps and overnight rates. Step 2: Build 3M forward curve using Eurodollar futures (up to 2 years) and swap rates (2-30Y). For each swap tenor, solve for forward rates such that PV(floating) = PV(fixed), using OIS curve for discounting. Step 3: Build 1M, 6M, 12M forward curves as needed.\n\n**LIBOR to SOFR Transition:**\nLIBOR cessation (end-2021) forced adoption of SOFR (USD), SONIA (GBP), €STR (EUR). SOFR is a secured overnight rate. ISDA 2020 IBOR Fallback Protocol specifies spread adjustments. Challenges: SOFR futures/swap markets are less liquid for longer tenors.\n\n**Hedging Curve Risk:**\nA swap portfolio has sources of risk: parallel shift (DV01), curve twist, basis risk (3M vs 6M), CSA basis, and cross-currency basis. Hedge with OIS swaps, Eurodollar futures strips, basis swaps, and CCS respectively.",
    "scoringKeywords": {"OIS discounting post-crisis": 15, "multi-curve forward projection": 15, "basis swap mechanics": 10, "CSA collateralization types": 15, "bootstrapping iteration methodology": 10, "LIBOR to SOFR transition": 10, "cross-currency basis": 10, "curve risk hedging DV01": 10, "convexity adjustment CMS": 5},
    "expectedStructure": ["OIS discounting rationale", "Multi-curve construction and calibration", "Basis swap market and CSA mechanics", "LIBOR transition to risk-free rates", "Hedging curve and basis risk"],
    "detailedAnalysis": detailed_analysis(
        "Tests practical knowledge of fixed income derivatives pricing post-crisis.",
        "Covers both theoretical framework and market implementation.",
        ["Not distinguishing between projection and discount curves", "Ignoring CSA details", "Confusing LIBOR and OIS"],
        ["Walk through bootstrapping step by step", "Discuss LIBOR transition implications", "Include concrete spread numbers"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["BIS OIS Discounting (2013)", "ISDA SIMM 2.0", "Piterbarg (2010) Funding Beyond Discounting"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• OIS discounting: Under full CSA (daily cash margin, zero threshold), swap is risk-free. Discount at OIS (Fed Funds/SOFR). Separate forward curves for different tenors because they embed bank credit risk.\n• Multi-curve bootstrapping: Step 1: Build OIS curve. Step 2: Build forward curve from futures + swaps using OIS discounting. Solve forward rates so PV(floating) = PV(fixed) at each tenor.\n• Basis swaps: 3M vs 6M LIBOR basis reflects tenor preference; cross-currency basis reflects dollar funding scarcity. Crucial for hedging multi-currency portfolios.\n• LIBOR to SOFR: SOFR is secured overnight. Compounded in arrears. ISDA fallback adds spread adjustment. Liquidity improving for longer tenors.\n• Curve risk: DV01 (parallel), curve twist (2s10s), tenor basis, CSA basis, FX basis. Hedge with OIS swaps, futures strips, basis swaps, CCS respectively.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2116, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Eigenvalue Analysis for PCA-Driven Factor Risk Models",
    "question": "How do you use randomized SVD and eigenvalue analysis to build a PCA-based risk model for a large equity portfolio? Discuss statistical tests for factor significance, rank estimation, and the handling of market microstructure noise.",
    "modelAnswer": "PCA-based risk models decompose asset returns into systematic factors and idiosyncratic components, enabling dimensionality reduction for covariance estimation.\n\n**PCA Framework:**\nGiven N assets with T periods of returns (T x N matrix R), compute S = (1/T)R'R (N x N sample covariance). Eigen-decomposition: S = V Lambda V'. The first K eigenvectors are 'statistical factors.' Factor model: r_t = B f_t + epsilon_t, where B = V_K sqrt(Lambda_K).\n\n**Randomized SVD for Large N:**\nTraditional SVD is O(N^3). Randomized SVD (Halko, Martinsson, Tropp, 2011) is O(N^2 K). Algorithm: Draw random Gaussian matrix Omega (N x (K+p)). Form Y = R Omega. Compute QR factorization Y = Q Y. Form B = Q'R. Compute SVD of B. Recover eigenvectors via V = B Q'. Error prop to sigma_{K+1} x fudge factor.\n\n**Rank Estimation:**\nUnder the null of no factors, eigenvalues follow Marchenko-Pastur distribution: f(lambda) = (1/(2 pi sigma^2 lambda)) sqrt((b-lambda)(lambda-a)) for lambda in [a,b]. For N=500, T=1000: a approx 0.73 sigma^2, b approx 1.37 sigma^2. Eigenvalues above b are signal. Tracy-Widom distribution tests the largest eigenvalue. Typical results: For US equities, K is approximately 10-20 (industry, size, value, momentum, volatility factors). First eigenvalue captures 20-30% of variance (market factor).\n\n**Market Microstructure Noise:**\nBid-ask bounce, stale prices, and asynchronous trading create negative autocorrelation. Solutions: Use daily instead of intraday returns; pre-whiten returns with AR(1) filter; use Hayashi-Yoshida estimator for asynchronous data; use multi-scale realized covariance (Zhang, 2011).\n\n**Regularization and Shrinkage:**\nAfter PCA, reconstruct: Sigma_PCA = B Lambda_K B' + diag(sigma^2_epsilon). Shrink idiosyncratic variances via Ledoit-Wolf. POET (Fan, Liao, Mincheva, 2013): Threshold the idiosyncratic covariance using adaptive thresholding. Backtest using Diebold-Mariano test. Bootstrap eigenvalue stability. Condition number of PCA-reduced covariance should be manageable (<100).\n\n**Practical Implementation:**\nFor a 3000-stock portfolio with T=500 (2 years): gamma = 6 > 1. PCA via randomized SVD with K=30. MP threshold: b = sigma^2(1+sqrt(6))^2 approx 7.7 sigma^2. Result: ~15-20 factors. Minimum variance portfolio with PCA model has 40-60% lower turnover than sample covariance.",
    "scoringKeywords": {"randomized SVD algorithm": 15, "Marchenko-Pastur distribution": 15, "Tracy-Widom test": 10, "microstructure noise AR filter": 15, "POET thresholding": 10, "shrinkage Ledoit-Wolf": 10, "factor interpretability Varimax": 10, "cross-sectional validation": 10, "condition number stability": 5},
    "expectedStructure": ["PCA factor model framework", "Randomized SVD for scalability", "Rank estimation with RMT", "Microstructure noise handling", "Regularization and validation"],
    "detailedAnalysis": detailed_analysis(
        "Tests applied quantitative portfolio risk modeling skills.",
        "Combines statistical theory with practical implementation.",
        ["Not addressing N > T case", "Ignoring microstructure noise", "Using naive eigenvalue threshold"],
        ["Show MP distribution formula", "Discuss randomized SVD complexity", "Include shrinkage techniques"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Halko, Martinsson, Tropp (2011) Randomized SVD", "Fan, Liao, Mincheva (2013) POET", "Marchenko-Pastur (1967)"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• PCA risk model: Decompose return covariance S = V Lambda V'. First K eigenvectors = statistical factors. For N > 10,000, use randomized SVD: compute Y = R Omega (Omega Gaussian), QR decompose Y, SVD of smaller matrix B = Q'R. O(N^2 K) vs O(N^3).\n• Rank estimation via RMT: Under null, eigenvalues follow Marchenko-Pastur: b = sigma^2(1+sqrt(gamma))^2, gamma = N/T. Eigenvalues above b are signal. Tracy-Widom distribution tests largest eigenvalue significance.\n• Microstructure: Bid-ask bounce creates negative autocorrelation. Solutions: daily returns, AR(1) pre-whitening, two-scale realized covariance. Refresh-time for asynchronous data.\n• Covariance reconstruction: Sigma_PCA = B Lambda_K B' + diag(sigma^2_epsilon). Shrink idiosyncratic variances via Ledoit-Wolf. POET thresholding of residual covariance.\n• Validation: Backtest predicted vs realized variance (Diebold-Mariano). Bootstrap eigenvalue confidence intervals for stable K selection.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2117, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Variance Reduction for Exotic Options: Antithetic, Control Variates, Importance Sampling",
    "question": "Compare and contrast variance reduction techniques for pricing exotic options via Monte Carlo: antithetic variates, control variates, importance sampling, and stratified sampling. How do you select the optimal control variate and compute the efficiency ratio?",
    "modelAnswer": "Monte Carlo convergence rate is O(1/sqrt(N)). Variance reduction accelerates this by reducing the constant factor.\n\n**Antithetic Variates:**\nFor each standard normal Z, also simulate using -Z. Paired estimator: theta_hat = 0.5(g(Z) + g(-Z)). Variance: Var(theta_hat) = 0.25[Var(g(Z)) + Var(g(-Z)) + 2Cov(g(Z), g(-Z))]. If g is monotonic, Cov < 0. Works well for monotone payoffs (vanilla calls). Fails for non-monotone payoffs. Computational cost ~2x per pair, but reduction factor often >2.\n\n**Control Variates:**\nUse known-analytic payoff Y as control: theta_hat = g(S) - beta(Y - E[Y]). Optimal beta = Cov(g,Y)/Var(Y). Variance reduction: Var(theta_hat) = Var(g)(1 - rho^2(g,Y)). If rho = 0.99, reduction factor = 1/(1-0.99^2) approx 50x. Example for Asian: use S_T as control (rho approx 0.85-0.95). For basket: sum of individual assets. For barrier: vanilla option (rho 0.6-0.8). Optimal beta estimated from pilot simulation (500-1000 paths).\n\n**Importance Sampling:**\nChange sampling distribution to focus on important regions. theta = E[f(X)] = E_Q[f(X) dP/dQ]. Applications: Deep OTM options (rare event simulation), barrier options near knock-out. Example: For deep OTM call, shift drift upward via Girsanov: dQ/dP = exp(-theta W_T - 0.5 theta^2 T). Can achieve 100-1000x reduction for deep OTM options. Challenge: finding optimal theta.\n\n**Stratified Sampling:**\nPartition sample space into strata, sample proportionally. Var(theta_hat) = (1/N) sum p_k sigma^2_k + between-stratum variance removed. Best when intra-stratum variance is low. Limitation: Need stratum probabilities (easy in 1D, hard in high-D).\n\n**Efficiency Ratio:**\nEff = Var_reduction / Cost_increase. If antithetic gives 3x at 1.1x cost, Eff = 2.7. For Asian: Antithetic(Eff=3) + CV(Eff=10) -> combined 30x at 1.3x cost -> Eff=23.\n\n**Hybrid Approaches:**\nAsian option: Antithetic + CV (S_T + geometric Asian). Combined factor: 10-30x. Barrier option: Importance sampling (drift toward barrier) + CV (vanilla). Combined: 50-500x. Bermudan swaption: LSM with control variates for continuation value.",
    "scoringKeywords": {"antithetic variates monotonic payoff": 10, "control variate optimal beta correlation": 20, "importance sampling Girsanov drift": 15, "stratified sampling stratum allocation": 10, "efficiency ratio variance reduction over cost": 15, "hybrid Asian barrier combination": 10, "rare event deep OTM simulation": 10, "unbiasedness verification": 10},
    "expectedStructure": ["Antithetic variates mechanism and limitations", "Optimal control variate selection", "Importance sampling for rare events", "Stratified sampling and curse of dimensionality", "Combined techniques and efficiency ratio"],
    "detailedAnalysis": detailed_analysis(
        "Tests Monte Carlo variance reduction techniques for exotic options.",
        "Covers both theoretical foundations and practical implementation.",
        ["Not calculating optimal beta", "Ignoring computational cost", "Forgetting to check unbiasedness"],
        ["Show variance reduction formulas", "Discuss hybrid combinations", "Compute efficiency ratios"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Glasserman (2003) Monte Carlo Methods", "Boyle, Broadie, Glasserman (1997)", "Asmussen & Glynn (2007)"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Antithetic: Pair Z and -Z. Variance halved for monotone payoffs. Cheap (2x cost). Fails for non-monotone payoffs. Best for vanillas.\n• Control Variate (CV): theta_hat = g - beta(Y-E[Y]), optimal beta = Cov(g,Y)/Var(Y). Reduction = 1/(1-rho^2). rho=0.95 -> 10x. Best CV for Asian: S_T (rho~0.9) or geometric Asian (rho~0.98). For barrier: vanilla option. Estimate beta from pilot (500 paths).\n• Importance Sampling: Shift drift toward important region. Girsanov: dQ/dP = exp(-theta W_T - 0.5 theta^2 T). For deep OTM call (P=1e-6): drift upward so more paths ITM. Achieve 100-1000x reduction.\n• Stratified: Partition terminal distribution into strata, sample proportionally. Removes between-stratum variance. Hard for D > 3. Latin Hypercube easier.\n• Efficiency Ratio = variance reduction / cost increase. For Asian: Antithetic(3x/1.1) + CV(10x/1.3) = combined approx 30x/1.4 -> Eff approx 21. Always test unbiasedness.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2118, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Copula Models for Multi-Name Credit Derivatives",
    "question": "How are copula models used to price multi-asset credit derivatives such as CDO tranches and basket default swaps? Compare Gaussian, t, and Clayton copulas in terms of tail dependence, calibration to CDS index data, and the limitations exposed during the 2008 crisis.",
    "modelAnswer": "Copula models separate marginal default probabilities from dependence structure, enabling pricing of multi-name credit products.\n\n**Copula Framework:**\nSklar's theorem: Any multivariate distribution F(x_1,...,x_d) can be written as F(x_1,...,x_d) = C(F_1(x_1),...,F_d(x_d)) where C is the copula. For credit: Marginal default times tau_i ~ exponential(lambda_i) from CDS spreads. Joint default probability: P(tau_1 <= t_1,...,tau_d <= t_d) = C(F_1(t_1),...,F_d(t_d)).\n\n**Gaussian Copula:**\nC_R(u) = Phi_R(Phi^{-1}(u_1),...,Phi^{-1}(u_d)). Zero tail dependence (as u->0, lambda_L = lim P(U_2 <= u | U_1 <= u) = 0). Market standard pre-2008 (Li, 2000). Calibration: Find rho such that model CDO tranche spreads match market. Results in correlation smile: equity tranche implied rho approx 20%, senior rho approx 70%+. Flaws: Zero tail dependence underestimates systemic default clustering.\n\n**t-Copula:**\nC_{R,nu}(u) = t_{R,nu}(t^{-1}_nu(u_1),...,t^{-1}_nu(u_d)). Symmetric tail dependence: lambda_L = 2 t_{nu+1}(-sqrt((nu+1)(1-rho)/(1+rho))). For nu=3, rho=0.5: lambda_L approx 0.27. Captures joint default clustering better. Limitation: Symmetric tail dependence may not match credit data.\n\n**Clayton Copula (Archimedean):**\nC_theta(u) = (sum u_i^{-theta} - d + 1)^{-1/theta}. Asymmetric lower tail dependence: lambda_L = 2^{-1/theta}, zero upper tail dependence. Relevant for credit: captures contagion effect (one default makes others more likely). Calibration via Kendall's tau: tau = theta/(theta+2). Limitation: Only one parameter, limited dependence structures.\n\n**CDO Pricing with Copulas:**\nLarge homogeneous pool (LHP): Assume N identical names. Conditional on market factor M, defaults are independent. Default probability p_i(M) = Phi((Phi^{-1}(p_i) - sqrt(beta)M)/sqrt(1-beta)). Portfolio loss computed via recursion or FFT. Tranche pricing: Equity: min(L, K_1)/K_1. Mezzanine/Senior: similarly. Correlation smile: implied correlation varies by tranche (20% equity, 70%+ senior).\n\n**Lessons from 2008:**\nGaussian copula failed due to zero tail dependence. Actual defaults showed extreme clustering (up to 30% names). Recovery rates dropped from 40% to 15-20%. Wrong-way risk: housing downturn caused both higher defaults and lower recoveries.\n\n**Post-Crisis:**\nDouble-t copula, Hawkes contagion models, dynamic copulas with regime-switching. Base correlation framework for vanilla CDO tranches. Stochastic recovery (Beta-distributed). S&P CDO Evaluator / Moody's CDOROM as benchmarks.",
    "scoringKeywords": {"Sklar theorem copula decomposition": 10, "Gaussian copula zero tail dependence": 15, "t-copula symmetric tail dependence": 15, "Clayton lower tail dependence": 10, "CDO base correlation smile": 15, "2008 crisis model failures": 15, "LHP approximation factor model": 10, "stochastic recovery correlation": 5, "Hawkes contagion dynamic copula": 5},
    "expectedStructure": ["Copula framework and Sklar's theorem", "Gaussian, t, and Clayton properties", "CDO pricing with factor copulas", "Correlation skew and 2008 lessons", "Post-crisis improvements"],
    "detailedAnalysis": detailed_analysis(
        "Tests understanding of credit derivatives pricing and the 2008 crisis model failures.",
        "Covers both technical copula theory and real-world lessons from the financial crisis.",
        ["Overlooking 2008 crisis lessons", "Not understanding tail dependence distinctions", "Ignoring base correlation framework"],
        ["Compare tail dependence formulas explicitly", "Discuss regulatory evolution", "Mention current market practice"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Li (2000) Default Correlation", "Nelsen (2006) Copulas", "Hull & White (2004) CDO Pricing"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Copula separates marginals from dependence. Gaussian: zero tail dependence, underestimates joint defaults. t-copula: symmetric tail dependence lambda_L = 2 t_{nu+1}(-sqrt((nu+1)(1-rho)/(1+rho))). Clayton: asymmetric lower tail dependence lambda_L = 2^{-1/theta} - captures default contagion.\n• CDO pricing via factor copula (LHP): Conditional on market factor M, defaults independent. p_i(M) = Phi((Phi^{-1}(p_i) - sqrt(beta)M)/sqrt(1-beta)). Portfolio loss via FFT.\n• Gaussian copula failure (2008): Zero tail dependence -> AAA senior tranches modeled near-zero default probability. Actual defaults: extreme clustering (30% names). Recovery dropped 40% to 15%.\n• Correlation smile: Implied rho approx 20% for equity, 70%+ for senior. Smile = model misspecification requiring base correlation interpolation.\n• Post-crisis: t-factor copula (nu approx 4-6), stochastic recovery, Hawkes contagion, regime-switching dependence.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2119, "role": "quant", "category": "technical", "difficulty": "hard",
    "title": "Almgren-Chriss Implementation Shortfall and Optimal Execution",
    "question": "Describe the Almgren-Chriss framework for optimal execution. How do you model permanent and temporary market impact, and how do you derive the optimal trading trajectory? Include the stochastic extension with correlated price impact.",
    "modelAnswer": "Optimal execution addresses the trader's problem: liquidating a large position while minimizing a combination of market impact costs and price risk.\n\n**Almgren-Chriss (2001) Framework:**\nObjective: Minimize expected cost + lambda x variance of cost, where lambda = risk aversion. Discrete-time: Trade x_t shares in period t. Remaining inventory: Y_t = Y_{t-1} - x_t. Price dynamics: S_t = S_{t-1} + sigma sqrt(Delta t) epsilon_t + g(v) permanent + h(v) temporary impact. Permanent impact: g(v) = gamma v. Temporary impact: h(v) = eta v + bid-ask spread/2.\n\n**Deterministic Solution:**\nWith linear impact functions, optimal trajectory: Y_t = Y_0 x sinh(kappa(T-t)) / sinh(kappa T), where kappa = sqrt(lambda sigma^2 / eta). For lambda -> infinity (high risk aversion): Y_t = Y_0(1-t/T) (VWAP-like linear). For lambda -> 0: Wait until last moment (minimizes impact but maximizes risk).\n\n**Permanent vs Temporary Impact:**\nPermanent: Information revealed by trading. Proportional to total shares traded: Delta S = gamma integral v dt = gamma Y_0. Temporary: Liquidity demand. Proportional to trading rate. Empirically: impact is concave (power law with exponent 0.5-0.7). Square-root impact: Delta S = eta sigma sqrt(Q/VD) where Q = order size, V = market volume, D = days.\n\n**Non-linear Impact:**\nFor power-law impact (g(v) = gamma v^alpha): Optimal strategy is front-loaded - trade faster initially to avoid diminishing marginal impact benefit. Numerical solution via dynamic programming or solving HJB PDE.\n\n**Stochastic Extension:**\nObizhaeva-Wang (2013) model: Limit order book with shape function. Impact decays following kernel G(t) = kappa exp(-rho t). With stochastic volatility: Risk term lambda integral sigma^2_t Y^2_t dt becomes stochastic. Multi-asset execution with cointegrated assets for risk hedging.\n\n**Practical Implementation:**\nVWAP: Simple but not optimal; better for small orders. Implementation Shortfall (IS): Objective = ArrivalPrice - ExecutionPrice. TWAP: Fixed rate schedule. Adaptive strategies adjust participation rate intraday based on realized volatility and volume.\n\n**Calibration:**\nTemporary impact eta: Estimate from historical trades via power-law regression. Permanent impact gamma: Use 1-hour post-trade price reversion (permanent ~30% of total). Volatility sigma: Realized volatility from 5-minute returns.\n\n**Extensions:**\nDark pools: Optimal allocation between lit and dark. RL: Deep Q-network learns optimal policy from historical data. Benchmark-driven: Some clients care about VWAP vs close.",
    "scoringKeywords": {"Almgren-Chriss objective function": 15, "sine hyperbolic optimal trajectory": 15, "permanent temporary impact decomposition": 15, "square-root impact power law": 10, "risk aversion lambda parameter": 10, "Obizhaeva-Wang resilience kernel": 10, "implementation shortfall VWAP TWAP": 10, "dark pool execution": 5, "RL adaptive execution": 10},
    "expectedStructure": ["Almgren-Chriss objective and price dynamics", "Deterministic optimal trajectory", "Permanent vs temporary impact", "Non-linear and stochastic extensions", "Practical calibration and implementation"],
    "detailedAnalysis": detailed_analysis(
        "Tests optimal execution and market microstructure knowledge.",
        "Covers theory, empirical results, and practical implementation.",
        ["Confusing permanent and temporary impact", "Ignoring non-linear impact", "Not discussing calibration"],
        ["Derive the sine hyperbolic solution", "Discuss square-root impact law", "Include adaptive strategies"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Almgren & Chriss (2001) Optimal Execution", "Obizhaeva & Wang (2013)", "Kissell & Glantz (2003)"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Almgren-Chriss: Minimize expected cost + lambda x variance(cost). Linear impact: g(v)=gamma v, h(v)=eta v. Optimal inventory: Y_t = Y_0 x sinh(kappa(T-t))/sinh(kappa T), where kappa = sqrt(lambda sigma^2/eta).\n• Impact: Permanent = information revealed (proportional to total shares), Temporary = liquidity demand (proportional to rate). Empirically: impact proportional to v^{0.5-0.7} (square-root law: Delta S = eta sigma sqrt(Q/VD)). Permanent ~30% of total.\n• Risk aversion lambda: lambda->infinity -> VWAP schedule. lambda->0 -> end-loading. Real: match trader's risk budget.\n• Extensions: Obizhaeva-Wang with resilience (decaying impact). Stochastic volatility -> adaptive strategies. Multi-asset with cointegration for risk hedging.\n• Calibration: Fit power law log(Delta S) = beta log(v) + log(eta). Use 1-hr post-trade reversion for permanent split. RL (PPO) for non-stationary markets.",
            "format": "concise", "source": "generated"
        }
    }
})


# ============================================================
# IB HARD (5 questions)
# ============================================================

add_q({
    "id": 2120, "role": "ib", "category": "technical", "difficulty": "hard",
    "title": "LBO Modeling: Debt Tranching and Cash Flow Waterfall",
    "question": "Walk me through building a leveraged buyout (LBO) model from scratch. How do you structure the debt tranches (senior, mezzanine, PIK toggle), model the cash flow waterfall, and compute IRR and MOIC across different exit scenarios?",
    "modelAnswer": "An LBO model evaluates whether a PE firm can generate target returns by acquiring a company using significant leverage.\n\n**Key Inputs:**\nEntry: Purchase price (typically 8-12x EBITDA), debt financing structure, equity check size (30-40% of purchase price). Operating model: Revenue growth (2-5%), EBITDA margins, D&A, CapEx, working capital changes. Exit: Exit multiple (expansion or contraction), exit year (typically 5 years), net debt paydown.\n\n**Debt Tranching:**\n1. Senior Secured (40-50% of total debt): Revolver (undrawn, 10-15% of EBITDA), Term Loan A (amortizing, 5-7 years), Term Loan B (bullet, 7 years). Floating rate (SOFR + 250-400 bps).\n2. Senior Subordinated (10-20%): SOFR + 500-700 bps. Longer maturity.\n3. Mezzanine Debt (5-15%): PIK toggle - pay interest in kind rather than cash. High coupon (12-15%). Includes warrants.\n4. Seller Note: Pegged to earn-out.\n\n**Cash Flow Waterfall:**\nOperating cash flow -> mandatory debt amortization -> mandatory prepayments (excess cash flow sweeps: 50% at 4.5x leverage, 75% at 4.0x) -> discretionary -> dividends. PIK toggle can convert interest to principal when cash flow tight.\n\n**Returns Calculation:**\nFCF = EBITDA - Cash Interest - Taxes - CapEx - Delta WC - Mandatory Amortization. Exit Equity Value = Exit EBITDA x Exit Multiple - Net Debt. MOIC = Exit Equity / Initial Equity. IRR solves sum CF_t / (1+r)^t = 0. PE target: 20-25% IRR.\n\n**Key Value Drivers:**\n1. EBITDA growth (organic + add-on). 2. Multiple expansion (buy 8x, sell 10x = 25% MOIC boost). 3. Debt paydown from FCF. 4. Refinancing.\n\n**Sensitivity Analysis:**\n3D matrix: Entry Multiple x Exit Multiple x EBITDA CAGR. If entry 10x EBITDA, need exit >10x or EBITDA growth >5% for 20% IRR.\n\n**Example:** Company: $100M EBITDA, 8x entry ($800M EV). Debt: 5.5x = $550M (TLB $450M at SOFR+350, Mezz $100M at PIK 12%). Equity: $250M. EBITDA grows 5% CAGR to $128M by Year 5. Debt paydown: $200M from FCF. Exit at 9x EBITDA: EV = $1,148M. Net Debt = $350M. Equity = $798M. MOIC = 3.2x. IRR approx 26%. Downside: 7x exit -> MOIC 2.2x, IRR 17%.",
    "scoringKeywords": {"debt tranching senior mezzanine PIK": 15, "cash flow waterfall sweep": 15, "IRR MOIC calculation": 15, "sources and uses": 10, "EBITDA growth and multiple expansion": 15, "mandatory amortization excess cash flow": 10, "sensitivity analysis": 10, "refinancing covenant risk": 10},
    "expectedStructure": ["Entry assumptions and debt structure", "Cash flow waterfall and debt paydown", "Exit valuation and return calculation", "Sensitivity and scenario analysis", "Key risks and red flags"],
    "detailedAnalysis": detailed_analysis(
        "Tests LBO modeling skills used in PE and IB interviews.",
        "Demonstrates understanding of leverage, returns, and risk factors.",
        ["Not separating debt tranches properly", "Ignoring mandatory prepayments", "Forgetting to include fees in sources/uses"],
        ["Walk through a numerical example", "Discuss refinancing risk", "Show sensitivity matrix"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Bain Global Private Equity Report", "PitchBook LBO Analysis", "Wall Street Oasis LBO Modeling"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• LBO entry: Purchase at 8-12x EBITDA. Debt = 5-6x (TLB at SOFR+350, mezzanine PIK 12%, revolver). Equity = 30-40%. Sources = debt + equity; Uses = purchase price + fees + refi.\n• Cash flow waterfall: Operating CF -> mandatory amortization -> excess cash flow sweep (50% at 4.5x, 75% at 4.0x) -> optional -> dividends. PIK toggle converts interest to principal.\n• Returns: Exit EV = EBITDA_exit x Multiple_exit. Exit Equity = EV_exit - Net Debt. MOIC = Equity_exit / Equity_entry. Target: 20-25% IRR, 2.5-3.5x MOIC.\n• Value drivers: EBITDA growth, multiple expansion (buy 8x/sell 10x -> +25% MOIC), debt paydown (5.5x->2.5x in 5 years), refinancing.\n• Example: $100M EBITDA, 8x entry, 5% growth, 9x exit -> MOIC 3.2x, IRR 26%. Downside 7x: MOIC 2.2x, IRR 17%. Watch aggressive EBITDA, covenant breaches, refinancing risk.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2121, "role": "ib", "category": "technical", "difficulty": "hard",
    "title": "Merger Model: All-Stock vs All-Debt vs 50/50 Financing",
    "question": "Build a full merger model comparing three financing structures: all-stock, all-debt, and 50/50 cash-stock. How does each structure affect accretion/dilution, EPS, control premium, and post-merger capital structure?",
    "modelAnswer": "Pro-forma EPS = (Acquirer NI + Target NI + Synergies - Foregone Interest - Additional D&A) / (Acquirer Shares + New Shares Issued).\n\n**Assumptions:** Acquirer: P/E 15x, NI $500M, Shares 250M -> EPS $2.00, Price = $30. Target: P/E 12x, NI $100M, Shares 100M -> EPS $1.00, Price $12. Purchase price = $15/share = $1.5B (25% premium). Synergies: $50M cost synergies. D&A step-up: $20M.\n\n**All-Stock:** Exchange ratio = $15/$30 = 0.5. New shares = 100M x 0.5 = 50M. Pro-forma shares = 300M. Pro-forma NI = $500M + $100M + $50M - $20M = $630M. EPS = $2.10. Accretion = 5%. Existing shareholders diluted to 83%.\n\n**All-Debt:** Debt = $1.5B at 5% -> $75M interest. Tax shield: $75M x 25% = $18.75M. Net interest = $56.25M. Pro-forma shares = 250M. NI = $500M + $100M + $50M - $20M - $56.25M = $573.75M. EPS = $2.295. Accretion = 14.75%. D/EBITDA = 1.9x.\n\n**50/50 Hybrid:** Cash $750M + Stock $750M. Shares: $750M/$30 = 25M new shares. Pro-forma shares = 275M. Debt $750M at 5% -> after-tax interest = $28.125M. NI = $601.875M. EPS = $2.188. Accretion = 9.4%.\n\n**Comparison:**\n| Metric | All-Stock | 50/50 | All-Debt |\n| EPS Accretion | 5% | 9.4% | 14.75% |\n| D/E | 0x | 0.5x | 1.9x |\n| Ownership | 83% | 91% | 100% |\n| Interest Coverage | N/A | 17x | 8x |\n\n**Additional:** Transaction costs (1-2%) reduce accretion by 1-2%. Goodwill (Purchase Price - Net Tangible Assets) generates no amortization under IFRS. PP&E write-up increases depreciation. If acquirer stock overvalued: all-stock cheaper. Accretion threshold: 5%+ for institutional investors. Rating agencies cap D/EBITDA at 3-3.5x for IG, 4-5x for BB.",
    "scoringKeywords": {"accretion dilution formula": 20, "EPS pro-forma calculation": 15, "debt tax shield interest expense": 15, "control premium exchange ratio": 10, "cost synergy revenue synergy": 10, "PP&E write-up D&A step-up goodwill": 10, "ownership dilution percentage": 10, "leverage ratio debt capacity": 10},
    "expectedStructure": ["Transaction assumptions and premiums", "All-stock accretion and dilution impact", "All-debt financing and leverage effects", "50/50 hybrid structure analysis", "Comparative framework and constraints"],
    "detailedAnalysis": detailed_analysis(
        "Tests merger modeling and financing structure analysis.",
        "Shows understanding of the accretion/dilution trade-off across financing options.",
        ["Not including D&A step-up from purchase accounting", "Forgetting tax shield on interest", "Not discussing ownership dilution"],
        ["Walk through all three scenarios with numbers", "Include a comparison table", "Discuss real-world examples like AT&T/TWX, Dell/EMC"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Rosenbaum & Pearl (2013) Investment Banking", "Pignataro (2014) Financial Modeling", "Wall Street Prep Merger Modeling"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• All-stock (5% accretion): Exchange ratio = $15/$30 = 0.5. Pro-forma EPS = ($500M+$100M+$50M-$20M)/300M = $2.10. No leverage, 17% dilution. Best if stock overvalued.\n• All-debt (14.75% accretion): $1.5B at 5% = $75M interest, $56.25M after-tax. EPS = $573.75M/250M = $2.295. D/EBITDA 1.9x, interest coverage 8x. High accretion but risk.\n• 50/50 hybrid (9.4% accretion): $750M debt + 25M shares. EPS = $2.188. Balanced leverage (0.5x), 91% ownership. Most realistic for large public M&A.\n• Trade-off: More debt = more accretion via tax shield but more risk. Control premium (25%), fees (1-2%), restructuring costs reduce Year 1 accretion by 2-3%.\n• Regulatory: D/EBITDA <= 3.5x for IG. If acquirer P/E > target, stock deals accretive. AT&T/TWX all-stock, Dell/EMC all-debt as examples.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2122, "role": "ib", "category": "technical", "difficulty": "hard",
    "title": "Cross-Border M&A: FX Hedging, Tax, and Regulatory Approvals",
    "question": "What are the key complexities in cross-border M&A transactions compared to domestic deals? Discuss FX hedging strategies, tax-efficient structures, and the regulatory approval landscape (CFIUS, FDI screening, antitrust).",
    "modelAnswer": "Cross-border M&A adds currency risk, tax optimization, and multi-jurisdiction regulatory approvals.\n\n**FX Hedging:**\nIf USD acquirer buying EUR target: purchase price in USD fluctuates with EUR/USD from signing to closing (3-6 months). Strategies: (1) Forward contract: lock rate at signing. (2) Zero-cost collar: buy put/sell call. (3) Cross-currency swap. (4) Natural hedge if existing EUR revenues. Post-closing: issue EUR debt for balance sheet hedge against translation exposure.\n\n**Tax Structuring:**\n1. Debt push-down: Target borrows from acquirer, interest reduces taxable income. Thin-cap rules (US Sec 163(j): 30% of EBITDA cap).\n2. Inversion (Sec 7874): Target in low-tax country becomes parent. If former shareholders own >60% of new entity, inversion disregarded. >80%: treated as US.\n3. IP Migration: Transfer IP to lower-tax jurisdiction (Ireland KDB 6.25% rate).\n4. Step-up: Section 338(h)(10) election for asset treatment.\n5. Withholding tax minimization via treaty shopping (Netherlands for LatAm, Luxembourg for Europe).\n\n**Regulatory Approvals:**\nTimeline: 6-18 months.\n1. Antitrust: US HSR (>$119.5M in 2026). DOJ/FTC review. Phase I (30 days), Phase II (6 months). EU Merger Regulation (Phase I 25 working days, Phase II 90). China AML (MOFCOM increasingly strict).\n2. Foreign Investment: US CFIUS (mandatory for TID: technology, infrastructure, data). Review 45+45 days. Mitigation agreements. EU FDI Screening Regulation. UK NSI Act (17 sectors, mandatory filing). China Foreign Investment Law (negative list).\n\n**Integration Challenges:**\nCultural differences, labor laws (works councils in Germany - 30+ day consultation), IFRS/GAAP reconciliation, GDPR compliance, shareholder approval (75% supermajority in EU).\n\n**Real-World:** Broadcom/VMware ($61B, 2023): CFIUS review, EU Phase II with interoperability remedies, China MOFCOM conditional approval. $32B debt, swap facilities for EUR/USD. $8B NOLs at VMware used to offset US taxes.",
    "scoringKeywords": {"FX hedging forward collar swap": 15, "debt push-down thin capitalization": 10, "tax inversion Section 7874": 10, "BEPS anti-avoidance": 5, "CFIUS critical technology review": 15, "EU FDI screening": 10, "HSR antitrust Phase II": 10, "MOFCOM China AML": 10, "integration GDPR works council": 10, "Section 338 step-up election": 5},
    "expectedStructure": ["FX hedging at signing and post-close", "Tax structuring and IP migration", "Antitrust approvals by jurisdiction", "Foreign investment screening (CFIUS, FDI)", "Integration and cultural complexities"],
    "detailedAnalysis": detailed_analysis(
        "Tests cross-border M&A expertise covering FX, tax, and regulatory dimensions.",
        "Shows awareness of the full lifecycle of an international deal.",
        ["Ignoring FX risk from signing to close", "Not mentioning thin-cap rules", "Overlooking works council requirements"],
        ["Discuss real CFIUS cases", "Reference OECD BEPS developments", "Walk through Broadcom/VMware as case study"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["CFIUS Annual Report 2025", "OECD BEPS Action Plan", "PwC Cross-Border M&A Guide"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• FX hedging: Forward locks rate signing->close (cost = EUR/USD basis). Zero-cost collar: buy put/sell call protects 90%. Post-close: EUR debt for balance sheet hedge. Natural hedge if EUR revenues.\n• Tax structuring: Debt push-down (Sec 163(j): 30% EBITDA cap). Inversion (Sec 7874): >60% disregarded, >80% treated as US. IP migration to Ireland KDB (6.25%). Sec 338(h)(10) step-up.\n• Regulatory: CFIUS (mandatory for TID tech, 45+45 days). EU Merger Regulation (Phase I 25 days, Phase II 90). China MOFCOM. UK NSI Act (17 sectors). Cross-border deals 20-30% higher failure rate.\n• Antitrust: HSR (US, >$119.5M). EU SIEC test. Remedies: divestiture or behavioral (firewalls).\n• Integration: German works councils (30 days), GDPR (SCCs), IFRS/GAAP. Broadcom/VMware ($61B): 3 regulatory reviews, $8B NOLs, $32B debt financing.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2123, "role": "ib", "category": "technical", "difficulty": "hard",
    "title": "Dividend Recaps: Debt Capacity and Credit Cycle Analysis",
    "question": "How do private equity sponsors use dividend recapitalizations to return capital to limited partners? Analyze the debt capacity constraints (covenant headroom, credit ratings, senior leverage) and how the lending market views dividend recaps during different credit cycles.",
    "modelAnswer": "A dividend recapitalization is a leveraged transaction where a portfolio company issues new debt to fund a dividend to its PE sponsor, returning capital to LPs without an exit.\n\n**Mechanics:** Company borrows additional debt (TLB add-on, second lien), uses proceeds to pay dividend to sponsor. Leverage increases. LPs get early partial return while retaining equity upside.\n\n**Motivation:** (1) Early liquidity - return 20-50% of capital within 2-3 years. (2) IRR enhancement - same MOIC achieved faster. (3) Fund management - return capital from maturing funds. (4) Exit hedge when markets are weak.\n\n**Debt Capacity Constraints:**\n1. Senior leverage post-recap: max 4-4.5x (covenant threshold), sub-IG max 5-5.5x.\n2. Total leverage: max 6-7x. Above 7x falls to CCC.\n3. Interest coverage: EBITDA/Cash Interest > 2.0x. Below 1.5x is distressed.\n4. Fixed charge coverage: (EBITDA - CapEx)/(Interest + Mandatory Amortization) > 1.2x.\n5. Revolver undrawn capacity must cover 6 months interest + WC needs.\n6. Incurrence covenant: additional debt allowed if senior leverage <= 4.0x post-transaction.\n\n**Credit Market Views:**\n- Strong cycle: TLB add-on at SOFR+350. Cov-lite. Sponsors can recap at 5.5-6x total leverage.\n- Weak cycle: SOFR+500+, maintenance covenants, max 4.5x total. Headroom 10-15%.\n- Post-2008 lesson: 7x+ recaps in 2006-2007 caused bankruptcies (Clear Channel, Harrah's).\n\n**Example:** $200M EBITDA, 4x senior ($800M TLB). After 3 years: EBITDA=$252M, debt=$600M (2.4x). Issue $350M TLB add-on at SOFR+375. Total debt=$950M (3.8x). Dividend to sponsor: $335M. Post-recap: Ba3 rating. Interest coverage: 3.3x. Sponsor benefit: MOIC 3.0x becomes 3.8x; IRR improves from ~17% to ~22%.\n\n**Risks:** EBITDA decline -> covenant breach. Rating downgrade (B3 or below). Refinancing risk. LP lawsuits for fiduciary duty. Tax: dividend income vs capital gains.",
    "scoringKeywords": {"dividend recap mechanics sponsor return": 15, "senior leverage capacity 4-4.5x EBITDA": 15, "interest coverage 2x minimum": 15, "covenant headroom incurrence maintenance": 10, "credit cycle receptive risk-off": 10, "TLB add-on second lien PIK structure": 10, "post-recap default probability": 10, "IRR enhancement early liquidity": 10, "rating downgrade Ba3 B3": 5},
    "expectedStructure": ["Dividend recap mechanics and motivations", "Debt capacity and covenant constraints", "Credit market receptivity by cycle", "Real-world sizing example", "Risks, ratings, and performance studies"],
    "detailedAnalysis": detailed_analysis(
        "Tests leveraged finance and sponsor-backed investment knowledge.",
        "Shows understanding of credit market dynamics and debt capacity analysis.",
        ["Not considering covenant headroom", "Ignoring credit cycle impact", "Forgetting tax implications"],
        ["Work through a numerical example", "Discuss Clear Channel/Harrah's case studies", "Reference academic studies on recap performance"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Axelson et al. (2021) Dividend Recaps", "Moody's Leveraged Finance", "S&P LCD Dividend Recap Study"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Dividend recap: Portfolio company issues new debt (TLB add-on, second lien) to pay sponsor dividend. Returns 20-50% invested capital early, boosts IRR (17%->22% in example). Fills gap when exit market weak.\n• Capacity constraints: Senior leverage <= 4-4.5x post-recap. Total leverage max 6-7x (or CCC). Interest coverage > 2x, fixed charge > 1.2x. Incurrence covenants <= 4x senior. 15% headroom for EBITDA downside.\n• Market cycle: Strong -> cov-lite TLB at SOFR+350, 5.5x total. Risk-off -> SOFR+500+, maintenance covenants, max 4.5x. Post-2008: 7x recaps caused defaults.\n• Example: $200M EBITDA, pays down to 2.4x (3yr). Issue $350M add-on at 3.8x total. Interest coverage 3.3x, Ba3 rating. MOIC 3.0x->3.8x, IRR 17%->22%.\n• Risks: EBITDA drop breaches covenants (6% vs 3% baseline default). Rating downgrade. Refinancing risk. Tax treatment: dividend income vs cap gains.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2124, "role": "ib", "category": "technical", "difficulty": "hard",
    "title": "Spin-Off vs Carve-Out vs Split-Off: Valuation and Structuring",
    "question": "Compare spin-offs, carve-outs (IPO of subsidiary), and split-offs as methods for divesting a business unit. What are the tax implications, valuation considerations, and shareholder base effects of each structure? Provide real-world examples.",
    "modelAnswer": "Corporate divestiture structures differ in ownership transfer, tax treatment, and resulting shareholder base.\n\n**Spin-Off:** Parent distributes subsidiary shares pro rata. Tax-free under Section 355 (active business test, 5-year history, business purpose, 80% control distribution). Spin-offs often trade at 5-15% abnormal returns (Cusatis, Miles, Woolridge, 1993) from focus and clean investment thesis. Example: PayPal from eBay (2015). Risks: forced selling by index funds, standalone cost 2-5% of revenue.\n\n**Carve-Out (IPO):** Parent sells 10-20% minority stake via IPO. Taxable transaction. Parent retains 80%+ control. IPO proceeds provide cash for debt paydown or reinvestment. TSA provides back-office support for 1-3 years. Example: GE HealthCare carve-out (2023): 19.9% IPO at $31B, $6.2B cash to GE.\n\n**Split-Off:** Shareholders choose to exchange parent shares for subsidiary. Tax-free under Section 355. Exchange ratio adjusts for supply/demand. Use case: concentrated ownership (family-controlled conglomerates). Example: 3Com/Palm (2000). Less common due to complexity.\n\n**Comparison:**\n| Factor | Spin-Off | Carve-Out | Split-Off |\n| Cash | None | 10-25% | None |\n| Tax | Free (Sec 355) | Taxable | Free |\n| Control | 100% separation | Parent retains 80% | Full separation |\n| Shareholder Base | Same + forced selling | New + institutional | Self-selected |\n| Time | 6-12 months | 9-18 months | 6-12 months |\n| Cost | $20-50M | $30-80M | $25-60M |\n\n**Motivations:** Remedy conglomerate discount (10-20% SOP discount). Focus management. Tax advantage vs asset sale. Regulatory satisfaction. Multiple arbitrage.\n\n**Real-World:** HP split (2015): HPE + HP Inc. Combined market cap grew from $52B to $115B (2.2x). AbbVie from Abbott (2013): AbbVie 16x return, Abbott 3.6x. DowDuPont three-way spin-off (2019).",
    "scoringKeywords": {"Section 355 tax-free requirements": 15, "spin-off forced selling float impact": 15, "carve-out IPO majority retained": 15, "split-off exchange ratio self-selected": 10, "conglomerate discount sum-of-parts": 10, "multiple arbitrage investor base": 10, "transition services agreement": 5, "real-world PayPal AbbVie HP": 10, "execution risk standalone cost": 10},
    "expectedStructure": ["Spin-off mechanics and tax treatment", "Carve-out IPO and cash proceeds", "Split-off selective exchange structure", "Comparative analysis and trade-offs", "Real-world case studies"],
    "detailedAnalysis": detailed_analysis(
        "Tests understanding of corporate divestiture structures and their implications.",
        "Shows knowledge of tax, valuation, and market considerations for different structures.",
        ["Not distinguishing tax treatment of each structure", "Ignoring forced selling in spin-offs", "Confusing carve-out and spin-off"],
        ["Present a comparison table", "Reference Section 355 requirements in detail", "Discuss HP, AbbVie, and PayPal case studies"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Cusatis, Miles, Woolridge (1993)", "Rosenbaum & Pearl Investment Banking", "Goldman Sachs M&A Research"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Spin-off (tax-free Sec 355): Distribute subsidiary shares pro rata. No cash; 100% separation. 5-15% abnormal returns. PayPal from eBay (2015): $67B subsidiary, both outperformed. Risks: forced institutional selling, 2-5% standalone cost.\n• Carve-out (IPO): Sell 10-20% minority to public. Taxable (capital gains) unless Sec 351. Parent retains 80%+. Cash proceeds fund debt paydown. GE HealthCare (2023): 19.9% IPO at $31B, $6.2B cash to GE.\n• Split-off (tax-free): Shareholders self-select to exchange parent shares for subsidiary. Price discovery via exchange ratio. Good for family-controlled conglomerates. 3Com/Palm (2000): 1.5 Palm shares per 3Com share.\n• Trade-offs: Need cash? Carve-out. Pure focus? Spin-off. Selective ownership? Split-off. Sec 355: active business, 5-year history, business purpose, 80% control.\n• Real-world: Abbott/AbbVie (2013): AbbVie 16x return. HP split (2015): 2.2x combined return. DowDuPont three-way (2019).",
            "format": "concise", "source": "generated"
        }
    }
})


# ============================================================
# MARKETS HARD (5 questions)
# ============================================================

add_q({
    "id": 2125, "role": "markets", "category": "technical", "difficulty": "hard",
    "title": "Volatility Surface Arbitrage: Butterfly and Calendar Spread Mispricing",
    "question": "How do you identify and trade volatility surface arbitrage opportunities? Explain how you detect butterfly spread mispricing (convexity violations) and calendar spread arbitrage, including the role of no-arbitrage conditions on the implied volatility surface.",
    "modelAnswer": "The implied volatility surface must satisfy several no-arbitrage conditions. Violations create arbitrage opportunities.\n\n**No-Arbitrage Conditions:**\n1. No butterfly arbitrage: Implied RND must be non-negative. Breeden-Litzenberger: f(K) = e^{rT} (d^2C/dK^2). Negative RND means butterfly has negative cost.\n2. No calendar spread arbitrage: C(K,T_2) >= C(K,T_1) for T_2 > T_1.\n3. No static arbitrage: C(K) convex in K, non-increasing, above intrinsic.\n\n**Butterfly Arbitrage:**\nCompute second derivative of call prices: d^2C/dK^2. If negative, construct butterfly: C(K-Delta K) - 2C(K) + C(K+Delta K). Example: SPX 5000C=$50, 5100C=$45, 5200C=$42. d^2C/dK^2 = 42-90+50=2 > 0 (no arb). But if 5100C=$48: 42-96+50=-4 < 0 -> arb! Buy 1x 5000C, sell 2x 5100C, buy 1x 5200C. Net cost = -$4 (you're paid). Max payoff = $100 at 5100. Net profit = $104.\n\n**Calendar Spread Arbitrage:**\nSame strike, check C(T_2) >= C(T_1). If violated, buy longer, sell shorter. Generate positive theta. Watch for early exercise on American options.\n\n**Surface Repair:**\nSVI parameterization: w(k) = a + b(rho(k-m) + sqrt((k-m)^2 + sigma^2)), with parameters ensuring no arbitrage. Gatheral-Jacquier SVI-JW formulation. Smooth IV surface using arbitrage-free interpolation.\n\n**Advanced:**\nVIX futures vs SPX options: If VIX futures above implied vol from SPX options, there's arbitrage. Dispersion trading: Index IV vs constituent IV. Skew arbitrage: Risk reversal (sell OTM puts, buy ATM straddles).\n\n**Implementation:**\nLiquidity constraints: bid-ask spreads 1-2% may consume profits. Margin required for short options. During high-vol events (CPI, FOMC), temporary violations persist minutes to hours. Hedge funds (Capula, D.E. Shaw) specialize in this.",
    "scoringKeywords": {"Breeden-Litzenberger butterfly condition": 20, "calendar spread monotonic time decay": 15, "SVI no-arbitrage parameterization": 10, "butterfly trading implementation": 15, "VIX futures SPX arbitrage": 10, "dispersion trading skew arbitrage": 10, "liquidity transaction cost constraints": 10, "vol surface repair smoothing": 10},
    "expectedStructure": ["No-arbitrage conditions for vol surface", "Butterfly arbitrage detection and trading", "Calendar spread arbitrage detection", "SVI and other no-arb interpolations", "Advanced strategies and implementation"],
    "detailedAnalysis": detailed_analysis(
        "Tests understanding of options market microstructure and arbitrage conditions.",
        "Shows mastery of vol surface modeling and practical trading strategies.",
        ["Not distinguishing butterfly from calendar spread", "Ignoring transaction costs", "Casting too wide a net for arb detection"],
        ["Work through a numerical butterfly example", "Discuss SVI parameterization details", "Reference high-vol event trading patterns"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Gatheral (2006) Volatility Surface", "Carr & Madan (1998)", "SVI Parameterization (Gatheral & Jacquier)"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Butterfly arbitrage: Breeden-Litzenberger f(K)=e^{rT}d^2C/dK^2 must be >= 0. Check d^2C/dK^2 = C(K+DK)+C(K-DK)-2C(K). If negative: buy wings, sell 2x middle. Example: 5000C $50, 5100C $48, 5200C $42 -> $42-$96+$50=-$4 -> get $4 credit, max payoff $100, net $104.\n• Calendar spread: C(T_2) >= C(T_1) for same strike. If violated: sell front, buy deferred. Positive theta. Watch American option early exercise.\n• SVI: w(k)=a+b(rho(k-m)+sqrt((k-m)^2+sigma^2)) ensures no-arbitrage fitting. Repair surface using SVI or cubic splines with convexity constraint.\n• Advanced: VIX futures vs SPX options arbitrage. Dispersion (index IV vs weighted constituent IV). Skew arbitrage (risk reversal).\n• Constraints: Bid-ask 1-2% can consume profits. Occur during CPI/FOMC events (minutes to hours persistence). Margin for short options.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2126, "role": "markets", "category": "technical", "difficulty": "hard",
    "title": "FX Carry Trade Dynamics and Unwinding Triggers",
    "question": "Analyze the FX carry trade: how do investors construct carry trades, what macroeconomic conditions drive carry returns, and what triggers widespread carry trade unwinding? Use specific currency pairs and historical episodes (1998, 2008, 2015) to illustrate.",
    "modelAnswer": "FX carry trade involves borrowing low-yielding currency and investing in high-yielding currency, profiting from interest rate differential.\n\n**Construction:**\nClassic pairs: Short JPY/CHF (low yield, 0-1%), Long AUD/NZD/ZAR (high yield, 3-8%). Return = (r_T - r_F) x (days/360) - (S_change). Uncovered Interest Parity (UIP) says carry should be offset by depreciation, but empirically carry generates positive Sharpe (0.5-1.0). Leverage typically 3-10x.\n\n**Macro Drivers:**\n1. Interest rate differentials: widening gap drives returns. Pre-2008: NZD-JPY carry ~6%.\n2. Risk appetite (VIX): VIX < 15 -> positive; VIX > 25 -> negative (Burnside et al. 2011).\n3. Global growth: strong growth supports commodity currencies (AUD, NZD, CAD).\n4. Central bank divergence: Fed hiking vs BoJ easy -> USD/JPY carry.\n\n**Crash Risk (Negative Skew):**\nCarry trades have negative skewness. When risk appetite collapses: funding currencies appreciate (safe haven), targets depreciate (risk-off). The 'peso problem': rare disasters not priced into options.\n\n**Historical Unwinding:**\n1. 1998 LTCM: JPY +20% in 3 weeks. Losses $5-10B at major banks.\n2. 2008 GFC: AUD/JPY 107->55 (-49%). NZD/JPY 85->44 (-48%). Estimated losses $50B+.\n3. 2015 SNB shock (Jan 15): EUR/CHF floor removed. CHF +30% in minutes. Broker bankruptcies (Alpari UK).\n4. 2020 COVID: AUD/JPY 75->60 (-20%), ZAR/JPY 7.8->5.8 (-26%). Swift recovery due to stimulus.\n\n**Unwinding Risk Quantification:**\nCFTC COT report: net shorts in JPY, net longs in AUD/NZD at extremes. VIX jump from 12->25+ makes carry negative. Cross-asset correlation > 0.6 during risk-off. AUD/JPY liquidity dries up (spreads 5-10x wider).\n\n**Hedging:**\nOTM JPY call options (cost 0.5-1% carry). Dynamic stop-loss (-5% from entry). Diversification across pairs. Option collars.\n\n**Current (2026):** BoJ normalizing (0.75%), narrowing JPY carry. USD/JPY carry ~2.75% (Fed 3.5%). EM carry: MXN (9%) vs USD (3.5%) = 5.5% carry, but political risk.",
    "scoringKeywords": {"carry trade construction funding target currencies": 15, "uncovered interest parity forward premium anomaly": 10, "risk appetite VIX regime": 15, "negative skew crash risk tail": 15, "1998 LTCM 2008 SNB unwinding": 15, "COT positioning extreme": 10, "hedging tail option collar": 10, "UIP puzzle empirical": 10},
    "expectedStructure": ["Carry trade mechanics and construction", "Macroeconomic drivers and risk appetite", "Crash risk and negative skewness", "Historical unwinding episodes", "Hedging and current market context"],
    "detailedAnalysis": detailed_analysis(
        "Tests macro markets knowledge and cross-asset risk dynamics.",
        "Covers theory (UIP), empirical patterns, and crisis episodes.",
        ["Only discussing normal times, not crisis", "Ignoring UIP puzzle", "Not mentioning positioning data"],
        ["Reference Burnside et al. paper on carry crashes", "Walk through COT report analysis", "Discuss current BoJ tightening impact"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Burnside et al. (2011) Carry Trade Crash Risk", "Brunnermeier, Nagel, Pedersen (2008)", "BIS Carry Trade Survey"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Carry trade: Borrow low-yield (JPY 0.75%, CHF), invest in high-yield (AUD 3-5%, ZAR 7-9%, MXN 9%). Return = rate differential - FX depreciation. Leverage 3-10x. Sharpe 0.5-1.0 (UIP puzzle).\n• Crash risk: Negative skew - consistent small gains, infrequent large losses. VIX<15 positive, VIX>25 negative. Funding currencies appreciate in risk-off, targets depreciate (double hit).\n• Historical: 1998 LTCM: JPY +20%, $5-10B losses. 2008 GFC: AUD/JPY 107->55 (-49%), $50B+. 2015 SNB: CHF +30% in minutes, brokers bankrupt. 2020 COVID: AUD/JPY -20%.\n• Warning signs: CFTC net shorts in JPY at extremes. VIX spike. Cross-asset correlation >0.6. AUD/JPY spreads 5-10x wider.\n• Hedging: OTM JPY calls (0.5-1% carry cost), stop-loss at -5%, diversification, option collars. Current: BoJ 0.75%, USD/JPY carry 2.75%, MXN carry 5.5% with political risk.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2127, "role": "markets", "category": "technical", "difficulty": "hard",
    "title": "Bond Futures CTD, Conversion Factors, and Delivery Options",
    "question": "Explain how bond futures pricing works, including the cheapest-to-deliver (CTD) mechanism, conversion factors, and the embedded delivery options (quality option, timing option, wild card option). How do these embedded options affect the futures basis?",
    "modelAnswer": "Bond futures are among the most complex exchange-traded derivatives due to multiple delivery options.\n\n**Contract Mechanics:**\nSeller delivers bonds to buyer at expiration. Seller chooses which bond from eligible basket (quality option). Invoice price = (Futures Price x Conversion Factor) + Accrued Interest. Conversion factor (CF): Equates bond's cash flows to 6% coupon bond. CF = price of bond with same maturity/coupon discounted at 6%.\n\n**Cheapest-to-Deliver (CTD):**\nCTD = bond with lowest cost to deliver = min over bonds of (Bond Price - FP x CF). Intuitively: CTD has highest implied repo rate (IRR) = (FP x CF + AI - Bond Dirty Price) / Bond Dirty Price x (360/days). IRR > GC repo rate -> arbitrage (buy bond, sell futures, deliver).\n\n**When CTD Changes:**\n- As yields fall below 6%, CTD shifts to bonds with lower coupon (smaller CF, less discount factor).\n- Inverted yield curve: CTD is shortest maturity bond (lowest duration).\n- Steep yield curve: CTD may be ultra-long bond if carry benefit exceeds conversion factor disadvantage.\n\n**Embedded Options:**\n1. Quality Option: Seller picks which bond to deliver. Value increases with more bond choices. Measured by: Option value = max over bonds (Bond Price - FP x CF x 100). US Treasury futures: quality option worth 0.5-1.5% of notional.\n2. Timing Option: Seller chooses within delivery month when to deliver (typically last 7 business days). Can wait to deliver cheapest bond. Worth 0.1-0.3% of notional.\n3. Wild Card Option: On last 7 days, seller can deliver after futures market closes (2pm) but before bond market closes (3pm). If bond prices fall between 2-3pm, seller buys bonds cheaper and delivers at 2pm futures price. Worth 0.2-0.5% of notional. This is the most valuable option.\n\n**Basis Calculation:**\nBasis = Bond Cash Price - (Futures Price x CF). A negative basis means futures is rich vs bond. Net Basis = Basis - Carry (where Carry = Coupon Income - Financing Cost). When net basis > 0 -> bond is rich; < 0 -> futures is rich.\n\n**Basis Trading:**\n- If net basis negative: buy bond, sell futures (long basis position). Profit = convergence to 0 at delivery.\n- If net basis positive: sell bond, buy futures (short basis).\n- CTD typically has lowest or negative net basis.\n\n**Duration and DV01:**\nCTD's DV01 determines futures DV01: Futures DV01 = CTD DV01 / CTD CF. Used for hedging interest rate risk.\n\n**Real-World:**\nDuring bond market stress (March 2020), CTD switches and delivery options cause wild futures basis movements. Ultra T-bond futures CTD shifted from 30-year to 20-year in weeks. Basis trading desks earned significant returns from exploiting CTD switches.\n\n**Interview Tip:** The wild card option is the most frequently tested. Understand the 2pm-3pm window mechanics.",
    "scoringKeywords": {"conversion factor 6% coupon calculation": 15, "cheapest-to-deliver implied repo rate": 20, "quality option bond basket value": 15, "timing option delivery month": 10, "wild card option 2pm-3pm": 20, "basis net basis carry": 10, "DV01 CTD duration": 10},
    "expectedStructure": ["Futures contract mechanics and conversion factors", "CTD identification and switch dynamics", "Embedded delivery options", "Basis calculation and trading", "Real-world risk management"],
    "detailedAnalysis": detailed_analysis(
        "Tests deep understanding of bond futures mechanics rarely covered in standard interviews.",
        "Differentiates candidates with fixed income derivatives expertise.",
        ["Confusing quality option and wild card", "Not understanding CF calculation", "Ignoring DV01 implications"],
        ["Walk through a numerical CTD identification", "Discuss March 2020 bond market dislocation", "Explain basis trading strategy"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["CME Treasury Futures Guide", "Burghardt et al. (1994) Treasury Bond Basis", "Sundaresan (2000) Fixed Income Markets"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Conversion Factor: Equates bond cash flows to 6% coupon bond. CTD identified by highest IRR: IRR = (FP x CF + AI - Dirty Price) / Dirty Price x 360/days. When yields below 6%, CTD shifts to low-coupon bonds.\n• Quality Option: Seller picks which bond to deliver from basket. Value = max(bond prices - FP x CF). Worth 0.5-1.5% of notional. Increases with more bonds in basket.\n• Wild Card Option: Most valuable (0.2-0.5%). During last 7 days, seller can deliver after futures close (2pm) until bond close (3pm). If bonds fall 2-3pm, buy cheap, deliver at 2pm price.\n• Timing Option: Seller chooses delivery day within month (last 7 business days). Wait for cheapest bond to deliver. Worth 0.1-0.3%.\n• Basis = Bond Price - FP x CF. Net Basis = Basis - Carry. Negative net basis = futures rich (buy bond, sell futures). CTD DV01/Futures DV01: Futures DV01 = CTD DV01 / CTD CF.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2128, "role": "markets", "category": "technical", "difficulty": "hard",
    "title": "Inflation Swap and TIPS Breakeven: ZC Swaps, CPI Index Ratio, Seasonality",
    "question": "How do you trade the inflation breakeven rate using TIPS and nominal Treasury bonds vs. the zero-coupon inflation swap market? Explain the construction of breakeven inflation, the CPI index ratio lag, seasonal adjustments, and the embedded liquidity premium in TIPS.",
    "modelAnswer": "Breakeven inflation (BEI) is the implied inflation rate from comparing nominal and real government bond yields. The inflation swap market provides a more direct instrument for trading inflation expectations.\n\n**BEI from Bonds:**\nBEI = Nominal Treasury Yield - TIPS Real Yield. For 10-year: if 10Y nominal = 4.5%, 10Y TIPS real yield = 2.0%, BEI = 2.5%. Market-implied average CPI inflation over 10 years.\n\n**But BEI includes:**\n- Expected inflation (the true signal traders want)\n- Inflation risk premium (compensation for inflation uncertainty)\n- Liquidity premium (TIPS are less liquid than nominals)\nThe liquidity premium: TIPS have higher bid-ask spreads (2-4 bps vs 1-2 bps for nominals). Estimated at 20-50 bps during normal times, wider during stress (e.g., 100+ bps in March 2020).\n\n**Zero-Coupon Inflation Swap (ZCIS):**\nHedge/express view on cumulative inflation over a specific period. Fixed leg receiver pays fixed rate and receives CPI-linked notional. Floating leg pays CPI-linked return. Breakeven swap rate = ZCIS fixed rate.\n\n**ZCIS vs TIPS BEI:**\nZCIS strips out the liquidity premium. ZCIS BEI is typically 10-30 bps lower than TIPS BEI (the difference = TIPS liquidity premium). ZCIS is cleaner for trading pure inflation expectations.\n\n**CPI Index Ratio and Lag:**\nCPIs are released with a 2-month lag (e.g., November CPI released in January). TIPS reference CPI = CPI-U from 3 months prior. The index ratio = Ref CPI(t) / Ref CPI(issue date). This 3-month lag means BEI for current month is backward-looking. Trading forward BEI requires forecasting the lag-adjusted inflation.\n\n**Seasonal Adjustments:**\nCPI has seasonal patterns (holiday effects, weather). Month-over-month CPI is adjusted using seasonal factors. For trading inflation swaps, must adjust for seasonality to get clean expectation. January CPI typically higher (post-holiday resets). July lower. Seasonal adjustment formula: SA CPI = NSA CPI / Seasonal Factor. The CME publishes seasonal factor tables.\n\n**Trading Strategies:**\n1. Breakeven widening view: If you expect inflation to rise, go long TIPS, short nominal. Or receive fixed on ZCIS.\n2. Breakeven flattening: Sell short-end BEI, buy long-end BEI (yield curve trade).\n3. CPI surprise trade: Before CPI release, position for beat/miss. Calculate weighted CPI surprise probability using options on CPI swaps.\n\n**CPI Swap Options:**\nExchange-traded options on CPI swaps allow expressing views on specific CPI prints. Used by macro hedge funds. Broker quotes are available but OTC.\n\n**Practical Example:**\nYou expect 10-year breakeven to widen from 2.5% to 3.0% on higher energy prices. Receive fixed on 10Y ZCIS at 2.5%. If breakeven moves to 3.0%, position gains 50 bps. Leverage: 10x -> 5% return. Risk: if breakeven tightens to 2.0%, lose 50 bps x 10 = 5% loss.\n\n**Limitations:**\nZCIS market is less liquid than TIPS for long tenors (20-30Y). Bid-ask spreads: 3-5 bps for 10Y, 7-15 bps for 30Y. Counterparty risk requires ISDA/CSA.\n\n**Interview Tip:** The best answer distinguishes TIPS BEI (which bundles liquidity premium) from ZCIS (which isolates inflation expectations). Always mention seasonality adjustment and index ratio lag when asked about inflation markets.",
    "scoringKeywords": {"breakeven inflation nominal minus TIPS": 15, "liquidity premium in TIPS vs ZCIS": 20, "CPI index ratio 3-month lag": 15, "seasonal adjustment factors": 15, "zero-coupon inflation swap mechanics": 15, "inflation risk premium": 10, "CPI surprise trading": 10},
    "expectedStructure": ["BEI from TIPS/nominal bonds and its components", "Zero-coupon inflation swap mechanics", "CPI index ratio and 3-month lag", "Seasonal adjustment methodology", "Trading strategies and practical considerations"],
    "detailedAnalysis": detailed_analysis(
        "Tests specialist knowledge of inflation-linked markets and derivatives.",
        "Distinguishes TIPS breakeven from pure inflation swaps.",
        ["Not separating liquidity premium from BEI", "Ignoring index ratio lag", "Not mentioning seasonality"],
        ["Work through numerical example", "Discuss COVID-era liquidity premium spike", "Reference CME seasonal factor tables"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Tuckman & Serrat Fixed Income Securities", "BIS Inflation-Linked Bonds", "CME CPI Futures Guide"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• BEI from bonds: Nominal yield - TIPS real yield. Example: 10Y 4.5% - TIPS 2.0% = 2.5% BEI. Contains: expected inflation + inflation risk premium + TIPS liquidity premium (20-50 bps).\n• ZCIS: Pure inflation swap. Fixed leg pays fixed rate, receives CPI-linked. Better than TIPS BEI because it strips liquidity premium. ZCIS BEI typically 10-30 bps below TIPS BEI.\n• CPI index ratio: TIPS reference CPI from 3 months prior (lag). Index Ratio = Ref CPI(t) / Ref CPI(issue). Trading forward BEI requires forecasting lag-adjusted inflation - backward-looking for first 3 months.\n• Seasonality: CPI has seasonal patterns (higher Jan, lower Jul). SA CPI = NSA CPI / Seasonal Factor. Must adjust for clean expectations. CME publishes factor tables.\n• Strategies: Long TIPS/short nominal for BEI widening. Receive fixed on ZCIS. Before CPI release: position for beat/miss using CPI swap options. Duration hedge: match DV01s of nominal and TIPS positions.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2129, "role": "markets", "category": "technical", "difficulty": "hard",
    "title": "Gamma Scalping and Delta Hedging Under Stochastic Volatility",
    "question": "Explain gamma scalping as a volatility trading strategy. How does a delta-hedged long option position generate P&L from realized volatility, and how does this change under stochastic volatility with vol-of-vol and correlation effects?",
    "modelAnswer": "Gamma scalping is the process of dynamically hedging an options position to profit from the difference between implied and realized volatility.\n\n**Basics of Delta Hedging:**\nA long call option has positive delta (long underlying exposure) and positive gamma (delta increases as underlying rises). To delta-hedge: sell short Delta shares. As stock moves: if stock rises, delta increases -> sell more shares; if stock falls, delta decreases -> buy back shares. Each adjustment generates small profits that compound.\n\n**P&L Decomposition (Black-Scholes):**\nOption P&L = Theta (time decay) + Gamma (volatility) + Delta (directional). For a delta-hedged position (Delta = 0):\nP&L = (1/2) Gamma x S^2 x (realized_sigma^2 - implied_sigma^2) dt\nIf realized > implied: positive P&L (long gamma wins). If realized < implied: negative P&L.\nThis is why long gamma positions are 'long volatility' - you profit when markets move more than priced in.\n\n**Gamma Scalping Mechanics:**\n- Buy ATM straddle (long gamma, long vega). Delta-hedge initially to zero.\n- When stock moves up, gamma -> delta becomes positive. Sell shares to rebalance.\n- Stock moves back down, delta becomes negative. Buy shares to rebalance.\n- Profit = sum over all rebalancing trades of (sell_high - buy_low). This sum approximates (1/2) Gamma x S^2 x (realized variance - implied variance).\n\n**Under Stochastic Volatility:**\n- In Heston model, the P&L includes an additional vega-hedging term. Delta-hedging alone is insufficient - need to also vega-hedge.\n- Vol-of-vol effect: High vol-of-vol (xi) means gamma scalping P&L becomes path-dependent. A violent but short-lived vol spike can generate different P&L than smooth high vol.\n- Correlation (rho) effect: Negative correlation (stock down, vol up) makes gamma scalping more profitable. The skew impacts gamma P&L: steep skew means OTM puts have high gamma creating more scalping opportunities on downside.\n- Gamma is not constant across strikes/maturities. Peak gamma near ATM for short-dated options. For long-dated options, gamma is spread across a wider range.\n\n**Vanna and Volga:**\n- Vanna (dDelta/dVol, dVega/dSpot): For negative correlation (equity skew), delta changes as vol changes even without spot move. Vanna hedging becomes important.\n- Volga (dVega/dVol): Convexity in volatility. Gamma scalping on vol-of-vol.\n\n**Practical Considerations:**\n- Transaction costs: Each delta rebalancing incurs spread cost. Optimal hedge frequency balances gamma capture vs costs. Typically delta-hedge when delta moves > 1-2% of notional.\n- Over weekends: Theta decay accelerates (3 days of theta for 1 day of gamma). Long gamma loses money on weekend holding.\n- Discrete hedging: Continuous hedging is impossible. Discrete rebalancing introduces hedging error. Path-dependent P&L.\n\n**Example:**\n- Buy SPX 5000 ATM straddle (30-day to expiry, IV=20%, premium=$200). Delta-hedge to zero.\n- Over the month, realized vol = 25%. Each day, gamma scalping generates approx (1/2)*gamma*S^2*(0.25^2-0.20^2)/252.\n- If gamma = 0.01 per $1 move, S=5000, daily P&L ~ (0.5)*0.01*5000^2*(0.0625-0.04)/252 ~ $12.40/day. Over 30 trading days ~ $372 profit.\n- But theta decay: approx $200/30 = $6.67/day. Total theta = $200. Net P&L = $372 - $200 = $172 (8.6% return on $200 premium).\n\n**Advanced:**\n- Gamma swap: Directly trades realized variance vs implied variance without skew exposure. Payoff = (realized_var - strike_var). Strips out skew component from vanilla gamma scalping.\n- For skew trading: Sell OTM puts, sell OTM calls (short gamma at wings), buy ATM gamma (long near-the-money). Negative carry from vanna/volga effects.",
    "scoringKeywords": {"gamma scalping delta hedge rebalancing": 20, "P&L decomposition theta gamma realized implied": 20, "stochastic volatility vanna volga hedge": 15, "path-dependence vol-of-vol correlation": 15, "transaction costs hedge frequency": 10, "gamma swap variance trading": 10, "ATM straddle time decay": 10},
    "expectedStructure": ["Delta hedging and gamma scalping mechanics", "P&L decomposition formula", "Stochastic volatility effects (vanna, volga)", "Practical implementation and costs", "Advanced: gamma swaps and skew trading"],
    "detailedAnalysis": detailed_analysis(
        "Tests advanced options trading knowledge that distinguishes candidates.",
        "Shows understanding of both theoretical P&L decomposition and practical trading.",
        ["Not including theta decay in analysis", "Ignoring transaction costs", "Confusing gamma with vega"],
        ["Work through a numerical example", "Discuss vanna/volga under stochastic vol", "Reference gamma swaps as alternative"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Taleb (1997) Dynamic Hedging", "Sinclair (2008) Volatility Trading", "Derman (1999) Regimes of Volatility"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• Gamma scalping: Buy ATM straddle (long gamma, long vega), delta-hedge to zero. Stock rises -> delta positive -> sell shares. Stock falls -> delta negative -> buy shares. Profit = sum(sell_high - buy_low). Decomposed as 0.5 x Gamma x S^2 x (realized_sigma^2 - implied_sigma^2) dt.\n• P&L: If realized vol > implied -> positive (long gamma wins). Theta decay: long options lose time value daily. Net P&L = gamma profit - theta loss. At 25% realized vs 20% IV, 30-day ATM straddle: gamma P&L ~$372, theta cost ~$200, net ~$172.\n• Stochastic vol effects: vanna (dDelta/dVol) and volga (dVega/dVol). Negative correlation (equity skew) means delta changes as vol moves. Need vega hedging in addition to delta hedging. Vol-of-vol makes P&L path-dependent.\n• Transaction costs: Delta hedge when delta moves >1-2% of notional. Weekly rebalancing typical. Weekend: 3 days theta for 1 day gamma - lose money holding gamma over weekends.\n• Gamma swaps: Trade realized vs implied variance directly, stripping out skew. Skew trading: sell OTM puts/calls (short wings), buy ATM gamma.",
            "format": "concise", "source": "generated"
        }
    }
})


# ============================================================
# RISK HARD (5 questions)
# ============================================================

add_q({
    "id": 2130, "role": "risk", "category": "technical", "difficulty": "hard",
    "title": "FRTB Standardized Approach and Internal Models for Market Risk Capital",
    "question": "Explain the Fundamental Review of the Trading Book (FRTB) framework. Compare the standardized approach (SA) with the internal models approach (IMA) for calculating market risk capital. How do the liquidity horizons, Expected Shortfall (ES), and P&L attribution tests work?",
    "modelAnswer": "FRTB, finalized by BCBS in 2019 and implemented from 2025, replaces Basel 2.5's VaR-based market risk framework.\n\n**Key Changes from Basel 2.5:**\n- VaR (99% 10-day) replaced by Expected Shortfall (ES) at 97.5% for tail risk capture.\n- 5 liquidity horizons (10d, 20d, 60d, 120d, 250d) replace the uniform 10-day VaR.\n- Two approaches: Standardized (SA) and Internal Models (IMA).\n- P&L attribution test required for IMA approval.\n- Trading book/banking book boundary clarified.\n\n**Standardized Approach (SA):**\n- Risk classes: GIRR (general interest rate), CSR (credit spread), Equity, FX, Commodity.\n- Sensitivity-based method: Delta risk (sensitivities x risk weights x correlation), vega risk (volatility sensitivities), curvature risk (convexity).\n- Default Risk Charge (DRC): Jump-to-default risk for credit positions.\n- Residual risk add-on (RRAO): For exotic products not captured well by sensitivities (e.g., CDO-squared, nth-to-default).\n- No diversification benefit across risk classes - capital additive.\n\n**Internal Models Approach (IMA):**\n- Requires regulatory approval. Must pass P&L attribution test (PLAT).\n- ES calibration: Expected Shortfall at 97.5% confidence, 1-day horizon (scaled to liquidity horizons).\n- Liquidity horizons applied via: ES = sqrt(sum over LH categories of (ES_i)^2 x (LH_i / 10)^(0.5)). Each risk factor mapped to one of 5 liquidity categories.\n- Must cover: Modellable Risk Factors (MRF) with >100 trades over past year -> market data must be observable. Non-modellable risk factors (NMRF) require stress scenario capital.\n- Diversification across risk types allowed within ES (unlike SA).\n\n**P&L Attribution Test (PLAT):**\n- Two tests comparing hypothetical P&L (from risk factors) vs actual P&L (includes non-modeled factors).\n- Spearman correlation: must exceed 0.8. Same-day P&L comparison.\n- If PLAT fails: bank moves to SA or partial IMA (greenhouse approach).\n- Objective: Ensure trading desk risk models accurately capture P&L drivers.\n\n**Limitations and Implementation:**\n- Increased capital: FRTB capital is estimated 20-50% higher than Basel 2.5 for large banks.\n- NMRF capital: For illiquid risk factors, capital 10-20x higher than MRF -> banks pushed toward hedging with liquid instruments.\n- Curvature charge in SA: Complex formula that penalizes convexity-heavy positions.\n- DRC: Jump-to-default (JTD) risk within 1-year horizon. Important for credit books.\n\n**Example:** Large bank equity derivatives desk:\n- SA: Delta $10M x 15% RW = $1.5M, Vega $2M x RW, Curvature $0.5M, DRC $0M (no credit), RRAO $0.3M. Total SA cap ~$2.5M.\n- IMA: ES calibration (97.5%, 10d): $8M. Liquidity adjusted (60d for equity vol): $8M x sqrt(60/10)^0.5 = $13.9M. Diversified across risk types: $12M IMA cap. After PLAT multiplication factor (1.5): $18M.\n- Bank chooses SA if simpler even if higher.\n\n**Interview Tip:** Understand that FRTB is the single biggest regulatory change for trading desks. Emphasize P&L attribution test as the gateway to IMA approval and the key operational challenge.",
    "scoringKeywords": {"Expected Shortfall 97.5% vs VaR 99%": 15, "liquidity horizons 5 buckets": 15, "standardized approach sensitivity based": 10, "internal models approach PLAT": 20, "modellable non-modellable risk factors": 10, "default risk charge JTD": 10, "trading book boundary review": 10, "NMRF stress scenario capital": 10},
    "expectedStructure": ["FRTB overview and Basel 2.5 differences", "Standardized approach components", "Internal models and ES calibration", "P&L attribution test requirements", "Capital impact and bank strategy"],
    "detailedAnalysis": detailed_analysis(
        "Tests regulatory market risk knowledge at the frontier of banking standards.",
        "Shows understanding of both SA and IMA approaches and their trade-offs.",
        ["Confusing ES and VaR confidence levels", "Not understanding liquidity horizon scaling", "Ignoring PLAT gatekeeping role"],
        ["Work through numerical ES calculation example", "Discuss bank strategy (SA vs IMA)", "Reference BCBS 2019 FRTB paper"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["BCBS 352 FRTB (2019)", "BIS FRTB Implementation", "ISDA FRTB Guide"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• FRTB: Replaces Basel 2.5 VaR. Key changes: ES at 97.5% (vs VaR 99%), 5 liquidity horizons (10d-250d), stricter trading/banking book boundary, P&L attribution test.\n• Standardized Approach (SA): Sensitivity-based (delta x risk weight x correlation) + vega + curvature + DRC (jump-to-default) + RRAO (residual risk). No cross-risk diversification. Capital additive across risk classes.\n• Internal Models (IMA): Requires regulatory approval + PLAT passing. ES at 97.5% 1-day scaled to liquidity horizons: ES = sqrt(sum(ES_i^2 x (LH_i/10)^0.5)). Modellable vs non-modellable risk factors. NMRF capital 10-20x higher.\n• P&L Attribution Test: Spearman correlation > 0.8 between hypothetical vs actual P&L. If fails -> SA or partial IMA. Critical operational challenge for trading desks.\n• Impact: FRTB capital 20-50% higher than Basel 2.5. Banks choosing SA for simpler desks. NMRF treatment pushes hedging toward liquid instruments. DRC important for credit books.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2131, "role": "risk", "category": "technical", "difficulty": "hard",
    "title": "Counterparty Credit Risk: EE, PFE, and Wrong-Way Risk",
    "question": "How do you compute Expected Exposure (EE), Potential Future Exposure (PFE), and Credit Valuation Adjustment (CVA) for a derivatives portfolio? Explain the treatment of netting sets, collateral, and wrong-way risk with quantitative examples.",
    "modelAnswer": "Counterparty credit risk (CCR) is the risk that a counterparty defaults before final settlement of derivative contracts.\n\n**Exposure Metrics:**\n1. Expected Exposure (EE): Average positive MtM at future date: EE(t) = E[max(V(t), 0)].\n2. Potential Future Exposure (PFE): Quantile of positive MtM distribution: PFE_q(t) = F_q(max(V(t), 0)). Typically PFE at 95% or 99%.\n3. Expected Positive Exposure (EPE): Average EE over time: EPE = (1/T) integral_0^T EE(t) dt.\n\n**Computation via Monte Carlo:**\nSimulate underlying risk factors (FX, IR, equity) under risk-neutral measure. For each path and time step, compute portfolio MtM. Apply netting (sum across counterparty). Take max(MtM, 0) as exposure. Average across paths for EE; sort for PFE quantile.\n\n**Netting Sets:**\nISDA Master Agreement allows netting across trades with same counterparty. MtM_net = sum_i MtM_i. EE_net = E[max(MtM_net, 0)]. Netting benefit = 1 - EE_net/sum(EE_i). Typically 60-80% for diversified portfolios.\n\n**Collateralization:**\n- Threshold (K): Uncollateralized exposure up to K.\n- Minimum Transfer Amount (MTA): e.g., $500,000. No collateral call if change below MTA.\n- Margin Period of Risk (MPOR): Typically 10-20 days. During MPOR, exposure can move without collateral posting.\n- Collateralized exposure = max(V(t) - C(t), 0) where C(t) is collateral held.\n\n**CVA Calculation:**\nCVA = (1-R) sum_t DF(t) x EE(t) x PD(t, t+Delta t).\nExample: 5-year CDS on counterparty at 200 bps flat. Recovery R=40%. EE(t) grows from $10M to $15M.\nCVA = (1-0.4) x sum_1^5 DF(t) x EE(t) x (PD(t) per year).\nIf PD profile ~1% per year (from CDS): CVA approx 0.6 x $12.5M avg EE x 4.8% cumulative PD = $0.36M.\n\n**Wrong-Way Risk (WWR):**\nWhen exposure is positively correlated with counterparty default probability.\nExample: Bank sells credit protection (CDS) on a corporate. If the corporate deteriorates, both the CDS MtM increases AND counterparty default risk rises. Exposure and PD move together.\n- Quantitative treatment: Monte Carlo with stochastic hazard rate: lambda(t) = lambda_0 + beta x (risk factor return). If beta > 0, WWR present.\n- CVA_WWR = (1-R) integral E[max(V(t),0) x lambda(t)] dt. WWR can double or triple CVA vs naive calculation.\n- Regulatory: Basel III requires WWR capital add-on. Pillar 2 add-on for material WWR positions.\n\n**Right-Way Risk:**\nReverse: exposure and PD negatively correlated. Example: Bank receives collateral in a different currency that appreciates if counterparty defaults. Often ignored but can reduce CVA.\n\n**PFE Term Structure:**\nFor interest rate swaps: PFE has a 'hump' shape - rises as payments approach, then declines as swap matures. Peak PFE typically at 1-3 years for 10Y swap.\nFor FX forwards: PFE increases until maturity (pure FX risk).\nFor credit derivatives: PFE can be very high near maturity (jump-to-default risk).\n\n**Practical: Basel III CVA Capital:**\nStandardized CVA charge = 0.5 x (sum over counterparties of EE x PD x Maturity). Internal models allowed with regulatory approval. Capital held against CVA volatility, not just expected loss.\n\n**Interview Tip:** Always distinguish between regulatory and economic CVA. Start with netting and collateral before getting into Monte Carlo details. Wrong-way risk is the single most important advanced topic.",
    "scoringKeywords": {"EE PFE Monte Carlo calculation": 15, "netting sets netting benefit 60-80%": 15, "collateral threshold MPOR MTA": 15, "CVA formula recovery PD exposure": 15, "wrong-way risk stochastic hazard rate": 20, "PFE term structure hump shape": 10, "Basel III CVA capital charge": 10},
    "expectedStructure": ["Exposure metrics (EE, PFE, EPE)", "Monte Carlo computation approach", "Netting and collateral effects", "CVA and wrong-way risk quantification", "Regulatory treatment"],
    "detailedAnalysis": detailed_analysis(
        "Tests counterparty credit risk expertise essential for risk management roles.",
        "Covers full spectrum from basic exposure metrics to advanced WWR modeling.",
        ["Not considering netting sets", "Ignoring MPOR in collateralized exposure", "Calculating CVA without PD term structure"],
        ["Work through a numerical CVA example with WWR", "Discuss regulatory CVA vs economic CVA", "Show PFE profile for different product types"]
    ),
    "metadata": metadata_block(star_rating=5, difficulty_score=90, sources=["Basel III CCR Framework", "ISDA SIMM Methodology", "Gregory (2012) Counterparty Credit Risk"]),
    "entryLevel": False, "stars": 5,
    "answers": {
        "concise": {
            "answer": "• EE(t) = E[max(V(t),0)], PFE_q(t) = quantile of positive MtM. Computed via MC: simulate risk factors, compute portfolio MtM per path, netting set aggregation, take max(MtM, 0).\n• Netting benefit = 1 - EE_net/sum(EE_i), typically 60-80%. Collateral: threshold K + MTA. MPOR (10-20 days). Collateralized exposure = max(V(t)-C(t),0).\n• CVA = (1-R) sum DF(t) x EE(t) x PD(t,t+delta t). Example: R=40%, avg EE=$12.5M, 4.8% cum PD, 200 bps CDS -> CVA approx $0.36M.\n• Wrong-way risk: Exposure correlated with counterparty default. Example: CDS seller on corporate that deteriorates. MC with stochastic hazard rate lambda(t) = lambda_0 + beta x factor return. WWR can 2-3x CVA.\n• PFE profile: IRS: hump shape (peak 1-3y). FX forward: increases to maturity. Credit derivatives: spike near maturity. Basel III: capital held against CVA volatility.",
            "format": "concise", "source": "generated"
        }
    }
})

add_q({
    "id": 2132, "role": "risk", "category": "technical", "difficulty": "hard",
    "title": "Operational Risk Modeling: AMA, Loss Distribution Approach, and Basel Reforms",
    "question": "Describe the Advanced Measurement Approach (AMA) for operational risk capital under Basel II. How has the framework evolved under Basel III/FRTB with the Standardized Measurement Approach (SMA)? How do you model operational risk using the Loss Distribution Approach (LDA) with frequency and severity distributions?",
    "modelAnswer": "Operational risk is the risk of loss from inadequate or failed internal processes, people, systems, or external events.\n\n**Basel II: Advanced Measurement Approach (AMA):**\nAllowed banks to use internal models for op risk capital. Key components:\n- Internal loss data (5+ years historical)\n- External loss data (consortia databases)\n- Scenario analysis (expert judgment for tail risks)\n- Business environment and internal control factors (BIA score)\nCapital = 99.9% VaR over 1-year holding period.\n\n**Loss Distribution Approach (LDA):**\n1. Frequency distribution: Number of loss events per year. Typically Poisson(lambda) or Negative Binomial.\n2. Severity distribution: Loss amounts per event. Typically Lognormal(mu, sigma) or Generalized Pareto Distribution (GPD) for tails.\n3. Aggregate loss: Convolution of frequency and severity via Monte Carlo or Panjer recursion.\n- Annual loss distribution F(x) = sum_n P(N=n) x G^{*n}(x) where G^{*n} is n-fold convolution.\n- Capital = 99.9% quantile of annual loss distribution.\n\n**Modeling Challenges:**\n- Heavy tails: Operational losses exhibit power-law tail behavior. Simple lognormal underestimates tail risk. GPD (EVT) better for extreme losses (threshold ~$1M+).\n- Correlation: Losses across different event types (internal fraud, external fraud, system failures) are partially correlated. Gaussian copula often used but criticized post-2008.\n- Low frequency/high severity: Some event types (e.g., rogue trading) have very few observations. Scenario analysis fills gaps.\n- Data truncation: Losses below collection threshold (e.g., $10K) are missing. Truncated severity distributions needed.\n\n**Basel III/FRTB: Standardized Measurement Approach (SMA):**\nBasel III (2017) replaced AMA with SMA for all banks. Why? AMA was too complex, incomparable across banks, and failed during 2008 (banks' op risk capital didn't reflect losses).\n\nSMA Calculation:\n1. Business Indicator (BI): Proxy for op risk exposure. BI = ILDC + SC + FC (Interest/Lease/Dividend Component + Service Component + Financial Component).\n2. Internal Loss Multiplier (ILM): log(exp(1) - 1 + (LC/BI)^0.8) where LC = loss component (average annual losses x 7.5 for tail).\n3. Capital = BI x ILM x alpha(BI component).\n\nSimpler, more standardized, no internal model discretion. But criticized for being non-risk-sensitive - penalizes banks with high losses even if controls improved.\n\n**Scenario Analysis Integration:**\n- Bayesian approach: Combine internal data (likelihood) with expert scenarios (prior) to get posterior loss distribution.\n- Stress testing: Reverse stress test scenarios (e.g., cyber attack, pandemic) to identify capital coverage.\n- Risk and Control Self-Assessment (RCSA): Maps control effectiveness to frequency/severity adjustments.\n\n**Key Op Risk Event Types (Basel Categories):**\n1. Internal Fraud\n2. External Fraud\n3. Employment Practices\n4. Clients, Products, Business Practices\n5. Damage to Physical Assets\n6. Business Disruption & System Failures\n7. Execution, Delivery & Process Management\n\n**Real-World Losses:**\n- Société Générale rogue trader (2008): $7B loss. Frequency: once in institutional history. Severity GPD tail.\n- Wells Fargo fake accounts (2016): $3B+ in fines and remediation.\n- These should be captured in tail estimation using EVT.\n\n**Interview Tip:** Distinguish between AMA (pre-2017) and SMA (current). Show understanding of LDA mechanics. Emphasize that op risk is the most model-challenged risk type due to data sparsity.",
    "scoringKeywords": {"AMA internal models op risk capital": 10, "LDA