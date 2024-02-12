import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ImportExport = () => {
  const [stores, setStores] = useState([]);
  const [fileName, setFileName] = useState('Import Excel File');

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

  const handleExport = () => {
    if (!stores || !stores.length) {
      console.error('No stores data available for export.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(stores);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stores");
    XLSX.writeFile(wb, "stores.xlsx");
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log(json); 
      sendJsonToServer(json);
    };
    reader.readAsArrayBuffer(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
  };

  const sendJsonToServer = (jsonData) => {
    fetch('/api/saveExcelData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleDownloadTemplate = () => {
    const templateUrl = `${window.location.origin}/stores.xlsx`;
    window.open(templateUrl);
  };
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div>
          <h4 className='text-black text-[20px] font-bold'>
            Bulk Import/Export
          </h4>
          <p className='text-black text-[14px] mt-4'>
            Download a sample file to bulk import the stores.
          </p>
          <button
            onClick={handleDownloadTemplate} 
            className="bg-[#0040A9] font-bold text-[12px] text-white mt-4 py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black"
          >
            Download Excel Format
          </button>
        </div>
        <div className='shadow-xl rounded-xl p-8'>
          <div className='flex flex-row gap-4'>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              id="file"
              style={{ display: 'none' }}
            />
            <label
              htmlFor="file"
              className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black cursor-pointer flex justify-center items-center"
            >
              {fileName} 
            </label>
            <button
              onClick={handleExport}
              className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black"
            >
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportExport;