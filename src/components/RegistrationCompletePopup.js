import React from 'react';
import styles from './RegistrationSuccessPopup.module.css';
import userIcon from '../../public/assets/icons/user.png';
import Image from 'next/image';

const RegistrationCompletePopup = ({ closePopup }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.closeButton} onClick={closePopup} />
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
                    Your registration is complete now. To buy or sell watches, please login to your profile.
                </p>
            </div>
        </div>
    );
};

export default RegistrationCompletePopup;
