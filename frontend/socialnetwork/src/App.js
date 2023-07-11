import './App.css';
import {Route , Routes} from 'react-router-dom';
import Auth from './Components/Auth'
import Register from './Components/Register';
import MainPage from './Components/MainPage';
import Main from './Components/users/Main'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
      <Routes>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Routes>
        <Route path='/main' element={<Main/>}/>
      </Routes>
 

    </div>
  );
}

export default App;
