# Integration Plan - Subagent Deliverables

## Overview
Two subagents are working in parallel:
1. **Frontend Agent**: Dark mode, search, mobile optimization, micro-interactions
2. **Content Agent**: Private Equity industry, flashcard mode, mock interview, progress tracking

This document outlines how to integrate their deliverables.

## Frontend Agent Deliverables

### 1. Dark Mode
**Expected Changes:**
- Updated `css/unified-design.css` with dark theme variables
- JavaScript toggle in header
- System preference detection
- Persistent theme storage (localStorage)

**Integration Steps:**
1. Verify CSS variables are properly defined (e.g., `--dark-bg`, `--dark-text`)
2. Test theme toggle across all pages
3. Ensure no breaking changes to existing styles
4. Check color contrast for accessibility

### 2. Search Functionality
**Expected Changes:**
- New `js/search.js` file
- Search interface added to header or separate page
- Real-time results filtering

**Integration Steps:**
1. Test search across all 668 questions
2. Verify search results display properly
3. Ensure mobile responsiveness of search UI
4. Integrate with existing industry filtering

### 3. Mobile Optimization
**Expected Changes:**
- CSS media query improvements
- Touch interaction enhancements
- Mobile navigation improvements

**Integration Steps:**
1. Test on multiple screen sizes
2. Verify touch targets are adequate
3. Check mobile menu functionality

### 4. Micro-interactions
**Expected Changes:**
- CSS animations and transitions
- Loading state improvements
- Hover feedback enhancements

**Integration Steps:**
1. Test animations don't impact performance
2. Ensure accessibility (reduced motion preferences)
3. Verify consistency across browsers

### 5. Accessibility Improvements
**Expected Changes:**
- ARIA labels and roles
- Keyboard navigation enhancements
- Focus indicator improvements

**Integration Steps:**
1. Test with screen reader
2. Verify keyboard navigation flow
3. Check color contrast ratios

### 6. Performance Optimization
**Expected Changes:**
- JavaScript bundle size reduction
- Lazy loading implementation
- Asset optimization

**Integration Steps:**
1. Measure page load times before/after
2. Test on slow network connections
3. Verify no functionality broken

## Content Agent Deliverables

### 1. Private Equity Industry
**Expected Changes:**
- Updated `roles` object in `questions.js` with "pe" entry
- 50+ new questions with role "pe"
- Industry color and icon

**Integration Steps:**
1. Verify new questions follow existing structure
2. Test filtering by PE industry works
3. Check that PE appears in industry selection grids
4. Ensure Finance Bro AI can handle PE questions

### 2. Flashcard Mode
**Expected Changes:**
- New `flashcard.html` page
- JavaScript for spaced repetition algorithm
- Progress tracking per question

**Integration Steps:**
1. Test flashcard flipping and navigation
2. Verify algorithm works correctly
3. Integrate with existing questionBank
4. Add link to flashcard mode in navigation

### 3. Mock Interview Simulation
**Expected Changes:**
- New `mock-interview.html` page
- Timer functionality
- AI evaluation based on scoringKeywords
- Performance report generation

**Integration Steps:**
1. Test timer and question flow
2. Verify evaluation algorithm produces sensible scores
3. Ensure reports are clear and actionable
4. Integrate with existing feedback system

### 4. Answer Quality Enhancement
**Expected Changes:**
- Improved conciseAnswer fields across all questions
- Consistency improvements in modelAnswer structure

**Integration Steps:**
1. Spot-check improved answers
2. Verify no regression in answer quality
3. Test with feedback system

### 5. User Progress Tracking
**Expected Changes:**
- Progress tracking in localStorage
- Visual indicators in profile.html
- Completion percentages per industry

**Integration Steps:**
1. Test progress persistence across sessions
2. Verify calculations are accurate
3. Ensure UI updates correctly

## Testing Strategy

### Phase 1: Individual Feature Testing
- Test each deliverable in isolation
- Verify no breaking changes to existing functionality
- Document any issues found

### Phase 2: Integration Testing
- Test features together
- Verify navigation between different modes
- Check data consistency across features

### Phase 3: User Acceptance Testing
- Simulate user workflows
- Test on different devices and browsers
- Verify performance and responsiveness

## Rollout Plan
1. **Staging**: Integrate all changes in local environment
2. **Testing**: Thorough testing across all features
3. **Backup**: Create backup before deployment
4. **Deployment**: Push to GitHub Pages
5. **Verification**: Confirm live site works correctly

## Risk Mitigation
- **Backward compatibility**: Ensure existing features continue to work
- **Performance**: Monitor page load times after integration
- **User experience**: Maintain clean design and intuitive navigation
- **Data integrity**: Verify question data remains intact

## Success Metrics
- All new features functional
- No regression in existing functionality
- Improved mobile experience
- Positive user feedback on new features

## Timeline
- **Subagent completion**: Expected 1-2 hours
- **Integration**: 1 hour
- **Testing**: 30 minutes
- **Deployment**: 15 minutes

## Documentation Updates
- Update README.md with new features
- Add help text for flashcard mode and mock interviews
- Update version number in questions.js

---

*Manager: Goose*
*Date: 2026-03-25*