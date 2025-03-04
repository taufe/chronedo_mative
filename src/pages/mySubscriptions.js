import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './mySubscriptions.module.css';
import Link from 'next/link';
import { useState } from 'react';

const MySubscriptions = () => {
    const [bottomTabIndex, setBottomTabIndex] = useState(1);
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
                        <Image src="/assets/Home/influencerLevel.png" alt="Open" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>My Influencer Level</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 3 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(2)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 2 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/sellerLevel.png" alt="Lost" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>My Sellers Level</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 1 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(3)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 3 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/cpc.png" alt="Purchased" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>CPC</span>
                    </button>
                </div>

                {bottomTabIndex === 1 && (
                    <div className={styles.subscriptionCards}>
                        <div className={styles.card}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>None</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Private Watch Promoter</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Unlimited Free Codes
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> 10 days Commission Payou
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>

                        <div className={`${styles.card} ${styles.professionalCard}`}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>$40</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Professional Watch Promoter</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Unlimited Free Codes
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> 10 days Commission Payou
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>None</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Private Watch Promoter</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Unlimited Free Codes
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> 10 days Commission Payou
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                )}
                {bottomTabIndex === 2 && (
                    <div className={styles.subscriptionCards}>
                        <div className={styles.card}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>None</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Basic</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Up to 3 active listings
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> $30 per additional listing
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>$159</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Pro Seller</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Up to 100 active listings
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> +$100 per Month(100 listings)
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>

                        <div className={`${styles.card} ${styles.professionalCard}`}>

                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>$449</h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>Pro Seller</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <span>✓</span> Fixed Commission
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> Up to 500 active listings
                                </div>
                                <div className={styles.feature}>
                                    <span>✓</span> +$200 per Month(500 listings)
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                )}
                {bottomTabIndex === 3 && (
                    <div className={`${styles.subscriptionCards} ${styles.singleCard}`}>
                        <div className={`${styles.card} ${styles.professionalCard}`}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>$69</h3>
                                <p className={styles.feeType}>Per Month</p>
                            </div>
                            <h2 className={styles.cardTitle}>Professional Watch Promoter</h2>
                            <div className={`${styles.features} ${styles.cpcFeatures}`}>
                                <div className={styles.feature}>
                                    • Legal support for buying contracts (limited to one case per month, up to $5,000, in specific countries).
                                </div>
                                <div className={styles.feature}>
                                    • Free escrow service for members.
                                </div>
                                <div className={styles.feature}>
                                    • Priority customer service through a dedicated channel.
                                </div>
                                <div className={styles.feature}>
                                    • Exclusive offers and discounts via the Club newsletter.
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MySubscriptions; 