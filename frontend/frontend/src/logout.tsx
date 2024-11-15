import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function logout() {
  const handleLogout = async() => {
    
    try {
        const response = await fetch('http://localhost:5000/api/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
         
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          sessionStorage.removeItem('userId'); // Clear the user ID
          document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    console.log('User logged out')
    
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Logout</h2>
        <ToastContainer />
        <p className="text-center text-gray-700 mb-4">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default logout
