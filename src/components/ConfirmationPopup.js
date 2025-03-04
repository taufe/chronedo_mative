import React from 'react';
import styles from './ConfirmationPopup.module.css';
import checkIcon from '../../public/assets/icons/checkIconWhite.png';
import Image from 'next/image';

const ConfirmationPopup = ({ onCompleteLater, onCompleteNow }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                {/* <div className={styles.closeButton} onClick={closePopup} /> */}
                <h2 className={styles.title}>CONFIRMATION CODE SENT</h2>
                <p className={styles.message}>
                    Link has been sent to your email
                </p>
                <div className={styles.userIcon}>
                    <Image
                        src={checkIcon}
                        alt="User"
                        className={styles.userImage}
                        width={100}
                        height={50}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
