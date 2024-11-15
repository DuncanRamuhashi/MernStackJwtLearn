import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function edit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault()
    const userUpdateData = { name,email,password};
      
    try{
              const response = await fetch('http://localhost:5000/api/users/profile',{
                method: 'PUT',
                headers: {
                   'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
                body: JSON.stringify(userUpdateData),
              })
              if(response.ok){
            
              
                toast.success( 'Update successful!');
               }else{
                const errorData = await response.json();
                toast.error(errorData.message || 'Update failed. Please try again.');
               }
    }catch(error){
        console.error('An error occurred:', error);
        toast.error('An unexpected error occurred. Please try again.'); 
    }
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">Edit Profile</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default edit
