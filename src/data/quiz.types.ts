export type Option = {
  text: string;
  isRight: boolean;
};

export type Question = {
  question: string;
  points: number;
  negativePoints?: number;
  options: Option[];
};

export type Quiz = {
    quizName: string;
    _id: string;
    questions: Question[];
}
