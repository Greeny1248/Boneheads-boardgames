
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import  {Reviews}  from './components/reviews';
import  {SingleReview}  from './components/singlereview';


function App() {
  return (
    <div className="App">

<Header />
<Routes>
        <Route path='/' element={<Reviews />}></Route>
     <Route path="/reviews/:review_id" element={<SingleReview/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
