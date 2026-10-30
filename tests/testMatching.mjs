import { findDirectAnswer } from '../src/data/portfolioQA.js';

const testCases = [
  // 6 Primary Questions
  { q: 'Who is Nirbhay Patil?', shouldMatch: true, expectedId: 'about-nirbhay' },
  { q: 'who is nirbhay patil', shouldMatch: true, expectedId: 'about-nirbhay' },
  { q: 'What technical skills does he have?', shouldMatch: true, expectedId: 'technical-skills' },
  { q: 'what skills does he have', shouldMatch: true, expectedId: 'technical-skills' },
  { q: 'Tell me about his Part-Time-Job project.', shouldMatch: true, expectedId: 'part-time-job-project' },
  { q: 'part time job project', shouldMatch: true, expectedId: 'part-time-job-project' },
  { q: 'What is the Dynamic Lab Workstation & Software Tracker?', shouldMatch: true, expectedId: 'lab-workstation-project' },
  { q: 'Tell me about his DSA Tracker project.', shouldMatch: true, expectedId: 'dsa-tracker-project' },
  { q: 'dsa tracker', shouldMatch: true, expectedId: 'dsa-tracker-project' },
  { q: 'What software development opportunities is he looking for?', shouldMatch: true, expectedId: 'career-opportunities' },

  // Additional Predefined Questions
  { q: 'What is his educational background?', shouldMatch: true, expectedId: 'education-background' },
  { q: 'Tell me about Nirbhay education', shouldMatch: true, expectedId: 'education-background' },
  { q: 'What technologies does he use in his projects?', shouldMatch: true, expectedId: 'projects-overview' },
  { q: 'What was his contribution to the Part-Time-Job project?', shouldMatch: true, expectedId: 'part-time-job-contribution' },
  { q: 'How can I contact him?', shouldMatch: true, expectedId: 'contact-info' },
  { q: 'Where can I find his GitHub profile?', shouldMatch: true, expectedId: 'github-profile' },
  { q: 'Is the Dynamic Lab Workstation & Software Tracker completed?', shouldMatch: true, expectedId: 'lab-workstation-status' },
  { q: 'is the lab tracker completed?', shouldMatch: true, expectedId: 'lab-workstation-status' },
  { q: 'What are his main professional interests?', shouldMatch: true, expectedId: 'professional-interests' },

  // Unrelated General Questions (Must return null -> Route to Gemini)
  { q: 'Can you explain how React reconciliation works?', shouldMatch: false },
  { q: 'How do closures work in JavaScript?', shouldMatch: false },
  { q: 'What is your favorite movie?', shouldMatch: false },
  { q: 'Write a quicksort algorithm in C++', shouldMatch: false },
  { q: 'Tell me a joke about dogs', shouldMatch: false },
];

let passed = 0;
for (const t of testCases) {
  const res = findDirectAnswer(t.q);
  if (t.shouldMatch) {
    if (res && res.source === 'direct' && (!t.expectedId || res.id === t.expectedId)) {
      console.log(`✓ PASS (Direct): "${t.q}" -> [${res.id}]`);
      passed++;
    } else {
      console.error(`✗ FAIL: Expected direct match for "${t.q}", got:`, res);
    }
  } else {
    if (res === null) {
      console.log(`✓ PASS (Gemini Fallback): "${t.q}" -> null`);
      passed++;
    } else {
      console.error(`✗ FAIL: Expected fallback to Gemini (null) for "${t.q}", but matched:`, res);
    }
  }
}

console.log(`\nTest results: ${passed}/${testCases.length} passed.`);
if (passed !== testCases.length) process.exit(1);
