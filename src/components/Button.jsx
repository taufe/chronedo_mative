import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant, width, onClick }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${width ? styles['custom-width'] : ''}`;
  
  return (
    <button className={buttonClass} onClick={onClick} width={{ width: width || 'auto' }} style={{ width: width || 'auto' }}>
      {children}
    </button>
  );
};

export default Button;
