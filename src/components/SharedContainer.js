import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pdfs from './Pdfs'
import { BASE_URL } from '../constants';

const SharedContainer = () => {

  const token = useSelector(store => store.auth.token)
  const [pdfs, setPdfs] = useState([])

  useEffect(() => {    

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
        } else {        
          console.error('Login failed');
        }
    }
    
    getAllPDF()
    
  }, [])
  

  return (
    <div className='m-2 bg-white col-span-12 '>      
      <h1 className='text-2xl text-bold m-10'>This are the all files you have access to</h1>
      <div className='flex flex-wrap justify-start'>  
        {pdfs.map((pdf) => {                    
          return (
              <Pdfs key={pdf._id} data= {pdf}/>
          )
        })}
      </div>
    </div>
  )
}

export default SharedContainer