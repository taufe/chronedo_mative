import React, { useState } from 'react';
import Image from 'next/image';
import styles from './VerifyEmail.module.css';
import Head from 'next/head';
import Link from 'next/link';
import OtpInput from '../components/OtpInput';
import Button from '../components/Button';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';
import { useRouter } from 'next/router';
import RegistrationSuccessPopup from '../components/RegistrationSuccessPopup';
import phoneIcon from '../../public/assets/icons/iphone.png';
import resendIcon from '../../public/assets/icons/resend.png';

const VerifyPhone = () => {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const handleOtpComplete = (otp) => {
        setVerificationCode(otp);
        // You can add additional logic here, such as auto-submitting the form
    };

    const closePopup = () => {
        setShowPopup(false);
    };  

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        console.log('Verification code:', verificationCode);
        setShowPopup(true);
    };
    const handleCompleteProfileLater = () => {
        setShowPopup(false);
        // Add logic for what happens when user chooses to complete profile later
        // router.push('/dashboard'); // Adjust this route as needed
        router.replace('/login');
    };

    const handleCompleteProfileNow = () => {
        setShowPopup(false);
        router.push('/accountSettings'); // Adjust this route as needed
    };

    return (
        <>
            <Head>
                <title>Verify Phone No - Your Watch Selling Platform</title>
                <meta name="description" content="Verify your phone number to complete registration." />
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
                <h2 className={styles.title}>VERIFY PHONE NO</h2>

                <h4>We have sent you an code on your phone number.</h4>

                <OtpInput length={4} onComplete={handleOtpComplete} />

                <h4>The code was sent to the following phone number:<br />+41 79 123 45 67</h4>

                <div className={styles.resendContainer}>
                    <Image
                        src={resendIcon}
                        alt="User"
                        className={styles.resendImage}
                        width={30}
                        height={30}
                    />
                    <h4>Request code again</h4>
                </div>

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} width="175px">Back</BackButton>
                    <NextButton onClick={handleNext} width="175px">Next</NextButton>
                </div>
                {showPopup && (
                    <RegistrationSuccessPopup
                        onCompleteLater={handleCompleteProfileLater}
                        onCompleteNow={handleCompleteProfileNow}
                        closePopup={closePopup}
                    />
                )}
            </div>
        </>
    );
};

export default VerifyPhone;
