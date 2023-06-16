import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Routes>
    </div>
  );
}

export default App;
