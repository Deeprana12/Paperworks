import React from 'react'
import user from '../assets/user.png';

const Comments = ({comment}) => {
  return (    
      <div className='flex flex-row'>
        <img className="h-6 mr-1 rounded-full" alt="user_logo" src={user} />        
        <div className='pb-1 mb-2' key={comment._id}>
            <h2 className='text-bold'>{comment.author}</h2>
            <h2 className='break-words'>{comment.content}</h2>                  
        </div>
      </div>    
  )
}

export default Comments