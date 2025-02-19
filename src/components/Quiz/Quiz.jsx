import React, { useState } from "react";
import { resultInitalState } from "../../questions";
import "../../components/Quiz/Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [userInput, setUserInput] = useState(""); // For FIB questions
  const [isCorrect, setIsCorrect] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  


  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIndex(index);
    setIsCorrect(selectedAnswer === correctAnswer);
  };

  const onClickNext = () => {
    if (!showAnswerTimer) return; // Prevent double execution
    setShowAnswerTimer(false); // Stop timer immediately
  
    let finalAnswer = type === "FIB" ? userInput.trim().toLowerCase() === correctAnswer.toLowerCase() : isCorrect;
  
    setAnswerIndex(null);
    setUserInput(""); 
  
    setResult((prev) => ({
      ...prev,
      score: finalAnswer ? prev.score + 1 : prev.score,
      correctAnswers: finalAnswer ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: finalAnswer ? prev.wrongAnswers : prev.wrongAnswers + 1,
    }));
  
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setShowAnswerTimer(true); // Restart timer after question updates
      }, 100);
    } else {
      setShowResult(true);
    }
  };
  
  const handleTimeUp = () => {
   
    setIsCorrect(false);
    onClickNext(false);
  };
  
  const onTryAgain = () => {
    setCurrentQuestion(0);
    setResult(resultInitalState);
    setShowResult(false);
    setAnswerIndex(null);
    setUserInput("");
    setIsCorrect(null);
    setShowAnswerTimer(false); // First, stop the timer
  
    setTimeout(() => {
      setShowAnswerTimer(true); // Restart the timer after resetting state
    }, 100);
  }



  const handleInputChange=(e)=>{
    setUserInput(e.target.value);
    if(e.target.value==correctAnswer)
    {
      setIsCorrect(true)
    }
    else{
      setIsCorrect(false)
    }
  }

  const getAnswerUI = () => {
    if (type === "FIB") {
      return (
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
        />
      );
    }
    return (
      <ul>
        {choices.map((choice, index) => (
          <li
            key={choice}
            onClick={() => onAnswerClick(choice, index)}
            className={answerIndex === index ? "selected-ans" : ""}
          >
            {choice}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && <AnswerTimer duration={30} onTimeUp={handleTimeUp} />}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}

          <div className="footer">
            <button
              onClick={onClickNext}
              disabled={type === "FIB" ? userInput.trim() === "" : answerIndex === null}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
      )}
    </div>
  );
};

export default Quiz;
