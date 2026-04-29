// FinInterviewAI Scoring Engine
// Rule-based assessment with keyword matching and structure analysis

class ScoringEngine {
    constructor() {
        this.weights = {
            contentAccuracy: 0.5,    // Keyword matching
            structureClarity: 0.3,   // Answer structure
            foRelevance: 0.2         // Family office specific terms
        };
    }

    // Main scoring function
    scoreAnswer(question, userAnswer) {
        const normalizedAnswer = this.normalizeText(userAnswer);
        const normalizedQuestion = this.normalizeText(question.question);
        
        // Calculate component scores
        const contentScore = this.calculateContentScore(question, normalizedAnswer);
        const structureScore = this.calculateStructureScore(normalizedAnswer, normalizedQuestion);
        const foScore = this.calculateFOScore(normalizedAnswer);
        
        // Weighted total score
        const totalScore = Math.round(
            (contentScore * this.weights.contentAccuracy) +
            (structureScore * this.weights.structureClarity) +
            (foScore * this.weights.foRelevance)
        );
        
        // Generate feedback
        const feedback = this.generateFeedback(question, normalizedAnswer, {
            contentScore,
            structureScore,
            foScore,
            totalScore
        });
        
        return {
            totalScore,
            componentScores: {
                contentAccuracy: contentScore,
                structureClarity: structureScore,
                foRelevance: foScore
            },
            feedback
        };
    }

    // Normalize text for comparison
    normalizeText(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')      // Remove punctuation
            .replace(/\s+/g, ' ')          // Normalize whitespace
            .trim();
    }

    // Content scoring based on keyword matching
    calculateContentScore(question, normalizedAnswer) {
        if (!question.scoringKeywords) return 50; // Default if no keywords
        
        let score = 0;
        let maxPossible = 0;
        
        for (const [keyword, points] of Object.entries(question.scoringKeywords)) {
            maxPossible += points;
            
            // Check for keyword presence
            const keywords = keyword.toLowerCase().split(' ');
            if (keywords.length === 1) {
                // Single keyword
                if (normalizedAnswer.includes(keywords[0])) {
                    score += points;
                } else {
                    // Check for partial matches
                    const partialMatch = keywords[0].slice(0, Math.floor(keywords[0].length * 0.7));
                    if (normalizedAnswer.includes(partialMatch)) {
                        score += points * 0.5;
                    }
                }
            } else {
                // Multiple keywords (all must be present)
                const allPresent = keywords.every(kw => normalizedAnswer.includes(kw));
                if (allPresent) {
                    score += points;
                }
            }
        }
        
        // Adjust for answer length (penalize very short answers)
        const wordCount = normalizedAnswer.split(' ').length;
        const lengthPenalty = wordCount < 30 ? (30 - wordCount) * 0.5 : 0;
        
        // Calculate percentage score
        const rawScore = maxPossible > 0 ? (score / maxPossible) * 100 : 50;
        const finalScore = Math.max(0, Math.min(100, rawScore - lengthPenalty));
        
        return Math.round(finalScore);
    }

    // Structure scoring based on answer organization
    calculateStructureScore(normalizedAnswer, normalizedQuestion) {
        let score = 50; // Base score
        
        const words = normalizedAnswer.split(' ');
        const wordCount = words.length;
        
        // Length-based scoring
        if (wordCount < 50) {
            score -= 20; // Too short
        } else if (wordCount > 300) {
            score -= 10; // Too long (may be rambling)
        } else if (wordCount >= 100 && wordCount <= 250) {
            score += 20; // Ideal length
        }
        
        // Check for structure indicators
        const structureIndicators = [
            { pattern: /first|second|third|finally|in conclusion/, points: 10 },
            { pattern: /however|although|on the other hand/, points: 5 }, // Shows nuance
            { pattern: /for example|for instance|such as/, points: 5 },   // Examples
            { pattern: /because|therefore|thus|as a result/, points: 5 }, // Reasoning
            { pattern: /in summary|to conclude|overall/, points: 5 }      // Conclusion
        ];
        
        let structurePoints = 0;
        structureIndicators.forEach(indicator => {
            if (indicator.pattern.test(normalizedAnswer)) {
                structurePoints += indicator.points;
            }
        });
        
        score += Math.min(30, structurePoints);
        
        // Check if answer directly addresses the question
        const questionWords = normalizedQuestion.split(' ').slice(0, 10); // First 10 words
        const questionKeywords = questionWords.filter(word => word.length > 3);
        let questionMatch = 0;
        
        questionKeywords.forEach(keyword => {
            if (normalizedAnswer.includes(keyword)) {
                questionMatch += 5;
            }
        });
        
        score += Math.min(20, questionMatch);
        
        return Math.max(10, Math.min(100, score));
    }

    // Family Office relevance scoring
    calculateFOScore(normalizedAnswer) {
        let score = 30; // Base score
        
        // FO-specific terminology
        const foTerms = [
            'family office', 'multi-generational', 'wealth preservation', 
            'succession planning', 'family governance', 'trust', 'legacy',
            'ultra high net worth', 'uhnw', 'family dynamics', 'philanthropy',
            'tax efficient', 'concentration risk', 'family business',
            'next generation', 'family constitution', 'stewardship'
        ];
        
        let foTermCount = 0;
        foTerms.forEach(term => {
            if (normalizedAnswer.includes(term)) {
                foTermCount++;
            }
        });
        
        score += Math.min(50, foTermCount * 10);
        
        // Context indicators
        const contextIndicators = [
            { pattern: /long term|long-term/, points: 5 },
            { pattern: /patient capital/, points: 10 },
            { pattern: /family values/, points: 10 },
            { pattern: /risk appetite/, points: 5 },
            { pattern: /liquidity needs/, points: 5 }
        ];
        
        contextIndicators.forEach(indicator => {
            if (indicator.pattern.test(normalizedAnswer)) {
                score += indicator.points;
            }
        });
        
        return Math.min(100, score);
    }

    // Generate detailed feedback
    generateFeedback(question, normalizedAnswer, scores) {
        const strengths = [];
        const improvements = [];
        
        // Content feedback
        if (scores.contentScore >= 70) {
            strengths.push("Good coverage of key concepts and terminology");
        } else if (scores.contentScore >= 40) {
            improvements.push("Include more specific financial terms and concepts");
        } else {
            improvements.push("Review the fundamental concepts in the model answer");
        }
        
        // Structure feedback
        if (scores.structureScore >= 70) {
            strengths.push("Well-organized answer with clear structure");
        } else if (scores.structureScore >= 40) {
            improvements.push("Try structuring your answer: introduction → key points → conclusion");
        } else {
            improvements.push("Answer is too brief or lacks clear organization");
        }
        
        // FO relevance feedback
        if (scores.foScore >= 70) {
            strengths.push("Strong focus on family office context and considerations");
        } else if (scores.foScore >= 40) {
            improvements.push("Connect your answer more explicitly to family office needs");
        } else {
            improvements.push("Consider how this topic specifically applies to family offices");
        }
        
        // Answer length feedback
        const wordCount = normalizedAnswer.split(' ').length;
        if (wordCount < 50) {
            improvements.push("Answer is too short - aim for 100-250 words for comprehensive answers");
        } else if (wordCount > 400) {
            improvements.push("Answer may be too verbose - focus on conciseness");
        }
        
        // Specific keyword suggestions
        if (question.scoringKeywords && scores.contentScore < 80) {
            const missingKeywords = [];
            for (const [keyword] of Object.entries(question.scoringKeywords)) {
                const kw = keyword.toLowerCase();
                if (!normalizedAnswer.includes(kw.split(' ')[0])) { // Check first word only
                    missingKeywords.push(keyword);
                }
            }
            
            if (missingKeywords.length > 0 && missingKeywords.length < 5) {
                improvements.push(`Consider mentioning: ${missingKeywords.slice(0, 3).join(', ')}`);
            }
        }
        
        // Ensure we have at least one strength and one improvement
        if (strengths.length === 0) {
            if (scores.totalScore > 60) {
                strengths.push("You're on the right track - keep practicing!");
            } else {
                strengths.push("You've taken the first step - reviewing the model answer will help");
            }
        }
        
        if (improvements.length === 0) {
            if (scores.totalScore > 80) {
                improvements.push("Try incorporating more real-world examples or case studies");
            } else {
                improvements.push("Review the model answer to see how experts structure their responses");
            }
        }
        
        return {
            strengths,
            improvements,
            overallAssessment: this.getOverallAssessment(scores.totalScore)
        };
    }

    getOverallAssessment(score) {
        if (score >= 90) return "Excellent - demonstrates strong understanding and clear communication";
        if (score >= 80) return "Very good - covers most key points with good structure";
        if (score >= 70) return "Good - solid understanding with room for refinement";
        if (score >= 60) return "Satisfactory - hits main points but needs more depth";
        if (score >= 50) return "Needs improvement - review key concepts and structure";
        return "Requires significant review - study the model answer and retry";
    }

    // Update user progress based on score
    updateUserProgress(questionId, score, componentScores) {
        const today = new Date().toISOString().split('T')[0];
        
        // Load existing progress
        const stored = localStorage.getItem('fininterview_progress');
        let progress = stored ? JSON.parse(stored) : {
            totalAnswered: 0,
            totalScore: 0,
            lastActive: today,
            streak: 1,
            answers: {},
            weaknesses: {}
        };
        
        // Update streak
        const lastActive = new Date(progress.lastActive);
        const currentDate = new Date(today);
        const dayDiff = Math.floor((currentDate - lastActive) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
            progress.streak += 1;
        } else if (dayDiff > 1) {
            progress.streak = 1; // Broken streak
        }
        progress.lastActive = today;
        
        // Update totals
        progress.totalAnswered += 1;
        progress.totalScore = ((progress.totalScore * (progress.totalAnswered - 1)) + score) / progress.totalAnswered;
        
        // Store this answer
        progress.answers[questionId] = {
            score,
            componentScores,
            date: today
        };
        
        // Update weaknesses (scores below 70) - track by role
        if (score < 70) {
            const question = questionBank.find(q => q.id === questionId);
            if (question) {
                if (!progress.weaknesses[question.role]) {
                    progress.weaknesses[question.role] = { count: 0, totalScore: 0 };
                }
                progress.weaknesses[question.role].count += 1;
                progress.weaknesses[question.role].totalScore += score;
            }
        }
        
        // Save back to localStorage
        localStorage.setItem('fininterview_progress', JSON.stringify(progress));
        
        return progress;
    }
    
    // Get user progress for display
    getUserProgress() {
        const stored = localStorage.getItem('fininterview_progress');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Default progress
        return {
            totalAnswered: 0,
            totalScore: 0,
            lastActive: new Date().toISOString().split('T')[0],
            streak: 0,
            answers: {},
            weaknesses: {}
        };
    }
    
    // Get top weaknesses
    getTopWeaknesses(progress) {
        const weaknesses = progress.weaknesses;
        const weaknessArray = [];
        
        for (const [role, data] of Object.entries(weaknesses)) {
            const avgScore = data.totalScore / data.count;
            weaknessArray.push({
                role, // Changed from category to role
                avgScore: Math.round(avgScore),
                count: data.count
            });
        }
        
        // Sort by average score (lowest first)
        weaknessArray.sort((a, b) => a.avgScore - b.avgScore);
        
        return weaknessArray.slice(0, 3); // Top 3 weaknesses
    }
}

// Initialize scoring engine
const scoringEngine = new ScoringEngine();