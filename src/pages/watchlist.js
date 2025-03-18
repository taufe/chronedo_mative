import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './watchlist.module.css';
import WatchCard from '../components/WatchCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Importing icons

const Watchlist = () => {
    const router = useRouter();
    const [watchList, setWatchList] = useState([]);
    const [favorites, setFavorites] = useState({}); // Stores favorite status for watches

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
                console.log('watchlist data-----', response.data.data)
                setWatchList(response.data.data);
            } catch (error) {
                console.error("Error fetching watches:", error);
            }
        };

        fetchWatchApi();
    }, []);

    // Toggle favorite function
    const toggleFavorite = (id) => {
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
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
                        <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>

                <div className={styles.watchesGrid}>
                    {watchList.slice(0, 8).map((watch) => (
                        <div key={watch.id} className={styles.watchCard}>
                        {/* Watch Image */}
                        <WatchCard
                            image={watch.cover}
                            name={watch.listing_title}
                            date={watch.age_year_of_sale}
                            buyNowPrice={watch.fixed_price_value}
                            bidPrice={watch.starting_price}
                            onPress={() => router.push('/product')}
                        />
                    
                        {/* Icons Container (Now inside each watch card, at top right) */}
                        <div className={styles.iconContainer}>
                            {/* Favorite Icon (Top) */}
                            <button
                                className={styles.favoriteIcon}
                                onClick={() => toggleFavorite(watch.id)}
                            >
                                {favorites[watch.id] ? (
                                    <AiFillHeart size={20} color="red" />
                                ) : (
                                    <AiOutlineHeart size={20} color="white" />
                                )}
                            </button>
                    
                            {/* Filter Icon (Below Heart) */}
                            <button className={styles.filterIcon}>
                                <Image src="/assets/productPage/compare.png" alt="Filter" width={20} height={20} />
                            </button>
                        </div>
                    </div>
                    
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Watchlist;
