import React, { useState } from 'react';

const Settings = () => {
  const [loadSetting, setLoadSetting] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: '',
    googleMapsApiKey: '',
    layout: 'left',
    mapTheme: 'retro',
    zoomLevel: 5,
    mapBackground: '#FFFFFF',
    searchIconButton: '#FFFFFF',
    searchButtonBackground: '#752E3D',
    markersBehavior: 'group',
    markerType: 'icon',
    markerImage: '',
    iconButtonColor: '#000000',
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, markerImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    setLoadSetting(true);
    e.preventDefault();
  
    // Get email from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    if (!email) {
      setSubmitMessage('User email is required');
      setMessageType('error');
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
      return;
    }

    const updatedFormData = { ...formData, email };
  
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
  
    const data = await response.json();
    if (response.ok) {
      setSubmitMessage(data.message);
      setMessageType('success');
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    } else {
      setSubmitMessage(data.message);
      setMessageType('error');
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    }
    setLoadSetting(false);
  };
  
  
  return (
    <div>
      <form className='shadow-2xl px-8 py-8 rounded-lg' onSubmit={handleSubmit}>
        <div className='flex gap-8 justify-between'>
          <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
            <label>API Key:</label>
            <input
              className='cursor-pointer px-2 py-1 border-[1px] rounded-lg border-black'
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
            <label>Google Maps API Key:</label>
            <input
              className='cursor-pointer px-2 py-1 border-[1px] rounded-lg border-black'
              type="text"
              name="googleMapsApiKey"
              value={formData.googleMapsApiKey}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='flex gap-8 justify-between'>
          <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
            <label>Select Layout:</label>
            <select className='cursor-pointer px-2 py-1 border-[1px] border-black rounded-lg' name="layout" value={formData.layout} onChange={handleInputChange}>
                <option value="layout-1">Search and results on left</option>
                <option value="layout-2">Search and results on right</option>
                <option value="layout-3">Search bar on top, results on left</option>
                <option value="layout-4">Search bar on top, results on right</option>
                <option value="layout-5">Search bar on top, results on Bottom</option>
            </select>
          </div>
          <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
            <label>Map Theme:</label>
            <select className='cursor-pointer px-2 py-1 border-[1px] border-black rounded-lg' name="mapTheme" value={formData.mapTheme} onChange={handleInputChange}>
              <option value="standard">Standard</option>
              <option value="silver">Silver</option>
              <option value="retro">Retro</option>
              <option value="dark">Dark</option>
              <option value="night">Night</option>
              <option value="aubergine">Aubergine</option>
            </select>
          </div>
        </div>
        <div className='flex gap-8 justify-between'>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label>Zoom Level:</label>
              <div className='flex flex-row gap-2'>
                  <input
                      className='cursor-pointer w-[90%]'
                      type="range"
                      name="zoomLevel"
                      min="5"
                      max="30"
                      value={formData.zoomLevel}
                      onChange={handleInputChange}
                  />
                  <span className=''>{formData.zoomLevel}</span>
              </div>
          </div>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Map Background:</label>
            <input
              className='cursor-pointer'
              type="color"
              name="mapBackground"
              value={formData.mapBackground}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='flex gap-8 justify-between'>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Search Icon Button:</label>
            <input
              className='cursor-pointer'
              type="color"
              name="searchIconButton"
              value={formData.searchIconButton}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Search Button Background:</label>
            <input
              className='cursor-pointer'
              type="color"
              name="searchButtonBackground"
              value={formData.searchButtonBackground}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='flex gap-8 justify-between'>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Markers Behavior:</label>
            <select name="markersBehavior" value={formData.markersBehavior} onChange={handleInputChange} className='px-2 py-1 w-[100%] border-[1px] border-black rounded-lg cursor-pointer'>
              <option value="group">Group locations when zoomed out</option>
              <option value="noGroup">No grouping</option>
            </select>
          </div>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Choose Map Marker:</label>
              <div className='flex gap-4'>
                <div className='flex gap-2'>
                    <input
                    className='cursor-pointer'
                    type="radio"
                    name="markerType"
                    value="icon"
                    checked={formData.markerType === 'icon'}
                    onChange={handleInputChange}
                    />
                    <label>Icon</label>
                </div>
                <div className='flex gap-2'>
                    <input
                    className='cursor-pointer'
                    type="radio"
                    name="markerType"
                    value="image"
                    checked={formData.markerType === 'image'}
                    onChange={handleInputChange}
                    />
                    <label>Image</label>
                </div>
              </div>
          </div>
        </div>
        <div className='flex gap-8 justify-between'>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Marker Image:</label>
            <input className='cursor-pointer' type="file" name="markerImage" onChange={handleFileChange} />
          </div>
          <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
            <label>Icon Button Color:</label>
            <input
              className='cursor-pointer'
              type="color"
              name="iconButtonColor"
              value={formData.iconButtonColor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='flex justify-center'>
            <button className='mt-8 bg-[#0040A9] text-white px-8 py-2 rounded-lg' 
            disabled={loadSetting}
            type="submit">
              {loadSetting ? 'Saving...' : 'Save Settings'}
            </button>
        </div>
        {submitMessage && (
          <div className='flex justify-center mt-4'>
            <span className={messageType === 'success' ? 'text-green-500' : 'text-red-500'}>{submitMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Settings;