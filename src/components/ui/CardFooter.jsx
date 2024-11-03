import React from 'react';

const CardFooter = ({ children }) => {
  return (
    <div className="flex justify-between mt-4">
      {children}
    </div>
  );
};

export default CardFooter;
