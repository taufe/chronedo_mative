import React, { useState, useRef, useEffect } from 'react';
import styles from './OtpInput.module.css';

const OtpInput = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }

    if (index === length - 1 && otp.every(v => v !== '')) {
      onComplete(otp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={styles.otpContainer}>
      {otp.map((data, index) => (
        <input
          className={styles.otpInput}
          type="text"
          name="otp"
          maxLength="1"
          key={index}
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onFocus={e => e.target.select()}
          ref={input => inputRefs.current[index] = input}
        />
      ))}
    </div>
  );
};

export default OtpInput;
