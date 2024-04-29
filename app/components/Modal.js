import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-h-[90vh] overflow-y-scroll mx-4 md:mx-0 w-[100%] sm:w-[70%]">
        <button onClick={onClose} className="float-right w-[30px] h-[30px] font-bold">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;