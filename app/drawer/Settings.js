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
    markerImage: null, // Changed to null
    iconButtonColor: '#000000',
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, markerImage: file });
  };

  const handleSubmit = async (e) => {
    setLoadSetting(true);
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;
  
    if (!email) {
      setSubmitMessage('User email is required');
      setMessageType('error');
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
      setLoadSetting(false);
      return;
    }
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('email', email);
  
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        body: formDataToSend,
      });
  
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage(data.message);
        setMessageType('success');
      } else {
        setSubmitMessage(data.message || 'An error occurred');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred while submitting the form');
      setMessageType('error');
    }
  
    setTimeout(() => {
      setSubmitMessage('');
    }, 3000);
    setLoadSetting(false);
  };  

  return (
    <>
      <div className='px-5 pb-4'>
        <p className='text-[24px] font-semibold'>Settings</p>
      </div>
      <div>
        <form className='bg-white px-8 py-8 mx-6 rounded-md' onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='flex gap-8 justify-between my-4'>
            <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>API Key:</label>
              <input
                className='cursor-pointer px-2 py-2 border-[1px] rounded-md border-[#E1E1E1]'
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Google Maps API Key:</label>
              <input
                className='cursor-pointer px-2 py-2 border-[1px] rounded-md border-[#E1E1E1]'
                type="text"
                name="googleMapsApiKey"
                value={formData.googleMapsApiKey}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex gap-8 justify-between my-4'>
            <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Select Layout:</label>
              <select className='cursor-pointer px-2 py-2 border-[1px] border-[#E1E1E1] rounded-md' name="layout" value={formData.layout} onChange={handleInputChange}>
                  <option value="left">Search and results on left</option>
                  <option value="right">Search and results on right</option>
              </select>
            </div>
            <div className='flex w-[50%] flex-col justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Map Theme:</label>
              <select className='cursor-pointer px-2 py-2 border-[1px] border-[#E1E1E1] rounded-md' name="mapTheme" value={formData.mapTheme} onChange={handleInputChange}>
                <option value="standard">Standard</option>
                <option value="silver">Silver</option>
                <option value="retro">Retro</option>
                <option value="dark">Dark</option>
                <option value="night">Night</option>
                <option value="aubergine">Aubergine</option>
              </select>
            </div>
          </div>
          <div className='flex gap-8 justify-between my-4'>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Search Icon Button:</label>
              <input
                className='cursor-pointer'
                type="color"
                name="searchIconButton"
                value={formData.searchIconButton}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Search Button Background:</label>
              <input
                className='cursor-pointer'
                type="color"
                name="searchButtonBackground"
                value={formData.searchButtonBackground}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Map Background:</label>
              <input
                className='cursor-pointer'
                type="color"
                name="mapBackground"
                value={formData.mapBackground}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Icon Button Color:</label>
              <input
                className='cursor-pointer'
                type="color"
                name="iconButtonColor"
                value={formData.iconButtonColor}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex gap-8 justify-between my-4'>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
                <label className='text-[#737373] mb-2 text-sm'>Zoom Level:</label>
                <div className='flex flex-row gap-2'>
                    <input
                        className='cursor-pointer w-[100%] h-[2px] mt-[10px]'
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
              <label className='text-[#737373] mb-2 text-sm'>Choose Map Marker:</label>
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
          <div className='flex gap-8 justify-between my-4'>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Markers Behavior:</label>
              <select name="markersBehavior" value={formData.markersBehavior} onChange={handleInputChange} className='px-2 py-2 w-[100%] border-[1px] border-[#E1E1E1] rounded-md cursor-pointer'>
                <option value="group">Group locations when zoomed out</option>
                <option value="noGroup">No grouping</option>
              </select>
            </div>
            <div className='flex flex-col w-[50%] justify-center mb-4 items-left'>
              <label className='text-[#737373] mb-2 text-sm'>Marker Image:</label>
              <input className='cursor-pointer border-[1px] rounded-md border-[#E1E1E1] p-[5px]' type="file" name="markerImage" onChange={handleFileChange} />
            </div>
          </div>
          <div className='flex justify-start'>
              <button className='mt-8 bg-[#0040A9] text-white px-8 py-2 rounded-md' 
              disabled={loadSetting}
              type="submit">
                {loadSetting ? 'Saving...' : 'Save'}
              </button>
          </div>
          {submitMessage && (
            <div className='flex justify-start mt-4'>
              <span className={messageType === 'success' ? 'text-green-500' : 'text-red-500'}>{submitMessage}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Settings;