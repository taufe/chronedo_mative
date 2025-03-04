import React from 'react';
import Image from 'next/image';
import styles from './InvoiceCard.module.css';

const InvoiceCard = ({ 
    watchImage, 
    watchName, 
    invoiceNo, 
    date, 
    amount, 
    status = 'Pending',
    onPayNow 
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.leftSection}>
                <div className={styles.watchImage}>
                    <Image 
                        src={watchImage} 
                        alt={watchName}
                        width={80}
                        height={80}
                        objectFit="cover"
                    />
                </div>
                
                <div className={styles.details}>
                    <h3 className={styles.watchName}>{watchName}</h3>
                    
                    <div className={styles.infoRows}>
                        <div className={styles.infoRow}>
                            <Image 
                                src="/assets/icons/tag1.png" 
                                alt="Invoice" 
                                width={16} 
                                height={16}
                                style={{ objectFit: 'contain' }}
                            />
                            <span>Invoice No: {invoiceNo}</span>
                        </div>
                        
                        <div className={styles.infoRow}>
                            <Image 
                                src="/assets/icons/location1.png" 
                                alt="Date" 
                                width={16} 
                                height={16}
                                style={{ objectFit: 'contain' }}
                            />
                            <span>Date: {date}</span>
                        </div>
                        
                        <div className={styles.infoRow}>
                            <Image 
                                src="/assets/icons/booster1.png" 
                                alt="Amount" 
                                width={16} 
                                height={16}
                                style={{ objectFit: 'contain' }}
                            />
                            <span>Due Amount: {amount} USD</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={[styles.status, status === 'Paid' ? styles.paid : ''].join(' ')}>{status}</div>
                <button 
                    className={styles.payButton}
                    onClick={onPayNow}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default InvoiceCard; 