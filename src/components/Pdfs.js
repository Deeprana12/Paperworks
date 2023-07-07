import React, { useState } from 'react';
import pdfThumbnail from '../assets/pdf-thumbnail.png';
import { Link } from 'react-router-dom';

const Pdfs = ({ data, directory }) => {
  return (
    <>        
      <div className="ml-16 mt-10 mb-10 h-[200px] w-[200px] block text-center bg-gray-100 shadow shadow-black rounded-lg">
        <Link to={`/${directory}/${data._id}`} state={data}>
          <img src={pdfThumbnail} className="cursor-pointer p-8" />
        </Link>
        <h2 className="line-clamp-2">{data.filename}</h2>
      </div>                        
    </>
  );
};

export default Pdfs;
