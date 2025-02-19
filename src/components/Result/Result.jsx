import React, { useState, useEffect } from 'react';
import "../Result/Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    // Load scores from localStorage on component mount
    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
        setHighScores(savedScores);
    }, []);

    const handleSave = () => {
        if (!name.trim()) return; // Prevent saving empty names

        const score = { name, score: result.score };
        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);

        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem("highScores", JSON.stringify(newHighScores));
    };

    return (
        <div className="result">
            <h3>Result</h3>
            <p>Total Questions: <span>{totalQuestions}</span></p>
            <p>Total Score: <span>{result.score}</span></p>
            <p>Correct Answers: <span>{result.correctAnswers}</span></p>
            <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
            <button onClick={onTryAgain}>Try again</button>

            {!showScores ? (
                <>
                    <h3>Enter your Name Below<br />to save your score!</h3>
                    <input
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button> {/* Fixed onClick */}
                </>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores.map((highScore, i) => (
                            <tr key={i}> {/* Fixed missing key prop */}
                                <td>{i + 1}</td>
                                <td>{highScore.name}</td>
                                <td>{highScore.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Result;
