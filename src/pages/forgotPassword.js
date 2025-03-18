import React, { useState } from 'react';
import Image from 'next/image';
import styles from './VerifyEmail.module.css';
import Head from 'next/head';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';
import { useRouter } from 'next/router';
import emailIcon from '../../public/assets/icons/emailIcon.png';
import resendIcon from '../../public/assets/icons/resend.png';
import ConfirmationPopup from '../components/ConfirmationPopup';
import axios from 'axios';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState('')

    // const handleSendCode = () => {
    //       setTimeout(() => {
    //         setShowPopup(false);
    //         router.push('/confirmationCodeSent');
    //       }, 3000);
    //   };


    const handleBack = () => {
        router.back(); 
    };

    const handleNext = () => {
        // Add logic for verifying the code if needed
        setShowPopup(true);
        handleSendCode();
    };


    
    // const handleSendCode = async () => {
    //     // Validation
    //     if (!email) {
    //       setError("Please enter your email.");
    //       return;
    //     }
    
    //     setLoading(true);
    //     setError("");
    
    //     try {
    //       // Simulate pin code generation
    //       const pin_code = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random pin
    
    //       // Send email, password, and pin code to the backend or use them for redirection
    //       const response = await axios.post("/api/verifythemailApi", { email });
    
    //       console.log("API Response:", response.data);
    
    //       if (response.data.success === true) {
    //         console.log(response.data.message);
            
    //         setTimeout(() => {
    //             setShowPopup(false);
    //             router.push({
    //                 pathname: "/confirmationCodeSent",
    //                 query: { 
    //                     email: email,
    //                     // password: password,
    //                     pin_code: pin_code,
    //                  }
    //             });
    //         }, 3000);
    //       } else {
    //         setError(response.data.message || "Verification failed. Please try again.");
    //       }
    //     } catch (err) {
    //       console.error("API error:", err);
    
    //       if (err.response?.status === 401) {
    //         setError("Invalid email or password.");
    //       } else {
    //         setError(err.response?.data?.message || "An error occurred. Please try again later.");
    //       }
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    const handleSendCode = ()=>{
        setShowPopup(false);
        router.push({
            pathname:'/changePassword',
            query:{
                email:email
            }
        })
    }

    return (
        <>
            <Head>
                <title>Verify Email - Your Watch Selling Platform</title>
                <meta name="description" content="Verify your email to complete registration." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.innerContainer}>
                <Image
                    src={emailIcon}
                    alt="User"
                    className={styles.userImage}
                    width={100}
                    height={50}
                />
                <h2 className={styles.title}>FORGOT PASSWORD</h2>

                <h4>We will send you an email with the verification code.</h4>

                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        className={`${styles.input} ${styles.customPlaceholder}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>

                <div style={{ marginTop: '20px' }} />
                <h4>The code will be sent to the email address you provide</h4>

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
                {error && <p className={styles.errorText}>{error}</p>}

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} width="175px">Back</BackButton>
                    <NextButton onClick={handleNext} disabled={loading}>
                        {loading ? "Processing..." : "Next"}
                    </NextButton>
                </div>

                {showPopup && (
                    <ConfirmationPopup
                    />
                )}


            </div>
        </>
    );
};

export default ForgotPassword;
