import './App.css';
import BlockData from './components/BlockData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <BlockData />
      </header>
    </div>
  );
}

export default App;
