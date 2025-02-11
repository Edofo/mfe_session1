import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '1rem', 
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <p>© EFREIflix {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;