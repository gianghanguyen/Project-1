import React, { useState, useEffect } from 'react';
import SolutionBoard from './SolutionBoard';
import '../style/PuzzleGame.css';

const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState(Array.from({ length: 9 }, (_, i) => i));
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [solutionStates, setSolutionStates] = useState([]);
  const [algorithm, setAlgorithm] = useState('astar');
  const [boardState, setBoardState] = useState([]);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  useEffect(() => {
  }, [algorithm]);

  const callApi = async () => {
      try {
      const response = await fetch(`http://localhost:5000/${algorithm}-solver?pntdata=${boardState.join(',')}`);
      const data = await response.json();
      setSolutionStates(data);
    } catch (error) {
      console.error('Error fetching solution data:', error);
    }
  }

  const isSolvable = (puzzleState) => {
    let inversion = 0;
    const len = puzzleState.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        if (puzzleState[i] > 0 && puzzleState[j] > 0 && puzzleState[i] > puzzleState[j]) {
          inversion++;
        }
      }
    }
    return inversion % 2 === 0;
  };

  const shufflePuzzle = async () => {
    var shuffledPuzzle = [...puzzle].sort(() => Math.random() - 0.5);
    while (!isSolvable(shuffledPuzzle)) {
      console.log('Unsolvale');
      shuffledPuzzle = [...puzzle].sort(() => Math.random() - 0.5);
    }
    setPuzzle(shuffledPuzzle);
    setBoardState(shuffledPuzzle);
    setEmptyIndex(shuffledPuzzle.indexOf(0));
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
    callApi();
    setShowSolution(!showSolution);
  };

  return (
    <div>
      <div id="puzzle-container">
        {puzzle.map((number, index) => (
          <div
            key={index}
            className={`puzzle-piece ${number === 0 ? 'empty' : ''}`}
            onClick={() => movePiece(index)}
          >
            {number}
          </div>
        ))}
        <button className='button'
        onClick={shufflePuzzle}>Shuffle</button>

        <select className='select' value={algorithm} onChange={handleAlgorithmChange}>
          <option value="astar">A* Algorithm</option>
          <option value="dfs">Depth First Search</option>
          <option value="bfs">Breadth First Search</option>
        </select>
        <button className='button1'
         onClick={toggleSolution}>Solve</button>
        {isComplete() && <div className="completion-message">Hoàn thành!</div>}
      </div>

      {showSolution && (
        <div>
          <SolutionBoard moves={solutionStates} />
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;


