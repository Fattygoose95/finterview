/**
 * mock-interview-api.js - Mock AI Service Layer
 * Phase 1: Returns preset data. Phase 2: Replace with real API calls.
 * 
 * Interface (will stay same for Phase 2):
 *   generateQuestions(config, resume) → [Question]
 *   analyzeAnswer(question, userAnswer, config) → Feedback
 *   generateOverallReport(questions, answers) → Report
 */

const MockInterviewAPI = (function() {
  'use strict';

  // ────────── Sample Resumes ──────────

  const SAMPLE_RESUMES = {
    'gs-analyst': {
      name: 'Alex Chen',
      title: 'Investment Banking Analyst - Goldman Sachs',
      education: 'Columbia Business School, MBA (2025)\nUC Berkeley, B.S. Economics (2019)',
      experience: `Goldman Sachs, Investment Banking Analyst (2021-2023)
  - TMT Group, New York Office
  - Executed 3 M&A transactions totaling $4.2B
  - Built LBO and DCF models for pitch books
  - Managed 5-person analyst team for quarterly reviews

Moelis & Company, Summer Analyst (2020)
  - Supported 2 restructuring mandates in energy sector
  - Prepared CIMs and management presentations`,
      skills: 'Financial Modeling, M&A Execution, LBO, DCF, 3-Statement Modeling, Pitch Book Creation, Due Diligence, Valuation, Excel, Bloomberg Terminal',
      deals: 'Key deal: $2.5B cross-border acquisition of a European TMT company. Responsible for valuation analysis, synergy modeling, and integration planning.',
      highlights: 'Passed CFA Level II | Series 79 & 63 Licensed | Fluent in Mandarin and English'
    },
    'mfin-student': {
      name: 'Charlie Yang',
      title: 'MFin Candidate - HKU',
      education: 'University of Hong Kong, Master of Finance (2025-2026)\nUC San Diego, B.S. Business Economics (2023-2025)',
      experience: `Ekimetrics, Data Analytics Consulting Intern (2025-2026)
  - Customer revenue segmentation for luxury retail client
  - Built K-Means clustering model with SHAP explainability
  - Analyzed 470K+ transactions, 135K+ customers

Sinolink Securities, Institutional Sales Intern (2023-2024)
  - Synthesized 22 industry research reports
  - Supported OTC derivatives trade execution

Founder Securities, Investment Manager Assistant (2023)
  - Conducted due diligence on 20+ PE funds
  - Automated reporting workflows, reduced prep time 40%`,
      skills: 'Python (Pandas, Scikit-learn), R, VBA, Bloomberg Terminal, Financial Modeling, DCF, LBO, Data Analysis, SQL',
      deals: 'Stock pitch: NextEra Energy (NEE) - built integrated 3-statement model and multi-scenario DCF for SIG competition',
      highlights: 'Provost Honors, Dean\'s List at UCSD | Co-founded Second Stitch sustainable startup | Fluent in English, Mandarin, Cantonese'
    }
  };

  // ────────── Mock Question Bank ──────────
  // Questions are tagged with keywords for resume-matching

  const MOCK_QUESTIONS = {

    // ── General ──
    'general': [
      {
        id: 'g1',
        text: "Tell me about yourself.",
        difficulty: 'easy',
        type: 'general',
        modelAnswer: "A strong answer structures: 1) Current role/education (30s), 2) Key experiences that shaped you (45s), 3) Why you're here today (15s). Keep it under 90 seconds and tailored to finance.",
        followUp: { enabled: false },
        scoringContext: { focus: ['structure', 'relevance', 'concision'], weight: 1 }
      },
      {
        id: 'g2',
        text: "Why do you want to work in finance?",
        difficulty: 'easy',
        type: 'general',
        modelAnswer: "Show genuine intellectual curiosity: specific deals/asset classes that excite you, how your background connects, and what unique perspective you bring.",
        followUp: { enabled: false },
        scoringContext: { focus: ['motivation', 'specificity', 'connection'], weight: 1 }
      },
      {
        id: 'g3',
        text: "Walk me through a DCF valuation from start to finish.",
        difficulty: 'hard',
        type: 'general',
        modelAnswer: "1) Project FCF, 2) Calculate terminal value (Gordon Growth or Exit Multiple), 3) Determine discount rate (WACC), 4) Discount cash flows and TV to PV, 5) Sum to get enterprise value, 6) Bridge to equity value, 7) Sensitivity analysis on key assumptions.",
        followUp: { 
          enabled: true,
          text: "When would you use a DCF versus a comparable company analysis? What are the key assumptions that drive DCF output most?"
        },
        scoringContext: { focus: ['technical depth', 'logic flow', 'assumptions understanding'], weight: 3 }
      },
      {
        id: 'g4',
        text: "What's the difference between enterprise value and equity value?",
        difficulty: 'easy',
        type: 'general',
        modelAnswer: "Enterprise Value = Equity Value + Net Debt + Minority Interest - Cash. EV represents the total value of the business to all stakeholders (debt + equity). Equity value is what shareholders own. When comparing companies, EV/EBITDA is more useful than P/E because it removes capital structure effects.",
        followUp: { enabled: false },
        scoringContext: { focus: ['definition accuracy', 'practical application'], weight: 1 }
      },
      {
        id: 'g5',
        text: "Describe a time you worked under significant pressure. How did you handle it?",
        difficulty: 'medium',
        type: 'general',
        modelAnswer: "Use STAR format: Situation (tight deadline, live deal), Task (specific deliverable), Action (how you prioritized, coordinated, got it done), Result (deal closed, praise from MD). Quantify the stakes.",
        followUp: {
          enabled: true,
          text: "If you had to do it again, what would you change about how you handled that situation?"
        },
        scoringContext: { focus: ['structure', 'self-awareness', 'quantified impact'], weight: 2 }
      },
      {
        id: 'g6',
        text: "How do you stay updated on financial markets? What are your go-to sources?",
        difficulty: 'easy',
        type: 'general',
        modelAnswer: "Show you're genuinely engaged: WSJ, FT, Bloomberg Terminal daily, specific sector newsletters, sell-side research you follow. Bonus points for mentioning a recent market event and your take on it.",
        followUp: { enabled: false },
        scoringContext: { focus: ['consistency', 'specificity', 'analytical take'], weight: 1 }
      },
      {
        id: 'g7',
        text: "Explain what an LBO is and the key drivers of returns in an LBO model.",
        difficulty: 'hard',
        type: 'general',
        modelAnswer: "LBO = acquisition of a company using significant debt. Key return drivers: 1) Debt repayment (delevering), 2) EBITDA growth, 3) Multiple expansion at exit. IRR is driven by exit year, leverage amount, purchase multiple vs exit multiple.",
        followUp: {
          enabled: true,
          text: "In the current high-interest rate environment, what adjustments would you make to an LBO model?"
        },
        scoringContext: { focus: ['technical accuracy', 'return driver clarity', 'market awareness'], weight: 3 }
      },
      {
        id: 'g8',
        text: "Describe a time you disagreed with a team member. How did you resolve it?",
        difficulty: 'medium',
        type: 'general',
        modelAnswer: "STAR format again: 1) Disagreement on approach to a model assumption, 2) Instead of arguing, I built both scenarios with clear documentation, 3) Let the data drive the decision, 4) VP appreciated the thorough approach.",
        followUp: {
          enabled: true,
          text: "What did you learn about yourself from that experience?"
        },
        scoringContext: { focus: ['conflict resolution', 'professionalism', 'learning'], weight: 2 }
      },
      {
        id: 'g9',
        text: "What's your greatest weakness?",
        difficulty: 'easy',
        type: 'general',
        modelAnswer: "Choose a real weakness (not a disguised strength) and show self-awareness + action plan. Example: 'I used to over-focus on details at the expense of speed. Now I set time budgets for tasks and review at 80% completeness.'",
        followUp: { enabled: false },
        scoringContext: { focus: ['honesty', 'self-awareness', 'improvement plan'], weight: 1 }
      },
      {
        id: 'g10',
        text: "How would you value a private company with no comparable public peers?",
        difficulty: 'hard',
        type: 'general',
        modelAnswer: "Use a combination: 1) DCF (if projections exist), 2) Precedent transactions (even from adjacent sectors), 3) Adjusted book value, 4) Venture capital method for early stage. The key is to use multiple approaches and triangulate.",
        followUp: { enabled: false },
        scoringContext: { focus: ['creativity', 'technical depth', 'practicality'], weight: 3 }
      }
    ],

    // ── Resume Deep-Dive (tailored based on resume keywords) ──

    'resume': [
      {
        id: 'r1',
        text: "Walk me through your most recent role or experience. What was your biggest impact?",
        difficulty: 'easy',
        type: 'resume-deep-dive',
        modelAnswer: "Structure: 1) Set context (company, role, timeline), 2) Biggest achievement with quantifiable results, 3) Specific actions you took, 4) What you learned. Keep it to 2 minutes.",
        followUp: { enabled: false },
        scoringContext: { focus: ['clarity', 'impact quantification', 'learning articulation'], weight: 1 }
      },
      {
        id: 'r2',
        text: "You've worked with data and modeling. Tell me about a specific analytical problem you solved and how you approached it.",
        difficulty: 'medium',
        type: 'resume-deep-dive',
        modelAnswer: "Use CASE/PAR framework: Challenge (business problem), Analysis (what you did, tools used), Solution (what you found/recommended), Execution (how it was implemented). Be specific about the methodology.",
        followUp: {
          enabled: true,
          text: "What assumptions did you make in your analysis, and how would you stress-test them?"
        },
        scoringContext: { focus: ['analytical rigor', 'methodology clarity', 'critical thinking'], weight: 2 }
      },
      {
        id: 'r3',
        text: "Describe a transaction or deal you worked on. What was your specific role and contribution?",
        difficulty: 'medium',
        type: 'resume-deep-dive',
        modelAnswer: "1) Deal overview (size, type, timeline), 2) Your specific responsibilities, 3) Key challenges and how you addressed them, 4) Outcome and what you learned. Be honest about your role level.",
        followUp: {
          enabled: true,
          text: "If you could redo one part of that deal process, what would it be?"
        },
        scoringContext: { focus: ['deal knowledge', 'role clarity', 'self-assessment'], weight: 2 }
      },
      {
        id: 'r4',
        text: "Why did you choose your current educational path? How does it connect to your career goals?",
        difficulty: 'easy',
        type: 'resume-deep-dive',
        modelAnswer: "Show intentionality: specific program features → skills you're building → how they bridge to target role. Avoid generic 'prestigious program' answers.",
        followUp: { enabled: false },
        scoringContext: { focus: ['intentionality', 'career narrative', 'program specificity'], weight: 1 }
      },
      {
        id: 'r5',
        text: "Tell me about a time you made a mistake on the job or in an academic project. How did you handle it?",
        difficulty: 'hard',
        type: 'resume-deep-dive',
        modelAnswer: "Be honest but strategic: 1) The mistake (model error, miscommunication), 2) Immediate action to fix, 3) Long-term change you made (checklist, review process), 4) Resulting improvement. Shows maturity and accountability.",
        followUp: {
          enabled: true,
          text: "Did you have to communicate this mistake to a manager or client? How did you approach that conversation?"
        },
        scoringContext: { focus: ['accountability', 'problem-solving', 'professional communication'], weight: 3 }
      },
      {
        id: 'r6',
        text: "Your background includes data and quantitative work. How comfortable are you with building financial models from scratch?",
        difficulty: 'hard',
        type: 'resume-deep-dive',
        modelAnswer: "Walk through your exact experience: what models you've built, in what context, your process (assumptions → structure → formulas → checks). Acknowledge where you're still developing and your plan to improve.",
        followUp: {
          enabled: true,
          text: "Walk me through how you'd structure a model for a company with multiple revenue streams and different growth rates."
        },
        scoringContext: { focus: ['technical skills', 'honest self-assessment', 'structured thinking'], weight: 3 }
      },
      {
        id: 'r7',
        text: "You've been involved in academic projects and extracurriculars. What's something you initiated or led?",
        difficulty: 'medium',
        type: 'resume-deep-dive',
        modelAnswer: "Show leadership: 1) Identified a gap/opportunity, 2) Took initiative to organize, 3) How you mobilized others, 4) Tangible outcome. Quantify where possible.",
        followUp: {
          enabled: true,
          text: "What was the hardest part of getting people on board with your idea?"
        },
        scoringContext: { focus: ['initiative', 'leadership', 'influence'], weight: 2 }
      },
      {
        id: 'r8',
        text: "Why are you looking to move into [target role/industry] from your current path?",
        difficulty: 'medium',
        type: 'resume-deep-dive',
        modelAnswer: "Create a compelling 'why now' narrative: specific skills you've built → how they transfer → what excites you about the new path → how this role fits. Avoid 'I hated my last job' energy.",
        followUp: {
          enabled: true,
          text: "What's the biggest skill gap you need to address for this transition, and how are you working on it?"
        },
        scoringContext: { focus: ['narrative coherence', 'self-awareness', 'preparation'], weight: 2 }
      }
    ]
  };

  // ── Follow-Up variants (for variety) ──

  const FOLLOW_UP_VARIANTS = [
    "Can you elaborate on that point with a specific example?",
    "What data or evidence informed your approach there?",
    "How would you defend that position to a skeptical senior?",
    "If you had unlimited resources, what would you do differently?",
    "What's the counter-argument to your approach?",
    "How does that experience connect to the role you're interviewing for?"
  ];

  // ── Feedback Templates ──

  function generateMockFeedback(question, userAnswer, difficulty) {
    const answerLen = userAnswer.length;
    const wordCount = userAnswer.split(/\s+/).filter(w => w.length > 0).length;
    const hasStructure = answerLen > 80 && /[:\n•\-]/.test(userAnswer);
    const hasNumbers = /\d+/.test(userAnswer);
    const hasSpecific = answerLen > 100;

    let base = 50;
    if (wordCount > 30) base += 10;
    if (wordCount > 60) base += 10;
    if (hasStructure) base += 10;
    if (hasNumbers) base += 10;
    if (hasSpecific) base += 10;
    if (difficulty === 'hard') base = Math.min(base + 5, 95);
    const score = Math.min(Math.max(base + Math.floor(Math.random() * 10 - 5), 40), 95);

    const strengths = [
      `Demonstrates solid understanding of the topic`,
      hasStructure ? `Well-structured answer with clear flow` : `Shows enthusiasm and engagement`,
      hasNumbers ? `Good use of specific details and context` : `Direct and focused response`,
      `Attempts to connect concepts meaningfully`
    ].slice(0, 2 + Math.floor(Math.random() * 1));

    const improvements = [
      `Could provide more quantitative examples to strengthen credibility`,
      hasStructure ? `Consider adding a summary of key takeaways at the end` : `Structure your answer using a clear framework`,
      wordCount < 50 ? `Expand with more specific details from your experience` : `Make sure every point ties back to the role requirements`,
      `Show more awareness of broader market or industry context`,
      difficulty === 'hard' ? `Address potential counter-arguments or trade-offs` : null
    ].filter(Boolean).slice(0, 2 + Math.floor(Math.random() * 1));

    const keyAdviceOptions = [
      "Concision beats length. Every sentence should add new value.",
      "Quantify your impact — numbers make stories credible.",
      "Always connect your answer back to the role — show relevance.",
      "Practice the 'so what?' test: each point should lead to an insight.",
      "For technical questions, first establish the framework, then layer in specifics.",
      "Be memorable — a short anecdote is worth three bullet points."
    ];

    return {
      score,
      strengths,
      improvements,
      modelAnswer: question.modelAnswer || 'A strong answer demonstrates depth, structure, and relevance to the role.',
      keyAdvice: keyAdviceOptions[Math.floor(Math.random() * keyAdviceOptions.length)]
    };
  }

  // ── Public API ──

  return {
    getSampleResume: function(key) {
      return SAMPLE_RESUMES[key] || SAMPLE_RESUMES['mfin-student'];
    },

    getSampleResumes: function() {
      return Object.keys(SAMPLE_RESUMES).map(k => ({ key: k, ...SAMPLE_RESUMES[k] }));
    },

    /** Generate questions for an interview session */
    generateQuestions: function(config, resumeData) {
      const { type, difficulty, questionCount } = config;
      const pool = [];

      // Collect questions from relevant pools
      if (type === 'general' || type === 'mixed') {
        pool.push(...MOCK_QUESTIONS['general']);
      }
      if (type === 'resume-deep-dive' || type === 'mixed') {
        pool.push(...MOCK_QUESTIONS['resume']);
      }

      // Filter by difficulty
      let filtered = pool;
      if (difficulty !== 'mixed') {
        filtered = pool.filter(q => q.difficulty === difficulty);
      }

      // If too few, include others
      if (filtered.length < questionCount) {
        filtered = pool;
      }

      // Shuffle and pick
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, questionCount);

      // Assign IDs
      return selected.map((q, i) => ({
        ...q,
        id: `mock_q_${i + 1}`,
        followUp: q.followUp && q.followUp.enabled && (difficulty === 'medium' || difficulty === 'hard' || difficulty === 'mixed')
          ? { ...q.followUp, enabled: Math.random() > 0.3 } // 70% chance for Medium/Hard
          : { enabled: false }
      }));
    },

    /** Analyze a single answer */
    analyzeAnswer: function(question, userAnswer, config) {
      return generateMockFeedback(question, userAnswer, config.difficulty);
    },

    /** Generate follow-up question */
    generateFollowUp: function(question, userAnswer) {
      if (question.followUp && question.followUp.enabled && question.followUp.text) {
        return question.followUp.text;
      }
      return FOLLOW_UP_VARIANTS[Math.floor(Math.random() * FOLLOW_UP_VARIANTS.length)];
    },

    /** Generate overall report from all answers */
    generateOverallReport: function(questions, answers, config) {
      const scores = answers.map(a => a.feedback.score);
      const overallScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      // Compute radar metrics (mock distributed around overall score)
      const radarLabels = ['Valuation Skills', 'Financial Modeling', 'Industry Knowledge', 'Soft Skills', 'Logical Expression'];
      const radarScores = radarLabels.map(() => {
        return Math.min(95, Math.max(35, overallScore + Math.floor(Math.random() * 25 - 12)));
      });

      return {
        overallScore,
        totalTime: config.questionCount * config.timerMinutes * 60, // in seconds
        totalQuestions: questions.length,
        answeredQuestions: answers.filter(a => a.userAnswer.length > 10).length,
        radarLabels,
        radarScores,
        questions: questions.map((q, i) => ({
          question: q,
          answer: answers[i] || { userAnswer: '', feedback: { score: 0, strengths: [], improvements: [], modelAnswer: '', keyAdvice: '' } }
        }))
      };
    },

    /** Simulate AI parsing delay */
    simulateParsing: function() {
      return new Promise(resolve => setTimeout(resolve, 2500));
    }
  };
})();
