import React from 'react';
import '../style/Introduction.css';

const Intro = () => {
    return (
        <div>
            <p className='title1'>8 puzzle solver</p>
            <p className='title2'>
                Find the solution to the sliding 8-puzzle 
                using A*, BFS and DFS
            </p>
            <nav className="intro-container">
            </nav>
        </div>

    );
}

export default Intro;