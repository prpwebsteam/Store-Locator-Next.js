// pages/Stores.js

import React, { useState, useEffect } from 'react';
import CreateStore from '../createStore/page';
import StoreList from './StoreList';

const Stores = () => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    console.log("bhairav");
    fetch('/api/getStores')
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
        console.log("bhairav", data);
      })
      .catch((error) => {
        console.error('Error fetching stores:', error);
      });
  }, []);

  const handleCreateStoreSuccess = () => {
    setShowStoreList(true);
  };

  return (
    <div>
      <h1>Stores</h1>
      <CreateStore onCreateSuccess={handleCreateStoreSuccess} />
      {showStoreList && <StoreList stores={stores} />}
    </div>
  );
};

export default Stores;