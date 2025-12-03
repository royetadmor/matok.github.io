import { useState, useEffect } from "react";
import type { QuestionFromExcel, QuizStats } from "../../types/types";
import "./QuizPage.css";

type QuizPageProps = {
  questions: QuestionFromExcel[];
  onFinish: (stats: QuizStats[]) => void;
};

export default function QuizPage({ questions, onFinish }: QuizPageProps) {
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [stats, setStats] = useState<any[]>([]);

  const currentQuestion = questions[index];

  const answer = (value: boolean) => {
    const endTime = Date.now();
    const elapsed = endTime - startTime;
    let isWrong;
    if((value && currentQuestion.type === "Word") || !value && currentQuestion.type !== "Word") {
        isWrong = false;
    }
    else {
        isWrong = true;
    }

    const record = {
      questionId: currentQuestion.id,
      timeMs: elapsed,
      answer: value,
      isWrong: isWrong,
      questionType: currentQuestion.type,
      questionText: currentQuestion.text
    };

    setStats((prev) => [...prev, record]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setStartTime(Date.now());
    } else {
      onFinish([...stats, record]);
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        answer(true);
      } else if (e.key === "ArrowLeft") {
        answer(false); 
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, startTime, questions, stats]);

  if (!currentQuestion) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-question">{currentQuestion.text}</div>

        <div className="button-row">
          <button className="false-btn" onClick={() => answer(false)}>
            לא נכון
          </button>
          <button className="true-btn" onClick={() => answer(true)}>
            נכון
          </button>
        </div>
      </div>
    </div>
  );
}
