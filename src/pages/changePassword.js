import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ChangePassword.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import keyIcon from '../../public/assets/icons/key.png';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import PasswordConfirmationPopup from '../components/PasswordConfirmationPopup';

const ChangePassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSendCode = () => {
        setTimeout(() => {
          setShowPopup(false);
          router.replace('/login');
        }, 3000);
    };

    const sendData = () => {
        router.push('/verifyPhone');
    };

    const handleBack = () => {
        router.back(); // This will navigate to the previous page in the browser history
    };

    const handleNext = () => {
        setShowPopup(true);
        handleSendCode();
    };

    return (
        <>
            <Head>
                <title>Register Phone No - Your Watch Selling Platform</title>
                <meta name="description" content="Get in touch with us for inquiries about watches." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.innerContainer}>
                <Image
                    src={keyIcon}
                    alt="User"
                    className={styles.userImage}
                    width={100}
                    height={50}
                />
                <div style={{ marginTop: '10px' }} />
                <h2 className={styles.title}>CHANGE PASSWORD</h2>

                
                <h4>New Password</h4>
                <div className={styles.inputWrapper}>
                    <input
                        type="password"
                        className={`${styles.input} ${styles.customPlaceholder}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>

                <h4>Confirm Password</h4>
                <div className={styles.inputWrapper}>
                    <input
                        type="password"
                        className={`${styles.input} ${styles.customPlaceholder}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                </div>

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} width="175px">Back</BackButton>
                    <NextButton onClick={handleNext} width="175px">Next</NextButton>
                </div>

                {showPopup && (
                    <PasswordConfirmationPopup
                    />
                )}
            </div>
        </>
    );
};

export default ChangePassword;
