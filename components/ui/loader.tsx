import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader" />
      
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .loader {
          width: 24px;
          height: 24px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #333;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;