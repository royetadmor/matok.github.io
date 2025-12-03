// import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./ResultsPage.css";
import type { QuizStats } from "../../types/types";


type ResultsPageProps = {
  stats: QuizStats[];
  onRestart: () => void;
};

export default function ResultsPage({ stats, onRestart }: ResultsPageProps) {
  const data = stats.map((s, i) => ({
    name: `Q${i + 1}`,
    time: +(s.timeMs / 1000).toFixed(2),
  }));

  stats.filter((s) => s.isWrong).map((s) => console.log(s.answer))
  const avgTime = +(stats.reduce((sum, s) => sum + s.timeMs, 0) / stats.length / 1000).toFixed(2)

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>תוצאות הבוחן</h1>

        {/* Average time */}
        <div className="avg-time-box">
          <strong>זמן ממוצע לשאלה: </strong> {avgTime} שניות
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="time" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>

        {/* Questions list */}
        <div className="questions-section">
        <h2>סיכום הטעויות: </h2>
        <div className="questions-list">
            {stats.length === 0 ? (
            <p className="placeholder">לא נמצאו טעויות</p>
            ) : (
            stats.filter((s) => s.isWrong).map((s, i) => {
                console.log(s.questionText)
                let displayType: string;

                // Set display type
                if (s.questionType === "Pse_Real") {
                    displayType = "פסאודו-מילה"
                } else if (s.questionType === "Pse_Not_Real") {
                    displayType = "מילת תפל"
                } else {
                    displayType = "מילה אמיתית"
                }

                // Set display answer
                const displayAnswer = s.answer ? "נכון" : "לא נכון"
                return (
                <div key={i} className="question-item">
                    <p>טעות {i + 1}: <strong>{s.questionText}</strong></p>
                    <p>תשובה: <strong>{displayAnswer}</strong></p>
                    <p>סוג המילה: <strong>{displayType}</strong></p>
                    <hr />
                </div>
                );
            })
            )}
        </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          התחל מחדש
        </button>
      </div>
    </div>
  );
}
