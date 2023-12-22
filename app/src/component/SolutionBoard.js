import React, { useState, useEffect } from 'react';
import '../style/SolutionBoard.css';

const BoardReplay = ({ moves }) => {
  const [boardState, setBoardState] = useState((moves && moves.length) > 0 ? moves[0] : []);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(true);

  useEffect(() => {
    if (isReplaying) {
      const replayInterval = setInterval(() => {
        setBoardState((prevBoardState) => {
          const nextMoveIndex = currentMoveIndex + 1;
          if (nextMoveIndex < moves.length) {
            setCurrentMoveIndex(nextMoveIndex);
            return moves[nextMoveIndex]; // Create a shallow copy of the next move array
          } else {
            setIsReplaying(false);
            clearInterval(replayInterval);
            return prevBoardState;
          }
        });
      }, 1000); // Delay between moves, adjust as needed

      return () => clearInterval(replayInterval);
    }
  }, [isReplaying, currentMoveIndex, moves]);

  const startReplay = () => {
    setIsReplaying(true);
    setCurrentMoveIndex(0);
    setBoardState(moves[0]);
  };

  const stopReplay = () => {
    setIsReplaying(false);
  };

  const goToPrevMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1);
      setBoardState(moves[currentMoveIndex - 1]);
    }
  };

  const goToNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
      setBoardState(moves[currentMoveIndex + 1]);
    }
  };

  return (
    <div>
      <div id="puzzle-container">
        {/* Render your board using boardState */}
        {boardState.map((number, index) => (
          <div
            key={index}
            className={`puzzle-piece ${number === 0 ? 'empty' : ''}`}
          >
            {number}
          </div>
        ))}
        <div className="replay-controls-container">
          <button onClick={isReplaying ? stopReplay : startReplay}>
            {isReplaying ? 'Stop playing' : 'Replay solution'}
          </button>
          <button onClick={goToPrevMove} disabled={currentMoveIndex === 0}>
            Prev
          </button>
          <span className="move-info">{currentMoveIndex + 1}/{moves.length}</span>
          <button onClick={goToNextMove} disabled={currentMoveIndex === moves.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardReplay;