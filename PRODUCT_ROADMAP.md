# finterview Product Roadmap & Feature Checklist

> **Living document** — track every feature from idea to done.
> ✅ = Done | 🚧 = In Progress | 📋 = Planned | 💡 = Proposed (not yet planned) | ❌ = Cancelled

---

## 🏗️ Phase 0: Foundation (CURRENT)

### Core Infrastructure

| Status | Feature | Priority | Notes |
|--------|---------|----------|-------|
| ✅ | 538 structured questions with metadata (role, difficulty, category, stars) | P0 | Core asset — curated, classified, human-reviewed |
| ✅ | Practice Mode with answer box | P0 | User types answer, then sees model answer |
| ✅ | Advanced Filters (difficulty, category) | P0 | |
| ✅ | Flashcard Mode | P1 | |
| ✅ | Finance Bro AI (hardcoded Q&A) | P1 | **Needs redesign** — currently fake AI |
| ✅ | Profile page with localStorage progress | P1 | Replace with backend when auth comes |
| ✅ | Dark Mode | P2 | |
| ✅ | Responsive design (mobile/tablet/desktop) | P0 | |
| ✅ | GitHub Pages + Netlify deployment | P0 | |
| ✅ | Full English interface | P0 | |
| ✅ | Unified white design system | P0 | Clean finance aesthetic |

### Content Coverage

| Status | Role | Question Count | Notes |
|--------|------|---------------|-------|
| ✅ | Investment Banking (IB) | 111 | OK for now, will expand via AI |
| ✅ | Sales & Trading (Markets) | 97 | OK |
| ✅ | Quantitative Finance (Quant) | 95 | OK |
| ✅ | Asset Management (AM) | 94 | OK |
| ✅ | Risk Management | 93 | OK |
| ✅ | Private Equity (PE) | 13 | ⚠️ Needs expansion to 30+ |
| ✅ | Corporate Finance | 10 | ⚠️ Needs expansion to 30+ |
| ✅ | FinTech | 10 | ⚠️ Needs expansion to 30+ |
| ✅ | Family Office (FO) | 10 | ⚠️ Needs expansion to 20+ |
| ✅ | General | 5 | OK for now |

---

## 🚀 Phase 1: True AI Integration (MVP v2)

### Real AI Feedback System

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 📋 | Replace hardcoded Finance Bro with real AI API (GPT-4o-mini / Claude Haiku) | P0 | 2 days | Core — first thing to do |
| 📋 | AI answer analysis in Practice Mode — real scoring + specific feedback | P0 | 2 days | Not keyword matching, actual AI |
| 📋 | Streaming response (SSE) for real-time answer display | P1 | 1 day | Eliminates perceived latency |
| 📋 | Quality prompt engineering — "ex-VP at GS" persona | P0 | 1 day | Makes feedback feel authentic |
| 💡 | Multi-model support (GPT-4o for deep, GPT-4o-mini for fast) | P2 | 1 day | User can toggle speed vs depth |

### AI Mock Interview (Text)

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 📋 | Timed mode — 45s think, 2min answer, countdown UI | P0 | 2 days | Creates interview pressure |
| 📋 | Adaptive difficulty — answer well → harder follow-up | P1 | 2 days | Key differentiator |
| 📋 | Session scoring — score at end of mock session | P1 | 1 day | |
| 💡 | Interruption simulation — AI cuts in with follow-up | P2 | 2 days | Next-level realism |
| 💡 | Interviewer personality toggle (friendly vs strict) | P2 | 1 day | |

### Resume Deep-Dive 🔥

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | Resume upload (PDF/text) | P0 | 2 days | **KILLER FEATURE** |
| 💡 | AI parse resume → extract work history + skills | P0 | 1 day | |
| 💡 | Generate personalized behavioral questions from resume | P0 | 2 days | "I see you did X, tell me about..." |
| 💡 | Mock interview mode: AI grills you on your own resume | P1 | 3 days | Simulates real interviewers reading your CV |
| 💡 | Resume gap detection — "You haven't done financial modeling in 2 years" | P2 | 2 days | |
| 💡 | Compare resume to target role requirements | P2 | 2 days | "For GS IB analyst, you're missing: M&A case experience" |

### Background Bridge Questions 🔥

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | User sets current background (resume) + target role | P0 | 1 day | **UNIQUE DIFFERENTIATOR** |
| 💡 | AI generates bridge questions linking experience to new role | P0 | 3 days | "You did analytics at Ekimetrics, how does that apply to S&T?" |
| 💡 | Three question modes: Standard / Bridge / Pure Behavioral | P1 | 2 days | |
| 💡 | Skill gap analysis — what your resume says vs what the role needs | P1 | 2 days | |

### Adaptive Weak Spot Tracker

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 📋 | Track accuracy per role/category/question type | P0 | 2 days | LocalStorage first, backend later |
| 📋 | Weak spot dashboard — visual heat map of weak areas | P1 | 2 days | Radar chart / color-coded matrix |
| 📋 | Auto-suggest practice questions for weakest areas | P1 | 2 days | |
| 💡 | "Readiness Score" — 0-100% per role, overall | P1 | 1 day | Motivational metric |
| 💡 | Progress over time chart — "Your IB score: 45% → 62% → 71%" | P2 | 1 day | |

### AI Dynamic Question Generation

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | AI generates variation questions on-the-fly | P1 | 2 days | "If FCF is negative, how would you value the company?" |
| 💡 | Expand underrepresented roles via AI bulk generation | P1 | 1 day | PE: 13→30+, CorpFin: 10→30+ |
| 💡 | User-requested custom topics | P2 | 1 day | "Give me 5 questions about LBO modeling" |
| 💡 | Tag new AI-generated questions for human review | P2 | 1 day | Quality control pipeline |

---

## 🎨 Phase 2: Visual & UX Overhaul

### Premium Design System

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 📋 | Login Dashboard — progress snapshot, daily recommendation | P0 | 3 days | First thing user sees after login |
| 📋 | Data visualization — Chart.js for progress charts | P1 | 2 days | |
| 💡 | Glassmorphism UI elements, micro-interactions | P2 | 3 days | Hover effects, transitions, loading animations |
| 💡 | Immersive full-screen mock interview mode | P1 | 3 days | No distractions, just you and AI interviewer |
| 💡 | Brand identity — refined logo, typography, color palette | P2 | 2 days | Professional, memorable brand |
| 💡 | Premium loading states, empty states, error states | P2 | 2 days | Polished UX even when things break |
| 💡 | Animated onboarding flow for new users | P2 | 2 days | |

### Product Architecture Decision

| Status | Decision | Notes |
|--------|----------|-------|
| ✅ | **Practice Mode + Mock Interview = same product, two modes** | One dashboard, shared data, different experience |
| ✅ | Dashboard as hub: progress, weak spots, daily recommendation | Single entry point |
| ✅ | Background Bridge is a separate question mode, not separate product | |

### Voice Interview (Killer Feature)

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | Web Speech API — voice input for answers | P1 | 2 days | Browser-native, free |
| 💡 | AI voice interviewer — Text-to-Speech for AI questions | P1 | 2 days | Makes it feel real |
| 💡 | Full voice mock interview — ask verbally, answer verbally | P2 | 4 days | **Hardest but most impactful** |
| 💡 | Voice pacing analysis — "You spoke too fast" / "Too many fillers" | P2 | 2 days | |
| 💡 | Transcription + feedback on voice answers | P2 | 2 days | |

---

## 🎮 Phase 3: Engagement & Gamification

### User Retention

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | Daily Challenge — 5 curated questions per day | P1 | 2 days | |
| 💡 | Streak system — consecutive days practiced | P1 | 1 day | |
| 💡 | Achievement badges — "100 questions", "80% accuracy", "7-day streak" | P1 | 2 days | |
| 💡 | Anonymous leaderboard — compare against same-level users | P2 | 2 days | |
| 💡 | Weekly progress report email | P2 | 1 day | "You improved 12% this week" |
| 💡 | Personalized study plan — "6 weeks to interview" roadmap | P2 | 3 days | |
| 💡 | "Will You Get The Offer?" readiness prediction | P2 | 2 days | Based on accumulated data |

### Content Expansion

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | Add 30+ PE questions | P1 | via AI | |
| 💡 | Add 30+ Corporate Finance questions | P1 | via AI | |
| 💡 | Add 20+ Family Office questions | P2 | via AI | |
| 💡 | Add 20+ Fintech questions | P2 | via AI | |
| 💡 | Video explanation library for hardest concepts | P3 | high | Long-term |
| 💡 | Market news quiz — daily current events questions | P2 | 1 day | "Which bank just announced layoffs?" |

---

## 🔐 Phase 4: Paid Product

### Auth & Payment

| Status | Feature | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 📋 | Supabase Auth — email + Google OAuth login | P0 | 3 days | Blocked by nothing |
| 📋 | Free vs Premium content gating | P0 | 2 days | |
| 📋 | Stripe Checkout (hosted payment page) | P0 | 3 days | |
| 📋 | Stripe webhook → update subscription status | P0 | 2 days | |
| 📋 | Supabase database for user progress + subscription | P0 | 3 days | |
| 💡 | 14-day free trial of Premium | P1 | 1 day | |
| 💡 | Referral program — share link → free month | P2 | 2 days | |
| 💡 | Team/Institutional plans (university career centers) | P3 | 5 days | |

### Pricing Tiers

| Status | Tier | Price | Content | 
|--------|------|-------|---------|
| 📋 | **Free** | $0 | 30 sample questions + basic flashcards |
| 📋 | **Pro Monthly** | $19/mo | All 538+ questions + AI feedback + progress tracking |
| 📋 | **Pro Annual** | $99/yr ($8.25/mo) | Same as Pro Monthly |
| 💡 | **Ultimate Monthly** | $39/mo | Pro + Voice Mock Interview + Resume Deep-Dive |
| 💡 | **Lifetime** | $199 | Everything forever |

---

## 📣 Phase 5: Marketing & Distribution

### Channels

| Status | Channel | Priority | Effort | Notes |
|--------|---------|----------|--------|-------|
| 💡 | LinkedIn content (Charlie's personal brand) | P0 | 1hr/week | Start here — free, high ROI |
| 💡 | University finance club partnerships | P0 | 5 emails | Free Premium for clubs |
| 💡 | WSO / r/FinancialCareers presence | P1 | 1hr/week | |
| 💡 | Campus ambassador program | P2 | 3hrs setup | |
| 💡 | TikTok / Instagram organic content | P2 | 3hrs/week | If bandwidth allows |
| 💡 | Career center partnerships | P3 | 5 emails | Institutional sales |
| 💡 | LinkedIn Ads (after PMF validation) | P3 | $500+/mo | Only after product-market fit |

### Content Marketing

| Status | Feature | Priority | Notes |
|--------|---------|----------|-------|
| 💡 | Blog — "Top 10 IB Interview Questions & How To Answer" | P1 | SEO play |
| 💡 | Blog — "Goldman Sachs Superday: What To Expect" | P1 | High search volume |
| 💡 | Blog series — 8x role-specific prep guides | P1 | |
| 💡 | Free PDF download — "The Finance Interview Cheat Sheet" | P2 | Lead magnet |

---

## 📈 Success Metrics

| Metric | Target | Tracking |
|--------|--------|---------|
| Free → Paid conversion | 5-10% | Stripe dashboard |
| DAU (% of paid users) | 20%+ | Supabase analytics |
| Questions completed/user/day | 10+ | App tracking |
| Monthly churn | <8% | Stripe billing |
| CAC (customer acquisition cost) | <$15 | Manual tracking |
| NPS | 40+ | Survey after 30 days |

---

## ❌ Cancelled / De-prioritized

| Feature | Reason |
|---------|--------|
| *None yet* | |

---

## 📝 Change Log

| Date | Change |
|------|--------|
| 2026-04-29 | Document created — full product roadmap initialized |
| | |
