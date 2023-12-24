
import './App.css';
import PuzzleGame from './component/PuzzleGame';
import NavBar from './component/NavBar';
import Intro from './component/Intro';
function App() {
  return (
    <div className='App'>
      <NavBar />
      <Intro />
      <PuzzleGame />
    </div>
  );
}

export default App;
