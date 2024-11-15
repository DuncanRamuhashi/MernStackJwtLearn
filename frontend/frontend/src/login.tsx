import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit =  async (e : any) => {
    e.preventDefault()
    
    const userData = { email, password };
        try {
            const response = await fetch('http://localhost:5000/api/users/auth',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include', // Include cookies
                body: JSON.stringify(userData),
              
            })
           if(response.ok){
            
            const data = await response.json();
          
            toast.success(data.name);
                // Save user ID in sessionStorage
          if (data._id) {
        sessionStorage.setItem('userId', data._id);
        toast.success(data.message || 'Login successful!');
          } else {
          toast.error('No user ID returned from server.');
           }
           }else{
            const errorData = await response.json();
            toast.error(errorData.message || 'Login failed. Please try again.');
           }
        } catch (error){
       console.error('An error occurred:', error);
      toast.error('An unexpected error occurred. Please try again.'); 
        }

  }
  const userId = sessionStorage.getItem('userId');
  console.log('Stored User ID:', userId);
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default login
