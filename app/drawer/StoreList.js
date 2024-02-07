'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const StoreList = () => {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); 

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
    router.push('/createStore');
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
    (filterStatus ? store.status === filterStatus : true)
  );

  const truncateAddress = (address) => {
    const maxLength = 50; 
    return address.length > maxLength ? address.substring(0, maxLength) + "..." : address;
  };

  return (
    <div>
        <div className='flex flex-row gap-8 items-center justify-between'>
          <div>
            <h2>Stores</h2>
          </div>
          <div className='flex gap-4'>
            <button
              type="button"
              className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black"
              onClick={handleCreateStoreClick}
            >
              Create Store
            </button>
          </div>
        </div>

        <div className='w-full mt-8 shadow-2xl rounded-lg px-8 py-12'>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <td colspan="6">
                  <div className='flex gap-4 mb-8 justify-between'>
                    <input
                      type="text"
                      placeholder="Search stores..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="input input-bordered input-primary bg-gray-100 px-4 py-1 w-full max-w-[200px] border-gray-300 rounded"
                    />
                    <select
                      onChange={handleFilterStatusChange}
                      value={filterStatus}
                      className="select select-bordered select-primary bg-gray-100 px-4 py-1 w-full max-w-[200px] border-gray-300 rounded"
                    >
                      <option value="">Filter by Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className='w-4 mt-2 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                </th>
                <th className="text-left px-4">Store Name</th>
                <th className="text-left px-4">Status</th>
                <th className="text-left px-4">Address</th>
                <th className="text-left px-4">Phone</th>
                <th className="text-left px-4">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store) => (
                <tr key={store._id}>
                  <td style={{ verticalAlign: 'middle' }}>
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(store._id)}
                      onChange={() => handleSelectStore(store._id)}
                      className='w-4 mt-2 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                  </td>
                  <td className="text-left px-4" style={{ verticalAlign: 'middle' }}>{store.name}</td>
                  <td className="text-left px-4" style={{ verticalAlign: 'middle' }}>{store.status}</td>
                  <td className="text-left px-4" style={{ verticalAlign: 'middle' }}>
                    {truncateAddress(`${store.addressLine1}, ${store.addressLine2}, ${store.city}, ${store.stateProvince}, ${store.country}`)}
                  </td>
                  <td className="text-left px-4" style={{ verticalAlign: 'middle' }}>{store.phone}</td>
                  <td className="text-left px-4" style={{ verticalAlign: 'middle' }}>{store.postalCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default StoreList;