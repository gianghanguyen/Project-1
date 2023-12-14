import React from 'react';
import PropTypes from 'prop-types';

const SolutionBoard = ({ solutionStates }) => {
  return (
    <div className="solution-board">
      {solutionStates.map((state, index) => (
        <div key={index} className="solution-state">
          {state.puzzle.map((number, i) => (
            <div key={i} className={`solution-piece ${number === 9 ? 'empty' : ''}`}>
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

SolutionBoard.propTypes = {
  solutionStates: PropTypes.arrayOf(
    PropTypes.shape({
      puzzle: PropTypes.arrayOf(PropTypes.number),
      emptyIndex: PropTypes.number,
    })
  ),
};

export default SolutionBoard;
