// ============================================================
// PROJECTS DATA — Nirbhay Patil
// Each project renders regardless of whether it has a live demo.
// Missing optional URLs will not create broken buttons.
// ============================================================

export const projects = [
  {
    id: 'part-time-job-app',
    title: 'Part-Time Job Application',
    shortDescription:
      'A web application connecting students with part-time job opportunities and helping job owners post and manage listings.',
    fullDescription: `The Part-Time Job Application is a web platform designed to bridge the gap between students seeking part-time employment and job owners looking for flexible workers. The application focuses on making the job discovery and application process straightforward for both parties.

On the student side, users can browse available job listings, filter by location or type, and apply directly through the platform. On the job owner side, employers can post new opportunities and manage their listings from a dedicated dashboard.

The backend is built with Node.js and Express.js, handling RESTful API routes for authentication, job management, and applications. MySQL is used for structured data storage, managing users, job posts, and application records. The frontend is built with HTML, CSS, and JavaScript to provide a clean and responsive interface.`,
    technologies: ['Node.js', 'Express.js', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/nirbhaypatil1008/part-time-job-app',
    demoUrl: null, // No live demo available
    status: 'Completed',
    highlights: [
      'RESTful API design with Express.js',
      'MySQL database schema design for users, jobs, and applications',
      'Backend-focused development with structured data management',
      'Responsive frontend interface for job seekers and employers',
    ],
  },
  {
    id: 'dsa-tracker',
    title: 'DSA Tracker & Mentor Platform',
    shortDescription:
      'A fullstack web application for tracking Data Structures and Algorithms problem-solving progress with authentication and problem categorization.',
    fullDescription: `The DSA Tracker is a fullstack web application engineered to help students and developers systematically practice, organize, and monitor their Data Structures and Algorithms problem-solving journey.

The platform provides dedicated modules for user authentication (registration and login with JWT and bcrypt password hashing) and problem tracking. Users can browse practice problems, categorize them by topic and difficulty, and maintain their solution progress.

The backend is built with Node.js and Express.js, exposing RESTful API endpoints for user accounts and problem management with PostgreSQL and SQL persistence. The frontend is built with React, TypeScript, and React Router via Vite for a responsive, fast user experience.`,
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'TypeScript', 'JWT'],
    githubUrl: 'https://github.com/nirbhaypatil1008/DSA-Tracker',
    demoUrl: null, // No live demo available
    status: 'Completed',
    highlights: [
      'Fullstack architecture with Express.js REST API and React + TypeScript client',
      'Secure authentication using JWT tokens and bcrypt password hashing',
      'Database integration with PostgreSQL for persistent user and problem state',
      'Organized problem-solving tracker to prepare for technical interviews',
    ],
  },
  {
    id: 'lab-workstation-tracker',
    title: 'Dynamic Lab Workstation & Software Tracker',
    shortDescription:
      'A web application to help students find lab computers with specific software installed, and help administrators monitor workstation availability.',
    fullDescription: `The Dynamic Lab Workstation & Software Tracker is an in-progress web application designed to solve a common problem in engineering college labs: students often waste time searching for a workstation with a specific software tool installed.

The application provides a real-time view of all workstations in a lab, showing which machines are available and what software is installed on each. Students can search for a specific application (e.g., MATLAB, Eclipse, MySQL Workbench) and immediately see which computers have it. Administrators can use a dashboard to update software listings, mark workstations as unavailable for maintenance, and monitor overall lab utilization.

This project is currently under development, with the backend architecture and database schema being the primary focus.`,
    technologies: ['Node.js', 'Express.js', 'MySQL', 'React'],
    githubUrl: 'https://github.com/nirbhaypatil1008/Dynamic-Lab-Workstation-Software-Tracker.git',
    demoUrl: null,
    status: 'In Progress',
    highlights: [
      'Real-time workstation availability tracking',
      'Software inventory management per workstation',
      'Student-facing search interface',
      'Admin dashboard for workstation and software management',
    ],
  },
];

export const getProjectById = (id) => projects.find((p) => p.id === id) || null;

