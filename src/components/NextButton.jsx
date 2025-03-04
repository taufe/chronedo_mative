import React from 'react';
import Button from './Button';

const NextButton = ({ width, onClick }) => {
  return (
    <Button variant="next" width={width} onClick={onClick}>
      Next
    </Button>
  );
};

export default NextButton;
