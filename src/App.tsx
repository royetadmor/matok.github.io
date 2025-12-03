import { useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import QuizPage from "./components/QuizPage/QuizPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import { loadQuestionsFromExcel } from "./utils/excelReader";
import type { QuestionFromExcel } from "./types/types";


export default function App() {
  const [questions, setQuestions] = useState<QuestionFromExcel[]>([]);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const startQuiz = async () => {
    const loaded_questions = await loadQuestionsFromExcel();
    console.log("Loaded: :" , loaded_questions)
    loaded_questions.map((row) => console.log(row.id))
    setQuestions(loaded_questions);
    setStarted(true);
  };

    return (
    <>
      {!started && <LandingPage onStart={startQuiz} />}

      {started && !showResults && (
        <QuizPage
          questions={questions}
          onFinish={(stats) => {
            setResults(stats);
            setShowResults(true);
          }}
        />
      )}

      {started && showResults && (
        <ResultsPage
          stats={results}
          onRestart={() => {
            setShowResults(false);
            setStarted(false);
            setQuestions([]);
            setResults([]);
          }}
        />
      )}
    </>
  );
}
