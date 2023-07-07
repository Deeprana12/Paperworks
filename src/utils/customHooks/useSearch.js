import { useState, useEffect } from 'react';

const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return { searchQuery, filteredData, handleSearch };
};

export default useSearch;
