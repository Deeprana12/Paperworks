import React, { useState } from 'react';

const SearchBar = ({ data }) => {

  console.log(data)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = data.filter((item) =>
      item?.filename.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className='block text-center'>
      <input
        className='w-1/2 my-2 rounded-lg p-1 border border-gray-400'
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />      
    </div>
  );
};

export default SearchBar;
