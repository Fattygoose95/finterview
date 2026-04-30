/**
 * mock-interview-ui.js - Interview UI Module
 * Pure DOM rendering. Reads from Engine, calls API for data.
 * Phase 2: Only the API calls change — this file stays identical.
 */

const MockInterviewUI = (function() {
  'use strict';

  let container = null;
  let radarCanvas = null;
  let parsingTimer = null;

  // ── Screen Templates ──

  function renderSetup() {
    container.innerHTML = `
      <div class="mock-setup">
        <div class="setup-header">
          <h2>Mock Interview</h2>
          <p class="setup-subtitle">AI-powered interview simulation with real-time feedback</p>
        </div>

        <!-- Resume Section -->
        <div class="setup-section">
          <h3 class="setup-section-title"><i class="fas fa-user-tie"></i> Your Background</h3>
          <p class="setup-hint">Paste your resume or LinkedIn profile for personalized questions</p>
          <textarea id="resumeInput" class="resume-textarea" placeholder="Paste your resume / LinkedIn text here...
          
Example format:
Education: ...
Experience: ...
Skills: ...
Key achievements: ..." maxlength="5000"></textarea>
          <div class="resume-actions">
            <label class="resume-upload-btn">
              <i class="fas fa-upload"></i> Upload PDF
              <input type="file" accept=".pdf" style="display:none" id="resumePdfUpload">
            </label>
            <button class="resume-sample-btn" data-sample="mfin-student">
              <i class="fas fa-user-graduate"></i> Try: Student Profile
            </button>
            <button class="resume-sample-btn" data-sample="gs-analyst">
              <i class="fas fa-briefcase"></i> Try: GS Analyst
            </button>
          </div>
          <div class="privacy-badge">
            <i class="fas fa-shield-alt"></i> Processed securely in memory. <strong>We do not store your resume.</strong>
          </div>
        </div>

        <!-- Config Section -->
        <div class="setup-section">
          <h3 class="setup-section-title"><i class="fas fa-sliders-h"></i> Interview Settings</h3>
          <div class="config-grid">
            <div class="config-item">
              <label for="interviewType">Interview Type</label>
              <select id="interviewType">
                <option value="mixed">Mixed</option>
                <option value="general">General Questions</option>
                <option value="resume-deep-dive">Resume Deep-Dive</option>
              </select>
            </div>
            <div class="config-item">
              <label for="questionCount">Questions</label>
              <select id="questionCount">
                <option value="3">3 (Quick)</option>
                <option value="5" selected>5 (Standard)</option>
                <option value="10">10 (Intensive)</option>
                <option value="15">15 (Full)</option>
              </select>
            </div>
            <div class="config-item">
              <label for="timerMinutes">Timer</label>
              <select id="timerMinutes">
                <option value="0">No Limit</option>
                <option value="2" selected>2 minutes</option>
                <option value="3">3 minutes</option>
                <option value="5">5 minutes</option>
              </select>
            </div>
            <div class="config-item">
              <label for="difficulty">Difficulty</label>
              <select id="difficulty">
                <option value="mixed">Mixed</option>
                <option value="easy">Easy</option>
                <option value="medium" selected>Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Start Button -->
        <button id="startInterviewBtn" class="start-interview-btn" disabled>
          <i class="fas fa-play-circle"></i> Start Interview
        </button>
        <p class="start-hint" id="startHint">Paste a resume or try a sample to begin</p>
      </div>
    `;

    // Restore any existing resume text
    const resumeEl = document.getElementById('resumeInput');
    const startBtn = document.getElementById('startInterviewBtn');
    const hint = document.getElementById('startHint');

    if (MockInterviewResume.hasResume()) {
      resumeEl.value = MockInterviewResume.getResume();
      startBtn.disabled = false;
      hint.textContent = 'Ready! Click to start your interview';
      hint.className = 'start-hint ready';
    }

    // ── Events ──
    resumeEl.addEventListener('input', function() {
      const hasText = MockInterviewResume.setResume(this.value);
      startBtn.disabled = !hasText;
      hint.textContent = hasText ? 'Ready! Click to start your interview' : 'Paste a resume or try a sample to begin';
      hint.className = hasText ? 'start-hint ready' : 'start-hint';
    });

    document.querySelectorAll('.resume-sample-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const key = this.dataset.sample;
        MockInterviewResume.loadSample(key);
        document.getElementById('resumeInput').value = MockInterviewResume.getResume();
        startBtn.disabled = false;
        hint.textContent = 'Ready! Click to start your interview';
        hint.className = 'start-hint ready';
      });
    });

    document.getElementById('resumePdfUpload')?.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Phase 1: just read as text (real PDF parsing in Phase 2)
        const reader = new FileReader();
        reader.onload = function(ev) {
          document.getElementById('resumeInput').value += '\n[Uploaded: ' + file.name + ']\n' + ev.target.result.substring(0, 3000);
          MockInterviewResume.setResume(document.getElementById('resumeInput').value);
          startBtn.disabled = false;
          hint.textContent = 'Ready! Click to start your interview';
          hint.className = 'start-hint ready';
        };
        reader.readAsText(file);
      }
    });

    document.getElementById('startInterviewBtn').addEventListener('click', function() {
      const config = {
        type: document.getElementById('interviewType').value,
        questionCount: parseInt(document.getElementById('questionCount').value),
        timerMinutes: parseInt(document.getElementById('timerMinutes').value),
        difficulty: document.getElementById('difficulty').value
      };
      startInterview(config);
    });
  }

  function startInterview(config) {
    MockInterviewEngine.startSession(config);
    renderParsing();
  }

  // ── Parsing Animation ──

  function renderParsing() {
    container.innerHTML = `
      <div class="mock-parsing">
        <div class="parsing-animation">
          <i class="fas fa-brain"></i>
          <div class="parsing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <h3>AI is deeply analyzing your background...</h3>
        <p class="parsing-sub">Generating personalized interview questions based on your experience</p>
        <div class="parsing-highlights">
          <div class="parsing-highlight-item"><i class="fas fa-check-circle"></i> <span id="ph1">Reading resume</span></div>
          <div class="parsing-highlight-item"><i class="fas fa-check-circle"></i> <span id="ph2">Identifying key experiences</span></div>
          <div class="parsing-highlight-item"><i class="fas fa-check-circle"></i> <span id="ph3">Matching question difficulty</span></div>
          <div class="parsing-highlight-item"><i class="fas fa-check-circle"></i> <span id="ph4">Preparing follow-up scenarios</span></div>
        </div>
      </div>
    `;

    // Staggered reveal of parsing steps
    const steps = ['ph1', 'ph2', 'ph3', 'ph4'];
    steps.forEach((id, i) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.closest('.parsing-highlight-item').classList.add('done');
        }
      }, 400 + i * 500);
    });

    // Generate questions in background
    MockInterviewEngine.generateQuestions();

    // After animation, begin interview
    MockInterviewAPI.simulateParsing().then(() => {
      MockInterviewEngine.beginInterview();
    });
  }

  // ── Timer Format ──

  function formatTime(seconds) {
    if (seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ── Interview Screen ──

  function renderInterview(question, index, total, timerSeconds) {
    const timerDisplay = formatTime(timerSeconds);
    const timerWarning = timerSeconds <= 30;

    container.innerHTML = `
      <div class="mock-interview">
        <!-- Top Bar -->
        <div class="interview-topbar">
          <button id="exitInterviewBtn" class="exit-btn"><i class="fas fa-times"></i> Exit</button>
          <div class="interview-progress">
            <div class="progress-dots" id="progressDots">
              ${Array.from({length: total}, (_, i) => 
                `<span class="dot ${i === index ? 'active' : ''} ${i < index ? 'done' : ''}"></span>`
              ).join('')}
            </div>
            <span class="progress-label">Question ${index + 1} of ${total}</span>
          </div>
          <div class="timer-display ${timerWarning ? 'timer-warning' : ''}" id="timerDisplay">
            <i class="fas fa-hourglass-half"></i>
            <span id="timerText">${timerDisplay}</span>
          </div>
        </div>

        <!-- Question -->
        <div class="question-area">
          <div class="question-badge ${question.difficulty}">${question.difficulty}</div>
          <h3 class="question-prompt">${escapeHtml(question.text)}</h3>
        </div>

        <!-- Answer -->
        <div class="answer-area">
          <textarea id="answerInput" class="answer-textarea-mock"
            placeholder="Type your answer here..."
            maxlength="3000"></textarea>
          <div class="answer-footer">
            <span id="answerWordCount" class="word-count">0 words</span>
            <button id="submitAnswerBtn" class="submit-answer-btn" disabled>
              <i class="fas fa-paper-plane"></i> Submit
            </button>
          </div>
        </div>
      </div>
    `;

    // ── Events ──
    const answerInput = document.getElementById('answerInput');
    const submitBtn = document.getElementById('submitAnswerBtn');
    const wordCount = document.getElementById('answerWordCount');

    answerInput.addEventListener('input', function() {
      const words = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      wordCount.textContent = `${words} words`;
      submitBtn.disabled = this.value.trim().length < 10;
    });

    // Auto-focus
    setTimeout(() => answerInput?.focus(), 200);

    submitBtn.addEventListener('click', function() {
      MockInterviewEngine.submitAnswer(answerInput.value);
    });

    document.getElementById('exitInterviewBtn')?.addEventListener('click', function() {
      if (confirm('Exit this interview session? Your progress will be lost.')) {
        endInterview();
      }
    });
  }

  // ── Follow-Up Screen ──

  function renderFollowUp(question, timerSeconds) {
    const timerDisplay = formatTime(timerSeconds);
    const timerWarning = timerSeconds <= 30;

    container.innerHTML = `
      <div class="mock-interview">
        <div class="interview-topbar">
          <button id="exitInterviewBtn" class="exit-btn"><i class="fas fa-times"></i> Exit</button>
          <div class="interview-progress">
            <span class="follow-up-badge"><i class="fas fa-question-circle"></i> Follow-Up</span>
          </div>
          <div class="timer-display ${timerWarning ? 'timer-warning' : ''}">
            <i class="fas fa-hourglass-half"></i>
            <span>${timerDisplay}</span>
          </div>
        </div>

        <div class="question-area">
          <div class="follow-up-notice">
            <i class="fas fa-comment-dots"></i> 
            <span>Based on your answer, let's go deeper...</span>
          </div>
          <h3 class="question-prompt">${escapeHtml(question.followUp.text)}</h3>
        </div>

        <div class="answer-area">
          <textarea id="followUpInput" class="answer-textarea-mock"
            placeholder="Answer the follow-up question..."
            maxlength="2000"></textarea>
          <div class="answer-footer">
            <span id="followUpWordCount" class="word-count">0 words</span>
            <button id="submitFollowUpBtn" class="submit-answer-btn" disabled>
              <i class="fas fa-paper-plane"></i> Submit
            </button>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('followUpInput');
    const submitBtn = document.getElementById('submitFollowUpBtn');
    const wc = document.getElementById('followUpWordCount');

    input.addEventListener('input', function() {
      const words = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      wc.textContent = `${words} words`;
      submitBtn.disabled = this.value.trim().length < 5;
    });

    setTimeout(() => input?.focus(), 200);

    submitBtn.addEventListener('click', function() {
      MockInterviewEngine.submitFollowUp(input.value);
    });

    document.getElementById('exitInterviewBtn')?.addEventListener('click', function() {
      if (confirm('Exit this interview session?')) endInterview();
    });
  }

  // ── Feedback Screen ──

  function renderFeedback(question, answer, index, total) {
    const f = answer.feedback;
    if (!f) return;

    container.innerHTML = `
      <div class="mock-feedback">
        <div class="feedback-header">
          <div class="feedback-score ${f.score >= 80 ? 'score-high' : f.score >= 60 ? 'score-medium' : 'score-low'}">
            <span class="score-number">${f.score}</span>
            <span class="score-label">/100</span>
          </div>
          <div class="feedback-question-ref">
            <span class="progress-label">Question ${index + 1} of ${total}</span>
          </div>
        </div>

        <!-- Strengths -->
        <div class="feedback-section">
          <h4><i class="fas fa-check-circle" style="color:var(--success-color)"></i> Strengths</h4>
          <ul class="feedback-list strengths">
            ${f.strengths.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>

        <!-- Improvements -->
        <div class="feedback-section">
          <h4><i class="fas fa-exclamation-triangle" style="color:#f59e0b"></i> Areas to Improve</h4>
          <ul class="feedback-list improvements">
            ${f.improvements.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>

        <!-- Model Answer -->
        <div class="feedback-section model-answer-section">
          <h4><i class="fas fa-star" style="color:var(--primary-color)"></i> Model Answer</h4>
          <div class="model-answer-box">
            <p>${escapeHtml(f.modelAnswer)}</p>
          </div>
        </div>

        <!-- Key Advice -->
        <div class="feedback-key-advice">
          <i class="fas fa-lightbulb"></i>
          <span>${escapeHtml(f.keyAdvice)}</span>
        </div>

        <!-- Next button -->
        <button id="nextQuestionBtn" class="next-question-btn">
          ${index < total - 1 ? '<i class="fas fa-arrow-right"></i> Next Question' : '<i class="fas fa-check-circle"></i> View Report'}
        </button>
      </div>
    `;

    document.getElementById('nextQuestionBtn').addEventListener('click', function() {
      MockInterviewEngine.nextQuestion();
    });
  }

  // ── Radar Chart ──

  function drawRadarChart(canvas, labels, scores, width) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = width || 280;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.38;
    const levels = 5;
    const count = labels.length;

    canvas.width = size;
    canvas.height = size;

    function toPoint(index, value) {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const r = (value / 100) * radius;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    // Background grid
    for (let l = 1; l <= levels; l++) {
      const r = (radius / levels) * l;
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < count; i++) {
      const p = toPoint(i, 100);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.stroke();
    }

    // Data area
    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const p = toPoint(idx, scores[idx]);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(67, 97, 238, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(67, 97, 238, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < count; i++) {
      const p = toPoint(i, scores[i]);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4361ee';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Labels
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const labelRadius = radius + 22;
      const x = cx + labelRadius * Math.cos(angle);
      const y = cy + labelRadius * Math.sin(angle);
      ctx.fillText(labels[i], x, y);
    }

    // Center score
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#4361ee';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(avg, cx, cy);
    ctx.font = '9px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('avg', cx, cy + 14);
  }

  // ── Report Screen ──

  function renderReport(report) {
    if (!report) return;

    const timeMinutes = Math.floor(report.sessionDuration / 60);
    const timeSeconds = report.sessionDuration % 60;
    const grades = [
      { min: 90, label: 'Excellent', emoji: '🔥' },
      { min: 75, label: 'Strong', emoji: '💪' },
      { min: 60, label: 'Good', emoji: '📝' },
      { min: 0, label: 'Keep Practicing', emoji: '🔄' }
    ];
    const grade = grades.find(g => report.overallScore >= g.min) || grades[grades.length - 1];

    container.innerHTML = `
      <div class="mock-report">
        <!-- Score Hero -->
        <div class="report-hero">
          <div class="report-score ${report.overallScore >= 80 ? 'hero-high' : report.overallScore >= 60 ? 'hero-medium' : 'hero-low'}">
            <span class="hero-number">${report.overallScore}</span>
            <span class="hero-label">/100</span>
          </div>
          <h2 class="hero-grade">${grade.emoji} ${grade.label}</h2>
          <p class="hero-stats">
            ${report.totalQuestions} questions · ${timeMinutes}m ${timeSeconds}s · ${report.answeredQuestions} answered
          </p>
        </div>

        <!-- Radar Chart -->
        <div class="report-section">
          <h3 class="report-section-title"><i class="fas fa-chart-pie"></i> Finance Ability Radar</h3>
          <div class="radar-container">
            <canvas id="radarChart"></canvas>
          </div>
        </div>

        <!-- Question Breakdown -->
        <div class="report-section">
          <h3 class="report-section-title"><i class="fas fa-list-check"></i> Questions Breakdown</h3>
          <div class="question-breakdown">
            ${report.questions.map((item, i) => {
              const q = item.question;
              const a = item.answer;
              const f = a.feedback;
              const score = f ? f.score : '—';
              return `
                <div class="breakdown-item">
                  <button class="breakdown-toggle" data-target="breakdown-${i}">
                    <span class="breakdown-q-number">Q${i + 1}</span>
                    <span class="breakdown-q-text">${escapeHtml(q.text.substring(0, 80))}${q.text.length > 80 ? '...' : ''}</span>
                    <span class="breakdown-score ${score >= 80 ? 'sc-high' : score >= 60 ? 'sc-med' : 'sc-low'}">${score}</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                  </button>
                  <div class="breakdown-body" id="breakdown-${i}" style="display:none;">
                    <div class="breakdown-answer">
                      <strong>Your answer:</strong>
                      <p>${escapeHtml(a.userAnswer) || '<em>Not answered</em>'}</p>
                    </div>
                    ${a.followUpAnswer ? `<div class="breakdown-followup"><strong>Follow-up response:</strong><p>${escapeHtml(a.followUpAnswer)}</p></div>` : ''}
                    ${f ? `
                      <div class="breakdown-feedback">
                        <div class="bf-section">
                          <strong style="color:var(--success-color)">✓ Strengths:</strong>
                          <ul>${f.strengths.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
                        </div>
                        <div class="bf-section">
                          <strong style="color:#f59e0b">⚠ Improvements:</strong>
                          <ul>${f.improvements.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
                        </div>
                        <div class="bf-section model-answer-box">
                          <strong style="color:var(--primary-color)">★ Model Answer:</strong>
                          <p>${escapeHtml(f.modelAnswer)}</p>
                        </div>
                        <div class="bf-key-advice"><i class="fas fa-lightbulb"></i> ${escapeHtml(f.keyAdvice)}</div>
                      </div>
                    ` : '<p class="text-secondary">No feedback available</p>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Actions -->
        <div class="report-actions">
          <button id="retryBtn" class="report-action-btn primary-action">
            <i class="fas fa-redo"></i> Retry Same Interview
          </button>
          <button id="newInterviewBtn" class="report-action-btn secondary-action">
            <i class="fas fa-plus-circle"></i> New Interview
          </button>
          <button id="exportBtn" class="report-action-btn subtle-action">
            <i class="fas fa-download"></i> Export Report
          </button>
        </div>

        <p class="report-privacy-note">
          <i class="fas fa-shield-alt"></i> This report is generated from memory. No data is stored or used for training.
        </p>
      </div>
    `;

    // Radar chart
    radarCanvas = document.getElementById('radarChart');
    if (radarCanvas) {
      const parent = radarCanvas.parentElement;
      const w = Math.min(parent.clientWidth - 40, 280);
      drawRadarChart(radarCanvas, report.radarLabels, report.radarScores, w);
    }

    // Breakdown toggle
    document.querySelectorAll('.breakdown-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const body = document.getElementById(this.dataset.target);
        if (body) {
          const isOpen = body.style.display !== 'none';
          body.style.display = isOpen ? 'none' : 'block';
          this.querySelector('.toggle-icon').style.transform = isOpen ? '' : 'rotate(180deg)';
        }
      });
    });

    // Action buttons
    document.getElementById('retryBtn')?.addEventListener('click', function() {
      // Use same config
      const cfg = MockInterviewEngine.getConfig();
      startInterview(cfg);
    });

    document.getElementById('newInterviewBtn')?.addEventListener('click', function() {
      endInterview();
    });

    document.getElementById('exportBtn')?.addEventListener('click', function() {
      const text = generateReportText(report);
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `finterview-report-${Date.now()}.txt`;
      a.click();
    });
  }

  function generateReportText(report) {
    const lines = [
      '═══════════════════════════════════════',
      '  finterview - Mock Interview Report',
      '═══════════════════════════════════════',
      '',
      `Overall Score: ${report.overallScore}/100`,
      `Questions: ${report.totalQuestions}`,
      `Duration: ${Math.floor(report.sessionDuration / 60)}m ${report.sessionDuration % 60}s`,
      '',
      '─── Radar Scores ───',
    ];
    report.radarLabels.forEach((label, i) => {
      lines.push(`  ${label}: ${report.radarScores[i]}`);
    });
    lines.push('');
    report.questions.forEach((item, i) => {
      const f = item.answer.feedback;
      lines.push(`─── Q${i + 1}: ${item.question.text.substring(0, 100)} ───`);
      lines.push(`  Score: ${f ? f.score : '—'}`);
      if (f) {
        lines.push(`  Strengths: ${f.strengths.join(', ')}`);
        lines.push(`  Improvements: ${f.improvements.join(', ')}`);
        lines.push(`  Advice: ${f.keyAdvice}`);
      }
      lines.push('');
    });
    lines.push('Report generated by finterview. No data stored.');
    return lines.join('\n');
  }

  // ── Utility ──

  function escapeHtml(text) {
    if (!text) return '';
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function endInterview() {
    MockInterviewEngine.resetSession();
    renderSetup();
  }

  // ── State Change Handler ──

  function handleStateChange(newState) {
    switch (newState) {
      case 'setup':
        renderSetup();
        break;
      case 'parsing':
        // Already handled via startInterview
        break;
      case 'interview': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const idx = MockInterviewEngine.getCurrentIndex();
        const total = MockInterviewEngine.getQuestions().length;
        const timer = MockInterviewEngine.getTimerRemaining();
        renderInterview(q, idx, total, timer);
        break;
      }
      case 'follow_up': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const timer = MockInterviewEngine.getTimerRemaining();
        renderFollowUp(q, timer);
        break;
      }
      case 'feedback': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const a = MockInterviewEngine.getAnswers()[MockInterviewEngine.getCurrentIndex()];
        const idx = MockInterviewEngine.getCurrentIndex();
        const total = MockInterviewEngine.getQuestions().length;
        renderFeedback(q, a, idx, total);
        break;
      }
      case 'report': {
        const report = MockInterviewEngine.getLastReport();
        renderReport(report);
        break;
      }
      case 'timeout': {
        // Auto-submit on timeout
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
          MockInterviewEngine.submitAnswer(answerInput.value || '[Time expired]');
        }
        break;
      }
    }
  }

  // ── Timer Tick Handler ──

  function handleTimerTick(remaining) {
    const timerText = document.getElementById('timerText');
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerText) timerText.textContent = formatTime(remaining);
    if (timerDisplay) {
      timerDisplay.className = `timer-display ${remaining <= 30 ? 'timer-warning' : ''} ${remaining <= 10 ? 'timer-critical' : ''}`;
    }
  }

  // ── Public Init ──

  return {
    init: function(containerEl) {
      container = containerEl;
      if (!container) {
        console.error('MockInterviewUI: container element not found');
        return;
      }

      MockInterviewEngine.onStateChange(handleStateChange);
      MockInterviewEngine.onTimerTick(handleTimerTick);

      renderSetup();
    }
  };
})();
