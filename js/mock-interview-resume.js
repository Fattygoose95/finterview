/**
 * mock-interview-resume.js - Resume Module
 * Handles resume text input, sample resumes, and basic parsing.
 * Phase 2: Replace with real PDF parsing + AI extraction.
 */

const MockInterviewResume = (function() {
  'use strict';

  let currentResumeText = '';
  let currentResumeSource = 'manual'; // 'manual' | 'sample'

  return {
    /** Get the current resume text */
    getResume: function() { return currentResumeText; },

    /** Set resume text from manual input */
    setResume: function(text) {
      currentResumeText = text.trim();
      currentResumeSource = 'manual';
      return currentResumeText.length > 0;
    },

    /** Set resume from a sample */
    loadSample: function(key) {
      const sample = MockInterviewAPI.getSampleResume(key);
      if (!sample) return false;
      // Format as readable text
      currentResumeText = [
        `Name: ${sample.name}`,
        `Title: ${sample.title}`,
        '',
        `Education:`,
        sample.education,
        '',
        `Experience:`,
        sample.experience,
        '',
        `Skills:`,
        sample.skills,
        '',
        `Key Highlights:`,
        `Deal Experience: ${sample.deals}`,
        sample.highlights
      ].join('\n');
      currentResumeSource = 'sample';
      return true;
    },

    /** Get source type */
    getSource: function() { return currentResumeSource; },

    /** Check if resume is loaded */
    hasResume: function() { return currentResumeText.length > 20; },

    /** Extract key highlights for display */
    getHighlights: function() {
      if (!currentResumeText) return [];
      const lines = currentResumeText.split('\n').filter(l => l.trim().length > 0);
      const keyLines = lines.filter(l => {
        const lower = l.toLowerCase();
        return lower.includes('experience') || lower.includes('education') ||
               lower.includes('skill') || lower.includes('deal') ||
               lower.includes('valuation') || lower.includes('model') ||
               lower.includes('analyst') || lower.includes('finance');
      });
      return keyLines.slice(0, 5);
    }
  };
})();
