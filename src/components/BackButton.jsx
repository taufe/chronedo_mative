import React from 'react';
import Button from './Button';

const BackButton = ({ width, onClick }) => {
  return (
    <Button variant="back" width={width} onClick={onClick}>
      Back
    </Button>
  );
};

export default BackButton;
