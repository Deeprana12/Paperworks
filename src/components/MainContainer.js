import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pdfs from './Pdfs'
import Modal from './Modal'
import addUser from '../assets/add-user.png'
import useSearch from '../utils/customHooks/useSearch';
import useModal from '../utils/customHooks/useModal';
import Shimmer from '../utils/Shimmers/Shimmer'
import { useNavigate } from 'react-router-dom'

const MainContainer = () => {

  const [selectedFile, setSelectedFile] = useState(null);  
  const [fileContent, setFileContent] = useState("");  
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const token = useSelector(store => store.auth.token)
  if(!token){
    navigate('/login')
  }
  const { isModalOpen, modalProp, openModal, closeModal } = useModal();

  const getAllPDF = async () => {
    const response = await fetch(`${BASE_URL}/api/pdf/all`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    if (response.ok) {
      const data = await response.json(); 
      setPdfs(data.pdfs)
      setLoading(false)
    } else {        
      console.error('Login failed');
    }
}           
  useEffect(() => { 
    getAllPDF()    
  }, [])

  const { searchQuery, filteredData, handleSearch } = useSearch(pdfs);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        setFileContent(base64Data)
      };
      reader.readAsDataURL(file);      
    } else {
      // Invalid file type
      alert('Invalid File')
      setSelectedFile(null);
    }
  };

  const uploadFile = async () => {
    const response = await fetch(`${BASE_URL}/api/pdf/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ filename:selectedFile.name, fileData: fileContent }),
    });

    if (response.ok) {
      alert('File uploaded successfully!')
      getAllPDF() 
    } else {        
      console.error('Login failed');
    }    
  }  

  return (
    <>
      <div className=' mb-2 mt-20 bg-white sm:mx-8 lg:mx-52 md:mx-20 '>
        <div className='block text-center mt-4'>
        <input
          className='w-1/2 my-2 rounded-lg p-1 border border-gray-400'
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          />
        </div >
        <div className='block text-center'>
          <h3 className='ml-10 mt-4 mb-2'>Choose a PDF file to upload!</h3>
          <div className='flex flex-row justify-center border-gray-200'>
            <input className='bg-indigo-100 rounded mr-4 ml-10 file:cursor-pointer file:p-2 file:rounded-md' type="file" accept="application/pdf" onChange={handleFileChange} />
            <button
              type="submit" className="bg-gray-200 text-indigo-500 py-2 px-4 rounded hover:bg-indigo-700 hover:text-white transition-colors" onClick={uploadFile}>
                Upload
            </button>
          </div>
        </div>
        <div className='block text-center'>
          <h1 className='text-2xl text-bold mt-10'>Files you have access to</h1>      
          <div className={filteredData.length == 0 ? 'flex flex-wrap justify-center' : 'flex flex-wrap justify-start'}>
            {!loading ?        
              (filteredData.length ? filteredData.map((pdf) => {                    
                return (
                  <div className='relative' key={pdf._id}>
                    <span className="absolute right-0 px-2 cursor-pointer" onClick={()=>openModal(pdf)}>
                      <img className='h-8 mt-11' src={addUser} />
                    </span>
                    <Pdfs key={pdf._id} data={pdf} directory="dashboard"/>
                  </div>              
                )
              }): (<h1 className='text-bold text-1xl mt-8'>No Files Found!</h1>)): <Shimmer />
            }            
          </div>
        </div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} pdf={modalProp} />}
    </>
  )
}

export default MainContainer