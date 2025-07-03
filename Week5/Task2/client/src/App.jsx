import React from 'react'
import Nav from './componet/Nav'
import Footer from './componet/Footer'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AllPosts from './pages/AllPosts'
import Dash from './pages/Dash'
import Add from './pages/AddPost'
import List from './pages/Listing'
import UpdatePost from './pages/UpdatePost'
const App = () => {
  return (
    <div className="">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/posts' element={<AllPosts/>}></Route>
        <Route path='/dash' element={<Dash/>}></Route>
        <Route path='/addPost' element={<Add/>}/>
        <Route path='/listing' element={<List/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
