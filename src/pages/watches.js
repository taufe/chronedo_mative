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
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const fetchWatchApi = async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://chronedo.webjerky.com/api/watches?page=${page}&limit=${pagination.limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('response of watchlist', response.data?.data?.watches);
            setWatchList(response?.data?.data?.watches);
            fetchFavorites()
            // Update pagination info
            setPagination({
                currentPage: parseInt(response.data.data.meta.page),
                totalPages: response.data.data.meta.last_page,
                totalItems: response.data.data.meta.total,
                limit: parseInt(response.data.data.meta.limit)
            });
        } catch (error) {
            console.error("Error fetching watches:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchWatchApi(pagination.currentPage);
        }
    }, [token, pagination.currentPage]);

    // useEffect(() => {
    //     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    //     setFavorites(storedFavorites);
        
        
    //     console.log('response of favoute and remove favourite api',response.data)

    // }, []);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://chronedo.webjerky.com/api/favorites',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
          const storedFavorites = response?.data?.data?.map((item)=>id?.item);
          console.log('save favorite',storedFavorites)

        setFavorites(storedFavorites);
            console.log('response of favoute and remove favourite api', response?.data)
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }

    }
    // useEffect(() => {
        
    // }, [])
    

    const toggleFavorite = async (id,isFavorite) => {
        
    
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
    
            console.log('response of favorite API:', response.data);
    
            if (response.data.success) {
                
    
                // update the watch list if applicable
                setWatchList(prev =>
                    prev.map(w =>
                        w.id === id ? { ...w, is_favorited: !isFavorite } : w
                    )
                );
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

    const handlePageChange = (page) => {
        setPagination(prev => ({...prev, currentPage: page}));
    };

    const renderPagination = () => {
        if (pagination.totalPages <= 1) return null;
        
        const pages = [];
        for (let i = 1; i <= pagination.totalPages; i++) {
            pages.push(
                <button 
                    key={i} 
                    className={`${styles.paginationButton} ${pagination.currentPage === i ? styles.activePage : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        
        return (
            <div className={styles.paginationContainer}>
                <button 
                    className={styles.paginationButton}
                    disabled={pagination.currentPage === 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                    Previous
                </button>
                {pages}
                <button 
                    className={styles.paginationButton}
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                    Next
                </button>
            </div>
        );
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

                {isLoading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinnerWrapper}>
                            <div className={styles.spinner}></div>
                        </div>
                    </div>
                ) : watchList?.length === 0 ? (
                    <p className={styles.noWatches}>No watches found</p>  
                ) : (
                    <>
                        <div className={styles.watchesGrid}>
                            {watchList?.map((watch) => (
                                <div key={watch?.id} className={styles.watchCard}>
                                    <div onClick={() => handleCardClick(watch)}>
                                        <WatchCard
                                            image={watch?.cover}
                                            name={watch?.listing_title}
                                            date={watch?.age_year_of_sale}
                                            buyNowPrice={watch?.fixed_price}
                                            bidPrice={watch?.starting_price}
                                        />
                                    </div>
                                    <div className={styles.iconContainer}>
                                        <button 
                                            className={styles.favoriteIcon} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(watch.id,watch.is_favorited);
                                            }}

                                        >
                                            {watch?.is_favorited ? (
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
                            ))}
                        </div>
                        {renderPagination()}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Watchlist;