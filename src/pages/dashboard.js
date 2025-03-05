import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './dashboard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import WatchCard from '../components/WatchCard';
import FilterPopup from '../components/FilterPopup';

const Dashboard = () => {

    const watches = [
        { image: '/assets/watches/rolexDatejust.png', name: 'Rolex Datejust Oyster 41mm', date: '24.10.2021, 19:35', buyNowPrice: 5000, bidPrice: 1001 },
        { image: '/assets/watches/omegaSpeedmaster.png', name: 'Omega Speedmaster Professional', date: '25.10.2021, 14:20', buyNowPrice: 6800, bidPrice: 5500 },
        { image: '/assets/watches/rolexDaydate.png', name: 'Rolex Day-Date 40 President', date: '23.10.2021, 09:15', buyNowPrice: 35000, bidPrice: 28500 },
        { image: '/assets/watches/patekPhilippe.png', name: 'Patek Philippe Nautilus 5711', date: '24.10.2021, 11:45', buyNowPrice: 135000, bidPrice: 110000 },
        { image: '/assets/watches/w1.png', name: 'Audemars Piguet Royal Oak', date: '26.10.2021, 16:30', buyNowPrice: 85000, bidPrice: 70000 },
        { image: '/assets/watches/w2.jpg', name: 'Vacheron Constantin Overseas', date: '22.10.2021, 13:25', buyNowPrice: 32000, bidPrice: 27500 },
        { image: '/assets/watches/w3.jpeg', name: 'IWC Portuguese Chronograph', date: '25.10.2021, 08:55', buyNowPrice: 8500, bidPrice: 6900 },
        { image: '/assets/watches/w4.png', name: 'Cartier Santos Large', date: '23.10.2021, 17:40', buyNowPrice: 7800, bidPrice: 6200 },
        { image: '/assets/watches/w5.png', name: 'Jaeger-LeCoultre Reverso', date: '24.10.2021, 15:15', buyNowPrice: 9500, bidPrice: 7800 },
        { image: '/assets/watches/w6.png', name: 'Panerai Luminor Marina', date: '26.10.2021, 10:05', buyNowPrice: 8900, bidPrice: 7200 },
        { image: '/assets/watches/w7.jpg', name: 'Breitling Navitimer B01', date: '22.10.2021, 12:50', buyNowPrice: 8200, bidPrice: 6500 },
        { image: '/assets/watches/w8.jpg', name: 'A. Lange & Söhne Lange 1', date: '25.10.2021, 18:20', buyNowPrice: 45000, bidPrice: 38000 },
        { image: '/assets/watches/w9.png', name: 'Hublot Big Bang', date: '23.10.2021, 14:45', buyNowPrice: 22000, bidPrice: 18500 },
        { image: '/assets/watches/patekPhilippe.png', name: 'Patek Philippe Aquanaut', date: '24.10.2021, 20:10', buyNowPrice: 95000, bidPrice: 78000 },
    ];

    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');
    const [filteredWatches, setFilteredWatches] = useState(watches);
    const [sortBy, setSortBy] = useState('lowPrice');
    const [activeFilters, setActiveFilters] = useState(['Used', 'New', 'Datejust', 'Europe']);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (searchInput.length > 1) {
            setFilteredWatches(
                watches.filter(watch =>
                    watch.name.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        } else {
            setFilteredWatches(watches);
        }
    }, [searchInput, watches]);

    const handleFilterClick = (filter) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    const sortWatches = (watches) => {
        switch (sortBy) {
            case 'lowPrice':
                return [...watches].sort((a, b) => a.buyNowPrice - b.buyNowPrice);
            case 'highPrice':
                return [...watches].sort((a, b) => b.buyNowPrice - a.buyNowPrice);
            default:
                return watches;
        }
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
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
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

                {searchInput.length > 1 ? (
                    <>
                        <div className={styles.filterSection}>
                            <div className={styles.filterButtons}>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className={styles.filterIcon}>
                                    <Image src="/assets/icons/filter.png" alt="Filter" width={20} height={20} />
                                    Filter
                                </button>
                                {['Used', 'New', 'Datejust', 'Europe'].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`${styles.filterButton} ${activeFilters.includes(filter) ? styles.active : ''}`}
                                        onClick={() => handleFilterClick(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.sortDropdown}>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className={styles.sortSelect}
                                >
                                    <option value="lowPrice">Low Price</option>
                                    <option value="highPrice">High Price</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.watchesGrid}>
                            {sortWatches(filteredWatches).slice(0, 8).map((watch, index) => (
                                <WatchCard
                                    key={index}
                                    image={watch.image}
                                    name={watch.name}
                                    date={watch.date}
                                    buyNowPrice={watch.buyNowPrice}
                                    bidPrice={watch.bidPrice}
                                />
                            ))}
                        </div>
                    </>

                ) : (
                    <>
                        {/* Overview Section */}
                        <div className={styles.overviewContainer}>
                            <div className={styles.leftColumn}>
                                <div className={styles.profileSection}>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.iconText}>
                                            <Image src="/assets/icons/sidebar/profile.png" alt="Profile" width={22} height={22} />
                                            <h2>My Profile</h2>
                                        </div>
                                    </div>
                                    <div className={styles.profileCard}>
                                        <div className={styles.profileImage}>
                                            <Image src="/assets/images/person.png" alt="Profile" width={90} height={90} />
                                            <div className={styles.verifiedBadge}>✓</div>
                                        </div>
                                        <div className={styles.profileInfo}>
                                            <h3>Nico Baumgartner</h3>
                                            <div className={styles.location}>
                                                <Image src="/assets/icons/locationGolden.png" alt="Location" width={14} height={20} />
                                                <span>California, USA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.sellingSection}>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.iconText}>
                                            <Image src="/assets/icons/sidebar/selling.png" alt="Selling" width={24} height={24} />
                                            <h2>My Selling</h2>
                                        </div>
                                        <Link href="/listings" className={styles.viewLink}>View My Listings</Link>
                                    </div>
                                    <div className={styles.sellCard}>
                                        <h3>Sell Your Watch</h3>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                                        <button onClick={() => router.push('/mySelling')} className={styles.sellButton}>Sell Now</button>
                                    </div>
                                </div>

                                <div className={styles.purchaseSection}>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.iconText}>
                                            <Image src="/assets/icons/sidebar/purchase.png" alt="Purchase" width={22} height={22} />
                                            <h2>My Purchase</h2>
                                        </div>
                                        <Link href="/purchases" className={styles.viewLink}>View My Purchases</Link>
                                    </div>
                                    <div className={styles.purchaseCard}>
                                        <div className={styles.watchImagePurchase}>
                                            <Image
                                                src="/assets/watches/w4.png"
                                                alt="Rolex"
                                                width={200}  // Adjust based on your image dimensions
                                                height={200} // Adjust based on your image dimensions
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>

                                        <div className={styles.watchDetails}>
                                            <h3>Rolex Datejust Oyster 41mm</h3>
                                            <p>It is a long established fact that a reader will be distracted by the readable.</p>
                                            <div className={styles.priceAction}>
                                                <span className={styles.price}>$450/-</span>
                                                <button
                                                    onClick={() => router.push('/product')}
                                                    className={styles.buyButton}>Buy Now</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.rightColumn}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconText}>
                                        <Image src="/assets/icons/sidebar/watchlist.png" alt="Watchlist" width={28} height={18} />
                                        <h2>Watchlist</h2>
                                    </div>
                                </div>
                                <div className={styles.watchlistCard}>
                                    <div className={styles.watchImage}>
                                        <Image
                                            src="/assets/watches/w7.jpg"
                                            alt="Rolex"
                                            width={300}
                                            height={300}
                                            className={styles.watchImg}
                                            layout="responsive"
                                        />
                                        <div className={styles.watchActions}>
                                            <button className={styles.heartButton}>❤️</button>
                                            <button className={styles.moreButton}>≡</button>
                                        </div>
                                    </div>
                                    <div className={styles.watchlistInfo}>
                                        <h3>Rolex Datejust Oyster 41mm</h3>
                                        <div className={styles.datePrice}>
                                            <span className={styles.date}>24.10.2021, 19:35</span>
                                            <div className={styles.priceSection}>
                                                <span>BUY NOW</span>
                                                <span className={styles.price}>5,000.00</span>
                                            </div>
                                        </div>
                                        <button onClick={() => router.push('/watchlist')} className={styles.seeAllButton}>See All</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        <section className={styles.categories}>
                            <div className={styles.categoriesContainer}>
                                <h2>Categories</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '15px' }}>
                                    <p>Lorem Ipsum is simply dummy text of the<br /> printing and typesetting industry</p>
                                    <div className={styles.navigationArrows}>
                                        <button className={styles.arrowLeft}>
                                            <Image src="/assets/icons/leftArrow.png" alt="Left Arrow" width={17} height={10} />
                                        </button>
                                        <button className={styles.arrowRight}>
                                            <Image src="/assets/icons/rightArrow.png" alt="Right Arrow" width={17} height={10} />
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.categoryGrid}>
                                    {['Men\'s Watches', 'Women\'s Watches', 'Gold Watches', 'Diamond Watches'].map((category, index) => (
                                        <div key={index} className={styles.categoryCard}>
                                            <div className={styles.categoryImageWrapper}>
                                                <Image
                                                    src={`/assets/images/${category.toLowerCase().replace(' ', '-')}.jpg`}
                                                    alt={category}
                                                    width={300}
                                                    height={400}
                                                    objectFit="cover"
                                                />
                                                <h3>{category}</h3>
                                                <button className={styles.seeAllBtn}>
                                                    See All
                                                    <Image
                                                        src="/assets/icons/rightArrowGolden.png"
                                                        alt="Right Arrow"
                                                        width={15}
                                                        height={8}
                                                        style={{
                                                            display: 'inline-block',
                                                            verticalAlign: 'middle'
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
            {/* <button 
                className={styles.filterButton} 
                onClick={() => setIsFilterOpen(true)}
            >
                Filter
            </button> */}

            <FilterPopup
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </DashboardLayout>
    );
};

export default Dashboard; 