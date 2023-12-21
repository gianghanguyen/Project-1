import React, { useState, useEffect } from 'react';
import '../style/SolutionBoard.css';

const BoardReplay = ({ moves }) => {
  const [boardState, setBoardState] = useState( (moves && moves.length) > 0 ? moves[0] : []);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(true);

  useEffect(() => {
    if (isReplaying) {
      const replayInterval = setInterval(() => {
        setBoardState((prevBoardState) => {
          const nextMoveIndex = currentMoveIndex + 1;
          if (nextMoveIndex < moves.length) {
            setCurrentMoveIndex(nextMoveIndex);
            console.log('move: ', moves[nextMoveIndex]);
            return moves[nextMoveIndex].slice(); // Create a shallow copy of the next move array
          } else {
            console.log('haha');
            setIsReplaying(false);
            clearInterval(replayInterval);
            return prevBoardState;
          }
        });
      }, 500); // Delay between moves, adjust as needed
  
      return () => clearInterval(replayInterval);
    }
  }, [isReplaying, currentMoveIndex, moves]);

  const startReplay = async () => {
    console.log('Before setIsReplaying:', isReplaying);
    setIsReplaying(true);
    setCurrentMoveIndex(0);
    setBoardState(moves[0]);
    console.log('After setIsReplaying:', isReplaying);
  };

  const stopReplay = () => {
    setIsReplaying(false);
  };

  return (
    <div>
      <button onClick={isReplaying ? stopReplay : startReplay}>
        {isReplaying ? 'Stop replaying' : 'Replay solution'}
      </button>
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
      </div>
    </div>
  );
};

export default BoardReplay;
