import React from 'react';

const CardHeader = ({ children }) => {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
};

export default CardHeader;
