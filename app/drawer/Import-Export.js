import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ImportExport = () => {
  const [stores, setStores] = useState([]);
  const [fileName, setFileName] = useState('Import Excel File');
  const [subscriptions, setSubscriptions] = useState([]);
  const [freePlanActivated, setFreePlanActivated] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/getSubscriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        setSubscriptions(data.subscriptions);

        // Check for free plan activation conditions
        const allCanceledOrPendingCancellation = data.subscriptions.every(sub => sub.status === 'canceled' || sub.status === 'pending_cancelation');
        if (allCanceledOrPendingCancellation || data.subscriptions.length === 0) {
          setFreePlanActivated(true);
        } else {
          setFreePlanActivated(false);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleExport = () => {
    if (freePlanActivated) {
      alert('You cannot export stores on a free plan.');
      return;
    }

    if (!stores || !stores.length) {
      console.error('No stores data available for export.');
      return;
    }

    setIsExporting(true);

    try {
      const ws = XLSX.utils.json_to_sheet(stores);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Stores");
      XLSX.writeFile(wb, "stores.xlsx");
    } catch (error) {
      console.error('Error exporting stores:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (event) => {
    if (freePlanActivated) {
      alert('You cannot import stores on a free plan.');
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    setIsImporting(true);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      sendJsonToServer(json);
    };

    reader.readAsArrayBuffer(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
      setIsImporting(false);
    }
  };

  const sendJsonToServer = async (jsonData) => {
    try {
      const response = await fetch('/api/saveExcelData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log('Success:');
      } else {
        console.error('Failed to save Excel data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateUrl = `${window.location.origin}/stores.xlsx`;
    window.open(templateUrl);
  };

  return (
    <>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-row mb-8 px-5 justify-between items-center'>
          <div>
            <h4 className='text-black text-[20px] font-bold'>
              Bulk Import/Export
            </h4>
            <p className='text-black text-[14px] mt-2'>
              Download a sample file to bulk import the stores.
            </p>
          </div>

          <button
            onClick={handleDownloadTemplate}
            className="hover:bg-[#0040A9] font-bold border border-[#0040A9] text-[12px] hover:text-white py-2 px-4 rounded bg-transparent text-[#0040A9]"
          >
            Download Excel Format
          </button>
        </div>
        <div className='flex flex-row text-center w-full justify-between gap-4 py-8 px-5'>
          <div className='bg-white w-1/2 rounded-md flex py-8 px-8 flex-col gap-4'>
            <p className='text-black text-[16px] font-semibold pb-4'>Bulk Import</p>
            <div className='border-dashed border-2 border-gray-300 p-24 rounded-lg flex flex-col items-center'>
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
                {isImporting ? 'Importing...' : fileName}
              </label>
              <p className='text-[#505050] text-sm mt-4 '>Accept CSV File</p>
            </div>
          </div>
          <div className='bg-white rounded-md py-8 px-8 w-1/2'>
            <p className='text-black text-[16px] font-semibold pb-4'>Bulk Export</p>
            <div className='p-24'>
              <button
                onClick={handleExport}
                className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black"
              >
                {isExporting ? 'Exporting...' : 'Export Stores'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportExport;