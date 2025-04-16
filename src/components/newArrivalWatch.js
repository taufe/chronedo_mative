import Image from 'next/image';
import styles from './NewArrivalWatch.module.css';
import WatchCard from './WatchCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NewArrivalWatch = () => {
    const router = useRouter();
    const [watchList, setWatchList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10,
    });

    useEffect(() => {
        const fetchWatchApi = async (page = 1) => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://chronedo.webjerky.com/api/guestWatches?page=${page}`
                );

                setWatchList(response.data?.data?.watches || []);
                setPagination({
                    currentPage: parseInt(response.data?.data?.meta?.page || 1),
                    totalPages: response.data?.data?.meta?.last_page || 1,
                    totalItems: response.data?.data?.meta?.total || 0,
                    limit: parseInt(response.data?.data?.meta?.limit || 10),
                });
                setError(null);
            } catch (error) {
                console.error("Error fetching watches:", error);
                setError("Failed to load watches. Please try again later.");
                setWatchList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWatchApi(pagination.currentPage);
    }, [pagination.currentPage]);

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
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
        <div className={styles.dashboardContainer}>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinnerWrapper}>
                        <div className={styles.spinner}></div>
                    </div>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button
                        className={styles.retryButton}
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.watchesGrid}>
                        {watchList && watchList.length > 0 ? (
                            watchList.map((watch) => (
                                <div key={watch?.id} className={styles.watchCard}>
                                    <WatchCard
                                        image={watch?.cover}
                                        name={watch?.listing_title}
                                        date={watch?.age_year_of_sale}
                                        buyNowPrice={watch?.fixed_price}
                                        bidPrice={watch?.starting_price}
                                        onPress={() => router.push('/product')}
                                    />
                                    <div className={styles.iconContainer}>
                                        <button className={styles.filterIcon}>
                                            <Image src="/assets/productPage/compare.png" alt="Filter" width={20} height={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noWatchesMessage}>
                                No watches available at the moment.
                            </div>
                        )}
                    </div>
                    {renderPagination()}
                </>
            )}
        </div>
    );
};

export default NewArrivalWatch;
