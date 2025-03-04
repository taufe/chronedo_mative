import Image from 'next/image';
import styles from './MyEndedWatch.module.css';
import { IoIosRocket } from 'react-icons/io';
import { useState } from "react";

const MyEndedWatch = ({ image, name, price, date, email, sellerName, onAccept, onReject, promoting = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
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
                            src="/assets/Home/crossended.png" 
                            alt="Pending" 
                            width={20} 
                            height={20} 
                        />
                        <span className={styles.statusText}>Not selected</span>
                        <span className={styles.date}>{date}</span>
                    </div>
                   
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
            <div>
            <div className={styles.sellerHeader} onClick={toggleMenu} style={{ cursor: "pointer" }}>
                <Image 
                    src="/assets/icons/dropdown.png" 
                    alt="Dropdown" 
                    width={16} 
                    height={16} 
                />
                {isOpen ? "Hide Statistics" : "Statistics"}
            </div>

            {isOpen && (
                <div className={styles.menuContent}>
                   <div className={styles.sellerDetails}>
                    <div style={{display:'flex'}}>
                        <span className={styles.label}>Display:</span>
                        <span className={styles.value}>328</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <div className={styles.label}>Clicked</div>
                        <div className={styles.value}>23</div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div className={styles.label}>Added to Watchlist:</div>
                        <div className={styles.value}>2</div>
                    </div>
                </div>
                </div>
            )}
        </div>
                <div className={styles.divider}></div>
            </div>
            {!promoting && (
                <div className={styles.actionButtons}>
                    <button className={styles.acceptButton}>
                        Offer Again
                </button>
                <button className={styles.rejectButton}>
                    Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyEndedWatch;





 