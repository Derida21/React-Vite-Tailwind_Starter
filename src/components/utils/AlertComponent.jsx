import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const AlertComponent = ({ type = 'orange', title, message, duration = 3000, onClose }) => {
  const alertColors = {
    orange: {
      background: 'bg-orange-100',
      border: 'border-orange-500',
      text: 'text-orange-700',
    },
    green: {
      background: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-700',
    },
    red: {
      background: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-700',
    },
  };

  const colors = alertColors[type] || alertColors.orange;

  useEffect(() => {
    if (message) {
      toast(
        <div className={`${colors.text}`}>
          <p className="font-bold">{title}</p>
          <p>{message}</p>
        </div>,
        {
          position: "bottom-center", 
          autoClose: duration,
          className: `${colors.background} border-l-4 ${colors.border} p-4 mb-4 shadow-lg transition-all duration-500 ease-in-out`,
          onClose: onClose,
          style: {
            backgroundColor: 'transparent', // Ensure no gradient is applied
          },
        }
      );
    }
  }, [message, title, colors, duration, onClose]);

  return <ToastContainer />;
};

export default AlertComponent;
