import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Comments from './Comments';
import ShimmerComment from '../utils/Shimmers/ShimmerComment';
import { BASE_URL } from '../constants';

const b64toBlob = (pdfData, contentType='', sliceSize=512) => {
    const byteCharacters = atob(pdfData);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

const PdfViewer = () => { 

  const location = useLocation();
  const navigate = useNavigate()
  const pdfUrl = useParams().id

  const { state } = location;  
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)    
  const [blobUrl, setBlobUrl] = useState('')  
  
  const getComments = async () => {
    try{
      const response = await fetch(`${BASE_URL}/api/pdf/comments/${pdfUrl}`,{
        method:'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`, 
        // },              
      })        
      if(response.ok){        
        const data = await response.json()
        console.log(data)
        setComments(data?.comments) 
        setLoading(false)         
      } else {
        alert('Something went wrong!');
      }

      setNewComment("")
    }catch(e){
      console.log(e)
    }
  }

  const getPdf = async () => {
    try{
      const response = await fetch(`${BASE_URL}/api/pdf/${pdfUrl}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },              
      })
      const data = await response.json()                   
      if(response.status >= 400 && response.status < 500){
          alert(data?.message)
          navigate('/')
      }else if(response.status >= 200 && response.status < 400){                
        const contentType = 'application/pdf';
        const blob = b64toBlob(data?.pdf?.fileData, contentType);
        setBlobUrl(URL.createObjectURL(blob))
        setLoading(false)
      } else {        
        alert('Something went wrong!');
      }
      setNewComment("")
    }catch(e){
      console.log(e)
    }
  }

  const token = useSelector(store => store.auth.token)       

  useEffect(() => {
    // if(!token){
    //   navigate('/login')      
    //   return;
    // }
    getPdf()
    getComments()
  }, [])
          
  const [newComment, setNewComment] = useState('');    
 

  const submitComment = async() =>{
    try{
        const response = await fetch(`${BASE_URL}/api/pdf/comments/${state._id}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify({ content: newComment })        
        })

        if(response.ok){                  
          alert('Comment added successfully!');
          getComments()
          setNewComment("")
        } else {
          alert('Something went wrong!');
        }
    }catch(e){
      console.log(e)
    }
  }  
    return (    
      <div className='mt-20 flex justify-start flex-wrap'>
        <div className='h-[91.5vh] sm:flex-1 m-4'>
           <iframe
            className='h-full w-full'
            src={blobUrl}
          ></iframe>
        </div>
        <div className='md:w-[40%] sm:w-full m-4'>
          <div className='text-3xl text-bold'>
            Comments
          </div>
          {(!token ? <h1 className='mt-8 text-center font-bold text-xl'>Please authenticate to see comments!</h1> :
          (<>
          <div className='my-2'>
            <h3> Add your comment: </h3>
            <div className='flex my-3'>
              
              <textarea type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border border-gray-500 rounded-md w-[80%] p-1'/>
              <button onClick={submitComment} className='ml-1 border-gray-500 rounded bg-green-300 text-green-700 w-[20%]'> Add </button>
            </div>
          </div>
          <div className='bg-white my-2 p-4 rounded-md h-auto'>
            {!loading ? (comments.length?
              (comments.map((comment) => {
                return (<Comments key={comment._id} comment={comment} />)
              })):(<h1>No Comments!</h1>)): <ShimmerComment/>
            }
          </div>
          </>))}
        </div>
      </div>
  )
}

export default PdfViewer