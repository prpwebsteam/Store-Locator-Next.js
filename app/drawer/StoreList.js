'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateStore from '../createStore/page';
import Modal from '../components/Modal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const StoreList = () => {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

  useEffect(() => {
    fetch('/api/getStores')
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => {
        console.error('Error fetching stores:', error);
      });
  }, []);

  const handleCreateStoreClick = () => {
    setIsModalOpen(true);
    setSelectedStore(null);
  };

  const handleEditStore = (store) => {
    const query = new URLSearchParams(store).toString();
    const storeId = query.split('=')[0];
    console.log("pawan", storeId); 
    router.push(`/editStore?${storeId}`);
  };
  

  const handleSelectStore = (storeId) => {
    if (selectedStores.includes(storeId)) {
      setSelectedStores(selectedStores.filter((id) => id !== storeId));
    } else {
      setSelectedStores([...selectedStores, storeId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStores([]);
    } else {
      setSelectedStores(stores.map((store) => store._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const filteredStores = stores.filter(store =>
    ((store.name ? store.name.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (store.status ? store.status.toLowerCase() : '').includes(searchTerm.toLowerCase())) &&
    (!filterStatus || store.status === filterStatus)
  );

  const truncateAddress = (address) => {
    const maxLength = 50; 
    return address.length > maxLength ? address.substring(0, maxLength) + "..." : address;
  };

  const totalPages = Math.ceil(filteredStores.length / entriesPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredStores.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div>
        <div className='flex flex-row gap-8 items-center justify-between'>
          <div className='flex gap-4 w-full justify-between'>
            <div className="flex items-center gap-4 w-[70%]">
              <div className="relative flex items-center w-[60%]">
                <input type='search' placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange} className='h-[2.5rem] bg-[#fff] flex-1 px-4 border rounded-md focus:outline-none'></input>
                <svg className="absolute right-0 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div>
                <select
                  onChange={handleFilterStatusChange}
                  value={filterStatus}
                  className="h-[2.5rem] select select-bordered border focus:outline-none select-primary bg-white px-4 py-1 max-w-[200px] rounded"
                >
                  <option value="">Select option</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className='flex gap-4 justify-end w-[30%]'>
              <button
                type="button"
                className="bg-transparent font-bold text-[#0040A9] border border-[#0040A9] py-2 px-4 rounded hover:bg-[#0040A9] hover:text-white"
                onClick={handleCreateStoreClick}
              >
                Create Store
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateStore />
        </Modal>
        <div className='w-full mt-8 bg-white rounded-md py-4'>
          <table className="border-collapse padding-tab w-full">
            <thead>
              <tr>
                <td colSpan="6">
                </td>
              </tr>
              <tr className="border-b px-8 border-[E1E1E1]">
                <th className=' px-8'>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className='mb-4 w-4 mt-2 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                </th>
                <th className="pb-2 text-left px-4 font-semibold">Store Name</th>
                <th className="pb-2 text-left px-4 font-semibold">Status</th>
                <th className="pb-2 text-left px-4 font-semibold">Address</th>
                <th className="pb-2 text-left px-4 font-semibold">Phone</th>
                <th className="pb-2 text-left pl-4 pr-8 font-semibold">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((store) => (
                <tr key={store._id}>
                  <td style={{ verticalAlign: 'middle' }} className='pt-3 px-8 pb-3 border-b border-[E1E1E1]'>
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(store._id)}
                      onChange={() => handleSelectStore(store._id)}
                      className='w-4 mt-2 h-4 text-blue-600 bg-gray-100 border-[E1E1E1] rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                  </td>
                  <td className="text-left px-4 pt-3 pb-3 cursor-pointer border-b border-[E1E1E1]" style={{ verticalAlign: 'middle' }} onClick={() => handleEditStore(store._id)}>{store.name}</td>
                  <td className="text-left px-4 pt-3 pb-3 cursor-pointer border-b border-[E1E1E1]" style={{ verticalAlign: 'middle' }} onClick={() => handleEditStore(store._id)}>
                    <button
                      type="button"
                      className="bg-[#0040A9] font-bold text-white py-1 px-4 rounded-3xl hover:bg-[#e6edf8] hover:text-black"
                      onClick={handleCreateStoreClick}
                    >
                      Active
                    </button>
                  </td>
                  <td className="text-left px-4 pt-3 pb-3 cursor-pointer border-b border-[E1E1E1]" style={{ verticalAlign: 'middle' }} onClick={() => handleEditStore(store._id)}>
                    {truncateAddress(`${store.addressLine1}, ${store.addressLine2}, ${store.city}, ${store.stateProvince}, ${store.country}`)}
                  </td>
                  <td className="text-left px-4 pt-3 pb-3 cursor-pointer border-b border-[E1E1E1]" style={{ verticalAlign: 'middle' }} onClick={() => handleEditStore(store._id)}>{store.phone}</td>
                  <td className="text-left pl-4 pr-8 pt-3 pb-3 cursor-pointer border-b border-[E1E1E1]" style={{ verticalAlign: 'middle' }} onClick={() => handleEditStore(store._id)}>{store.postalCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <ul className="pagination flex flex-row gap-1 justify-center mt-4">
            <li onClick={goToPreviousPage} className={currentPage === 1 ? 'disabled' : ''}>
              <button className="pagination-button cursor-pointer leading-tight text-gray-500 bg-white border p-1 border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center" disabled={currentPage === 1}>
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </li>
            <li>
              <button className="pagination-button p-1 active">
                {currentPage}
              </button>
            </li>
            <li onClick={goToNextPage} className={currentPage === totalPages ? 'disabled' : ''}>
              <button className="pagination-button cursor-pointer leading-tight text-gray-500 bg-white border p-1 border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center" disabled={currentPage === totalPages}>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default StoreList;