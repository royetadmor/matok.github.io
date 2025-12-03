import { useState } from "react";
import "./LandingPage.css";

type LandingPageProps = {
  onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {
  // Texts for each step
  const steps: string[] = [
    "במבחן זה אתם תתבקשו להחליט אם מילה המופיעה על המסף היא אמיתית או לא",
    "במידה והמילה אמיתית, לחצו על החץ הימיני במקלדת או על הכפתור עליו רשום ״נכון״",
    "במידה והמילה אינה אמיתית, לחצו על החץ השמאלי במקלדת או על הכפתור עליו רשום ״לא נכון״",
    "לאחר בחריתכם, תופיע מיד מילה חדשה. המשיכו כך עד לסיום המבחן",
    "?מוכנים"
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    setFade(false); // start fade-out
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onStart();
      }
      setFade(true); // fade-in new content
    }, 200); // fade duration
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="landing-container">
      <div className={`landing-card ${fade ? "fade-in" : "fade-out"}`}>
        {currentStep === 0 && <h1 className="landing-header">!ברוכים הבאים למתו״ק</h1>}
        <p className="landing-text">{steps[currentStep]}</p>
        <p>{currentStep === 1 && <button className="true-btn">נכון</button> }</p>
        <p>{currentStep === 2 && <button className="false-btn">לא נכון</button>}</p>
        <button className="landing-button" onClick={handleNext}>
          {isLastStep ? "התחל בוחן" : "הבא"}
        </button>
      </div>
    </div>
  );
}