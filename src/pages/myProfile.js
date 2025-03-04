import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './myProfile.module.css';
import Link from 'next/link';

const MyProfile = () => {
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
                
                <div className={styles.profileSection}>
                    <div className={styles.profileCard}>
                        <div className={styles.profileHeader}>
                            <Image 
                                src="/assets/images/person.png" 
                                alt="Profile Picture" 
                                width={80} 
                                height={80} 
                                className={styles.profilePicture}
                            />
                            <h2 className={styles.profileName}>Nico Baumgartner</h2>
                        </div>

                        <div className={styles.profileDetails}>
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/privateSeller.png" alt="Seller Type" width={24} height={24} />
                                <span>Private seller</span>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/location2.png" alt="Location" width={24} height={24} style={{ objectFit: 'contain' }} />
                                <span>4665 Oftringen, Switzerland</span>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/rating.png" alt="Rating" width={24} height={24} />
                                <div className={styles.stars}>
                                    <Image src="/assets/profile/starFull.png" alt="Full Star" width={20} height={20} />
                                    <Image src="/assets/profile/starFull.png" alt="Full Star" width={20} height={20} />
                                    <Image src="/assets/profile/starFull.png" alt="Full Star" width={20} height={20} />
                                    <Image src="/assets/profile/starHalf.png" alt="Half Star" width={20} height={20} />
                                    <Image src="/assets/profile/starEmpty.png" alt="Empty Star" width={20} height={20} />
                                    <span className={styles.ratingCount}>(12)</span>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/response2.png" alt="Response Time" width={24} height={24} />
                                <span>Ø response time: 2 hours</span>
                            </div>
                            <div className={styles.divider}></div>
                        </div>
                    </div>
                    
                    <div className={styles.ratingsCard}>
                        <h2 className={styles.ratingsTitle}>Ratings as a seller</h2>
                        
                        <div className={styles.overallRating}>
                            <div className={styles.stars}>
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starHalf.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starEmpty.png" alt="Star" width={24} height={24} />
                            </div>
                            <span className={styles.reviewCount}>(3 reviews)</span>
                        </div>

                        <div className={styles.ratingBars}>
                            {[5,4,3,2,1].map((stars) => (
                                <div key={stars} className={styles.ratingBar}>
                                    <span>{stars} stars</span>
                                    <div className={styles.barContainer}>
                                        <div 
                                            className={styles.barFill} 
                                            style={{ 
                                                width: `${stars === 5 ? '66%' : stars === 4 ? '33%' : '0%'}`
                                            }}
                                        ></div>
                                    </div>
                                    <span>{stars === 5 ? '2' : stars === 4 ? '1' : '0'}</span>
                                </div>
                            ))}
                        </div>

                        <h3 className={styles.breakdownTitle}>Rating Breakdown</h3>
                        <div className={styles.ratingBreakdown}>
                            <div className={styles.breakdownItem}>
                                <span>Communication with the seller</span>
                                <div className={styles.breakdownScore}>
                                    <span>5</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>Recommend to a friend</span>
                                <div className={styles.breakdownScore}>
                                    <span>4.9</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>Item as described</span>
                                <div className={styles.breakdownScore}>
                                    <span>4.9</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.reviewsList}>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewerInfo}>
                                        <Image 
                                            src="/assets/profile/user1.png" 
                                            alt="Diana Wolf" 
                                            width={48} 
                                            height={48} 
                                            className={styles.reviewerImage}
                                        />
                                        <div className={styles.reviewerDetails}>
                                            <div className={styles.reviewerName}>
                                                Diana Wolf
                                                <div className={styles.countryFlag}>
                                                    <Image 
                                                        src="/assets/icons/swiss-flag.png" 
                                                        alt="Switzerland" 
                                                        width={16} 
                                                        height={16} 
                                                    />
                                                    <span>Switzerland</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.reviewRating}>
                                        <div className={styles.stars}>
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starHalf.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starEmpty.png" alt="Star" width={20} height={20} />
                                        </div>
                                        <span className={styles.ratingScore}>3.5</span>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    Reliable, honest, friendly seller, absolutely smooth processing. Gladly on a new one!
                                </p>
                                <div className={styles.reviewDate}>
                                    <Image 
                                        src="/assets/icons/clock.png" 
                                        alt="Clock" 
                                        width={16} 
                                        height={16} 
                                    />
                                    <span>Rating from 01.01.2022</span>
                                </div>
                            </div>

                            <div className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewerInfo}>
                                        <Image 
                                            src="/assets/profile/user2.png" 
                                            alt="Watchlover99" 
                                            width={48} 
                                            height={48} 
                                            className={styles.reviewerImage}
                                        />
                                        <div className={styles.reviewerDetails}>
                                            <div className={styles.reviewerName}>
                                                Watchlover99
                                                <div className={styles.countryFlag}>
                                                    <Image 
                                                        src="/assets/icons/swiss-flag.png" 
                                                        alt="Switzerland" 
                                                        width={16} 
                                                        height={16} 
                                                    />
                                                    <span>Switzerland</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.reviewRating}>
                                        <div className={styles.stars}>
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starEmpty.png" alt="Star" width={20} height={20} />
                                        </div>
                                        <span className={styles.ratingScore}>4.0</span>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    Reliable, honest, friendly seller, absolutely smooth processing. Gladly on a new one!
                                </p>
                                <div className={styles.reviewDate}>
                                    <Image 
                                        src="/assets/icons/clock.png" 
                                        alt="Clock" 
                                        width={16} 
                                        height={16} 
                                    />
                                    <span>Rating from 01.01.2022</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.moreButton}>
                            More
                        </button>
                    </div>

                    <div className={styles.ratingsCard}>
                        <h2 className={styles.ratingsTitle}>Ratings as a Buyer</h2>
                        
                        <div className={styles.overallRating}>
                            <div className={styles.stars}>
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starFull.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starHalf.png" alt="Star" width={24} height={24} />
                                <Image src="/assets/profile/starEmpty.png" alt="Star" width={24} height={24} />
                            </div>
                            <span className={styles.reviewCount}>(3 reviews)</span>
                        </div>

                        <div className={styles.ratingBars}>
                            {[5,4,3,2,1].map((stars) => (
                                <div key={stars} className={styles.ratingBar}>
                                    <span>{stars} stars</span>
                                    <div className={styles.barContainer}>
                                        <div 
                                            className={styles.barFill} 
                                            style={{ 
                                                width: `${stars === 5 ? '66%' : stars === 4 ? '33%' : '0%'}`
                                            }}
                                        ></div>
                                    </div>
                                    <span>{stars === 5 ? '2' : stars === 4 ? '1' : '0'}</span>
                                </div>
                            ))}
                        </div>

                        <h3 className={styles.breakdownTitle}>Rating Breakdown</h3>
                        <div className={styles.ratingBreakdown}>
                            <div className={styles.breakdownItem}>
                                <span>Communication with the buyer</span>
                                <div className={styles.breakdownScore}>
                                    <span>5</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>Recommend to a friend</span>
                                <div className={styles.breakdownScore}>
                                    <span>4.9</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>Item as described</span>
                                <div className={styles.breakdownScore}>
                                    <span>4.9</span>
                                    <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.reviewsList}>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewerInfo}>
                                        <Image 
                                            src="/assets/profile/user1.png" 
                                            alt="Diana Wolf" 
                                            width={48} 
                                            height={48} 
                                            className={styles.reviewerImage}
                                        />
                                        <div className={styles.reviewerDetails}>
                                            <div className={styles.reviewerName}>
                                                Diana Wolf
                                                <div className={styles.countryFlag}>
                                                    <Image 
                                                        src="/assets/icons/swiss-flag.png" 
                                                        alt="Switzerland" 
                                                        width={16} 
                                                        height={16} 
                                                    />
                                                    <span>Switzerland</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.reviewRating}>
                                        <div className={styles.stars}>
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starHalf.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starEmpty.png" alt="Star" width={20} height={20} />
                                        </div>
                                        <span className={styles.ratingScore}>3.5</span>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    Reliable, honest, friendly seller, absolutely smooth processing. Gladly on a new one!
                                </p>
                                <div className={styles.reviewDate}>
                                    <Image 
                                        src="/assets/icons/clock.png" 
                                        alt="Clock" 
                                        width={16} 
                                        height={16} 
                                    />
                                    <span>Rating from 01.01.2022</span>
                                </div>
                            </div>

                            <div className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewerInfo}>
                                        <Image 
                                            src="/assets/profile/user2.png" 
                                            alt="Watchlover99" 
                                            width={48} 
                                            height={48} 
                                            className={styles.reviewerImage}
                                        />
                                        <div className={styles.reviewerDetails}>
                                            <div className={styles.reviewerName}>
                                                Watchlover99
                                                <div className={styles.countryFlag}>
                                                    <Image 
                                                        src="/assets/icons/swiss-flag.png" 
                                                        alt="Switzerland" 
                                                        width={16} 
                                                        height={16} 
                                                    />
                                                    <span>Switzerland</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.reviewRating}>
                                        <div className={styles.stars}>
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starFull.png" alt="Star" width={20} height={20} />
                                            <Image src="/assets/profile/starEmpty.png" alt="Star" width={20} height={20} />
                                        </div>
                                        <span className={styles.ratingScore}>4.0</span>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    Reliable, honest, friendly seller, absolutely smooth processing. Gladly on a new one!
                                </p>
                                <div className={styles.reviewDate}>
                                    <Image 
                                        src="/assets/icons/clock.png" 
                                        alt="Clock" 
                                        width={16} 
                                        height={16} 
                                    />
                                    <span>Rating from 01.01.2022</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.moreButton}>
                            More
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyProfile; 