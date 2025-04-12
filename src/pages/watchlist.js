import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './watchlist.module.css';
import WatchCard from '../components/WatchCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useData } from '../context/contextApi';

const Watchlist = () => {
    const router = useRouter();
    const [watchList, setWatchList] = useState([]);
    const [favorites, setFavorites] = useState({}); 
    const { token } = useData();
    const [isLoading, setIsLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchWatchApi = async () => {
            try {
                const response = await axios.get(
                    "https://chronedo.webjerky.com/api/watches?page=1&limit=10",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('response of watchlist',response.data)
                setWatchList(response.data.data);
            } catch (error) {
                console.error("Error fetching watches:", error);
            }
        };

        if (token) {
            fetchWatchApi();
        }
    }, [token]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = async (id) => {
        const isFavorite = favorites[id];

        try {
            const response = await axios.post(
                "/api/favouriteApi",
                { id, action: isFavorite ? "remove" : "add", token },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                const updatedFavorites = { ...favorites, [id]: !favorites[id] };
                setFavorites(updatedFavorites);
                // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            } else {
                console.error("Failed to update favorites:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating favorites:", error.response?.data || error.message);
        }
    };

    const incrementWatchClick = async (watch) => {
        try {
            const response = await axios.post(
                `/api/clickWatchApi`,
                {id:watch.id,
                token:token
                }, 
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (e) {
            console.log("error", e);
            throw e;
        }
    };

    const handleCardClick = async (watch) => {
        console.log('watch clicked data-------',watch)
        if (isNavigating) return;
        
        setIsNavigating(true);
        try {
            const response = await incrementWatchClick(watch);
            console.log('Watch click recorded:', response);
            localStorage.setItem("selectedWatch", JSON.stringify(watch));
            console.log("Watch saved to localStorage:", watch);

            await router.push({
                pathname: '/product',
                query: { id: watch.id }
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error:", error);
                // Optionally show error to user
            }
        } finally {
            setIsNavigating(false);
        }
    };

    return (
        <DashboardLayout>
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchWrapper}>
                            <input type="text" placeholder="Search..." className={styles.searchInput} />
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
                    {isLoading ? (
                        <p style={{ fontFamily: 'Poppins' }}>Loading...</p>  
                    ) : watchList.length === 0 ? (
                        <p style={{ fontFamily: 'Poppins' }}>No watches found</p>  
                    ) : (
                        watchList.map((watch) => (
                            <div key={watch.id} className={styles.watchCard}>
                                <div onClick={() => handleCardClick(watch)}>
                                    <WatchCard
                                        image={watch.cover}
                                        name={watch.listing_title}
                                        date={watch.age_year_of_sale}
                                        buyNowPrice={watch.fixed_price_value}
                                        bidPrice={watch.starting_price}
                                    />
                                </div>
                                <div className={styles.iconContainer}>
                                    <button 
                                        className={styles.favoriteIcon} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(watch.id);
                                        }}
                                    >
                                        {favorites[watch.id] ? (
                                            <AiFillHeart size={20} color="red" />
                                        ) : (
                                            <AiOutlineHeart size={20} color="white" />
                                        )}
                                    </button>
                                    <button 
                                        className={styles.filterIcon}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Image src="/assets/productPage/compare.png" alt="Filter" width={20} height={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Watchlist;