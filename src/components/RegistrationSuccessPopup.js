import React from 'react';
import styles from './RegistrationSuccessPopup.module.css';
import userIcon from '../../public/assets/icons/user.png';
import Image from 'next/image';

const RegistrationSuccessPopup = ({ onCompleteLater, onCompleteNow, closePopup }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.closeButton} onClick={closePopup}/>
                <div className={styles.userIcon}>
                    <Image
                        src={userIcon}
                        alt="User"
                        className={styles.userImage}
                        width={100}
                        height={50}
                    />
                </div>
                <h2 className={styles.title}>REGISTRATION SUCCESSFUL</h2>
                <p className={styles.message}>
                    Your registration was successful. To buy or sell watches, you need to complete your profile. You can also do this at a later time.
                </p>
                <button className={styles.laterButton} onClick={onCompleteLater}>
                    Complete profile later
                </button>
                <button className={styles.nowButton} onClick={onCompleteNow}>
                    Complete profile now
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccessPopup;
