// ============================================================
// PORTFOLIO DIRECT-ANSWER KNOWLEDGE BASE
// Predefined verified answers for common visitor and recruiter queries.
// Bypasses Gemini API completely for zero-latency, zero-cost responses.
// Grounded exclusively in authentic profile and project data.
// ============================================================

import { profile, skills, education } from './profile.js';
import { projects } from './projects.js';

// Helper to normalize input for matching
export function normalizeQuestion(text = '') {
  return text
    .toLowerCase()
    .replace(/[?!.,'":;`~@#$%^&*()_+=\-[\]{}|\\/<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Knowledge Base entries
 */
export const PORTFOLIO_QA = [
  // 1. Who is Nirbhay Patil?
  {
    id: 'about-nirbhay',
    category: 'profile',
    projects: [],
    phrases: [
      'who is nirbhay patil',
      'who is nirbhay',
      'about nirbhay patil',
      'about nirbhay',
      'tell me about nirbhay patil',
      'tell me about nirbhay',
      'introduce nirbhay patil',
      'introduce nirbhay',
      'who are you',
      'who is this portfolio for',
      'brief introduction',
      'bio',
    ],
    matcher: (q) => {
      return (
        (q.includes('who is') && (q.includes('nirbhay') || q.includes('patil') || q.includes('he'))) ||
        (q.includes('tell me about') && (q.includes('nirbhay') || q.includes('himself') || q.includes('yourself'))) ||
        (q.includes('introduce') && q.includes('nirbhay')) ||
        q === 'bio' ||
        q === 'about'
      );
    },
    getAnswer: (mode) => {
      if (mode === 'recruiter') {
        return `**Candidate Overview — Nirbhay Patil**

* **Role:** Full Stack Developer & Information Science Engineering student.
* **Education:** Bachelor of Engineering (BE) in Information Science & Engineering at **SJB Institute of Technology, Bengaluru** (2022 – Present).
* **Location:** Bengaluru, Karnataka, India.
* **Core Focus:** Full-stack web application development, backend REST APIs, database architecture, and practical AI integration.
* **Availability:** Actively seeking entry-level software engineering roles and development internships.`;
      }

      return `Nirbhay Patil is a Full Stack Developer and Information Science & Engineering student at **SJB Institute of Technology, Bengaluru** (2022 – Present).

He is passionate about full-stack web development, backend engineering, database management, and practical AI integration. Nirbhay enjoys building hands-on projects that solve real-world problems and is currently seeking entry-level software engineering roles and internships.`;
    },
  },

  // 2. What technical skills does he have?
  {
    id: 'technical-skills',
    category: 'skills',
    projects: [],
    phrases: [
      'what technical skills does he have',
      'what technical skills does nirbhay have',
      'what skills does he have',
      'what are his skills',
      'what are his technical skills',
      'what technologies does he use',
      'what technologies does nirbhay use',
      'what is his tech stack',
      'what tech stack does he know',
      'technical skills',
      'skills',
      'tech stack',
      'programming languages',
    ],
    matcher: (q) => {
      // Must refer to skills, tech stack, or programming languages in general
      const hasSkillWord = q.includes('skill') || q.includes('skills') || q.includes('tech stack') || q.includes('technologies');
      const isSpecificProject = q.includes('part time') || q.includes('dsa') || q.includes('workstation') || q.includes('lab');
      if (isSpecificProject) return false;
      return hasSkillWord || q === 'programming languages' || q === 'technologies';
    },
    getAnswer: (mode) => {
      const skillsList = skills
        .map((s) => `* **${s.category}:** ${s.items.join(', ')}`)
        .join('\n');

      if (mode === 'recruiter') {
        return `**Verified Technical Competencies:**

${skillsList}

* **Architecture & Patterns:** RESTful API design, MVC architecture, relational database modeling, JWT token authentication, and responsive UI design.
* **Version Control:** Git branching, GitHub repository management, and structured commits.`;
      }

      return `Here is a summary of Nirbhay Patil's verified technical skills:

${skillsList}

He applies these skills to build full-stack web applications, write secure backend APIs, and design relational database schemas.`;
    },
  },

  // 3b. Contribution to Part-Time-Job project
  {
    id: 'part-time-job-contribution',
    category: 'projects',
    projects: ['part-time-job-app'],
    phrases: [
      'what was his contribution to the part time job project',
      'what did nirbhay do in the part time job project',
      'his role in part time job project',
      'what was his contribution to the part time job app',
      'part time job contribution',
    ],
    matcher: (q) => {
      return (
        (q.includes('part time') || q.includes('parttime')) &&
        (q.includes('contribution') || q.includes('role') || q.includes('what did he do') || q.includes('what did nirbhay do'))
      );
    },
    getAnswer: (mode) => {
      if (mode === 'recruiter') {
        return `**Candidate Contribution — Part-Time Job Application:**

* **Primary Responsibility:** Led the backend development and relational database design.
* **REST APIs:** Engineered modular endpoints with Express.js for student authentication, job posting, applicant tracking, and status updates.
* **Database Modeling:** Structured normalized MySQL tables for user credentials, job metadata, and application records.
* **Full-Stack Integration:** Connected frontend HTML/CSS/JavaScript views with backend API responses.
* **Repository:** [github.com/nirbhaypatil1008/part-time-job-app](https://github.com/nirbhaypatil1008/part-time-job-app)

[PROJECT:part-time-job-app]`;
      }

      return `In the **Part-Time Job Application** project, Nirbhay focused primarily on **backend engineering and database integration**:

* Designed and implemented RESTful API routes using Node.js and Express.js.
* Architected the MySQL database schema for user profiles, job posts, and student applications.
* Connected backend services with the frontend interface for a seamless end-to-end user experience.
* Source code is available on [GitHub](https://github.com/nirbhaypatil1008/part-time-job-app).

[PROJECT:part-time-job-app]`;
    },
  },

  // 3c. Technologies used across his projects / Projects overview
  {
    id: 'projects-overview',
    category: 'projects',
    projects: ['part-time-job-app', 'dsa-tracker', 'lab-workstation-tracker'],
    phrases: [
      'what projects has he built',
      'what projects has nirbhay built',
      'what are his projects',
      'tell me about his projects',
      'what technologies does he use in his projects',
      'technologies used in projects',
      'projects',
    ],
    matcher: (q) => {
      return (
        (q.includes('what projects') || q.includes('tell me about his projects') || q.includes('tell me about his project') || q.includes('technologies does he use in his project') || q.includes('technologies in his project')) &&
        !q.includes('part time') &&
        !q.includes('dsa') &&
        !q.includes('lab') &&
        !q.includes('workstation')
      );
    },
    getAnswer: () => {
      return `Nirbhay has developed and is actively building these verified projects:

1. **Part-Time Job Application (Completed):**
   * Web platform connecting students with flexible part-time jobs.
   * **Stack:** Node.js, Express.js, MySQL, HTML, CSS, JavaScript.
   * [PROJECT:part-time-job-app]

2. **DSA Tracker & Mentor Platform (In Progress):**
   * Fullstack problem-solving tracker for interview preparation with authentication.
   * **Stack:** Node.js, Express.js, PostgreSQL, React, TypeScript, JWT.
   * [PROJECT:dsa-tracker]

3. **Dynamic Lab Workstation & Software Tracker (In Progress):**
   * Lab workstation management and software discovery tool for college labs.
   * **Stack:** Node.js, Express.js, MySQL, React.
   * [PROJECT:lab-workstation-tracker]`;
    },
  },
  {
    id: 'part-time-job-project',
    category: 'projects',
    projects: ['part-time-job-app'],
    phrases: [
      'tell me about his part time job project',
      'tell me about the part time job project',
      'tell me about part time job app',
      'tell me about his part time job application',
      'what is the part time job application',
      'what is the part time job project',
      'part time job project',
      'part time job app',
      'part time job application',
      'explain the part time job project',
      'what was his contribution to the part time job project',
    ],
    matcher: (q) => {
      return (
        (q.includes('part time') || q.includes('parttime')) &&
        (q.includes('job') || q.includes('app') || q.includes('project') || q.includes('work'))
      );
    },
    getAnswer: (mode) => {
      const proj = projects.find((p) => p.id === 'part-time-job-app');
      const gh = proj?.githubUrl || 'https://github.com/nirbhaypatil1008/part-time-job-app';

      if (mode === 'recruiter') {
        return `**Part-Time Job Application**

* **Status:** Completed
* **Primary Contribution:** Nirbhay led the backend architecture and database integration.
* **Tech Stack:** Node.js, Express.js, MySQL, HTML, CSS, JavaScript.
* **Architecture:** RESTful API endpoints for authentication, job listing creation, student applications, and employer dashboard management.
* **Data Layer:** Normalized MySQL relational schema modeling users, job posts, and application records.
* **GitHub Repository:** [github.com/nirbhaypatil1008/part-time-job-app](${gh})

[PROJECT:part-time-job-app]`;
      }

      return `The **Part-Time Job Application** is a completed web application designed to connect students with part-time job opportunities and give employers an easy platform to manage listings.

**Key Details:**
* **Focus:** Nirbhay worked primarily on backend development and database integration.
* **Technologies:** Node.js, Express.js, MySQL, HTML, CSS, and JavaScript.
* **Features:** RESTful API routes, MySQL database schema for jobs and applications, and an intuitive user interface.
* **GitHub Repository:** [github.com/nirbhaypatil1008/part-time-job-app](${gh})

[PROJECT:part-time-job-app]`;
    },
  },

  // 4a. Is the Dynamic Lab Workstation tracker completed?
  {
    id: 'lab-workstation-status',
    category: 'projects',
    projects: ['lab-workstation-tracker'],
    phrases: [
      'is the dynamic lab workstation software tracker completed',
      'is the dynamic lab workstation and software tracker completed',
      'is the lab tracker completed',
      'is lab workstation tracker finished',
      'status of lab tracker',
    ],
    matcher: (q) => {
      return (
        (q.includes('lab') || q.includes('workstation')) &&
        (q.includes('completed') || q.includes('finished') || q.includes('done') || q.includes('status'))
      );
    },
    getAnswer: () => {
      return `No, the **Dynamic Lab Workstation & Software Tracker** is currently **In Progress** (not completed).

Nirbhay is actively developing the backend architecture and database schema to support workstation availability tracking and software cataloging.

[PROJECT:lab-workstation-tracker]`;
    },
  },

  // 4. What is the Dynamic Lab Workstation & Software Tracker?
  {
    id: 'lab-workstation-project',
    category: 'projects',
    projects: ['lab-workstation-tracker'],
    phrases: [
      'what is the dynamic lab workstation software tracker',
      'what is the dynamic lab workstation and software tracker',
      'what is the dynamic lab workstation tracker',
      'what is the lab tracker',
      'tell me about the lab tracker',
      'tell me about his lab workstation project',
      'tell me about dynamic lab workstation and software tracker',
      'lab workstation tracker',
      'dynamic lab workstation tracker',
    ],
    matcher: (q) => {
      return (
        (q.includes('lab') || q.includes('workstation')) &&
        (q.includes('tracker') || q.includes('workstation') || q.includes('software tracker') || q.includes('computer'))
      );
    },
    getAnswer: (mode) => {
      if (mode === 'recruiter') {
        return `**Dynamic Lab Workstation & Software Tracker**

* **Status:** **In Progress** (Active Development)
* **Objective:** Solve lab equipment discovery challenges in engineering college laboratories.
* **Intended Users:** College students searching for computers with specific software installed (e.g. MATLAB, Eclipse, MySQL Workbench) and lab administrators monitoring machine status.
* **Tech Stack:** Node.js, Express.js, MySQL, React.
* **Current Focus:** Backend architecture, workstation status data model, and administrative inventory endpoints.

[PROJECT:lab-workstation-tracker]`;
      }

      return `The **Dynamic Lab Workstation & Software Tracker** is an **in-progress** web project intended to help college students easily locate lab computers with specific software installed and assist lab administrators in monitoring workstation availability.

**Key Details:**
* **Status:** In Progress (currently under development).
* **Technologies:** Node.js, Express.js, MySQL, React.
* **Purpose:** Allows students to search by installed application (such as MySQL Workbench, MATLAB, etc.) and provides administrators with an inventory dashboard.

[PROJECT:lab-workstation-tracker]`;
    },
  },

  // 5. Tell me about his DSA Tracker project
  {
    id: 'dsa-tracker-project',
    category: 'projects',
    projects: ['dsa-tracker'],
    phrases: [
      'tell me about his dsa tracker project',
      'tell me about the dsa tracker project',
      'tell me about dsa tracker',
      'what is the dsa tracker project',
      'what is dsa tracker',
      'dsa tracker project',
      'dsa tracker',
      'dsa mentor',
      'dsa mentor ai',
      'explain the dsa tracker',
    ],
    matcher: (q) => {
      return (
        (q.includes('dsa') || q.includes('data structures')) &&
        (q.includes('tracker') || q.includes('mentor') || q.includes('project') || q.includes('app'))
      );
    },
    getAnswer: (mode) => {
      const proj = projects.find((p) => p.id === 'dsa-tracker');
      const gh = proj?.githubUrl || 'https://github.com/nirbhaypatil1008/DSA-Tracker';

      if (mode === 'recruiter') {
        return `**DSA Tracker & Mentor Platform**

* **Status:** **In Progress**
* **Architecture:** Fullstack web application with Express.js REST API backend and React + TypeScript client.
* **Tech Stack:** Node.js, Express.js, PostgreSQL, React, TypeScript, JWT, bcryptjs.
* **Authentication:** Secure token-based auth with bcrypt password hashing and protected API routes.
* **Data Storage:** PostgreSQL database storing problem classifications, user records, and solution tracking.
* **GitHub Repository:** [github.com/nirbhaypatil1008/DSA-Tracker](${gh})

[PROJECT:dsa-tracker]`;
      }

      return `The **DSA Tracker & Mentor Platform** is an in-progress fullstack web application designed to help developers and students systematically practice and track their Data Structures & Algorithms problem-solving journey.

**Key Details:**
* **Status:** In Progress
* **Technologies:** Node.js, Express.js, PostgreSQL, React, TypeScript, and JWT authentication.
* **Key Features:** User registration and login with bcrypt hashing, problem categorization by topic and difficulty, and interview preparation tracking.
* **GitHub Repository:** [github.com/nirbhaypatil1008/DSA-Tracker](${gh})

[PROJECT:dsa-tracker]`;
    },
  },

  // 6. What software development opportunities is he looking for?
  {
    id: 'career-opportunities',
    category: 'career',
    projects: [],
    phrases: [
      'what software development opportunities is he looking for',
      'what software development opportunities is he interested in',
      'what opportunities is he looking for',
      'what type of opportunities is he interested in',
      'what job is he looking for',
      'what roles is he looking for',
      'is he available for hire',
      'is he open to internships',
      'career opportunities',
      'job opportunities',
      'career interests',
      'availability',
    ],
    matcher: (q) => {
      return (
        (q.includes('opportunit') || q.includes('role') || q.includes('internship') || q.includes('job') || q.includes('hiring') || q.includes('available') || q.includes('looking for')) &&
        (q.includes('he') || q.includes('nirbhay') || q.includes('career') || q.includes('work') || q.includes('software'))
      );
    },
    getAnswer: (mode) => {
      if (mode === 'recruiter') {
        return `**Candidate Availability & Role Alignment:**

* **Current Status:** Final stages of Bachelor of Engineering (BE ISE) at SJB Institute of Technology.
* **Target Roles:** Entry-Level Software Engineer, Full-Stack Developer, Backend Developer.
* **Internships:** Actively available for software development and engineering internships.
* **Location:** Bengaluru, Karnataka, India (open to local, hybrid, or remote opportunities).
* **Contact:** Reach out directly at [${profile.email}](mailto:${profile.email}) or connect on [LinkedIn](${profile.linkedin}).`;
      }

      return `Nirbhay is actively looking for **entry-level software development roles** and **internships** in:
* Full-Stack Web Development
* Backend Development (Node.js, Express.js, REST APIs)
* Database Management (MySQL, PostgreSQL)

He is based in Bengaluru, Karnataka, India and is eager to contribute to collaborative engineering teams. You can contact him directly at [${profile.email}](mailto:${profile.email}).`;
    },
  },

  // 7. Educational Background
  {
    id: 'education-background',
    category: 'education',
    projects: [],
    phrases: [
      'what is his educational background',
      'tell me about nirbhay education',
      'what is his education',
      'where does he study',
      'what college does he go to',
      'what degree is he pursuing',
      'education',
      'college',
      'degree',
      'university',
    ],
    matcher: (q) => {
      return (
        q.includes('education') ||
        q.includes('college') ||
        q.includes('degree') ||
        q.includes('university') ||
        (q.includes('study') && (q.includes('where') || q.includes('what')))
      );
    },
    getAnswer: (mode) => {
      const beEdu = education.find((e) => e.id === 'be-ise') || education[0];
      const pucEdu = education.find((e) => e.id === 'puc-alvas');

      if (mode === 'recruiter') {
        let details = `**Academic Background:**\n\n* **Degree:** ${beEdu.degree}\n* **Field:** ${beEdu.field}\n* **Institution:** ${beEdu.institution}, ${beEdu.location}\n* **Timeline:** ${beEdu.year} (${beEdu.status})\n* **Curriculum Focus:** Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Full-Stack Web Technologies.`;
        if (pucEdu) {
          details += `\n\n* **Pre-University:** ${pucEdu.degree}\n* **Institution:** ${pucEdu.institution}, ${pucEdu.location}\n* **Timeline:** ${pucEdu.year} (${pucEdu.status})`;
        }
        return details;
      }

      let resp = `Nirbhay Patil is pursuing his **${beEdu.degree} in ${beEdu.field}** at **${beEdu.institution}** in Bengaluru, Karnataka (${beEdu.year}).`;
      if (pucEdu) {
        resp += ` Prior to this, he completed his **${pucEdu.degree}** at **${pucEdu.institution}**, Moodbidri (${pucEdu.year}).`;
      }
      resp += `\n\nHis academic focus encompasses core computer science fundamentals including algorithms, data structures, relational databases, and modern web application development.`;
      return resp;
    },
  },

  // 8. Contact & Social Links
  {
    id: 'contact-info',
    category: 'contact',
    projects: [],
    phrases: [
      'how can i contact him',
      'how can i contact nirbhay',
      'how to contact him',
      'what is his email',
      'contact information',
      'contact details',
      'email address',
      'reach him',
    ],
    matcher: (q) => {
      return (
        q.includes('contact') ||
        q.includes('email') ||
        (q.includes('reach') && (q.includes('him') || q.includes('nirbhay'))) ||
        q.includes('get in touch')
      );
    },
    getAnswer: () => {
      return `You can get in touch with Nirbhay Patil through:

* **Email:** [${profile.email}](mailto:${profile.email})
* **LinkedIn:** [linkedin.com/in/nirbhay-patil-b821a430b](${profile.linkedin})
* **GitHub:** [github.com/nirbhaypatil1008](${profile.github})
* **Location:** ${profile.location}`;
    },
  },

  // 9. GitHub Profile Link
  {
    id: 'github-profile',
    category: 'contact',
    projects: [],
    phrases: [
      'where can i find his github profile',
      'what is his github profile',
      'what is his github',
      'github link',
      'github profile',
      'github',
    ],
    matcher: (q) => {
      return (
        (q.includes('github') && !q.includes('part time') && !q.includes('dsa')) ||
        q === 'github' ||
        q === 'git'
      );
    },
    getAnswer: () => {
      return `You can explore Nirbhay's open-source repositories and code on GitHub:

🔗 **GitHub:** [github.com/nirbhaypatil1008](${profile.github})

Key repositories include:
* **Part-Time-Job Application:** [part-time-job-app](https://github.com/nirbhaypatil1008/part-time-job-app)
* **DSA Tracker & Mentor Platform:** [DSA-Tracker](https://github.com/nirbhaypatil1008/DSA-Tracker)`;
    },
  },

  // 10. Professional Interests
  {
    id: 'professional-interests',
    category: 'profile',
    projects: [],
    phrases: [
      'what are his main professional interests',
      'what are his professional interests',
      'what are his interests',
      'what is he interested in',
      'professional interests',
      'interests',
    ],
    matcher: (q) => {
      return (
        (q.includes('interest') || q.includes('passionate')) &&
        (q.includes('professional') || q.includes('he') || q.includes('nirbhay') || q.includes('career'))
      );
    },
    getAnswer: () => {
      return `Nirbhay's primary professional interests include:

* **Full-Stack Web Development:** Constructing responsive, accessible client interfaces paired with robust backend services.
* **Backend Development & REST APIs:** Engineering scalable server architectures using Node.js and Express.js.
* **Database Management:** Designing structured relational databases with MySQL and PostgreSQL.
* **Practical AI Integration:** Integrating modern LLMs (such as Google Gemini) into useful, real-world developer tools and user experiences.`;
    },
  },
];

/**
 * Find direct answer for a user question
 * Returns { id, answer, projects, category, source: 'direct' } or null
 */
export function findDirectAnswer(rawQuestion = '', mode = 'standard') {
  if (!rawQuestion || typeof rawQuestion !== 'string') return null;

  const normalized = normalizeQuestion(rawQuestion);
  if (!normalized) return null;

  // Level 1: Exact phrase match
  for (const entry of PORTFOLIO_QA) {
    for (const phrase of entry.phrases) {
      if (normalizeQuestion(phrase) === normalized) {
        return {
          id: entry.id,
          category: entry.category,
          projects: entry.projects || [],
          answer: entry.getAnswer(mode),
          source: 'direct',
        };
      }
    }
  }

  // Level 2: Custom matcher function
  for (const entry of PORTFOLIO_QA) {
    if (typeof entry.matcher === 'function') {
      try {
        if (entry.matcher(normalized)) {
          return {
            id: entry.id,
            category: entry.category,
            projects: entry.projects || [],
            answer: entry.getAnswer(mode),
            source: 'direct',
          };
        }
      } catch (err) {
        console.warn(`Matcher error on entry ${entry.id}:`, err);
      }
    }
  }

  // No high-confidence direct match found -> fallback to Gemini
  return null;
}
