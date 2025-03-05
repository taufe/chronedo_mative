import Image from 'next/image';
import styles from './SoldCardPending.module.css';
import { useEffect, useState } from 'react';

const SoldCardPending = ({ image, name, price, date, email, sellerName, onAccept, onReject, promoting = false }) => {

    const [size, setSize] = useState(20);

    useEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth < 500 ? 15 : 20);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return (
        <div className={styles.purchaseCard}>
            <div className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    {/* <Image
                        src={image}
                        alt={name}
                        width={120}
                        height={120}
                        className={styles.watchImage}
                    /> */}
                    <Image src="/assets/Home/pending.png" alt="Pending" width={size} height={size} />;
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
                        <span className={styles.statusText}>Pending</span>
                        <span className={styles.date}>{date}</span>
                    </div>
                    <div className={styles.price}>CHF {price.toLocaleString()}</div>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.sellerSection}>
                <div className={styles.sellerHeader}>
                    Seller Details
                    <Image
                        src="/assets/icons/dropdown.png"
                        alt="Dropdown"
                        width={16}
                        height={16}
                    />
                </div>
                <div className={styles.sellerDetails}>
                    <div className={styles.sellerInfo}>
                        <span className={styles.label}>Email: </span>
                        <span className={styles.value}>{email}</span>
                    </div>
                    <div className={styles.sellerInfo}>
                        <span className={styles.label}>Name: </span>
                        <span className={styles.value}>{sellerName}</span>
                    </div>
                </div>
            </div>

            {!promoting && (
                <div className={styles.actionButtons}>
                    <button className={styles.acceptButton}>
                        Accept
                    </button>
                    <button className={styles.rejectButton}>
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default SoldCardPending;