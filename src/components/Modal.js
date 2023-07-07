import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, onClose, pdf }) => {  
  
  const [email, setEmail] = useState('');
  const token = useSelector (store => store.auth.token)

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/pdf/share/${pdf._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ email: email }),
    });
    
    if (response.ok) {
      alert('PDF has been shared!')
    } else {        
      alert('User Not found!')
    }    
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/3 sm:1/2">
        <h2 className="text-lg font-bold mb-4">Enter User Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
