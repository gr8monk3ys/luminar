# Luminar

An interactive STEM learning platform inspired by Brilliant.org. Learn math, computer science, and data science through hands-on problem-solving — no passive videos, just deep understanding.

## Features

- **Interactive Lessons**: Every lesson includes interactive components — graphs, code editors, quizzes, step-by-step solutions, and slider explorations
- **3 Courses, 20 Lessons**: Calculus Fundamentals, Linear Algebra for ML, and Algorithms in Python
- **2 Learning Paths**: Math Foundations and CS Fundamentals
- **Progress Tracking**: XP system, levels, lesson completion tracking (localStorage)
- **Streak System**: Daily learning streaks with streak freeze support
- **Interactive Components**: MathBlock (KaTeX), GraphPlayground (D3.js), InteractiveQuestion, StepByStep, CodeEditor, SliderExploration, RevealAnswer

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Math Rendering**: KaTeX
- **Graphs/Visualizations**: D3.js
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/landing page
│   ├── courses/           # Course browser & detail pages
│   ├── learn/             # Lesson viewer
│   └── dashboard/         # Progress dashboard
├── components/
│   ├── interactive/       # Interactive learning components
│   │   ├── MathBlock.tsx
│   │   ├── InteractiveQuestion.tsx
│   │   ├── GraphPlayground.tsx
│   │   ├── StepByStep.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── SliderExploration.tsx
│   │   └── RevealAnswer.tsx
│   └── layout/            # Header, Footer
├── content/
│   ├── courses/           # Course metadata & structure
│   └── lessons/           # Individual lesson content (TSX)
├── hooks/                 # useProgress, useLocalStorage
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## Courses

### Calculus Fundamentals
- Limits & Continuity (3 lessons)
- Derivatives (3 lessons)
- Integrals (2 lessons)

### Linear Algebra for ML
- Vectors & Vector Spaces (3 lessons)
- Matrices & Transformations (2 lessons)
- Eigenvalues & Eigenvectors (2 lessons)

### Algorithms in Python
- Sorting Algorithms (3 lessons)
- Searching Algorithms (2 lessons)

## License

GPL-3.0
