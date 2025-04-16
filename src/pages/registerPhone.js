import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './Signup.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';

import phoneIcon from '../../public/assets/icons/iphone.png';

const RegisterPhone = () => {
    const router = useRouter();
    const { email, password, pin_code } = router.query;
    const [phoneNo, setPhoneNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countryCode, setCountryCode] = useState('+92'); // Default country code
  

    const sendData = async () => {
        // Validation for phone number and country code
        if (!phoneNo || !countryCode) {
            setError('Please enter your phone number and country code.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/verifyPhoneApi', {
                phone_no: phoneNo,
                country_code: countryCode,
            });

            console.log('response of phone verficatin number',response.data)

            const verifiedPhoneNumber = response.data.data?.phone_no;
            if (response.data.success === true) {
                // Redirect with phone number and pin_code
                router.push({
                    pathname: '/verifyPhone',
                    query: {
                        email: email,
                        password: password,
                        pin_code: pin_code,
                        phone_no: verifiedPhoneNumber,

                    },
                });
            } else {
                setError(response.data.message || 'Verification failed. Please try again.');
            }
        } catch (err) {
            console.error('API error:', err);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneInput = (e) => {
        const input = e.target.value;
        // Check if the input has the country code or not (e.g. +92 3001234567 or 3001234567)
        if (input.startsWith('+')) {
            const [code, number] = input.split(' ');
            setCountryCode(code);
            setPhoneNo(number);
        } else {
            setPhoneNo(input);
        }
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
                    src={phoneIcon}
                    alt="Phone"
                    className={styles.userImage}
                    width={100}
                    height={50}
                />
                <h2 className={styles.title}>REGISTER PHONE NO</h2>

                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={`${styles.input} ${styles.customPlaceholder}`}
                        value={`${countryCode} ${phoneNo}`} // Display the combined value (country code + phone number)
                        onChange={handlePhoneInput} // Handle input changes
                        placeholder="Phone Number with Country Code"
                    />
                </div>

                <button className={styles.submitButton} onClick={sendData} disabled={loading}>
                    {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Spinner size="small" />
                        </div>
                    ) : (
                        "Next"
                    )}
                </button>

                {error && <p className={styles.errorText}>{error}</p>}
            </div>
        </>
    );
};

export default RegisterPhone;
