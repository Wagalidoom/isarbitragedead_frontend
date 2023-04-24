import './App.css';
import Blocks from './components/Blocks';
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box paddingTop={5}>
          <Blocks />
        </Box>
      </header>
    </div>
  );
}

export default App;
