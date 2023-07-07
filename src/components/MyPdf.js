import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pdfs from './Pdfs'
import Modal from './Modal'
import addUser from '../assets/add-user.png'
import useSearch from '../utils/customHooks/useSearch';
import useModal from '../utils/customHooks/useModal'
import Shimmer from '../utils/Shimmers/Shimmer'
import { BASE_URL } from '../constants';

const MyPdf = () => {

  const [pdfs, setPdfs] = useState([])
  const [loading, setLoading] = useState(true)

  const token = useSelector(store => store.auth.token)
  const { isModalOpen, modalProp, openModal, closeModal } = useModal();

  useEffect(() => { 
    const getMyPdfs = async () => {
      const response = await fetch(`${BASE_URL}/api/pdf/my`, {
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
    getMyPdfs()    
  }, [])

  const { searchQuery, filteredData, handleSearch } = useSearch(pdfs);

  return (
    <>
      <div className='mt-20 sm:mx-8 lg:mx-52 md:mx-20  my-8 bg-white col-span-12 '>
        <div className='block text-center'>
        <input
          className='w-1/2 my-2 rounded-lg p-1 border border-gray-400'
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          />
        </div >          
        <div className='block text-center'>
          <h1 className='text-2xl text-bold mt-10'>Files Uploaded By You!</h1>      
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

export default MyPdf