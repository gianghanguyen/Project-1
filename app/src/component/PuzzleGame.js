import React, { useState, useEffect } from 'react';
import SolutionBoard from './SolutionBoard';
import '../style/PuzzleGame.css';

const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState(Array.from({ length: 9 }, (_, i) => i + 1));
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [solutionStates, setSolutionStates] = useState([]);

  useEffect(() => {
    shufflePuzzle();
  }, []);

  const convertStateToPuzzleArray = (state) => {
    const puzzleArray = [];
    for (let row of state) {
      for (let num of row) {
        puzzleArray.push(num);
      }
    }
    return puzzleArray;
  };

  const shufflePuzzle = async () => {
    const shuffledPuzzle = [...puzzle].sort(() => Math.random() - 0.5);
    setPuzzle(shuffledPuzzle);
    setEmptyIndex(shuffledPuzzle.indexOf(9));

    const puzzleConvert = shuffledPuzzle.map((number) => number - 1);

    // Gọi API để lấy giải pháp của trạng thái mới
    try {
      // for(let i = 0; i < shufflePuzzle.length(); i++){
      //   shufflePuzzle[i]--;
      // }
      const response = await fetch(`http://localhost:5000/bfs-solver?pntdata=${puzzleConvert.join(',')}`);
      console.log(response);
      console.log(solutionStates);
      const data = await response.json();
      const convertedStates = data.map((state) => {
        return {
          puzzle: convertStateToPuzzleArray(state),
          emptyIndex: state.flat().indexOf(0),
        };
      });
      setSolutionStates(convertedStates);
    } catch (error) {
      console.error('Error fetching solution data:', error);
    }
  };
  



  const movePiece = (index) => {
    if (isAdjacent(index, emptyIndex)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
      setPuzzle(newPuzzle);
      setEmptyIndex(index);
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };
  

  const isComplete = () => {
      for (let i = 0; i < puzzle.length - 1; i++) {
        if (puzzle[i] !== i + 1) {
          return false;
        }
      }
      return true;
    };
    

    const [showSolution, setShowSolution] = useState(false);

    const toggleSolution = () => {
      setShowSolution(!showSolution);
    };
  
    return (
      <div>
        <div id="puzzle-container">
          {puzzle.map((number, index) => (
            <div
              key={index}
              className={`puzzle-piece ${number === 9 ? 'empty' : ''}`}
              onClick={() => movePiece(index)}
            >
              {number}
            </div>
          ))}
          <button onClick={shufflePuzzle}>Shuffle</button>
          <button onClick={toggleSolution}>Solve</button>
          {isComplete() && <div className="completion-message">Hoàn thành!</div>}
        </div>
  
        {showSolution && (
          <div>
            {/* Render the solution steps here */}
            <SolutionBoard solutionStates={solutionStates} />
          </div>
        )}
      </div>
    );
  };
  
  export default PuzzleGame;


