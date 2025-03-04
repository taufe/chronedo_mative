import React from 'react';
import styles from './ConfirmationPopup.module.css';
import checkIcon from '../../public/assets/icons/checkIconWhite.png';
import Image from 'next/image';

const PasswordConfirmationPopup = ({}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                {/* <div className={styles.closeButton} onClick={closePopup} /> */}
                <h2 className={styles.title}>PASSWORD CHANGED<br/>SUCCESSFULLY</h2>

                <div style={{ marginTop: '20px' }} />
                <div className={styles.userIcon}>
                    <Image
                        src={checkIcon}
                        alt="User"
                        className={styles.userImage}
                        width={100}
                        height={50}
                    />
                </div>
                <div style={{ marginTop: '10px' }} />
            </div>
        </div>
    );
};

export default PasswordConfirmationPopup;
