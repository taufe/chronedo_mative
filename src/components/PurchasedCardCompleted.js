import Image from 'next/image';
import styles from './PurchasedCardInprogress.module.css';

const PurchasedCardCompleted = ({ image, name, price, date, email, sellerName }) => {
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
                            src="/assets/Home/completed.png" 
                            alt="Completed" 
                            width={20} 
                            height={20} 
                        />
                        <span className={styles.statusText}>Completed</span>
                        <span className={styles.date}>{date}</span>
                    </div>
                    <div className={styles.price}>CHF {price?.toLocaleString()}</div>
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

            <button className={styles.sellButton}>Buy Again</button>
        </div>
    );
};

export default PurchasedCardCompleted;