import { Routes, Route } from 'react-router-dom';
import Login from './components/login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
      <p>Trybetunes</p>
    </>
  );
}

export default App;
