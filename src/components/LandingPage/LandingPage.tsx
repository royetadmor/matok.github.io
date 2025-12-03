// import React from "react";
import "./LandingPage.css";
import StartButton from "../Button/button";

type LandingPageProps = {
  onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="title">!ברוכים הבאים למבחן מתו״ק</h1>
        <p className="description">
          .בבוחן זה אתם תתבקשו להחליט אם מילה היא אמיתית או לא
          <br></br>
          במידה והמילה אמיתית, לחצו על החץ הימיני במקלדת או על הכפתור עליו רשום ״נכון״
          <br></br>
          במידה והמילה אינה אמיתית, לחצו על החץ השמאלי במקלדת או על הכפתור עליו רשום ״לא נכון״
        </p>

        <StartButton onClick={onStart} />
      </div>
    </div>
  );
}
