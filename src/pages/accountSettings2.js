import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AccountSettings2.module.css';
import Head from 'next/head';
import Link from 'next/link';
import OtpInput from '../components/OtpInput';
import Button from '../components/Button';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';
import { useRouter } from 'next/router';
import accountSttingsIcon from '../../public/assets/icons/accountSettings.png';
import Dropdown from '../components/Dropdown';
import RegistrationCompletePopup from '../components/RegistrationCompletePopup';

const AccountSettings2 = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [addressSuffix, setAddressSuffix] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [idLicense, setIdLicense] = useState('');
    const [passport, setPassport] = useState('');
    const [city, setCity] = useState('');
    const [selectedIdType, setSelectedIdType] = useState('id');
    const [showPopup, setShowPopup] = useState(false);

    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);

    const handleFileUpload = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            if (side === 'front') {
                setFront(fileURL);
            } else {
                setBack(fileURL);
            }
        }
    };

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        console.log('next');
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
            router.push('/');
        }, 3000);
    };

    const closePopup = () => {
        setShowPopup(false);
        router.push('/');
    };

    const handleUpload = (type) => {
        console.log(`Uploading ${type}`);
    };

    return (
        <>
            <Head>
                <title>Account Settings - Your Watch Selling Platform</title>
                <meta name="description" content="Verify your phone number to complete registration." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Image
                        src={accountSttingsIcon}
                        alt="Account Settings"
                        className={styles.headerImage}
                        width={100}
                        height={50}
                    />
                    <h2 className={styles.title}>ACCOUNT SETTINGS</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>First name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Last name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Phone Number</label>
                            <input
                                type="tel"
                                className={styles.input}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Date of Birth</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Address suffix</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={addressSuffix}
                                onChange={(e) => setAddressSuffix(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Street</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Zip Code</label>
                            <input
                                type="text"
                                className={styles.inputzip}
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>City/Village</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Country</label>
                            <select
                                className={styles.input}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Select country</option>
                                <option value="Switzerland">Switzerland</option>
                                {/* Add more countries as needed */}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.identificationSection}>
                    <h3 className={styles.identificationTitle}>IDENTIFICATION OF YOUR PERSON</h3>
                    <div className={styles.toggleContainer}>
                        <button
                            className={`${styles.toggleButton} ${selectedIdType === 'id' ? styles.active : ''}`}
                            onClick={() => setSelectedIdType('id')}
                        >
                            ID or driver
                        </button>
                        <button
                            className={`${styles.toggleButton} ${selectedIdType === 'passport' ? styles.active : ''}`}
                            onClick={() => setSelectedIdType('passport')}
                        >
                            Passport
                        </button>
                    </div>
                </div>

                {selectedIdType === 'id' && (
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadContainer}>
                            <div className={styles.uploadBox}>
                                <div className={styles.uploadSide}>
                                    <Image
                                        src={"/assets/icons/idFront.png"}
                                        alt="ID Front"
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <span>Front</span>
                                </div>
                                <label className={styles.uploadArea} htmlFor="frontUpload">
                                    {front ? (
                                        <Image
                                            src={front}
                                            alt="Front Preview"
                                            width={100}
                                            height={100}
                                            className={styles.preview}
                                        />
                                    ) : (
                                        <>
                                            <Image
                                                src={"/assets/icons/upload.png"}
                                                alt="Upload"
                                                width={30}
                                                height={30}
                                                style={{ objectFit: "contain" }}
                                            />
                                            <span>Select file</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        id="frontUpload"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'front')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>

                            <div className={styles.uploadBox}>
                                <div className={styles.uploadSide}>
                                    <Image
                                        src={"/assets/icons/idBack.png"}
                                        alt="ID Back"
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <span>Back</span>
                                </div>
                                <label className={styles.uploadArea} htmlFor="backUpload">
                                    {back ? (
                                        <Image
                                            src={back}
                                            alt="Back Preview"
                                            width={100}
                                            height={100}
                                            className={styles.preview}
                                        />
                                    ) : (
                                        <>
                                            <Image
                                                src={"/assets/icons/Upload.png"}
                                                alt="Upload"
                                                width={30}
                                                height={30}
                                                style={{ objectFit: "contain" }}
                                            />
                                            <span>Select file</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        id="backUpload"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'back')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} width="190px">Back</BackButton>
                    <NextButton onClick={handleNext} width="190px">Next</NextButton>
                </div>

                {showPopup && (
                    <RegistrationCompletePopup
                        closePopup={closePopup}
                    />
                )}
            </div>
        </>
    );
};

export default AccountSettings2;