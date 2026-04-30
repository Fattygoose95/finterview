/**
 * mock-interview-ui.js - Interview UI Module (Chat Interface)
 * Render layer for the chat-based mock interview experience.
 * API/Engine modules stay unchanged — swap mock data for real AI later.
 */

const MockInterviewUI = (function() {
  'use strict';

  let container = null;
  let radarCanvas = null;

  // ── Chat State ──
  let chatHistory = [];
  let chatListEl = null;
  let chatInputEl = null;
  let chatSendEl = null;
  let isChatBuilt = false;

  // ── Persona ──
  const PERSONA = {
    name: 'Sarah Chen',
    title: 'Managing Director',
    firm: 'Goldman Sachs',
    avatar: 'SC'
  };

  // ── Timeout Messages ──
  const TIMEOUT_MSGS = [
    "If this was a real interview, you'd be cooked. 🍳",
    "Silence is golden — but not in interviews. 💀",
    "Tick. Tock. Next time, say *something*. The interviewer wants to see how you think.",
    "Blank page syndrome? Jot down your thoughts — even a framework is better than silence.",
    "You froze. It happens. Let's review what you can do differently.",
    "Oof. 😬 That silence just cost you. Let's talk about recovery strategies."
  ];

  // ── Utilities ──

  function esc(text) {
    if (!text) return '';
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function fmtTime(seconds) {
    if (seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function scrollBottom() {
    requestAnimationFrame(() => {
      if (chatListEl) chatListEl.scrollTop = chatListEl.scrollHeight;
    });
  }

  function randMsg(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ── Setup Screen ──

  function renderSetup() {
    isChatBuilt = false;
    chatHistory = [];

    container.innerHTML = `
      <div class="mock-setup">
        <div class="setup-header">
          <h2>Mock Interview</h2>
          <p class="setup-subtitle">Chat with an AI interviewer. Real pressure. Real feedback.</p>
        </div>
        <div class="setup-section">
          <h3 class="setup-ss-title"><i class="fas fa-user-tie"></i> Your Background</h3>
          <p class="setup-hint">Paste your resume or LinkedIn profile for personalized questions</p>
          <textarea id="resumeInput" class="resume-textarea" placeholder="Paste your resume / LinkedIn text here...
          
Example:
Education: ...
Experience: ...
Skills: ...
Key achievements: ..." maxlength="5000"></textarea>
          <div class="resume-actions">
            <label class="resume-upload-btn">
              <i class="fas fa-upload"></i> Upload .txt
              <input type="file" accept=".txt,.text" style="display:none" id="resumePdfUpload">
            </label>
            <button class="resume-sample-btn" data-sample="mfin-student"><i class="fas fa-user-graduate"></i> Student Profile</button>
            <button class="resume-sample-btn" data-sample="gs-analyst"><i class="fas fa-briefcase"></i> GS Analyst</button>
          </div>
          <div class="privacy-badge">
            <i class="fas fa-shield-alt"></i> Processed securely in memory. <strong>We do not store your resume.</strong>
          </div>
        </div>
        <div class="setup-section">
          <h3 class="setup-ss-title"><i class="fas fa-sliders-h"></i> Settings</h3>
          <div class="config-grid">
            <div class="config-item">
              <label for="interviewType">Type</label>
              <select id="interviewType">
                <option value="mixed">Mixed</option>
                <option value="general">General</option>
                <option value="resume-deep-dive">Resume Deep-Dive</option>
                <option value="industry-specific">Industry Focus</option>
              </select>
            </div>
            <div class="config-item">
              <label for="interviewIndustry">Industry</label>
              <select id="interviewIndustry">
                <option value="ib">Investment Banking</option>
                <option value="snt">Sales & Trading</option>
                <option value="am">Asset Management</option>
                <option value="quant">Quantitative Finance</option>
              </select>
            </div>
            <div class="config-item">
              <label for="questionCount">Questions</label>
              <select id="questionCount">
                <option value="3">3 (Quick)</option>
                <option value="5" selected>5 (Standard)</option>
                <option value="10">10 (Intensive)</option>
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
        <button id="startInterviewBtn" class="start-interview-btn" disabled>
          <i class="fas fa-play-circle"></i> Start Interview
        </button>
        <p class="start-hint" id="startHint">Paste a resume or try a sample to begin</p>
      </div>
    `;

    const resumeEl = document.getElementById('resumeInput');
    const startBtn = document.getElementById('startInterviewBtn');
    const hint = document.getElementById('startHint');

    if (MockInterviewResume.hasResume()) {
      resumeEl.value = MockInterviewResume.getResume();
      startBtn.disabled = false;
      hint.textContent = 'Ready';
      hint.className = 'start-hint ready';
    }

    resumeEl.addEventListener('input', function() {
      const ok = MockInterviewResume.setResume(this.value);
      startBtn.disabled = !ok;
      hint.textContent = ok ? 'Ready' : 'Paste a resume or try a sample';
      hint.className = ok ? 'start-hint ready' : 'start-hint';
    });

    document.querySelectorAll('.resume-sample-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        MockInterviewResume.loadSample(this.dataset.sample);
        document.getElementById('resumeInput').value = MockInterviewResume.getResume();
        startBtn.disabled = false;
        hint.textContent = 'Ready';
        hint.className = 'start-hint ready';
      });
    });

    document.getElementById('resumePdfUpload')?.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      hint.textContent = 'Reading file...';
      if (file.name.endsWith('.txt') || file.type === 'text/plain') {
        const r = new FileReader();
        r.onload = function(ev) {
          document.getElementById('resumeInput').value = '[Uploaded: ' + file.name + ']\n' + ev.target.result.substring(0, 4000);
          MockInterviewResume.setResume(document.getElementById('resumeInput').value);
          startBtn.disabled = false;
          hint.textContent = 'Ready';
          hint.className = 'start-hint ready';
        };
        r.readAsText(file);
      } else {
        hint.textContent = 'PDF parsing coming in Phase 2 — paste text instead';
        hint.style.color = '#d97706';
      }
    });

    document.getElementById('startInterviewBtn').addEventListener('click', function() {
      const config = {
        type: document.getElementById('interviewType').value,
        questionCount: parseInt(document.getElementById('questionCount').value),
        timerMinutes: 2,
        difficulty: document.getElementById('difficulty').value,
        industry: document.getElementById('interviewIndustry').value
      };
      startInterview(config);
    });

    document.getElementById('interviewType').addEventListener('change', function() {
      const el = document.getElementById('interviewIndustry').closest('.config-item');
      if (el) el.style.display = ['industry-specific', 'mixed'].includes(this.value) ? '' : 'none';
    });
  }

  // ── Parsing Animation ──

  function renderParsing() {
    container.innerHTML = `
      <div class="mock-parsing">
        <div class="parsing-anim"><i class="fas fa-brain"></i></div>
        <h3>AI is intensely analyzing your background...</h3>
        <p class="parsing-sub">Generating personalized questions</p>
        <div class="parsing-steps">
          <div class="pstep" id="ps1"><i class="fas fa-check-circle"></i> Reading resume</div>
          <div class="pstep" id="ps2"><i class="fas fa-check-circle"></i> Identifying key experiences</div>
          <div class="pstep" id="ps3"><i class="fas fa-check-circle"></i> Matching question difficulty</div>
          <div class="pstep" id="ps4"><i class="fas fa-check-circle"></i> Preparing follow-up scenarios</div>
        </div>
      </div>
    `;
    ['ps1','ps2','ps3','ps4'].forEach((id, i) => {
      setTimeout(() => { const e = document.getElementById(id); if (e) e.classList.add('done'); }, 400 + i * 500);
    });
    MockInterviewEngine.generateQuestions();
    MockInterviewAPI.simulateParsing().then(() => MockInterviewEngine.beginInterview());
  }

  // ── Build Chat Shell ──

  function buildChatShell(title, total) {
    container.innerHTML = `
      <div class="chat-wrapper">
        <div class="chat-header">
          <button id="chatExit" class="chat-exit"><i class="fas fa-times"></i></button>
          <div class="chat-persona">
            <div class="chat-avatar">${PERSONA.avatar}</div>
            <div>
              <div class="chat-persona-name">${PERSONA.name}</div>
              <div class="chat-persona-title">${PERSONA.title}, ${PERSONA.firm}</div>
            </div>
          </div>
          <div class="chat-meta">
            <span class="chat-progress" id="chatProgress">Q1/${total}</span>
            <span class="chat-timer" id="chatTimer">02:00</span>
          </div>
        </div>
        <div class="chat-list" id="chatList"></div>
        <div class="chat-input-area" id="chatInputArea">
          <textarea id="chatInput" class="chat-input" placeholder="Type your answer..." maxlength="3000" rows="1"></textarea>
          <button id="chatSend" class="chat-send" disabled><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `;

    chatListEl = document.getElementById('chatList');
    chatInputEl = document.getElementById('chatInput');
    chatSendEl = document.getElementById('chatSend');
    isChatBuilt = true;
    chatHistory = [];

    // Exit
    document.getElementById('chatExit').addEventListener('click', function() {
      if (confirm('Exit this interview?')) endInterview();
    });

    // Chat input auto-resize
    chatInputEl.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      const text = this.value.trim();
      chatSendEl.disabled = text.length < 5;
    });

    // Enter to send, Shift+Enter for new line
    chatInputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (chatSendEl && !chatSendEl.disabled) chatSendEl.click();
      }
    });

    chatSendEl.addEventListener('click', function() {
      if (this.disabled) return;
      const text = chatInputEl.value.trim();
      if (text.length < 5) return;
      chatInputEl.value = '';
      chatInputEl.style.height = 'auto';
      chatInputEl.focus();
      handleUserSubmit(text);
    });

    // Update progress
    const prog = document.getElementById('chatProgress');
    if (prog) prog.textContent = title;
  }

  // ── Chat Message Rendering ──

  function addAIMessage(text, extras) {
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg msg-ai';
    div.innerHTML = `
      <div class="msg-avatar ai">${PERSONA.avatar}</div>
      <div class="msg-body">
        <div class="msg-name">${PERSONA.name}</div>
        <div class="msg-text">${esc(text)}</div>
        ${extras?.timeLabel ? `<div class="msg-timer">⏱ ${extras.timeLabel}</div>` : ''}
        ${extras?.note ? `<div class="msg-note">${extras.note}</div>` : ''}
      </div>
    `;
    chatListEl.appendChild(div);
    scrollBottom();
    return div;
  }

  function addUserMessage(text) {
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg msg-user';
    div.innerHTML = `
      <div class="msg-body">
        <div class="msg-name">You</div>
        <div class="msg-text">${esc(text)}</div>
      </div>
      <div class="msg-avatar you">Y</div>
    `;
    chatListEl.appendChild(div);
    scrollBottom();
    return div;
  }

  function addFeedbackMessage(feedback) {
    if (!chatListEl || !feedback) return;
    const s = feedback.score;
    const scoreClass = s >= 80 ? 'fb-high' : s >= 60 ? 'fb-med' : 'fb-low';
    const scoreEmoji = s >= 80 ? '🔥' : s >= 60 ? '💪' : '📝';

    const div = document.createElement('div');
    div.className = 'chat-msg msg-ai';
    div.innerHTML = `
      <div class="msg-avatar ai">${PERSONA.avatar}</div>
      <div class="msg-body">
        <div class="msg-name">${PERSONA.name}</div>
        <div class="msg-text">Here's what I think:</div>
        <div class="chat-feedback">
          <div class="fb-score ${scoreClass}">${scoreEmoji} <span class="fb-score-num">${s}</span></div>
          <div class="fb-section">
            <div class="fb-section-title ok">✓ Strengths</div>
            <ul class="fb-list">${feedback.strengths.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
          </div>
          <div class="fb-section">
            <div class="fb-section-title warn">⚠ Improvements</div>
            <ul class="fb-list">${feedback.improvements.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
          </div>
          <div class="fb-model">
            <div class="fb-section-title primary">★ Model Answer</div>
            <p>${esc(feedback.modelAnswer)}</p>
          </div>
          <div class="fb-advice"><i class="fas fa-lightbulb"></i> ${esc(feedback.keyAdvice)}</div>
        </div>
      </div>
    `;
    chatListEl.appendChild(div);
    scrollBottom();
  }

  function addTypingIndicator() {
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg msg-ai';
    div.id = 'typingIndicator';
    div.innerHTML = `
      <div class="msg-avatar ai">${PERSONA.avatar}</div>
      <div class="msg-body">
        <div class="msg-name">${PERSONA.name}</div>
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    chatListEl.appendChild(div);
    scrollBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  function addSystemMessage(text) {
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-system';
    div.textContent = text;
    chatListEl.appendChild(div);
    scrollBottom();
  }

  function addTimeoutMessage() {
    const msg = randMsg(TIMEOUT_MSGS);
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg msg-ai msg-timeout';
    div.innerHTML = `
      <div class="msg-avatar ai">💀</div>
      <div class="msg-body">
        <div class="msg-name">${PERSONA.name}</div>
        <div class="msg-text">${esc(msg)}</div>
      </div>
    `;
    chatListEl.appendChild(div);
    scrollBottom();
  }

  function addNextButton(text, handler) {
    if (!chatListEl) return;
    const div = document.createElement('div');
    div.className = 'chat-next-btn-wrap';
    const btn = document.createElement('button');
    btn.className = 'chat-next-btn';
    btn.innerHTML = text;
    btn.addEventListener('click', handler);
    div.appendChild(btn);
    chatListEl.appendChild(div);
    scrollBottom();
  }

  function disableChatInput() {
    if (chatInputEl) chatInputEl.disabled = true;
    if (chatSendEl) chatSendEl.disabled = true;
  }

  function enableChatInput(placeholder) {
    if (chatInputEl) {
      chatInputEl.disabled = false;
      chatInputEl.placeholder = placeholder || 'Type your answer...';
      chatInputEl.focus();
    }
    if (chatSendEl) chatSendEl.disabled = true;
  }

  // ── Timer ──

  function updateTimer(remaining) {
    const el = document.getElementById('chatTimer');
    if (el) {
      el.textContent = fmtTime(remaining);
      el.className = 'chat-timer' + (remaining <= 30 ? ' timer-warn' : '') + (remaining <= 10 ? ' timer-crit' : '');
    }
  }

  function updateProgress(title) {
    const el = document.getElementById('chatProgress');
    if (el) el.textContent = title;
  }

  // ── Handle User Submit ──

  function handleUserSubmit(text) {
    const state = MockInterviewEngine.getState();
    
    if (state === MockInterviewEngine.STATE.INTERVIEW) {
      addUserMessage(text);
      disableChatInput();
      MockInterviewEngine.submitAnswer(text);
    } else if (state === MockInterviewEngine.STATE.FOLLOW_UP) {
      addUserMessage(text);
      disableChatInput();
      MockInterviewEngine.submitFollowUp(text);
    }
  }

  // ── State Handler ──

  function handleStateChange(newState) {
    switch (newState) {
      case 'setup':
        renderSetup();
        break;

      case 'parsing':
        // handled in startInterview
        break;

      case 'interview': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const idx = MockInterviewEngine.getCurrentIndex();
        const total = MockInterviewEngine.getQuestions().length;
        const timer = MockInterviewEngine.getTimerRemaining();

        if (!isChatBuilt) {
          buildChatShell(`Q${idx + 1}/${total}`, total);
        }

        updateProgress(`Q${idx + 1}/${total}`);
        updateTimer(timer);

        // Greeting on first question
        if (idx === 0 && chatHistory.length === 0) {
          addAIMessage(`Hey — I'm ${PERSONA.name}. I'll be your interviewer today. Let's jump right in.`, { note: 'Just answer naturally. No pressure. Well... some pressure.' });
        }

        // If we're returning from report for retry, might need to rebuild chat
        if (idx === 0 && chatListEl && chatListEl.children.length === 0) {
          addAIMessage(`Hey — I'm ${PERSONA.name}. Let's do this.`, { note: 'Same settings, different questions.' });
        }

        addAIMessage(q.text, { timeLabel: fmtTime(timer) });
        enableChatInput();
        break;
      }

      case 'follow_up': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const timer = MockInterviewEngine.getTimerRemaining();

        removeTypingIndicator();
        updateTimer(timer);

        // Brief thinking pause
        setTimeout(() => {
          addAIMessage(q.followUp.text, { timeLabel: fmtTime(timer) });
          enableChatInput();
        }, 800);
        break;
      }

      case 'feedback': {
        const q = MockInterviewEngine.getCurrentQuestion();
        const a = MockInterviewEngine.getAnswers()[MockInterviewEngine.getCurrentIndex()];
        const idx = MockInterviewEngine.getCurrentIndex();
        const total = MockInterviewEngine.getQuestions().length;

        removeTypingIndicator();

        // Short pause for realism
        setTimeout(() => {
          addFeedbackMessage(a.feedback);

          if (idx < total - 1) {
            addNextButton('<i class="fas fa-arrow-right"></i> Next Question', function() {
              MockInterviewEngine.nextQuestion();
            });
          } else {
            addSystemMessage('That was your last question.');
            addNextButton('<i class="fas fa-chart-bar"></i> View Full Report', function() {
              MockInterviewEngine.endSession();
            });
          }
        }, 600);
        break;
      }

      case 'timeout': {
        addTimeoutMessage();
        disableChatInput();
        // Auto-submit whatever they had
        const input = document.getElementById('chatInput');
        const text = input ? input.value.trim() : '';
        if (text.length >= 5) {
          addUserMessage(text);
          MockInterviewEngine.submitAnswer(text);
        } else {
          // Empty timeout
          MockInterviewEngine.submitAnswer('[No response — time expired]');
        }
        break;
      }

      case 'report': {
        const report = MockInterviewEngine.getLastReport();
        renderReport(report);
        break;
      }
    }
  }

  // ── Timer Tick ──

  function handleTimerTick(remaining) {
    updateTimer(remaining);
  }

  // ── Report Screen ──

  function drawRadarChart(canvas, labels, scores, width) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = width || 280;
    const cx = size / 2, cy = size / 2;
    const radius = size * 0.38;
    const levels = 5;
    const count = labels.length;
    canvas.width = size;
    canvas.height = size;

    function pt(index, val) {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const r = (val / 100) * radius;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    for (let l = 1; l <= levels; l++) {
      const r = (radius / levels) * l;
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const a = (Math.PI * 2 * i) / count - Math.PI / 2;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    }

    for (let i = 0; i < count; i++) {
      const p = pt(i, 100);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const p = pt(idx, scores[idx]);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(67,97,238,0.15)'; ctx.fill();
    ctx.strokeStyle = 'rgba(67,97,238,0.6)'; ctx.lineWidth = 2; ctx.stroke();

    for (let i = 0; i < count; i++) {
      const p = pt(i, scores[i]);
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4361ee'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }

    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count - Math.PI / 2;
      const lr = radius + 22;
      ctx.fillText(labels[i], cx + lr * Math.cos(a), cy + lr * Math.sin(a));
    }

    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = '#4361ee';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(avg, cx, cy);
    ctx.font = '9px Inter, sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('avg', cx, cy + 14);
  }

  function renderReport(report) {
    if (!report) return;
    isChatBuilt = false;

    const tMin = Math.floor(report.sessionDuration / 60);
    const tSec = report.sessionDuration % 60;
    const grades = [
      { min: 90, label: 'Excellent', emoji: '🔥' },
      { min: 75, label: 'Strong', emoji: '💪' },
      { min: 60, label: 'Good', emoji: '📝' },
      { min: 0, label: 'Keep Practicing', emoji: '🔄' }
    ];
    const grade = grades.find(g => report.overallScore >= g.min) || grades[grades.length - 1];

    container.innerHTML = `
      <div class="mock-report">
        <div class="report-hero">
          <div class="report-score">
            <span class="hero-number">${report.overallScore}</span>
            <span class="hero-label">/100</span>
          </div>
          <h2 class="hero-grade">${grade.emoji} ${grade.label}</h2>
          <p class="hero-stats">${report.totalQuestions} questions · ${tMin}m ${tSec}s · ${report.answeredQuestions} answered</p>
        </div>
        <div class="report-section">
          <h3><i class="fas fa-chart-pie"></i> Ability Radar</h3>
          <div class="radar-container"><canvas id="radarChart"></canvas></div>
        </div>
        <div class="report-section">
          <h3><i class="fas fa-list-check"></i> Breakdown</h3>
          <div class="q-breakdown">
            ${report.questions.map((item, i) => {
              const q = item.question;
              const a = item.answer;
              const f = a.feedback;
              const s = f ? f.score : '—';
              return `
                <div class="bdown-item">
                  <button class="bdown-toggle" data-t="bd-${i}">
                    <span class="bd-q">Q${i + 1}</span>
                    <span class="bd-text">${esc(q.text.substring(0, 70))}${q.text.length > 70 ? '...' : ''}</span>
                    <span class="bd-score ${s >= 80 ? 's-hi' : s >= 60 ? 's-md' : 's-lo'}">${s}</span>
                    <i class="fas fa-chevron-down"></i>
                  </button>
                  <div class="bdown-body" id="bd-${i}" style="display:none;">
                    <div class="bd-ans"><strong>Your answer:</strong><p>${esc(a.userAnswer) || '<em>No answer</em>'}</p></div>
                    ${a.followUpAnswer ? `<div class="bd-fup"><strong>Follow-up:</strong><p>${esc(a.followUpAnswer)}</p></div>` : ''}
                    ${f ? `
                      <div class="bd-fb">
                        <div class="bd-fbs"><strong style="color:#28a745">✓ Strengths:</strong><ul>${f.strengths.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
                        <div class="bd-fbs"><strong style="color:#d97706">⚠ Improvement:</strong><ul>${f.improvements.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
                        <div class="bd-fbm"><strong style="color:#4361ee">★ Model Answer:</strong><p>${esc(f.modelAnswer)}</p></div>
                        <div class="bd-advice"><i class="fas fa-lightbulb"></i> ${esc(f.keyAdvice)}</div>
                      </div>
                    ` : '<p class="text-secondary">No feedback</p>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="report-actions">
          <button id="retryBtn" class="rbtn rbtn-p"><i class="fas fa-redo"></i> Retry Same</button>
          <button id="newIntBtn" class="rbtn rbtn-s"><i class="fas fa-plus"></i> New Interview</button>
          <button id="exportBtn" class="rbtn rbtn-t"><i class="fas fa-download"></i> Export</button>
        </div>
        <p class="report-privacy"><i class="fas fa-shield-alt"></i> Report generated from memory. Nothing stored.</p>
      </div>
    `;

    const rc = document.getElementById('radarChart');
    if (rc) {
      const w = Math.min(rc.parentElement.clientWidth - 40, 280);
      drawRadarChart(rc, report.radarLabels, report.radarScores, w);
    }

    document.querySelectorAll('.bdown-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const body = document.getElementById(this.dataset.t);
        if (body) {
          const open = body.style.display !== 'none';
          body.style.display = open ? 'none' : 'block';
          this.querySelector('.fa-chevron-down').style.transform = open ? '' : 'rotate(180deg)';
        }
      });
    });

    document.getElementById('retryBtn').addEventListener('click', function() {
      startInterview(MockInterviewEngine.getConfig());
    });
    document.getElementById('newIntBtn').addEventListener('click', endInterview);
    document.getElementById('exportBtn').addEventListener('click', function() {
      const text = generateExport(report);
      const b = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = 'finterview-report.txt';
      a.click();
    });
  }

  function generateExport(report) {
    const lines = [
      '═══════════════════════════════',
      '  finterview - Mock Interview Report',
      '═══════════════════════════════',
      '',
      `Score: ${report.overallScore}/100`,
      `Questions: ${report.totalQuestions}`,
      `Duration: ${Math.floor(report.sessionDuration / 60)}m ${report.sessionDuration % 60}s`,
      '',
      '── Radar ──',
    ];
    report.radarLabels.forEach((l, i) => lines.push(`  ${l}: ${report.radarScores[i]}`));
    lines.push('');
    report.questions.forEach((item, i) => {
      const f = item.answer.feedback;
      lines.push(`── Q${i + 1} ──`);
      lines.push(`  Score: ${f ? f.score : '—'}`);
      if (f) {
        lines.push(`  Strengths: ${f.strengths.join(', ')}`);
        lines.push(`  Improvements: ${f.improvements.join(', ')}`);
        lines.push(`  Advice: ${f.keyAdvice}`);
      }
      lines.push('');
    });
    lines.push('Report by finterview. No data stored.');
    return lines.join('\n');
  }

  function endInterview() {
    MockInterviewEngine.resetSession();
    renderSetup();
  }

  function startInterview(config) {
    MockInterviewEngine.startSession(config);
    renderParsing();
  }

  // ── Init ──

  return {
    init: function(containerEl) {
      container = containerEl;
      if (!container) { console.error('MockInterviewUI: no container'); return; }
      MockInterviewEngine.onStateChange(handleStateChange);
      MockInterviewEngine.onTimerTick(handleTimerTick);
      renderSetup();
    }
  };
})();
