
import './App.css';
import InteractiveBoard from './component/PuzzleGame';
import SolutionBoard from './component/PuzzleGame';
import NavBar from './component/NavBar';
function App() {
  return (
    <div className='App'>
      <InteractiveBoard />
      <NavBar />
    </div>
  );
}

export default App;
