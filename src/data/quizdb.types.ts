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

export type UserScore = {
  id: string;
  userId: {username: string},
  score: number;
}

export type Quiz = {
    quizName: string;
    _id: string;
    questions?: Question[];
    highScore?: UserScore[];
    categoryId: {
      _id: string;
      name: string;
    }
}

export type Category = {
  _id: string;
  name: string;
  noOfQuizzes: number;
}
