import './App.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import GarmentsHolder from './GarmentsHolder';

function App() {
  const [queryString, setQueryString] = useState('');
  const [garmentsData, setGarmentData] = useState({});
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  function handleChange(event) {
    setQueryString(event.target.value);
  }
  function submitQuery(event) {
    event.preventDefault();
    searchData();
  }
  const searchData = useCallback(() => {
    document.getElementById('loadSpinner').style.display = "flex";
    axios.get(`${process.env.REACT_APP_BACKEND_URL || ""}/api/?q=${encodeURIComponent(queryString)}&p=${page}`)
      .then(res => {
        const shownResults = res.data.per_page * (page - 1);
        setMessage(`Showing ${shownResults + 1} - ${shownResults + res.data.count} of ${res.data.total} results.`);
        setGarmentData(res.data);
      })
      .catch(err => {
        console.error(err);
        setMessage("An error occurred. Please try again.");
        setGarmentData({});
      })
      .then(() => {
        document.getElementById('loadSpinner').style.display = "none";
      });
  }, [queryString, page])
  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    setPage(page - 1);
  }
  useEffect(() => {
    document.getElementById('searchForm').click();
    return () => {
      setGarmentData({});
      setMessage('');
    };
  }, []);
  useEffect(() => {
    searchData();
    return () => {
      setGarmentData({});
      setMessage('');
    };
  }, [page, searchData]);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <form onSubmit={submitQuery}>
          <input
            placeholder="Product Title"
            type="search"
            value={queryString}
            className='rounded-md'
            onChange={handleChange} />
          <button
            id="searchForm"
            onClick={submitQuery}
            className='text-gray-800 bg-gray-300 rounded-md hover:bg-blue-800 hover:text-white p-2 mx-2'>
            Search
          </button>
        </form>
        <div id="loadSpinner" className="items-center justify-center hidden">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
        {message !== "" && <div>{message}</div>}
        <GarmentsHolder data={garmentsData?.data} startIndex={((page - 1) * garmentsData?.per_page) || 0} />
        {garmentsData?.data?.length > 0 && (
          <div className="flex items-center space-x-1 mt-4">
            {garmentsData?.page >= 2 && (
              <button
                onClick={prevPage}
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-blue-800 hover:text-white">
                Previous
              </button>)
            }
            {garmentsData?.page < Math.ceil(garmentsData?.total / garmentsData?.count) && (
              <button
                onClick={nextPage}
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-blue-800 hover:text-white">
                Next
              </button>)
            }
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
