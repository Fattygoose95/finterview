/**
 * mock-interview-engine.js - Interview State Machine
 * Manages interview session: config, questions, answers, timer.
 * Fully decoupled from DOM — pure state.
 */

const MockInterviewEngine = (function() {
  'use strict';

  // ── States ──
  const STATE = {
    SETUP: 'setup',
    PARSING: 'parsing',
    INTERVIEW: 'interview',
    FOLLOW_UP: 'follow_up',
    FEEDBACK: 'feedback',
    REPORT: 'report'
  };

  // ── Private State ──
  let state = STATE.SETUP;
  let config = {};
  let questions = [];
  let answers = [];
  let currentQuestionIndex = 0;
  let timerInterval = null;
  let timerRemaining = 0; // seconds
  let sessionStartTime = null;
  let sessionEndTime = null;
  let followUpActive = false;
  let lastReport = null;

  // Callbacks
  let onStateChange = null;
  let onTimerTick = null;

  // ── Config Defaults ──
  const DEFAULT_CONFIG = {
    type: 'mixed',
    questionCount: 5,
    timerMinutes: 2,
    difficulty: 'medium'
  };

  // ── Internal Methods ──

  function changeState(newState) {
    state = newState;
    if (onStateChange) onStateChange(state);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startTimer() {
    stopTimer();
    timerRemaining = config.timerMinutes * 60;
    if (onTimerTick) onTimerTick(timerRemaining);

    timerInterval = setInterval(function() {
      timerRemaining--;
      if (onTimerTick) onTimerTick(timerRemaining);

      if (timerRemaining <= 0) {
        stopTimer();
        // Auto-submit: trigger timeout handling
        if (state === STATE.INTERVIEW) {
          if (onStateChange) onStateChange('timeout');
        }
      }
    }, 1000);
  }

  // ── Public API ──

  return {
    STATE: STATE,

    /** Register state change listener */
    onStateChange: function(cb) { onStateChange = cb; },
    onTimerTick: function(cb) { onTimerTick = cb; },

    /** Get current state */
    getState: function() { return state; },
    getConfig: function() { return { ...config }; },
    getQuestions: function() { return [...questions]; },
    getAnswers: function() { return [...answers]; },
    getCurrentIndex: function() { return currentQuestionIndex; },
    getCurrentQuestion: function() {
      return questions[currentQuestionIndex] || null;
    },
    getTimerRemaining: function() { return timerRemaining; },
    getLastReport: function() { return lastReport; },
    isFollowUpActive: function() { return followUpActive; },

    /** Start a new session */
    startSession: function(sessionConfig) {
      config = { ...DEFAULT_CONFIG, ...sessionConfig };
      questions = [];
      answers = [];
      currentQuestionIndex = 0;
      followUpActive = false;
      lastReport = null;
      sessionStartTime = Date.now();
      sessionEndTime = null;
      changeState(STATE.PARSING);
    },

    /** Generate questions (must be called after startSession) */
    generateQuestions: function() {
      const resume = MockInterviewResume.getResume();
      questions = MockInterviewAPI.generateQuestions(config, resume);
      answers = new Array(questions.length).fill(null).map(() => ({
        userAnswer: '',
        followUpAnswer: '',
        feedback: null,
        timeSpent: 0
      }));
    },

    /** Enter interview mode */
    beginInterview: function() {
      currentQuestionIndex = 0;
      changeState(STATE.INTERVIEW);
      startTimer();
    },

    /** Submit an answer to current question */
    submitAnswer: function(answerText) {
      if (!answers[currentQuestionIndex]) {
        answers[currentQuestionIndex] = { userAnswer: '', followUpAnswer: '', feedback: null, timeSpent: 0 };
      }
      answers[currentQuestionIndex].userAnswer = answerText.trim();
      answers[currentQuestionIndex].timeSpent = (config.timerMinutes * 60) - timerRemaining;

      stopTimer();

      const question = questions[currentQuestionIndex];

      // Check if follow-up should be triggered
      if (question.followUp && question.followUp.enabled && !followUpActive) {
        followUpActive = true;
        changeState(STATE.FOLLOW_UP);
        startTimer(); // Follow-up gets its own timer
        return;
      }

      // Generate feedback
      this.generateFeedback();
    },

    /** Submit follow-up answer */
    submitFollowUp: function(answerText) {
      if (answers[currentQuestionIndex]) {
        answers[currentQuestionIndex].followUpAnswer = answerText.trim();
      }
      followUpActive = false;
      stopTimer();

      // Re-generate feedback with follow-up context
      this.generateFeedback();
    },

    /** Generate / retrieve feedback */
    generateFeedback: function() {
      const question = questions[currentQuestionIndex];
      const answer = answers[currentQuestionIndex];
      const combinedAnswer = answer.followUpAnswer
        ? answer.userAnswer + '\n[Follow-up response]: ' + answer.followUpAnswer
        : answer.userAnswer;

      const feedback = MockInterviewAPI.analyzeAnswer(question, combinedAnswer, config);
      answers[currentQuestionIndex].feedback = feedback;
      changeState(STATE.FEEDBACK);
    },

    /** Move to next question (or report if last) */
    nextQuestion: function() {
      if (currentQuestionIndex >= questions.length - 1) {
        this.endSession();
        return;
      }
      currentQuestionIndex++;
      changeState(STATE.INTERVIEW);
      startTimer();
    },

    /** End session and generate report */
    endSession: function() {
      stopTimer();
      sessionEndTime = Date.now();
      lastReport = MockInterviewAPI.generateOverallReport(questions, answers, config);
      lastReport.sessionDuration = Math.round((sessionEndTime - sessionStartTime) / 1000);
      changeState(STATE.REPORT);
    },

    /** Reset to setup */
    resetSession: function() {
      stopTimer();
      state = STATE.SETUP;
      config = {};
      questions = [];
      answers = [];
      currentQuestionIndex = 0;
      followUpActive = false;
      lastReport = null;
      sessionStartTime = null;
      sessionEndTime = null;
      changeState(STATE.SETUP);
    },

    /** Get elapsed time in current session (seconds) */
    getElapsedTime: function() {
      if (!sessionStartTime) return 0;
      const end = sessionEndTime || Date.now();
      return Math.round((end - sessionStartTime) / 1000);
    }
  };
})();
