/**
 * Industry Page Debug Helper
 * 诊断行业页面为什么不显示题目
 */

(function() {
    'use strict';
    
    console.log('=== Industry Page Debug Helper ===');
    
    // 等待DOM加载
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(runDiagnosis, 500);
    });
    
    function runDiagnosis() {
        console.log('开始诊断行业页面问题...');
        
        const diagnosis = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            page: window.location.pathname.split('/').pop(),
            issues: []
        };
        
        // 1. 检查URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const industryId = urlParams.get('industry');
        diagnosis.industryParam = industryId || 'none';
        
        console.log(`URL参数检查: industry=${industryId || 'none'}`);
        if (!industryId) {
            diagnosis.issues.push('URL缺少industry参数，页面不知道要显示哪个行业的题目');
        }
        
        // 2. 检查数据源
        console.log('检查数据源...');
        if (typeof window.questionBank === 'undefined') {
            diagnosis.issues.push('questions.js未加载或questionBank未定义');
            console.error('❌ questionBank未定义');
        } else {
            const qb = window.questionBank;
            diagnosis.questionBank = {
                exists: true,
                type: typeof qb,
                length: Array.isArray(qb) ? qb.length : 'N/A'
            };
            console.log(`✅ questionBank存在: ${Array.isArray(qb) ? `${qb.length}题` : '类型错误'}`);
            
            // 检查是否有当前行业的题目
            if (industryId && Array.isArray(qb)) {
                const industryQuestions = qb.filter(q => q.role === industryId);
                diagnosis.industryQuestions = {
                    count: industryQuestions.length,
                    sample: industryQuestions.slice(0, 2).map(q => ({
                        id: q.id,
                        title: q.title?.substring(0, 30),
                        role: q.role
                    }))
                };
                
                if (industryQuestions.length === 0) {
                    diagnosis.issues.push(`questions.js中没有${industryId}行业的题目`);
                }
            }
        }
        
        // 3. 检查DataLoader
        console.log('检查DataLoader...');
        if (typeof DataLoader === 'undefined') {
            diagnosis.issues.push('DataLoader未定义，可能js/data-loader.js未加载');
            console.error('❌ DataLoader未定义');
        } else {
            diagnosis.dataLoader = {
                exists: true,
                isInitialized: DataLoader.isInitialized ? DataLoader.isInitialized() : 'unknown'
            };
            console.log(`✅ DataLoader存在，初始化状态: ${diagnosis.dataLoader.isInitialized}`);
            
            // 测试DataLoader功能
            try {
                if (DataLoader.getQuestionsByIndustry) {
                    const questions = DataLoader.getQuestionsByIndustry(industryId || 'ib');
                    diagnosis.dataLoader.getQuestions = {
                        success: true,
                        count: questions.length
                    };
                    console.log(`✅ DataLoader.getQuestionsByIndustry(${industryId || 'ib'}): ${questions.length}题`);
                }
            } catch (error) {
                diagnosis.issues.push(`DataLoader.getQuestionsByIndustry失败: ${error.message}`);
                console.error('❌ DataLoader.getQuestionsByIndustry失败:', error);
            }
        }
        
        // 4. 检查UI元素
        console.log('检查UI元素...');
        const questionGrid = document.getElementById('questionGrid');
        if (!questionGrid) {
            diagnosis.issues.push('找不到#questionGrid元素，无法显示题目');
            console.error('❌ 找不到#questionGrid元素');
        } else {
            diagnosis.uiElements = {
                questionGrid: true,
                childrenCount: questionGrid.children.length
            };
            console.log(`✅ #questionGrid存在，有${questionGrid.children.length}个子元素`);
            
            // 检查是否有真实的题目卡片（不是示例卡片）
            const exampleCards = Array.from(questionGrid.children).filter(child => {
                return child.classList.contains('question-card') && 
                       child.getAttribute('data-id') && 
                       ['1', '2', '3'].includes(child.getAttribute('data-id'));
            });
            
            if (exampleCards.length > 0) {
                diagnosis.uiElements.hasExampleCards = exampleCards.length;
                console.log(`⚠️ 发现${exampleCards.length}个示例卡片（静态内容）`);
            }
        }
        
        // 5. 检查主脚本main.js
        console.log('检查main.js...');
        if (typeof initIndustryPage === 'function') {
            diagnosis.mainJS = {
                initIndustryPageExists: true
            };
            console.log('✅ initIndustryPage函数存在');
        } else {
            diagnosis.issues.push('main.js未正确加载或initIndustryPage函数不存在');
            console.error('❌ initIndustryPage函数不存在');
        }
        
        // 6. 检查控制台错误
        // 注意：这需要重写console.error来捕获
        const originalError = console.error;
        const errors = [];
        console.error = function(...args) {
            errors.push(args.join(' '));
            originalError.apply(console, args);
        };
        
        // 7. 输出诊断结果
        setTimeout(function() {
            console.error = originalError;
            
            diagnosis.consoleErrors = errors;
            
            console.log('\\n=== 诊断结果 ===');
            console.log(`页面: ${diagnosis.page}`);
            console.log(`URL参数: ${diagnosis.industryParam}`);
            console.log(`questionBank: ${diagnosis.questionBank?.exists ? `${diagnosis.questionBank.length}题` : '不存在'}`);
            console.log(`行业题目数: ${diagnosis.industryQuestions?.count || 0}`);
            console.log(`DataLoader: ${diagnosis.dataLoader?.exists ? '存在' : '不存在'}`);
            console.log(`#questionGrid: ${diagnosis.uiElements?.questionGrid ? '存在' : '不存在'}`);
            console.log(`示例卡片: ${diagnosis.uiElements?.hasExampleCards || 0}`);
            console.log(`问题数量: ${diagnosis.issues.length}`);
            
            if (diagnosis.issues.length > 0) {
                console.log('\\n=== 发现的问题 ===');
                diagnosis.issues.forEach((issue, i) => {
                    console.log(`${i + 1}. ${issue}`);
                });
            }
            
            if (errors.length > 0) {
                console.log('\\n=== 控制台错误 ===');
                errors.forEach((error, i) => {
                    console.log(`${i + 1}. ${error.substring(0, 200)}`);
                });
            }
            
            // 提供修复建议
            console.log('\\n=== 修复建议 ===');
            
            if (diagnosis.issues.includes('URL缺少industry参数')) {
                console.log('1. 添加默认行业参数或重定向到index.html');
            }
            
            if (diagnosis.issues.includes('questions.js未加载')) {
                console.log('2. 检查<script src="questions.js">标签是否正确');
            }
            
            if (diagnosis.industryQuestions?.count === 0 && industryId) {
                console.log(`3. questions.js中没有${industryId}行业的题目，需要添加数据或检查role字段`);
            }
            
            if (diagnosis.uiElements?.hasExampleCards && diagnosis.industryQuestions?.count > 0) {
                console.log('4. 页面显示了示例卡片而不是真实数据，需要调用加载函数');
            }
            
            // 如果问题很多，建议使用简单解决方案
            if (diagnosis.issues.length >= 2) {
                console.log('\\n=== 建议：使用简单解决方案 ===');
                console.log('鉴于多个问题，建议使用简单直接的方法：');
                console.log('1. 在industry.html中添加<script src="industry-simple.js"></script>');
                console.log('2. 移除复杂的DataLoader依赖');
                console.log('3. 直接使用questionBank数据');
            }
            
            // 在页面上显示诊断结果
            displayDiagnosisResult(diagnosis);
            
        }, 1000);
    }
    
    function displayDiagnosisResult(diagnosis) {
        // 创建诊断结果面板
        const panel = document.createElement('div');
        panel.id = 'diagnosisPanel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            background: white;
            border: 2px solid #e74c3c;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: monospace;
            font-size: 12px;
        `;
        
        let html = `<h3 style="margin-top: 0; color: #e74c3c;">🔍 Industry Page Diagnosis</h3>`;
        
        html += `<p><strong>Page:</strong> ${diagnosis.page}</p>`;
        html += `<p><strong>Industry Parameter:</strong> ${diagnosis.industryParam}</p>`;
        html += `<p><strong>questionBank:</strong> ${diagnosis.questionBank?.exists ? `${diagnosis.questionBank.length} questions` : 'NOT FOUND'}</p>`;
        
        if (diagnosis.industryQuestions) {
            html += `<p><strong>Industry Questions:</strong> ${diagnosis.industryQuestions.count}</p>`;
        }
        
        html += `<p><strong>DataLoader:</strong> ${diagnosis.dataLoader?.exists ? 'Exists' : 'NOT FOUND'}</p>`;
        
        if (diagnosis.issues.length > 0) {
            html += `<h4 style="color: #e74c3c; margin-top: 15px;">Issues Found (${diagnosis.issues.length}):</h4>`;
            html += `<ol style="padding-left: 20px; margin-top: 5px;">`;
            diagnosis.issues.forEach(issue => {
                html += `<li style="margin-bottom: 5px;">${issue}</li>`;
            });
            html += `</ol>`;
        }
        
        // 添加修复按钮
        html += `<div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">`;
        html += `<button id="quickFixBtn" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Apply Quick Fix</button>`;
        html += `<button id="closePanel" style="background: #95a5a6; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Close</button>`;
        html += `</div>`;
        
        panel.innerHTML = html;
        document.body.appendChild(panel);
        
        // 绑定按钮事件
        document.getElementById('quickFixBtn').addEventListener('click', function() {
            applyQuickFix();
        });
        
        document.getElementById('closePanel').addEventListener('click', function() {
            panel.remove();
        });
    }
    
    function applyQuickFix() {
        console.log('应用快速修复...');
        
        const panel = document.getElementById('diagnosisPanel');
        panel.innerHTML = '<p style="color: #3498db;">Applying quick fix...</p>';
        
        // 获取当前行业ID
        const urlParams = new URLSearchParams(window.location.search);
        const industryId = urlParams.get('industry') || 'ib';
        
        // 1. 检查数据
        if (typeof window.questionBank === 'undefined') {
            panel.innerHTML += '<p style="color: #e74c3c;">❌ questionBank未定义，无法修复</p>';
            return;
        }
        
        const allQuestions = window.questionBank;
        if (!Array.isArray(allQuestions)) {
            panel.innerHTML += '<p style="color: #e74c3c;">❌ questionBank不是数组，无法修复</p>';
            return;
        }
        
        // 2. 过滤题目
        const industryQuestions = allQuestions.filter(q => q.role === industryId);
        
        // 3. 获取questionGrid
        const questionGrid = document.getElementById('questionGrid');
        if (!questionGrid) {
            panel.innerHTML += '<p style="color: #e74c3c;">❌ 找不到#questionGrid元素</p>';
            return;
        }
        
        // 4. 清空示例卡片
        questionGrid.innerHTML = '';
        
        // 5. 显示加载状态
        questionGrid.innerHTML = '<div style="padding: 40px; text-align: center; color: #7f8c8d;"><i class="fas fa-spinner fa-spin"></i> Loading questions...</div>';
        
        // 6. 渲染真实题目
        setTimeout(function() {
            if (industryQuestions.length === 0) {
                questionGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                        <i class="fas fa-search" style="font-size: 3rem; color: #bdc3c7;"></i>
                        <h3 style="color: #7f8c8d; margin-top: 15px;">No Questions Found</h3>
                        <p>No questions available for ${industryId}.</p>
                        <button onclick="window.history.back()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 15px;">
                            Back to Industries
                        </button>
                    </div>
                `;
                panel.innerHTML += `<p style="color: #f39c12;">⚠️ 没有找到${industryId}行业的题目，显示空状态</p>`;
            } else {
                // 渲染题目
                let html = '';
                industryQuestions.slice(0, 10).forEach((question, index) => {
                    const answer = getQuestionAnswer(question);
                    const difficulty = question.difficulty || 'medium';
                    const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
                    
                    html += `
                        <div class="question-card" data-id="${question.id || index}" style="margin-bottom: 20px; padding: 20px; background: white; border: 1px solid #e0e0e0; border-radius: 8px;">
                            <div class="question-header" style="margin-bottom: 15px;">
                                <h4 class="question-title" style="font-size: 1.1rem; font-weight: 600; margin: 0 0 10px 0; color: #2c3e50;">
                                    ${index + 1}. ${escapeHtml(question.title || 'Untitled')}
                                </h4>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <span style="background: #3498db; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">${question.category || 'technical'}</span>
                                    <span style="background: #${difficulty === 'easy' ? '2ecc71' : difficulty === 'hard' ? 'e74c3c' : 'f39c12'}; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">${difficultyText}</span>
                                </div>
                            </div>
                            
                            <div class="question-content" style="margin-bottom: 15px; color: #34495e; line-height: 1.5;">
                                <p>${escapeHtml(question.question || '')}</p>
                            </div>
                            
                            <div class="question-answer" style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; display: none;">
                                <h5 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 1rem;">Answer:</h5>
                                <div style="white-space: pre-wrap;">${escapeHtml(answer.substring(0, 300) + (answer.length > 300 ? '...' : ''))}</div>
                            </div>
                            
                            <div style="display: flex; gap: 10px;">
                                <button onclick="toggleAnswer(this)" style="background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                                    Show Answer
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                questionGrid.innerHTML = html;
                
                // 更新统计
                const statsElement = document.getElementById('industryStats');
                if (statsElement) {
                    statsElement.textContent = `Total ${industryQuestions.length} questions`;
                }
                
                panel.innerHTML += `<p style="color: #27ae60;">✅ 成功加载${industryQuestions.length}个题目</p>`;
            }
            
            // 添加关闭按钮
            panel.innerHTML += `<div style="margin-top: 15px;"><button onclick="document.getElementById('diagnosisPanel').remove()" style="background: #95a5a6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 100%;">Close Diagnosis Panel</button></div>`;
            
        }, 1000);
    }
    
    function getQuestionAnswer(question) {
        if (question.answers) {
            if (question.answers.concise && question.answers.concise.answer) {
                return question.answers.concise.answer;
            }
            if (question.answers.detailed && question.answers.detailed.answer) {
                return question.answers.detailed.answer;
            }
        }
        
        if (question.conciseAnswer) {
            return question.conciseAnswer;
        }
        
        if (question.modelAnswer) {
            return question.modelAnswer;
        }
        
        if (question.answer) {
            return question.answer;
        }
        
        return 'No answer available.';
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 全局辅助函数
    window.toggleAnswer = function(button) {
        const card = button.closest('.question-card');
        const answerSection = card.querySelector('.question-answer');
        const isVisible = answerSection.style.display !== 'none';
        
        answerSection.style.display = isVisible ? 'none' : 'block';
        button.textContent = isVisible ? 'Show Answer' : 'Hide Answer';
    };
    
})();