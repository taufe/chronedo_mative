import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AccountSettings2.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import accountSttingsIcon from '../../public/assets/icons/accountSettings.png';
import RegistrationCompletePopup from '../components/RegistrationCompletePopup';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';

const AccountSettings2 = () => {
    const router = useRouter();
    const { email, accountType, language, currency, deliveryCountry } = router.query;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [addressSuffix, setAddressSuffix] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [selectedIdType, setSelectedIdType] = useState('id');
    const [showPopup, setShowPopup] = useState(false);

    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);
    const [passport, setPassport] = useState(null);

    const handleFileUpload = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            if (side === 'front') {
                setFront(fileURL);
            } else if (side === 'back') {
                setBack(fileURL);
            } else if (side === 'passport') {
                setPassport(fileURL);
            }
        }
    };

    const handleBack = () => {
        router.back();
    };

    const closePopup = () => {
        setShowPopup(false);
        router.push('/');
    };

    const handleNext = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();    
        formData.append('email', email);    
        formData.append('first_name', firstName);    
        formData.append('last_name', lastName);    
        formData.append('dob', dateOfBirth);    
        formData.append('zip_code', zipCode);    
        formData.append('city', city);    
        formData.append('country', country);    
        formData.append('account_type', accountType);    
        formData.append('address', street);    
        formData.append('language', language);    
        formData.append('currency', currency);    
        formData.append('shipping_country', deliveryCountry);        
        if (selectedIdType === 'id') {
            console.log("ID type is 'id'");
    
            if (!front || !back) {
                console.log("Error: Missing front or back ID image");
                alert('Please upload both front and back images for ID.');
                return;
            }
    
            formData.append('driver_license_picture_front', front);
            console.log("Front ID image added:", front);
    
            formData.append('driver_license_picture_back', back);
            console.log("Back ID image added:", back);
        } else {
            console.log("ID type is not 'id', assuming passport");
    
            if (!passport) {
                console.log("Error: Missing passport image");
                alert('Please upload passport image.');
                return;
            }
    
            formData.append('passport_picture', passport);
            console.log("Passport image added:", passport);
        }
    
        console.log("Final FormData contents:", formData);
    
        try {
            console.log("Starting API request...");
            const response = await fetch('/api/profileApi', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
    
            console.log("Response received:", response);
            
            if (response.ok) {
                console.log("Form submitted successfully");
                setShowPopup(true);
            } else {
                console.log("Error: Failed to submit form", response);
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error details:', error);
            alert('Failed to submit form. Please try again.');
        }
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

                {selectedIdType === 'id' ? (
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
                ) : (
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadContainer}>
                            <div className={styles.uploadBox}>
                                <div className={styles.uploadSide}>
                                    <Image
                                        src={"/assets/icons/passport.png"}
                                        alt="Passport"
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <span>Passport</span>
                                </div>
                                <label className={styles.uploadArea} htmlFor="passportUpload">
                                    {passport ? (
                                        <Image
                                            src={passport}
                                            alt="Passport Preview"
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
                                        id="passportUpload"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'passport')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.buttonContainer} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <BackButton onClick={handleBack} className={styles.buttons} >Back</BackButton>
                    <NextButton onClick={handleNext} className={styles.buttons} >Next</NextButton>
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