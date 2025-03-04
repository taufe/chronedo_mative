import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Signup.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import phoneIcon from '../../public/assets/icons/iphone.png';

const RegisterPhone = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');


    const sendData = () => {
        router.push('/verifyPhone');
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
                    alt="User"
                    className={styles.userImage}
                    width={100}
                    height={50}
                />
                <h2 className={styles.title}>REGISTER PHONE NO</h2>

                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        className={`${styles.input} ${styles.customPlaceholder}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Phone Number"
                    />
                </div>

                <button className={styles.submitButton} onClick={sendData}>Next</button>
            </div>
        </>
    );
};

export default RegisterPhone;
