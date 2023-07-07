import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Comments from './Comments';
import ShimmerComment from '../utils/Shimmers/ShimmerComment';

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
  const pdfUrl = useParams().id

  const { state } = location;                    
  const pdfData = state.fileData 
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)  
  const [loadingPdf, setLoadingPdf] = useState(true)
  const [blobUrl, setBlobUrl] = useState('')  
  
  const getComments = async () => {
    try{
      const response = await fetch(`${BASE_URL}/api/pdf/comments/${pdfUrl}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },              
      })        
      if(response.ok){        
        const data = await response.json()
        setComments(data.comments) 
        setLoading(false)         
      } else {
        alert('Something went wrong!');
      }

      setNewComment("")
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const contentType = 'application/pdf';
    const blob = b64toBlob(pdfData, contentType);
    setBlobUrl(URL.createObjectURL(blob))
    if(blobUrl) setLoadingPdf(false)
    getComments()
  }, [])
          
  const [newComment, setNewComment] = useState('');    
  const token = useSelector(store => store.auth.token)  

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
            title={state.filename}
          ></iframe>
        </div>
        <div className='md:w-[40%] sm:w-full m-4'>
          <div className='text-3xl text-bold'>
            Comments
          </div>
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
              })):(<h1>No Comments!</h1>)) : <ShimmerComment/>
            }
          </div>
        </div>
      </div>
  )
}

export default PdfViewer