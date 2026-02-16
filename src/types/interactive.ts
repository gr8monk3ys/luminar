export interface QuestionOption {
  text: string;
  feedback?: string;
}

export interface InteractiveQuestionProps {
  id: string;
  question: string;
  options: QuestionOption[];
  correctIndex: number;
  hint?: string;
  explanation?: string;
}

export interface MathBlockProps {
  latex: string;
  display?: boolean;
}

export interface GraphPlaygroundProps {
  equation: string;
  xRange?: [number, number];
  yRange?: [number, number];
  interactive?: boolean;
  showTangent?: boolean;
  showGrid?: boolean;
  color?: string;
}

export interface StepByStepProps {
  steps: {
    title: string;
    content: string;
    latex?: string;
  }[];
}

export interface CodeEditorProps {
  language: string;
  initialCode: string;
  solution?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface DragDropItem {
  id: string;
  content: string;
}

export interface DragDropTarget {
  id: string;
  label: string;
  acceptsItemId: string;
}

export interface DragDropExerciseProps {
  id: string;
  instruction: string;
  items: DragDropItem[];
  targets: DragDropTarget[];
}

export interface SliderExplorationProps {
  id: string;
  title: string;
  description: string;
  parameters: {
    name: string;
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
  }[];
  equation: string;
}

export interface FillInTheBlankProps {
  id: string;
  question: string;
  correctAnswer: string;
  tolerance?: number;
  inputType?: "text" | "number";
  placeholder?: string;
  hint?: string;
  explanation?: string;
  caseSensitive?: boolean;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingExerciseProps {
  id: string;
  instruction: string;
  pairs: MatchingPair[];
  explanation?: string;
}

export interface SortingExerciseProps {
  id: string;
  instruction: string;
  items: string[];
  explanation?: string;
}

export interface TrueFalseProps {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  hint?: string;
}
