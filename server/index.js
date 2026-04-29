// finterview AI Feedback Server (local dev only)
// Supports DeepSeek (primary) and OpenAI (fallback)

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from parent directory (the finterview project root)
app.use(express.static(path.join(__dirname, '..')));

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API Keys
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function getActiveProvider() {
  if (DEEPSEEK_API_KEY) return 'deepseek';
  if (OPENAI_API_KEY) return 'openai';
  return null;
}

// Generic LLM caller — supports DeepSeek and OpenAI
async function callLLM(systemPrompt, userPrompt, options = {}) {
  const {
    temperature = 0.7,
    maxTokens = 800,
    jsonMode = false,
    contextMessages = []
  } = options;

  const provider = getActiveProvider();
  if (!provider) throw new Error('No API key configured. Set DEEPSEEK_API_KEY or OPENAI_API_KEY');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...contextMessages,
    { role: 'user', content: userPrompt }
  ];

  let endpoint, model, apiKey, body;

  if (provider === 'deepseek') {
    endpoint = 'https://api.deepseek.com/v1/chat/completions';
    model = 'deepseek-chat';
    apiKey = DEEPSEEK_API_KEY;
  } else {
    endpoint = 'https://api.openai.com/v1/chat/completions';
    model = 'gpt-4o-mini';
    apiKey = OPENAI_API_KEY;
  }

  body = { model, messages, temperature, max_tokens: maxTokens };
  if (jsonMode && provider !== 'deepseek') {
    // DeepSeek doesn't support response_format, so we rely on prompt instructions
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(`${provider} API error:`, data);
    throw new Error(`${provider} API error: ${JSON.stringify(data)}`);
  }

  const content = data.choices[0].message.content;
  
  // For DeepSeek (no response_format), handle potential non-JSON wrapping
  if (jsonMode) {
    try {
      return JSON.parse(content);
    } catch (e) {
      // Try to extract JSON from markdown code block or other wrapping
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || 
                        content.match(/{[\s\S]*?}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      throw new Error('Failed to parse JSON response: ' + content.substring(0, 200));
    }
  }
  
  return content;
}

// ========================================
// POST /api/analyze
// Analyze a user's answer to a question
// ========================================
app.post('/api/analyze', async (req, res) => {
  const { question, userAnswer, questionData } = req.body;

  if (!question || !userAnswer) {
    return res.status(400).json({ error: 'Missing question or userAnswer' });
  }

  const modelAnswer = questionData?.modelAnswer || questionData?.answers?.modelAnswer || questionData?.answers?.concise || '';
  const difficulty = questionData?.difficulty || 'medium';
  const role = questionData?.role || 'finance';
  const category = questionData?.category || 'general';
  const title = questionData?.title || question;

  const systemPrompt = `You are a senior finance professional (10+ years at Goldman Sachs, now doing interview coaching). You are conducting a strict technical interview for a ${role} position.

Your job is to evaluate the candidate's answer to the following interview question.

Question: "${title}" (${category}, difficulty: ${difficulty})

The model/correct answer is: 
${modelAnswer}

Evaluate the candidate's answer STRICTLY and provide honest, constructive feedback in this exact JSON format:

{
  "score": <0-100>,
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "weaknesses": ["<specific weakness 1>", "<specific weakness 2>"],
  "missedConcepts": ["<concept they should have mentioned>"],
  "improvedAnswer": "<a brief improved version of their answer, showing what a great answer looks like>",
  "keyAdvice": "<one piece of actionable advice to improve>"
}

Rules:
- Score is out of 100. Be honest — 70 is a good answer, 85+ is excellent, below 50 needs major improvement.
- Strengths should be specific ("good explanation of WACC components"), not generic ("good job").
- Weaknesses should be specific and actionable ("you forgot terminal value in your DCF").
- MissedConcepts should list 1-3 key concepts they should have covered.
- ImprovedAnswer should be a 2-4 sentence version of their answer corrected to be interview-ready.
- KeyAdvice should be ONE specific, actionable piece of advice.
- Be critical but fair — this is interview prep, not a real interview. The goal is improvement.
- If the answer is very short, penalize for lack of depth.`;

  const userPrompt = `Candidate's answer: "${userAnswer}"\n\nEvaluate this answer strictly according to the criteria above. Return only valid JSON.`;

  try {
    const content = await callLLM(systemPrompt, userPrompt, {
      temperature: 0.7,
      maxTokens: 800,
      jsonMode: true
    });
    return res.json(content);
  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

// ========================================
// POST /api/chat — Finance Bro AI chat
// ========================================
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  const systemPrompt = `You are Finance Bro AI — an enthusiastic, knowledgeable finance interview coach. You help candidates prepare for finance interviews at top firms (GS, JPM, MS, etc.).

Your style: confident, knowledgeable, slightly bro-y but always professional. Use finance slang naturally ("beat the street", "crush the superday", "nail the technicals") but keep it substantive.

You cover: technical questions, behavioral prep, market knowledge, career advice, resume tips.

Keep answers concise and actionable. Use bullet points when helpful. If you don't know something specific, say so honestly.`;

  try {
    const response = await callLLM(systemPrompt, message, {
      temperature: 0.8,
      maxTokens: 1000,
      contextMessages: context || []
    });
    return res.json({ response });
  } catch (err) {
    console.error('Chat error:', err);
    return res.json({ response: "Technical difficulties! Try again in a moment." });
  }
});

// ========================================
// Start
// ========================================
app.listen(PORT, () => {
  const provider = getActiveProvider();
  console.log(`\n🔧 finterview AI Server running on http://localhost:${PORT}`);
  console.log(`   📁 Serving static files from project root`);
  console.log(`   POST /api/analyze — Analyze interview answers`);
  console.log(`   POST /api/chat — Chat with Finance Bro AI`);
  if (provider) {
    console.log(`   ✅ Using ${provider === 'deepseek' ? 'DeepSeek' : 'OpenAI'} API`);
  } else {
    console.log(`   ⚠️  No API key set. Set DEEPSEEK_API_KEY or OPENAI_API_KEY`);
  }
  console.log(`   🌐 Open http://localhost:${PORT} in your browser\n`);
});
