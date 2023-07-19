import Auth from "./Components/Auth"
import Register from './Components/Register';
import MainPage from './Components/MainPage';
import Main from './Components/users/Main';
import Friends from './Components/users/Friends'


import { Routes, Route } from "react-router-dom";

 export const useRoutes = isAuth => {
    if(isAuth){
    return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/friends' element={<Friends/>}/>
    </Routes>
  )
    }
    return <Routes>
       <Route path='/' element={<MainPage/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/register' element={<Register/>}/>
    </Routes>
 
}

