import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './myPromotings.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SoldCardPending from '../components/SoldCardPending';
import SoldCardInprogress from '../components/SoldCardInprogress';
import SoldCardCompleted from '../components/SoldCardCompleted';
import WatchCardMyPromotings from '../components/WatchCardMyPromotings';
import axios from 'axios';

const MyPromotings = () => {
    const [bottomTabIndex, setBottomTabIndex] = useState(1);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [sellingStatus, setSellingStatus] = useState('pending');
    const [promos, setPromos] = useState({ active: [], lost: [], successful: [] });

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await axios.get('https://chronedo.webjerky.com/api/promos', {
                    headers: {
                        'Authorization': 'Bearer 222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88'
                    }
                });
                setPromos(response.data); // No need for response.json()
            } catch (error) {
                console.error('Error fetching promos:', error);
            }
        };
    
        fetchPromos();
    }, []);
    

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

    const watches = [
        {
            image: '/assets/watches/rolexDatejust.png',
            name: 'Rolex Datejust Oyster 41mm',
            price: 8854.00,
            location: 'Switzerland',
            promoterCount: 12,
            sellerCode: 'SELLER-1234',
            active: true,
            sold: false
        },
        {
            image: '/assets/watches/omegaSpeedmaster.png',
            name: 'Omega Speedmaster',
            price: 6500.00,
            location: 'Germany',
            promoterCount: 8,
            sellerCode: 'SELLER-5678',
            active: true,
            sold: false
        },
        {
            image: '/assets/watches/rolexDaydate.png',
            name: 'Rolex Day-Date',
            price: 12500.00,
            location: 'France',
            promoterCount: 15,
            sellerCode: 'SELLER-9012',
            active: true,
            sold: false
        },
        {
            image: '/assets/watches/patekPhilippe.png',
            name: 'Patek Philippe Nautilus',
            price: 35000.00,
            location: 'Italy',
            promoterCount: 20,
            sellerCode: 'SELLER-3456',
            active: true,
            sold: false
        },
    ];

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
                        <Image key="notification-icon" src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image key="cart-icon" src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image key="profile-icon" src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>

                <div className={styles.bottomTabBG}>
                    <button
                        onClick={() => setBottomTabIndex(1)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 1 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/overview1.png" alt="New" width={32} height={32} className={styles.bottomTabImage} style={{ boxFit: 'contain' }} />
                        <span className={styles.bottomTabText}>Overview</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 4 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(2)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 2 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/sold.png" alt="Open" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>Active</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 1 || bottomTabIndex === 3 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(3)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 3 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/ended.png" alt="Ended" width={32} height={32} className={styles.bottomTabImage} />
                        <span className={styles.bottomTabText}>Lost</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 2 || bottomTabIndex === 4 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(4)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 4 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/successful1.png" alt="Sold" width={32} height={32} className={styles.bottomTabImage} style={{ boxFit: 'contain' }} />
                        <span className={styles.bottomTabText}>Successful</span>
                    </button>
                </div>

                {bottomTabIndex === 1 &&
                    <>
                        <div className={styles.statsContainer}>
                            <div className={styles.statsCard}>
                                <h3>Total Promoted Products</h3>
                                <span className={styles.statsNumber}>250</span>
                            </div>
                            <div className={styles.statsCard}>
                                <h3>Total Active Products</h3>
                                <span className={styles.statsNumber}>150</span>
                            </div>
                            <div className={styles.statsCard}>
                                <h3>Total Lost Products</h3>
                                <span className={styles.statsNumber}>50</span>
                            </div>
                            <div className={styles.statsCard}>
                                <h3>Total Successful Products</h3>
                                <span className={styles.statsNumber}>100</span>
                            </div>
                            <div className={styles.statsCard}>
                                <h3>Total Earned Money</h3>
                                <span className={styles.statsNumber}>$500</span>
                            </div>
                        </div>

                        <div className={styles.upgradeSection}>
                            <h2>Upgrade your level</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <button className={styles.upgradeButton}>Upgrade</button>
                        </div>
                    </>
                }
               {bottomTabIndex === 2 && (
    <div className={styles.watchesGrid}>
        {promos.active.map((promo, index) => {            
            return (
                <WatchCardMyPromotings
                    key={`active-watch-${index}`}
                    image={promo?.watch?.cover}
                    name={promo?.watch?.listing_title}
                    price={promo?.watch?.fixed_price_value}
                    location="Switzerland"
                    promoterCount={12}
                    sellerCode={promo?.promo_code}
                    sold={false}
                    active={true}
                    onPress={() => { /* handle click */ }}
                />
            );
        })}
    </div>
)}

                {bottomTabIndex === 3 &&
                    <div className={styles.watchesGrid}>
                        {promos.lost.map((promo, index) => (
                            <WatchCardMyPromotings
                                key={`lost-watch-${index}`}
                                image={promo.watch.cover}
                                name={promo.watch.listing_title}
                                price={promo.watch.fixed_price_value}
                                location="Switzerland" // You can update this based on your data
                                promoterCount={12} // You can update this based on your data
                                sellerCode="SELLER-1234" // You can update this based on your data
                                sold={false}
                                active={true}
                                onPress={() => {/* handle click */ }}
                            />
                        ))}
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
                                        key={`pending-${index}-${purchase.email}`}
                                        image={purchase.image}
                                        name={purchase.name}
                                        price={purchase.price}
                                        date={purchase.date}
                                        email={purchase.email}
                                        sellerName={purchase.sellerName}
                                        promoting={true}
                                    />
                                ))}
                            </div>
                        )}
                        {sellingStatus === 'inProgress' && (
                            <div className={styles.sellingGrid}>
                                {pendingSelling.map((purchase, index) => (
                                    <SoldCardInprogress
                                        key={`progress-${index}-${purchase.email}`}
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
                        {sellingStatus === 'completed' && (
                            <div className={styles.sellingGrid}>
                                {pendingSelling.map((purchase, index) => (
                                    <SoldCardCompleted
                                        key={`completed-${index}-${purchase.email}`}
                                        image={purchase.image}
                                        name={purchase.name}
                                        price={purchase.price}
                                        date={purchase.date}
                                        email={purchase.email}
                                        sellerName={purchase.sellerName}
                                        promoting={true}
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
                                onClick={() => { }}
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

export default MyPromotings;