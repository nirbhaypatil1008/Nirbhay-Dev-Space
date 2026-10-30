# Nirbhay Patil — Portfolio

A premium developer portfolio built with React + Vite — Forest Editorial theme.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Setup

Create a `.env` file in the project root:

```env
# Required for the AI portfolio assistant (kept secure on the server)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free API key at: https://aistudio.google.com/app/apikey

The API key is securely consumed on the server (`/api/chat`) and never exposed in browser bundles.

## AI Assistant Features

- **Portfolio-Grounded Answers:** Accurate responses strictly derived from verified profile, skills, education, and projects.
- **Recruiter & Interview Mode:** One-click toggle for structured, bulleted summaries emphasizing candidate qualifications, architectural contributions, and availability.
- **Structured Project Cards:** Dynamic interactive cards with verified GitHub repository links and details.
- **Real-Time Streaming:** Progressive text streaming using Server-Sent Events (SSE).
- **Voice Recognition & Speech:** Browser-native speech-to-text voice input and read-aloud spoken responses.
- **Conversation Management:** Multi-conversation persistence, search, renaming, and deletion.
- **Customization Settings:** Appearance settings with custom themes and font sizes.

## Resume

Place your resume PDF at:
```
public/resume.pdf
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, AIAssistant)
├── context/          # React context (ThemeContext)
├── data/             # Edit these files to update your portfolio data
│   ├── profile.js    # Personal info, bio, skills, education
│   └── projects.js   # Project data
├── hooks/            # Custom hooks
├── pages/            # Page components
├── sections/         # Homepage sections
├── styles/           # Design system CSS
├── App.jsx
└── main.jsx
```

## Building for Production

```bash
npm run build
```
