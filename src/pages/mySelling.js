import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './mySelling.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SoldCardPending from '../components/SoldCardPending';
import SoldCardInprogress from '../components/SoldCardInprogress';
import SoldCardCompleted from '../components/SoldCardCompleted';
import { MySellingInProgressDetails } from '../components/MySellingInProgressDetails';
import MyOpenWatch from '../components/MyOpenWatch';
import MyEndedWatch from '../components/MyEndedWatch';

const MySelling = () => {
    const [bottomTabIndex, setBottomTabIndex] = useState(1);
    const [newIndex, setNewIndex] = useState(0);
    const [detailsContentIndex, setDetailsContentIndex] = useState(0);
    const [selectedCertifications, setSelectedCertifications] = useState(['Display Back']);
    const [selectedClaspType, setSelectedClaspType] = useState('Buckle');
    const [selectedCaliberCerts, setSelectedCaliberCerts] = useState(['Genevian Seal']);
    const [selectedDialFormat, setSelectedDialFormat] = useState('Arabic Numerals');
    const [selectedFunctions, setSelectedFunctions] = useState(['Date', 'Weekday']);
    const [manufacturerWarrantyType, setManufacturerWarrantyType] = useState('date'); // 'date' or 'years'
    const [sellerWarrantyType, setSellerWarrantyType] = useState('date'); // 'date' or 'years'
    const [noManufacturerWarranty, setNoManufacturerWarranty] = useState(false);
    const [noSellerWarranty, setNoSellerWarranty] = useState(true);
    const [selectedBox, setSelectedBox] = useState('Original Box');
    const [selectedPapers, setSelectedPapers] = useState(['Original Manual', 'Original Warrranty Card']);
    const [selectedReactivation, setSelectedReactivation] = useState('none');
    const [isInstantStart, setIsInstantStart] = useState(true);
    const [isMaximumEnd, setIsMaximumEnd] = useState(true);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(['Bank payment']);
    const [selectedAvailability, setSelectedAvailability] = useState('Ready for delivery in 3-5 workdays');
    const [selectedDelivery, setSelectedDelivery] = useState('Mandatory: Shipping domestic');
    const [selectedBoosterLevel, setSelectedBoosterLevel] = useState('Level 1');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [sellingStatus, setSellingStatus] = useState('pending');
    const [selectedCard, setSelectedCard] = useState(null); // New state

    const router = useRouter();



    const pendingSelling = [
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            email: 'xyz@gmail.com',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            email: 'xyz@gmail.com',
            sellerName: 'John Doe'
        },
    ];


    const OpenWatches = [
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
    ];
    const EndedWatch = [
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
        {
            image: '/assets/watches/w9.png',
            name: 'Rolex Datejust Oyster 41mm in very good condition',
            price: 1335.00,
            date: '10.11.2022, 12:14',
            buyBid: 'chg 1400',
            sellerName: 'John Doe'
        },
    ];

    const handleListingComplete = () => {
        setShowSuccessPopup(true);
    };

    const handleSellNow = (card) => {
        setSelectedCard(card);
    };

    const handleNewProduct = () => {
        // Reset all states
        setNewIndex(1);
        setSelectedBox('Original Box');
        setSelectedPapers([]);
        setSelectedPaymentMethods(['Bank payment']);
        setSelectedAvailability('Ready for delivery in 3-5 workdays');
        setSelectedDelivery('Mandatory: Shipping domestic');
        setSelectedBoosterLevel('Level 1');
        setIsInstantStart(true);
        setIsMaximumEnd(true);
        setSelectedReactivation('none');
        // ... reset other states as needed

        // Close popup and navigate
        setShowSuccessPopup(false);
        router.push('/dashboard');
    };



    const toggleCertification = (cert) => {
        setSelectedCertifications(prev =>
            prev.includes(cert)
                ? prev.filter(c => c !== cert)
                : [...prev, cert]
        );
    };
    const toggleCaliberCert = (cert) => {
        setSelectedCaliberCerts(prev =>
            prev.includes(cert)
                ? prev.filter(c => c !== cert)
                : [...prev, cert]
        );
    };

    const toggleFunction = (func) => {
        setSelectedFunctions(prev =>
            prev.includes(func)
                ? prev.filter(f => f !== func)
                : [...prev, func]
        );
    };

    const handlePhotoUpload = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the file upload here
            console.log(`Uploading file for ${id}:`, file);
            // You might want to add preview functionality
            // and actual upload logic here
        }
    };

    const togglePaper = (paper) => {
        setSelectedPapers(prev =>
            prev.includes(paper)
                ? prev.filter(p => p !== paper)
                : [...prev, paper]
        );
    };

    const togglePaymentMethod = (method) => {
        setSelectedPaymentMethods(prev =>
            prev.includes(method)
                ? prev.filter(m => m !== method)
                : [...prev, method]
        );
    };
    return (
        <DashboardLayout>
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className={styles.searchInput}
                            />
                            <button className={styles.searchButton}>
                                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.iconsContainer}>
                        <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>

                <div className={styles.bottomTabBG}>
                    <button
                        onClick={() => setBottomTabIndex(1)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 1 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/new.png" alt="New" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>New</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 4 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(2)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 2 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/open.png" alt="Open" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>Open</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 1 || bottomTabIndex === 3 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(3)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 3 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/ended.png" alt="Ended" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>Ended</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 2 || bottomTabIndex === 4 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(4)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 4 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/sold.png" alt="Sold" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>Sold</span>
                    </button>
                </div>

                {bottomTabIndex === 1 &&
                    <>
                        {newIndex === 0 &&
                            <div className={styles.listFreeContainer}>
                                <h1 className={styles.listFreeTitle}>LIST FREE OF CHARGE</h1>
                                <p className={styles.timeText}>You need 3 minutes!</p>

                                <div className={styles.formContainer}>
                                    <input
                                        type="text"
                                        placeholder="Reference number"
                                        className={styles.referenceInput}
                                    />
                                    <p className={styles.helperText}>
                                        Start by entering the reference number.
                                    </p>
                                    <p className={styles.infoText}>
                                        You can find the reference number in your watch documents, e.g. on the warranty card of the watch.
                                    </p>

                                    <button
                                        className={styles.nextButton}
                                        onClick={() => setNewIndex(1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }

                        {newIndex === 1 && (
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>1. Basic Data</h2>
                                <p className={styles.mandatoryText}>3 open mandatory fields</p>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Type of Watch*</label>
                                        <select className={styles.formSelect}>
                                            <option>Wrist watch</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Gender*</label>
                                        <select className={styles.formSelect}>
                                            <option>Men/Unisex</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Reference number</label>
                                        <input type="text" className={styles.formInput} />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Brand*</label>
                                        <select className={styles.formSelect}>
                                            <option>Rolex</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Modell*</label>
                                        <input type="text" className={styles.formInput} value="Daytona" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Nickname</label>
                                        <input type="text" className={styles.formInput} value="White Panda 2017" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Listing Title (automatically generated)</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value="Rolex Daytona White Panda 2017"
                                            disabled
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Subtitle</label>
                                        <div className={styles.subtitleContainer}>
                                            <input
                                                type="text"
                                                className={styles.formInput}
                                                value="very good condition / incl. box"
                                            />
                                            <span className={styles.charCount}>30/30</span>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Movement*</label>
                                        <select className={styles.formSelect}>
                                            <option>Automatic</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Age/year of sale to first owner</label>
                                        <div className={styles.yearContainer}>
                                            <select className={styles.yearSelect}>
                                                <option>2016</option>
                                            </select>
                                            <label className={styles.checkboxLabel}>
                                                <input type="checkbox" /> unknown
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Diameter</label>
                                        <div className={styles.diameterContainer}>
                                            <input type="text" className={styles.formInput} value="41.5" />
                                            <span className={styles.unit}>mm</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(0)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(2)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}


                        {newIndex === 2 && (
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>2. Details</h2>
                                <p className={styles.mandatoryText}>More details - More value!</p>

                                <div className={styles.detailsContentNav}>
                                    <button
                                        className={`${styles.detailsNavButton} ${detailsContentIndex === 0 ? styles.activeDetailsNav : ''}`}
                                        onClick={() => setDetailsContentIndex(0)}
                                    >
                                        <Image src="/assets/WatchDetails/case.png" alt="Case" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        <span>Case</span>
                                    </button>
                                    <button
                                        className={`${styles.detailsNavButton} ${detailsContentIndex === 1 ? styles.activeDetailsNav : ''}`}
                                        onClick={() => setDetailsContentIndex(1)}
                                    >
                                        <Image src="/assets/WatchDetails/bracelet.png" alt="Bracelet" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        <span>Bracelet</span>
                                    </button>
                                    <button
                                        className={`${styles.detailsNavButton} ${detailsContentIndex === 2 ? styles.activeDetailsNav : ''}`}
                                        onClick={() => setDetailsContentIndex(2)}
                                    >
                                        <Image src="/assets/WatchDetails/movement.png" alt="Movement" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        <span>Movement</span>
                                    </button>
                                    <button
                                        className={`${styles.detailsNavButton} ${detailsContentIndex === 3 ? styles.activeDetailsNav : ''}`}
                                        onClick={() => setDetailsContentIndex(3)}
                                    >
                                        <Image src="/assets/WatchDetails/dial.png" alt="Dial" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        <span>Dial</span>
                                    </button>
                                    <button
                                        className={`${styles.detailsNavButton} ${detailsContentIndex === 4 ? styles.activeDetailsNav : ''}`}
                                        onClick={() => setDetailsContentIndex(4)}
                                    >
                                        <Image src="/assets/WatchDetails/functions.png" alt="Functions" width={80} height={80} style={{ objectFit: 'contain' }} />
                                        <span>Functions</span>
                                    </button>
                                </div>

                                {detailsContentIndex == 0 &&
                                    <>

                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label>Diameter</label>
                                                <div className={styles.diameterContainer}>
                                                    <input type="text" className={styles.formInput} value="41.5" />
                                                    <span className={styles.unit}>mm</span>
                                                </div>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Height</label>
                                                <div className={styles.diameterContainer}>
                                                    <input type="text" className={styles.formInput} value="12.5" />
                                                    <span className={styles.unit}>mm</span>
                                                </div>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Case Material</label>
                                                <select className={styles.formSelect}>
                                                    <option>Please select</option>
                                                </select>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Bezel material</label>
                                                <select className={styles.formSelect}>
                                                    <option>Please select</option>
                                                </select>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Crystal</label>
                                                <select className={styles.formSelect}>
                                                    <option>Please select</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.certificationsSection}>
                                            <label>Certifications Select plant</label>
                                            <div className={styles.certificationsButtons}>
                                                <button
                                                    className={`${styles.certButton} ${selectedCertifications.includes('Display Back') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCertification('Display Back')}
                                                >
                                                    Display Back
                                                </button>
                                                <button
                                                    className={`${styles.certButton} ${selectedCertifications.includes('PVD/DLC coating') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCertification('PVD/DLC coating')}
                                                >
                                                    PVD/DLC coating
                                                </button>
                                                <button
                                                    className={`${styles.certButton} ${selectedCertifications.includes('Gemstones and/or diamonds') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCertification('Gemstones and/or diamonds')}
                                                >
                                                    Gemstones and/or diamonds
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }

                                {detailsContentIndex == 1 &&
                                    <>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label>Clasp Material</label>
                                                <select className={styles.formSelect}>
                                                    <option>Please select</option>
                                                </select>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Bracelet Material</label>
                                                <select className={styles.formSelect}>
                                                    <option>Please select</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.claspTypeSection}>
                                            <label>Clasp Type</label>
                                            <div className={styles.claspTypeButtons}>
                                                <button
                                                    className={`${styles.claspButton} ${selectedClaspType === 'Buckle' ? styles.activeClaspType : ''}`}
                                                    onClick={() => setSelectedClaspType('Buckle')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/buckle.png"
                                                        alt="Buckle"
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <span>Buckle</span>
                                                </button>
                                                <button
                                                    className={`${styles.claspButton} ${selectedClaspType === 'Fold Clasp 1' ? styles.activeClaspType : ''}`}
                                                    onClick={() => setSelectedClaspType('Fold Clasp 1')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/foldClasp.png"
                                                        alt="Fold Clasp"
                                                        width={80}
                                                        height={60}
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                    <span>Fold Clasp</span>
                                                </button>
                                                <button
                                                    className={`${styles.claspButton} ${selectedClaspType === 'Fold Clasp 2' ? styles.activeClaspType : ''}`}
                                                    onClick={() => setSelectedClaspType('Fold Clasp 2')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/foldClasp2.png"
                                                        alt="Fold Clasp"
                                                        width={80}
                                                        height={60}
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                    <span>Fold Clasp</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }

                                {detailsContentIndex == 2 &&
                                    <>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label>Movement</label>
                                                <select className={styles.formSelect}>
                                                    <option>Automatic</option>
                                                </select>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Caliber</label>
                                                <div className={styles.caliberContainer}>
                                                    <input
                                                        type="text"
                                                        className={styles.formInput}
                                                        value="MT5813"
                                                    />
                                                    <span className={styles.caliberDate}>06/20</span>
                                                </div>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label>Power Reserve</label>
                                                <div className={styles.powerReserveContainer}>
                                                    <input
                                                        type="text"
                                                        className={styles.formInput}
                                                        value="72"
                                                    />
                                                    <span className={styles.unit}>h</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.certificationCaliberSection}>
                                            <label>Certification Caliber</label>
                                            <div className={styles.certificationButtons}>
                                                <button
                                                    className={`${styles.certButton} ${selectedCaliberCerts.includes('Genevian Seal') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCaliberCert('Genevian Seal')}
                                                >
                                                    Genevian Seal
                                                </button>
                                                <button
                                                    className={`${styles.certButton} ${selectedCaliberCerts.includes('Chronometer') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCaliberCert('Chronometer')}
                                                >
                                                    Chronometer
                                                </button>
                                                <button
                                                    className={`${styles.certButton} ${selectedCaliberCerts.includes('Master Chronometer') ? styles.activeCert : ''}`}
                                                    onClick={() => toggleCaliberCert('Master Chronometer')}
                                                >
                                                    Master Chronometer
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }

                                {detailsContentIndex == 3 &&
                                    <>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label>Dial Color</label>
                                                <select className={styles.formSelect}>
                                                    <option>select</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.dialFormatSection}>
                                            <label>Dial format</label>
                                            <div className={styles.dialFormatGrid}>
                                                <button
                                                    className={`${styles.dialFormatButton} ${selectedDialFormat === 'Arabic Numerals' ? styles.activeDialFormat : ''}`}
                                                    onClick={() => setSelectedDialFormat('Arabic Numerals')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/arabic.png"
                                                        alt="Arabic Numerals"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <span>Arabic Numerals</span>
                                                </button>

                                                <button
                                                    className={`${styles.dialFormatButton} ${selectedDialFormat === 'Roman Numerals' ? styles.activeDialFormat : ''}`}
                                                    onClick={() => setSelectedDialFormat('Roman Numerals')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/roman.png"
                                                        alt="Roman Numerals"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <span>Roman Numerals</span>
                                                </button>

                                                <button
                                                    className={`${styles.dialFormatButton} ${selectedDialFormat === 'No Numerals' ? styles.activeDialFormat : ''}`}
                                                    onClick={() => setSelectedDialFormat('No Numerals')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/no.png"
                                                        alt="No Numerals"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <span>No Numerals</span>
                                                </button>

                                                <button
                                                    className={`${styles.dialFormatButton} ${selectedDialFormat === 'not specified' ? styles.activeDialFormat : ''}`}
                                                    onClick={() => setSelectedDialFormat('not specified')}
                                                >
                                                    <Image
                                                        src="/assets/WatchDetails/not.png"
                                                        alt="not specified"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <span>not specified</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }
                                {detailsContentIndex == 4 &&
                                    <>
                                        <div className={styles.functionsSection}>
                                            <h3 className={styles.functionsTitle}>Select functions of the watch</h3>
                                            <div className={styles.functionsGrid}>
                                                {[
                                                    'Date', 'Tourbillon', 'Minute Repeater',
                                                    'Moon phase', 'Month', 'Weekday',
                                                    'Chronograph', 'Tachymeter', 'Equation of time',
                                                    'Chiming clock', 'Alarm', 'Annual Calendar',
                                                    'Repeater', '4-Year Calendar',
                                                    'GMT', 'Perpetual Calendar',
                                                    'Flyback', 'Double chronograph',
                                                    'Panorama Date',
                                                    'Jumping Hour'
                                                ].map((func) => (
                                                    <button
                                                        key={func}
                                                        className={`${styles.functionButton} ${selectedFunctions.includes(func) ? styles.activeFunction : ''}`}
                                                        onClick={() => toggleFunction(func)}
                                                    >
                                                        {func}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(1)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(3)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {newIndex === 3 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>3. Photos</h2>
                                <p className={styles.mandatoryText}>Upload photos to increase attractiveness</p>

                                <div className={styles.photosSection}>
                                    <h3 className={styles.photosSectionTitle}>Photos of the watch</h3>
                                    <div className={styles.photosGrid}>
                                        {[
                                            { id: 'cover', label: 'Cover', icon: '/assets/WatchDetails/cover.png' },
                                            { id: 'back', label: 'Back', icon: '/assets/WatchDetails/back.png' },
                                            { id: 'wristshot', label: 'Wristshot', icon: '/assets/WatchDetails/wristshot.png' },
                                            { id: 'defects', label: 'Defects', icon: '/assets/WatchDetails/defects.png' },
                                            { id: 'side1', label: 'Side 1', icon: '/assets/WatchDetails/side1.png' },
                                            { id: 'side2', label: 'Side 2', icon: '/assets/WatchDetails/side2.png' },
                                            { id: 'more1', label: 'More', icon: '/assets/WatchDetails/more.png' },
                                            { id: 'more2', label: 'More', icon: '/assets/WatchDetails/more.png' }
                                        ].map((item) => (
                                            <div key={item.id} className={styles.photoUploadBox}>
                                                <input
                                                    type="file"
                                                    id={item.id}
                                                    accept="image/*"
                                                    className={styles.hiddenInput}
                                                    onChange={(e) => handlePhotoUpload(e, item.id)}
                                                />
                                                <label htmlFor={item.id} className={styles.uploadLabel}>
                                                    <Image src={item.icon} alt={item.label} width={80} height={120} style={{ objectFit: 'contain' }} />
                                                    <span>{item.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.accessoriesSection}>
                                    <h3 className={styles.photosSectionTitle}>Accessories photos</h3>
                                    <div className={styles.photosGrid}>
                                        {[
                                            { id: 'box-outside', label: 'Box outside', icon: '/assets/WatchDetails/boxoutside.png' },
                                            { id: 'box-inside', label: 'Box inside', icon: '/assets/WatchDetails/boxinside.png' },
                                            { id: 'papers', label: 'Papers', icon: '/assets/WatchDetails/papers.png' },
                                            { id: 'more3', label: 'More', icon: '/assets/WatchDetails/more.png' },
                                            { id: 'more4', label: 'More', icon: '/assets/WatchDetails/more.png' },
                                            { id: 'more5', label: 'More', icon: '/assets/WatchDetails/more.png' }
                                        ].map((item) => (
                                            <div key={item.id} className={styles.photoUploadBox}>
                                                <input
                                                    type="file"
                                                    id={item.id}
                                                    accept="image/*"
                                                    className={styles.hiddenInput}
                                                    onChange={(e) => handlePhotoUpload(e, item.id)}
                                                />
                                                <label htmlFor={item.id} className={styles.uploadLabel}>
                                                    <Image src={item.icon} alt={item.label} width={80} height={120} style={{ objectFit: 'contain' }} />
                                                    <span>{item.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(2)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(4)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }

                        {newIndex === 4 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>4. Condition</h2>
                                <p className={styles.mandatoryText}>5 open mandatory fields</p>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Condition*</label>
                                        <select className={styles.formSelect}>
                                            <option>used</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.warrantySection}>
                                    <div className={styles.warrantyGroup}>
                                        <label>Manufacturer warranty until*</label>
                                        <div className={styles.warrantyInputGroup}>
                                            <input
                                                type="text"
                                                className={styles.formInput}
                                                value="01.01.2025"
                                                disabled={noManufacturerWarranty}
                                            />
                                            <span className={styles.orText}>or</span>
                                            <input
                                                type="number"
                                                className={`${styles.formInput} ${styles.yearInput}`}
                                                placeholder="Years"
                                                disabled={noManufacturerWarranty}
                                            />
                                            <span className={styles.yearText}>Years after the sale here</span>
                                        </div>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={noManufacturerWarranty}
                                                onChange={(e) => setNoManufacturerWarranty(e.target.checked)}
                                            />
                                            <span>No warranty of manufacturer</span>
                                        </label>
                                    </div>

                                    <div className={styles.warrantyGroup}>
                                        <label>Warranty of me until*</label>
                                        <div className={styles.warrantyInputGroup}>
                                            <input
                                                type="text"
                                                className={styles.formInput}
                                                disabled={noSellerWarranty}
                                            />
                                            <span className={styles.orText}>or</span>
                                            <input
                                                type="number"
                                                className={`${styles.formInput} ${styles.yearInput}`}
                                                placeholder="Years"
                                                disabled={noSellerWarranty}
                                            />
                                            <span className={styles.yearText}>Years after sale here</span>
                                        </div>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={noSellerWarranty}
                                                onChange={(e) => setNoSellerWarranty(e.target.checked)}
                                            />
                                            <span>no warranty from the seller</span>
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.descriptionSection}>
                                    <label>Description</label>
                                    <textarea
                                        className={styles.descriptionInput}
                                        value="Rolex Daytona Ceramic 116500LN White Panda, 2017, as new.The watch comes with box and papers. Manufacturer warranty is still valid until 2025."
                                        rows={6}
                                    />
                                    <div className={styles.descriptionFooter}>
                                        <div className={styles.descriptionTools}>
                                            <button className={styles.toolButton}>B</button>
                                            <button className={styles.toolButton}>I</button>
                                            <button className={styles.toolButton}>≡</button>
                                        </div>
                                        <span className={styles.characterCount}>143/22000</span>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(3)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(5)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }


                        {newIndex === 5 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>5. Scope of Delivery</h2>
                                <p className={styles.mandatoryText}>1 open mandatory field</p>

                                <div className={styles.scopeSection}>
                                    <p className={styles.scopeInstructions}>
                                        Specify here what you are supplying in addition to the watch.
                                    </p>

                                    <div className={styles.boxSection}>
                                        <label>Box*</label>
                                        <div className={styles.boxOptions}>
                                            <button
                                                className={`${styles.scopeButton} ${selectedBox === 'Original Box' ? styles.activeScope : ''}`}
                                                onClick={() => setSelectedBox('Original Box')}
                                            >
                                                Original Box
                                            </button>
                                            <button
                                                className={`${styles.scopeButton} ${selectedBox === 'No Box' ? styles.activeScope : ''}`}
                                                onClick={() => setSelectedBox('No Box')}
                                            >
                                                No Box
                                            </button>
                                            <button
                                                className={`${styles.scopeButton} ${selectedBox === 'Not Original Box' ? styles.activeScope : ''}`}
                                                onClick={() => setSelectedBox('Not Original Box')}
                                            >
                                                Not Original Box
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.papersSection}>
                                        <label>Papers*</label>
                                        <div className={styles.papersOptions}>
                                            <button
                                                className={`${styles.scopeButton} ${selectedPapers.includes('Original Manual') ? styles.activeScope : ''}`}
                                                onClick={() => togglePaper('Original Manual')}
                                            >
                                                Original Manual
                                            </button>
                                            <button
                                                className={`${styles.scopeButton} ${selectedPapers.includes('Original Warrranty Card') ? styles.activeScope : ''}`}
                                                onClick={() => togglePaper('Original Warrranty Card')}
                                            >
                                                Original Warrranty Card
                                            </button>
                                            <button
                                                className={`${styles.scopeButton} ${selectedPapers.includes('Receipt from initial purchase') ? styles.activeScope : ''}`}
                                                onClick={() => togglePaper('Receipt from initial purchase')}
                                            >
                                                Receipt from initial purchase
                                            </button>
                                            <button
                                                className={`${styles.scopeButton} ${selectedPapers.includes('Receipt from my purchase') ? styles.activeScope : ''}`}
                                                onClick={() => togglePaper('Receipt from my purchase')}
                                            >
                                                Receipt from my purchase
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.scopeDescriptionSection}>
                                        <label>Description of the scope of delivery</label>
                                        <textarea
                                            className={styles.scopeDescriptionInput}
                                            value="Watch, box and warranty card from Rolex. In addition, a cleaning kit is supplied."
                                            rows={6}
                                        />
                                        <div className={styles.characterCounter}>84/200</div>
                                    </div>
                                </div>


                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(4)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(6)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }

                        {newIndex === 6 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>6. Offer</h2>
                                <p className={styles.mandatoryText}>1 open mandatory field</p>

                                <div className={styles.offerSection}>
                                    <p className={styles.offerInstructions}>
                                        Specify here in which currency you want to receive the money in case of a sale.
                                    </p>

                                    <div className={styles.currencyPriceGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Currency*</label>
                                            <select className={styles.formSelect}>
                                                <option>select</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Fixed Price*</label>
                                            <div className={styles.priceInputGroup}>
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    value="25'000.00"
                                                />
                                                <span className={styles.currencyLabel}>CHF</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={styles.priceNote}>
                                        Sales price must include a standard delivery (national).
                                    </p>

                                    <div className={styles.timingSection}>
                                        <div className={styles.startGroup}>
                                            <label>Start*</label>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={isInstantStart}
                                                    onChange={(e) => setIsInstantStart(e.target.checked)}
                                                />
                                                <span>instant</span>
                                            </label>
                                            <div className={styles.dateTimeGroup}>
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    value="25.10.2023"
                                                />
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    value="22:25 Uhr"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.endGroup}>
                                            <label>End*</label>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={isMaximumEnd}
                                                    onChange={(e) => setIsMaximumEnd(e.target.checked)}
                                                />
                                                <span>maximum (15 days)</span>
                                            </label>
                                            <div className={styles.dateTimeGroup}>
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    value="07.11.2023"
                                                />
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    value="22:25 Uhr"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.reactivationSection}>
                                        <label>Automatic Reactivation</label>
                                        <div className={styles.reactivationOptions}>
                                            {['none', '1 Mal', '2 Mal', '3 Mal', '4 Mal', '5 Mal'].map((option) => (
                                                <button
                                                    key={option}
                                                    className={`${styles.reactivationButton} ${selectedReactivation === option ? styles.activeReactivation : ''}`}
                                                    onClick={() => setSelectedReactivation(option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(5)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(7)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }

                        {newIndex === 7 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>7. Payment and Delivery</h2>
                                <p className={styles.mandatoryText}>3 open mandatory fields</p>
                                <div className={styles.paymentDeliverySection}>
                                    <div className={styles.methodsSection}>
                                        <label>Accepted payment methods*</label>
                                        <div className={styles.methodsOptions}>
                                            <button
                                                className={`${styles.methodButton} ${selectedPaymentMethods.includes('Cash payment upon collection') ? styles.activeMethod : ''}`}
                                                onClick={() => togglePaymentMethod('Cash payment upon collection')}
                                            >
                                                Cash payment upon collection
                                            </button>
                                            <button
                                                className={`${styles.methodButton} ${selectedPaymentMethods.includes('Bank payment') ? styles.activeMethod : ''}`}
                                                onClick={() => togglePaymentMethod('Bank payment')}
                                            >
                                                Bank payment
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.availabilitySection}>
                                        <label>Availability*</label>
                                        <div className={styles.availabilityOptions}>
                                            <button
                                                className={`${styles.availabilityButton} ${selectedAvailability === 'Instant ready for delivery' ? styles.activeAvailability : ''}`}
                                                onClick={() => setSelectedAvailability('Instant ready for delivery')}
                                            >
                                                Instant ready for delivery
                                            </button>
                                            <button
                                                className={`${styles.availabilityButton} ${selectedAvailability === 'Ready for delivery in 3-5 workdays' ? styles.activeAvailability : ''}`}
                                                onClick={() => setSelectedAvailability('Ready for delivery in 3-5 workdays')}
                                            >
                                                Ready for delivery in 3-5 workdays
                                            </button>
                                            <button
                                                className={`${styles.availabilityButton} ${selectedAvailability === 'Ready for delivery in 6-10 workdays' ? styles.activeAvailability : ''}`}
                                                onClick={() => setSelectedAvailability('Ready for delivery in 6-10 workdays')}
                                            >
                                                Ready for delivery in 6-10 workdays
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.deliverySection}>
                                        <label>Delivery / Pickup</label>
                                        <div className={styles.deliveryOptions}>
                                            <button
                                                className={`${styles.deliveryButton} ${selectedDelivery === 'Mandatory: Shipping domestic' ? styles.activeDelivery : ''}`}
                                                onClick={() => setSelectedDelivery('Mandatory: Shipping domestic')}
                                            >
                                                Mandatory: Shipping domestic
                                            </button>
                                            <button
                                                className={`${styles.deliveryButton} ${selectedDelivery === 'Pick up at my address' ? styles.activeDelivery : ''}`}
                                                onClick={() => setSelectedDelivery('Pick up at my address')}
                                            >
                                                Pick up at my address
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(6)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={() => setNewIndex(8)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }

                        {newIndex === 8 &&
                            <div className={styles.basicDataContainer}>
                                <h2 className={styles.sectionTitle}>8. Booster</h2>
                                <p className={styles.mandatoryText}>Increase the visibility of your offer</p>

                                <div className={styles.boosterSection}>
                                    <div className={`${styles.boosterCard} ${selectedBoosterLevel === 'Level 1' ? styles.activeBooster : ''}`}
                                        onClick={() => setSelectedBoosterLevel('Level 1')}>
                                        <div className={styles.boosterHeader}>
                                            <Image
                                                src="/assets/WatchDetails/level1.png"
                                                alt="Level 1"
                                                width={60}
                                                height={60}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            <h3>Level 1</h3>
                                        </div>
                                        <div className={styles.boosterFeatures}>
                                            <div className={styles.feature}>
                                                <span>✓</span> In Watch Swiper
                                            </div>
                                            <div className={styles.feature}>
                                                <span>✓</span> In search results
                                            </div>
                                        </div>
                                        <div className={styles.boosterPrice}>Free!</div>
                                    </div>

                                    <div className={`${styles.boosterCard} ${selectedBoosterLevel === 'Level 2' ? styles.activeBooster : ''}`}
                                        onClick={() => setSelectedBoosterLevel('Level 2')}>
                                        <div className={styles.boosterHeader}>
                                            <Image
                                                src="/assets/WatchDetails/level2.png"
                                                alt="Level 2"
                                                width={60}
                                                height={60}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            <h3>Level 2</h3>
                                        </div>
                                        <div className={styles.boosterFeatures}>
                                            <p>Level 1 + additional:</p>
                                            <div className={styles.feature}>
                                                <span>✓</span> On the home page
                                            </div>
                                            <div className={styles.feature}>
                                                <span>✓</span> As top search result
                                            </div>
                                        </div>
                                        <div className={styles.boosterPrice}>CHF 100.-</div>
                                        <p className={styles.boosterNote}>
                                            Pay the booster only if your listing has more than 2000 views.
                                        </p>
                                    </div>

                                    <div className={`${styles.boosterCard} ${selectedBoosterLevel === 'Level 3' ? styles.activeBooster : ''}`}
                                        onClick={() => setSelectedBoosterLevel('Level 3')}>
                                        <div className={styles.boosterHeader}>
                                            <Image
                                                src="/assets/WatchDetails/level3.png"
                                                alt="Level 3"
                                                width={60}
                                                height={60}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            <h3>Level 3</h3>
                                        </div>
                                        <div className={styles.boosterFeatures}>
                                            <p>Level 2 + additional:</p>
                                            <div className={styles.feature}>
                                                <span>✓</span> In personalized emails
                                            </div>
                                        </div>
                                        <div className={styles.boosterPrice}>CHF 250.-</div>
                                        <p className={styles.boosterNote}>
                                            Pay only if you sell the watch here or you end the listing.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.backButtonBasicData}
                                        onClick={() => setNewIndex(7)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={styles.nextButtonBasicData}
                                        onClick={handleListingComplete}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }
                    </>
                }
                {bottomTabIndex === 2 &&
                    // <div className={styles.noWatches}>
                    <div className={styles.sellingGridEndwatch}>
                        {OpenWatches.map((purchase, index) => (
                            <MyOpenWatch
                                key={index}
                                image={purchase.image}
                                name={purchase.name}
                                price={purchase.price}
                                date={purchase.date}
                                email={purchase.email}
                                sellerName={purchase.sellerName}
                            />
                        ))}
                    </div>
                    // </div>
                }
                {bottomTabIndex === 3 &&
                    <div className={styles.noWatches}>
                        <div className={styles.sellingGridEndwatch}>
                            {EndedWatch.map((purchase, index) => (
                                <MyEndedWatch
                                    key={index}
                                    image={purchase.image}
                                    name={purchase.name}
                                    price={purchase.price}
                                    date={purchase.date}
                                    email={purchase.email}
                                    sellerName={purchase.sellerName}
                                />
                            ))}
                        </div>
                    </div>
                }
                {bottomTabIndex === 4 &&
                    <>
                        <div className={styles.sellingBar}>
                            <button
                                onClick={() => setSellingStatus('pending')}
                                className={`${styles.sellingStatusButton} ${sellingStatus === 'pending' ? styles.activeStatus : ''}`}>
                                <Image src="/assets/Home/pending.png" alt="Pending" width={24} height={24} className={styles.statusIcon} />
                                <span className={styles.statusText}>Pending</span>
                            </button>
                            <div className={styles.statusLine} />
                            <button
                                onClick={() => setSellingStatus('inProgress')}
                                className={`${styles.sellingStatusButton} ${sellingStatus === 'inProgress' ? styles.activeStatus : ''}`}>
                                <Image src="/assets/Home/inprogress.png" alt="In-Progress" width={24} height={24} className={styles.statusIcon} />
                                <span className={styles.statusText}>In-Progress</span>
                            </button>
                            <div className={styles.statusLine} />
                            <button
                                onClick={() => setSellingStatus('completed')}
                                className={`${styles.sellingStatusButton} ${sellingStatus === 'completed' ? styles.activeStatus : ''}`}>
                                <Image src="/assets/Home/completed.png" alt="Completed" width={24} height={24} className={styles.statusIcon} />
                                <span className={styles.statusText}>Completed</span>
                            </button>
                        </div>

                        {sellingStatus === 'pending' && (
                            <div className={styles.sellingGrid}>
                                {pendingSelling.map((purchase, index) => (
                                    <SoldCardPending
                                        key={index}
                                        image={purchase.image}
                                        name={purchase.name}
                                        price={purchase.price}
                                        date={purchase.date}
                                        email={purchase.email}
                                        sellerName={purchase.sellerName}
                                    />
                                ))}
                            </div>
                        )}
                        {/* {sellingStatus === 'inProgress' && (
                            <div className={styles.sellingGrid}>
                                {pendingSelling.map((purchase, index) => (
                                    <SoldCardInprogress
                                        key={index}
                                        image={purchase.image}
                                        name={purchase.name}
                                        price={purchase.price}
                                        date={purchase.date}
                                        email={purchase.email}
                                        sellerName={purchase.sellerName}
                                        showDetails={false}
                                        onSellNow={handleSellNow}
                                    />
                                ))}
                            </div>
                        )} */}
                        {/* In the inProgress section */}
                        {sellingStatus === 'inProgress' && (
                            selectedCard !== null ? (
                                <MySellingInProgressDetails
                                    {...pendingSelling[selectedCard]}
                                    onBack={() => setSelectedCard(null)}
                                />
                            ) : (
                                <div className={styles.sellingGrid}>
                                    {pendingSelling.map((purchase, index) => (
                                        <div key={index} className={styles.gridItem}>
                                            <SoldCardInprogress
                                                {...purchase}
                                                onSellNow={() => setSelectedCard(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                        {sellingStatus === 'completed' && (
                            <div className={styles.sellingGrid}>
                                {pendingSelling.map((purchase, index) => (
                                    <SoldCardCompleted
                                        key={index}
                                        image={purchase.image}
                                        name={purchase.name}
                                        price={purchase.price}
                                        date={purchase.date}
                                        email={purchase.email}
                                        sellerName={purchase.sellerName}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                }
            </div>
            {showSuccessPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowSuccessPopup(false)}
                        >
                            <Image
                                src="/assets/WatchDetails/cross.png"
                                alt="Close"
                                width={24}
                                height={24}
                            />
                        </button>
                        <div className={styles.popupContent}>
                            <h2>Product Listed successfully</h2>
                            <div className={styles.checkIcon}>
                                <Image
                                    src="/assets/WatchDetails/check.png"
                                    alt="Success"
                                    width={80}
                                    height={80}
                                />
                            </div>
                            <button
                                className={styles.listNewButton}
                                onClick={handleNewProduct}
                            >
                                List New Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default MySelling; 