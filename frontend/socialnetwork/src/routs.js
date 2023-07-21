import Auth from "./Components/Auth"
import Register from './Components/Register';
import MainPage from './Components/MainPage';
import Main from './Components/users/Main';
import Friends from './Components/users/Friends';
import User from './Components/users/User'


import { Routes, Route } from "react-router-dom";

 export const useRoutes = isAuth => {
    if(isAuth){
    return (
    <Routes>
      <Route path='/' element = {<Main/>}/>
      <Route path='/friends' element = {<Friends/>}/>
      <Route path='/user' element = {<User/>}></Route>
    </Routes>
  )
    }
    return <Routes>
       <Route path='/' element={<MainPage/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/register' element={<Register/>}/>
    </Routes>
 
}

