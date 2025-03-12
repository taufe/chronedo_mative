import Image from 'next/image';
import styles from './MyOpenWatch.module.css';
import { IoIosRocket } from 'react-icons/io';
import { useState } from 'react';

const MyOpenWatch = ({ image, name, price, date, email, sellerName, onAccept, onReject, promoting = false }) => {
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const statistics = [
        { label: 'Views', value: '245' },
        { label: 'Likes', value: '123' },
        { label: 'Shares', value: '45' },
        // Add more statistics as needed
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % statistics.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + statistics.length) % statistics.length);
    };

    return (
        <div className={styles.purchaseCard}>
            <div className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Image 
                        src={image} 
                        alt={name} 
                        width={120} 
                        height={120} 
                        className={styles.watchImage}
                    />
                </div>
                <div className={styles.watchDetails}>
                    <h3 className={styles.watchName}>{name}</h3>
                    <div className={styles.statusContainer}>
                        <Image 
                            src="/assets/Home/pending.png" 
                            alt="Pending" 
                            width={20} 
                            height={20} 
                        />
                        <span className={styles.statusText}>Open</span>
                        <span className={styles.date}>{date}</span>
                    </div>
                    <button className={styles.RocketButton} >
                <IoIosRocket className={styles.rocketButtonIcon} style={{ fontSize: '24px', marginLeft: '10px' }} />    
      <div>
        <div style={{color:'white'}}>No Booster</div>
        <div style={{color:'#A98754'}}>Increase Visibility</div>
      </div>
    </button>

                </div>
            </div>
            <div className={styles.sellerDetails}>
                    <div className={styles.sellerInfo}>
                        <span className={styles.label}>12 bids: </span>
                        <span className={styles.value}>{email}</span>
                    </div>
                    <div className={styles.sellerInfo}>
                        <div className={styles.label}>buy now: </div>
                        <div className={styles.value}>{sellerName}</div>
                    </div>
                </div>
            

            <div className={styles.sellerSection}>
                <div 
                    className={styles.sellerHeader}
                    onClick={() => setIsStatsOpen(!isStatsOpen)}
                >
                    <Image 
                        src="/assets/icons/dropdown.png" 
                        alt="Dropdown" 
                        width={16} 
                        height={16} 
                        style={{
                            transform: isStatsOpen ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                    Statistics
                </div>
                {isStatsOpen && (
                    <div className={styles.statisticsCarousel}>
                        <button 
                            className={styles.carouselButton} 
                            onClick={prevSlide}
                        >
                            <Image 
                                src="/assets/icons/leftArrow.png" 
                                alt="Previous" 
                                width={16} 
                                height={16} 
                            />
                        </button>
                        
                        <div className={styles.statisticSlide}>
                            <div className={styles.statLabel}>{statistics[currentSlide].label}</div>
                            <div className={styles.statValue}>{statistics[currentSlide].value}</div>
                        </div>

                        <button 
                            className={styles.carouselButton} 
                            onClick={nextSlide}
                        >
                            <Image 
                                src="/assets/icons/rightArrow.png" 
                                alt="Next" 
                                width={16} 
                                height={16} 
                            />
                        </button>
                    </div>
                )}
                <div className={styles.divider}></div>
            </div>
            <div className={styles.actionButtons}>
                        <button className={styles.acceptButton}  style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent:'center',
                gap: '8px',
                // padding: '8px 12px', // Adjust as needed
            }}>
                <IoIosRocket style={{ fontSize: '24px', marginLeft:'10px' }} />
                <span>Boost</span>
            </button>

            </div>
            {!promoting && (
                <div className={styles.actionButtons}>
                    <button className={styles.acceptButton}>
                        Edit
                </button>
                <button className={styles.rejectButton}>
                    End
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyOpenWatch;





 