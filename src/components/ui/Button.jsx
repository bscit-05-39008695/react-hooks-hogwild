import React from 'react';

export const Button = ({ children, variant = 'default', ...props }) => {
  const baseStyles = "px-4 py-2 rounded transition-colors";
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;