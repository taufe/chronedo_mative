import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './watchlist.module.css';
import WatchCard from '../components/WatchCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Watchlist = () => {
    const router = useRouter();

    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const fetchWatchApi = async () => {
            try {
                const response = await axios.get(
                    "https://chronedo.webjerky.com/api/watches?page=1&limit=8",
                    {
                        headers: {
                            Authorization:
                                "Bearer 222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88",
                        },
                    }
                );
                setWatchList(response.data.data); // Correctly setting the array from API response
            } catch (error) {
                console.error("Error fetching watches:", error);
            }
        };

        fetchWatchApi();
    }, []);



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
                    {watchList.slice(0, 8).map((watch, index) => (
                        <WatchCard
                        key={watch.id}
                        image={watch.cover} // Assuming 'cover' is the image URL
                        name={watch.listing_title}
                        date={watch.age_year_of_sale}
                        buyNowPrice={watch.fixed_price_value}
                        bidPrice={watch.starting_price}
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