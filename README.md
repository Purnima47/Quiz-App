# React Quiz App

A modern **React-based Quiz Application** with difficulty levels, countdown timer, progress indicators, and a results summary. This app fetches quiz questions from an **external API** with a **local fallback** and stores user answers for detailed feedback.

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Project Architecture](#project-architecture)
* [Design Decisions](#design-decisions)
* [Accessibility](#accessibility)

---

## Demo

* Select a difficulty (Easy, Medium, Hard)
* Answer 10 multiple-choice questions
* Each question has a **30-second timer**
* Progress bar shows question number
* Results page displays score, detailed feedback, and options to restart or change difficulty

---

## Features

* ✅ Difficulty levels: Easy / Medium / Hard
* ✅ Fetch questions from **Open Trivia API** with **local JSON fallback**
* ✅ Countdown timer per question with auto-skip
* ✅ Progress indicator (text + progress bar)
* ✅ Persistent score tracking
* ✅ Subtle animations: fade-in, button hover, and selection feedback
* ✅ Accessible: keyboard navigation, focus rings, ARIA-friendly

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Purnima47/Quiz-App.git

# Navigate to the project folder
cd Quiz-App

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:5173/quiz](http://localhost:5173/) to view the app in the browser.

---

## Usage

1. On launch, the **Difficulty Selection screen** appears.
2. Choose a difficulty level (Easy / Medium / Hard).
3. Answer each question before the **timer runs out** or skip.
4. The **progress bar** updates in real-time.
5. At the end, the **Results page** shows:

   * Score
   * Each question with user answer and correct answer
   * Buttons to restart the quiz or change difficulty

---

## Project Architecture

```
react-quiz-app/
│
├─ public/
│   └─ questions.json       # Local fallback quiz questions
│
├─ src/
│   ├─ components/
│   │   ├─ Quiz.jsx         # Quiz view with question, options, timer, skip/next buttons
│   │   ├─ Timer.jsx        # Countdown timer per question with visual bar
│   │   ├─ Progress.jsx     # Progress indicator bar and text
│   │   └─ Results.jsx      # Quiz results with score, answer feedback, and restart/change difficulty
│   │
│   ├─ App.js               # Main app component; routing, state management, difficulty selection
│   ├─ index.js             # Entry point; renders App into DOM
│   ├─ index.css            # Tailwind CSS + global styles
│   └─ questions.json       # Optional: local fallback questions
│
├─ package.json             # Project metadata and dependencies
├─ tailwind.config.js       # Tailwind configuration
├─ postcss.config.js        # PostCSS configuration for Tailwind
├─ index.html               # HTML template
└─ README.md                # Project documentation

```

* **App.js**: Handles routing (`/difficulty`, `/quiz`, `/results`) and global state (questions, current index, answers, difficulty).
* **Quiz.jsx**: Renders questions, options, timer, and navigation buttons.
* **Timer.jsx**: Countdown timer with visual bar and auto-skip feature.
* **Progress.jsx**: Displays question progress (text + bar).
* **Results.jsx**: Shows score, detailed question feedback, and restart/change difficulty buttons.

---

## Design Decisions

1. **Difficulty Selection**

   * Separate screen to improve user control
   * Cards with icons, hover/focus effects, and responsive layout

2. **Questions Source**

   * Fetch from **Open Trivia API**
   * Fallback to `questions.json` if API fails

3. **Timer & Progress**

   * 30 seconds per question
   * Visual countdown bar + textual indicator
   * Auto-skip when time expires

4. **Accessibility & UX**

   * Focus states and keyboard navigation
   * ARIA-friendly buttons and labels
   * Hover and tap animations for better feedback

5. **State Management**

   * `useState` for answers, current question, and difficulty
   * `useEffect` for fetching questions and resetting timer

---

## Accessibility

* Focus rings on buttons
* Keyboard navigation (Tab + Enter) supported
* Color indicators + icons for correct/wrong/skipped answers
* High contrast text for readability

---