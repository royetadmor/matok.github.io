export type QuestionFromExcel = {
  id: number;
  text: string;
  type: string;
};

export type QuizStats = {
  questionId: string;
  answer: boolean;
  timeMs: number;
  isWrong: boolean;
  questionType: string;
  questionText: string;
};
