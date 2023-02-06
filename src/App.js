import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import { Reviews } from './components/reviews';

function App() {
  return (
    <div className="App">
<Header />
<Routes>
        <Route path='/' element={<Reviews />}></Route>
      </Routes>
    </div>
  );
}

export default App;
