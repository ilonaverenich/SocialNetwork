import Auth from "./Components/Auth"
import Register from './Components/Register';
import MainPage from './Components/MainPage';
import Main from './Components/users/Main';


import { Routes, Route } from "react-router-dom";

 export const useRoutes = isAuth => {
  console.log('isA',isAuth)
    if(isAuth){
    return (
    <Routes>
      <Route path='/' element={<Main/>}/>
    </Routes>
  )
    }
    return <Routes>
       <Route path='/' element={<MainPage/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/register' element={<Register/>}/>
    </Routes>
 
}

