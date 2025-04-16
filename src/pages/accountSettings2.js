import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AccountSettings2.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import accountSttingsIcon from '../../public/assets/icons/accountSettings.png';
import RegistrationCompletePopup from '../components/RegistrationCompletePopup';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import Spinner from '../components/Spinner';

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
    const [state, setState] = useState('');
    const [selectedIdType, setSelectedIdType] = useState('id');
    const [showPopup, setShowPopup] = useState(false);
    const [isRouterReady, setIsRouterReady] = useState(false);

    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);
    const [passport, setPassport] = useState(null);
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const [passportPreview, setPassportPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
            console.log("Router is ready with query params:", router.query);
            
            // Set default values from query parameters if they exist
            if (router.query.accountType) {
                console.log("Setting accountType from query:", router.query.accountType);
            }
            if (router.query.language) {
                console.log("Setting language from query:", router.query.language);
            }
            if (router.query.currency) {
                console.log("Setting currency from query:", router.query.currency);
            }
            if (router.query.deliveryCountry) {
                console.log("Setting deliveryCountry from query:", router.query.deliveryCountry);
            }
        }
    }, [router.isReady, router.query]);

    const handleFileUpload = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            if (side === 'front') {
                setFront(file);
                setFrontPreview(URL.createObjectURL(file));
                console.log("Front ID image set:", file.name);
            } else if (side === 'back') {
                setBack(file);
                setBackPreview(URL.createObjectURL(file));
                console.log("Back ID image set:", file.name);
            } else if (side === 'passport') {
                setPassport(file);
                setPassportPreview(URL.createObjectURL(file));
                console.log("Passport image set:", file.name);
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
        if (!isRouterReady) {
            console.log("Router not ready yet, waiting for query params");
            return;
        }

        console.log("Sending data:", {
            email,
            accountType,
            language,
            currency,
            deliveryCountry,
            firstName,
            lastName,
            dateOfBirth,
            zipCode,
            city,
            country,
            street,
            selectedIdType,
            state
        });


        const token = localStorage.getItem('token');
        const formData = new FormData();    
        formData.append('email', email || '');    
        formData.append('first_name', firstName || '');    
        formData.append('last_name', lastName || '');    
        formData.append('date_of_birth', dateOfBirth || '');    
        formData.append('zip_code', zipCode || '');    
        formData.append('city', city || '');    
        formData.append('state', state || '');    
        formData.append('country', country || '');    
        formData.append('account_type', accountType || '');    
        formData.append('address_suffix', addressSuffix || '');    
        formData.append('street', street || '');    
        formData.append('default_language', language || '');    
        formData.append('currency', currency || '');    
        formData.append('shipping_country', deliveryCountry || ''); 
               
        
        if (selectedIdType === 'id') {
            console.log("ID type is 'id'");
    
            if (!front || !back) {
                console.log("Error: Missing front or back ID image");
                alert('Please upload both front and back images for ID.');
                return;
            }
    
            if (front instanceof File) {
                formData.append('driver_license_picture_front', front);
                console.log("Front ID image added:", front.name);
            } else {
                console.log("Front ID image is not a File object:", front);
            }
    
            if (back instanceof File) {
                formData.append('driver_license_picture_back', back);
                console.log("Back ID image added:", back.name);
            } else {
                console.log("Back ID image is not a File object:", back);
            }
        } else {
            console.log("ID type is not 'id', assuming passport");
    
            if (!passport) {
                console.log("Error: Missing passport image");
                alert('Please upload passport image.');
                return;
            }
    
            if (passport instanceof File) {
                formData.append('passport_picture', passport);
                console.log("Passport image added:", passport.name);
            } else {
                console.log("Passport image is not a File object:", passport);
            }
        }
    
        console.log("Final FormData contents:", formData);
    
        try {
            console.log("Starting API request...");
            setLoading(true)
            setError('')
            const response = await fetch('/api/profileApi', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
            setLoading(false)
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
                            <label style={{ fontFamily: 'Poppins', fontWeight: 500 }}>State</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
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
                                    {frontPreview ? (
                                        <Image
                                            src={frontPreview}
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
                                    <span style={{fontFamily: 'Poppins', fontWeight: 400}}>Select file</span>

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
                                    {backPreview ? (
                                        <Image
                                            src={backPreview}
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
                                            <span style={{fontFamily: 'Poppins', fontWeight: 400}}>Select file</span>
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
                                    {passportPreview ? (
                                        <Image
                                            src={passportPreview}
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
                                            <span style={{fontFamily: 'Poppins', fontWeight: 400}}>Select file</span>
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
                    <NextButton onClick={handleNext} className={styles.buttons} >
                    {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Spinner size="small" />
                        </div>
                    ) : (
                        "Next"
                    )}
                    </NextButton>
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