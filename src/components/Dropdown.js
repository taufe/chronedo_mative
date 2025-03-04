import React from 'react';
import styles from '../pages/AccountSettings.module.css';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <select
      className={`${styles.input} ${styles.customPlaceholder}`}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
