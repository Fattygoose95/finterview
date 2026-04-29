# finterview — Finance Interview Preparation

> AI-powered platform to prepare for finance interviews. Practice with 538 curated questions across 10 finance roles.

**Live Demo:** [https://fattygoose95.github.io/finterview/](https://fattygoose95.github.io/finterview/)

---

## About

A structured interview preparation tool built for finance professionals and students targeting roles in investment banking, asset management, quantitative finance, sales & trading, and more.

Currently in active development — transitioning from a static question bank to an AI-powered interview coach.

## Features

- **538 curated questions** across 10 finance roles (IB, AM, Quant, S&T, Risk, PE, CorpFin, FinTech, Family Office)
- **Practice Mode** — type your answer, compare with model answers
- **Flashcard Mode** — rapid recall practice
- **Advanced Filters** — filter by difficulty, role, and category
- **Finance Bro AI** — interview preparation assistant (hardcoded Q&A — AI upgrade in progress)
- **Progress Tracking** — local profile with practice history
- **Dark Mode** — toggle between light and dark themes
- **Responsive Design** — works on desktop, tablet, and mobile

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Design System:** Custom CSS with unified theming (light/dark)
- **Data:** 538 structured questions with metadata (role, difficulty, category)
- **Storage:** LocalStorage (backend + auth coming)
- **Hosting:** GitHub Pages + Netlify

## Current Status

| Status | Phase | Description |
|--------|-------|-------------|
| ✅ | Foundation | Question bank + core UI + practice mode |
| 🚧 | Phase 1 | AI-powered feedback + mock interview |
| 📋 | Phase 2 | Dashboard + visual overhaul |
| 📋 | Phase 3 | Gamification + engagement |
| 📋 | Phase 4 | Auth + payment system |

See [PRODUCT_ROADMAP.md](./PRODUCT_ROADMAP.md) for full feature tracking.

## Project Structure

```
finterview-prototype/
├── index.html                # Homepage
├── industry-practice.html    # Practice mode (main feature)
├── industry-filter.html      # Advanced filters
├── flashcard.html           # Flashcard mode
├── finance-bro.html         # Finance Bro AI assistant
├── profile.html             # User profile
├── questions.js             # 538 question dataset
├── PRODUCT_ROADMAP.md       # Feature tracker
├── netlify.toml             # Deployment config
├── css/                     # Design system
├── js/                      # JavaScript modules
└── _archive/                # Historical files (archived)
```

## Author

Built by Jiarong Yang.

---

_Professional project — part of a continuous product development journey._
