import { useState } from 'react';
import Image from 'next/image';
import styles from './PurchaseStepIndicator.module.css';

// Import step icons
import step1Active from '../assets/icons/step1-active.svg';
import step1Inactive from '../assets/icons/step1-inactive.svg';
import step2Active from '../assets/icons/step2-active.svg';
import step2Inactive from '../assets/icons/step2-inactive.svg';
import step3Active from '../assets/icons/step3-active.svg';
import step3Inactive from '../assets/icons/step3-inactive.svg';
import step4Active from '../assets/icons/step4-active.svg';
import step4Inactive from '../assets/icons/step4-inactive.svg';

const PurchaseStepIndicator = ({ currentStep, onStepChange }) => {
  // Steps Configuration
  const steps = [
    { activeIcon: step1Active, inactiveIcon: step1Inactive, label: 'Select Product' },
    { activeIcon: step2Active, inactiveIcon: step2Inactive, label: 'Customize' },
    { activeIcon: step3Active, inactiveIcon: step3Inactive, label: 'Review' },
    { activeIcon: step4Active, inactiveIcon: step4Inactive, label: 'Payment' }
  ];

  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepWrapper}>
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div 
              className={styles.stepLine} 
              style={{ 
                backgroundColor: index < currentStep ? '#4CAF50' : '#E0E0E0',
                width: '100%'
              }}
            />
          )}
          {/* Step Icon */}
          <div 
            className={`${styles.stepIcon} ${currentStep === index ? styles.activeStep : ''}`}
            onClick={() => onStepChange(index)}
          >
            <Image
              src={currentStep === index ? step.activeIcon : step.inactiveIcon}
              alt={`Step ${index + 1}`}
              width={30}
              height={30}
            />
          </div>
          {/* Step Label */}
          <span className={styles.stepLabel}>{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PurchaseStepIndicator; 