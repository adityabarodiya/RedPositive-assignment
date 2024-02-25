// components/Button.js
'use client'

const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
  };
  
  export default Button;
  