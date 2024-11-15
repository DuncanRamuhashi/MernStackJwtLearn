import React from 'react'
import Login from './login'
import Register from './register'
import Edit from './edit'
import Logout from './logout'
import Deleteaccount from './deleteaccount'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    
   
    <h1 className='text-center text-4xl'>Mern Stack Learning</h1>
    <div className="flex flex-row justify-center items-center gap-10  bg-gray-50 space-y-8">

       
      <Register />
      <Login /> 
      <Edit />  
      <Logout />
      
    </div>
    </>
  )
}

export default App
