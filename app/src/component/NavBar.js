import React from 'react';
import '../style/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="/">8 PUZZLE SOLVER</a></li>
        <li className="Home"><a href="/">Home</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;