import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ChangePassword.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

import keyIcon from '../../public/assets/icons/key.png';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import PasswordConfirmationPopup from '../components/PasswordConfirmationPopup';

const ChangePassword = () => {
    const router = useRouter();
    const { email } = router.query;
    console.log('email in change password api', email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSendCode = () => {
        setTimeout(() => {
            setShowPopup(false);
            router.replace('/login');
        }, 3000);
    };

    const handleBack = () => {
        router.back();
    };

    const handleNext = async () => {
        // Validation
        if (!password || !confirmPassword) {
            setError('Please enter both password and confirm password.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                '/api/changePasswordApi',
                { email: email, password: password, c_password: confirmPassword }
            );
            console.log('Change Password Response:', response.data);

            if (response.data.success) {
                setShowPopup(true);
            } else {
                setError(response.data.message || 'Password change failed. Please try again.');
            }
        } catch (err) {
            console.error('Change Password error:', err);
            setError(err.response?.data?.message || 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Change Password - Your Watch Selling Platform</title>
                <meta name="description" content="Change your password for your account." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.innerContainer}>
                <Image
                    src={keyIcon}
                    alt="Change Password"
                    className={styles.userImage}
                    width={100}
                    height={50}
                />
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

                {error && <p className={styles.errorText}>{error}</p>}

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} width="175px">Back</BackButton>
                    <NextButton onClick={handleNext} width="175px">Next</NextButton>
                </div>

                {showPopup && <PasswordConfirmationPopup />}
            </div>
        </>
    );
};

export default ChangePassword;
