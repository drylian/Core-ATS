import React, { useState } from 'react';

const FlashAlert = ({ type, message, onClose }) => {
  const [isClosed, setIsClosed] = useState(false);

  let alertClasses = 'p-2 mb-2 rounded ';

  if (type === 'error') {
    alertClasses += 'bg-red-500 text-white';
  } else if (type === 'success') {
    alertClasses += 'bg-green-500 text-white';
  } else if (type === 'warn') {
    alertClasses += 'bg-yellow-500 text-black';
  } else if (type === 'info') {
    alertClasses += 'bg-blue-500 text-white';
  }

  const handleClose = () => {
    setIsClosed(true);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {message && (
        <div className={alertClasses} style={{ display: isClosed ? 'none' : 'block' }}>
          {message}
          <button onClick={handleClose} className="ml-2">
            Fechar
          </button>
        </div>
      )}
    </>
  );
};

export default FlashAlert;
