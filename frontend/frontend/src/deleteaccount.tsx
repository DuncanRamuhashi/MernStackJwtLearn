import React, { useState } from 'react'

function deleteaccount() {
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleDelete = () => {
    if (isConfirmed) {
      // Simulate account deletion by logging a message
      console.log('Account deleted')
      // In a real application, you'd make a request to your API to delete the account here
    } else {
      console.log('Please confirm before deleting your account.')
    }
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Delete Account</h2>
        <p className="text-center text-gray-700 mb-4">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="mr-2 h-5 w-5 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
          />
          <label htmlFor="confirmDelete" className="text-sm text-gray-700">I confirm I want to delete my account</label>
        </div>

        <button
          onClick={handleDelete}
          className={`w-full py-3 ${isConfirmed ? 'bg-red-600' : 'bg-gray-300'} text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500`}
          disabled={!isConfirmed}
        >
          {isConfirmed ? 'Delete Account' : 'Confirm to Delete'}
        </button>
      </div>
    </div>
  )
}

export default deleteaccount
