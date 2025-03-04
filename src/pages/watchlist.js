import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './watchlist.module.css';
import WatchCard from '../components/WatchCard';
import { useRouter } from 'next/router';

const Watchlist = () => {
    const router = useRouter();
    const watches = [
        { image: '/assets/watches/rolexDatejust.png', name: 'Rolex Datejust Oyster 41mm', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/omegaSpeedmaster.png', name: 'Omega Speedmaster', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/rolexDaydate.png', name: 'Rolex Day-Date', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/patekPhilippe.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w1.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w2.jpg', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w3.jpeg', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w4.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w5.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w6.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w7.jpg', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w8.jpg', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/w9.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/patekPhilippe.png', name: 'Patek Philippe Nautilus', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
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
                        <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>
                <div className={styles.watchesGrid}>
                    {watches.slice(0, 8).map((watch, index) => (
                        <WatchCard
                            key={index}
                            image={watch.image}
                            name={watch.name}
                            date={watch.date}
                            buyNowPrice={watch.buyNowPrice}
                            bidPrice={watch.bidPrice}
                            onPress={() => {
                                router.push(`/product`);
                            }}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Watchlist; 