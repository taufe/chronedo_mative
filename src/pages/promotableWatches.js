import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './promotableWatches.module.css';
import PromotableWatchCard from '../components/PromotableWatchCard/PromotableWatchCard';

const PromotableWatches = () => {

    const watches = [
        {
            watchImage: '/assets/watches/w1.png',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            earnAmount: '10'
        },
        {
            watchImage: '/assets/watches/w2.jpg',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            earnAmount: '15'
        },
        {
            watchImage: '/assets/watches/w3.jpeg',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            earnAmount: '10'
        },
        {
            watchImage: '/assets/watches/w4.png',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            earnAmount: '15'
        },
        {
            watchImage: '/assets/watches/w5.png',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            earnAmount: '10'
        },
        {
            watchImage: '/assets/watches/w6.png',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            earnAmount: '15'
        },
    ];

    const handleEarnNow = (invoiceNo) => {
        console.log('Processing payment for invoice:', invoiceNo);
        // Add payment handling logic here
    };

    const handleSort = () => {
        console.log('Sorting...');
    };

    const handleFilter = () => {
        console.log('Filtering...');
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
                        <Image key="notification" src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image key="cart" src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image key="profile" src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>

                <div className={styles.watchesContainer}>
                    <div className={styles.actionsContainer}>
                        <div className={styles.actionButtons}>
                            <div key="sort-button">
                                <Image 
                                    src="/assets/images/sortButton.png" 
                                    alt="Sort" 
                                    width={121} 
                                    height={39}
                                    onClick={handleSort}
                                    style={{ 
                                        cursor: 'pointer', 
                                        boxFit: 'contain', 
                                        fontWeight: 500, 
                                        fontFamily: 'Poppins' 
                                    }}
                                    
                                />
                            </div>
                            <div key="filter-button">
                                <Image 
                                    src="/assets/images/filterButton.png" 
                                    alt="Filter" 
                                    width={121} 
                                    height={39}
                                    onClick={handleFilter}
                                    style={{ 
                                        cursor: 'pointer', 
                                        boxFit: 'contain', 
                                        fontWeight: 500, 
                                        fontFamily: 'Poppins' 
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.watchesGrid}>
                        {watches.map((watch, index) => (
                            <PromotableWatchCard
                                key={`${watch.invoiceNo}-${index}`}
                                {...watch}
                                onEarnNow={() => handleEarnNow(watch.invoiceNo)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PromotableWatches; 