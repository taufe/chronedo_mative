import Image from 'next/image';
import styles from './SoldCardCompleted.module.css';

const SoldCardCompleted = ({ image, name, price, date, email, sellerName, promoting = false }) => {
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

            {!promoting && (
                <div className={styles.actionButtons}>
                    <button className={styles.editButton}>
                        Edit
                </button>
                <button className={styles.endButton}>
                    End
                    </button>
                </div>
            )}
        </div>
    );
};

export default SoldCardCompleted;