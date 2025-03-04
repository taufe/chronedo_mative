import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/router';

const sidebarItems = [
    {
        icon: '/assets/icons/sidebar/overview.png',
        activeIcon: '/assets/icons/sidebar/overviewOn.png',
        label: 'Overview',
        path: '/dashboard'
    },
    {
        icon: '/assets/icons/sidebar/messages.png',
        activeIcon: '/assets/icons/sidebar/messagesOn.png',
        label: 'Messages',
        path: '/messages'
    },
    {
        icon: '/assets/icons/sidebar/purchase.png',
        activeIcon: '/assets/icons/sidebar/purchaseOn.png',
        label: 'My Purchase',
        path: '/myPurchase'
    },
    {
        icon: '/assets/icons/sidebar/selling.png',
        activeIcon: '/assets/icons/sidebar/sellingOn.png',
        label: 'My Selling',
        path: '/mySelling'
    },
    {
        icon: '/assets/icons/sidebar/myPromotings.png',
        activeIcon: '/assets/icons/sidebar/myPromotings.png',
        label: 'My Promotings',
        path: '/myPromotings'
    },
    {
        icon: '/assets/icons/sidebar/invoices.png',
        activeIcon: '/assets/icons/sidebar/invoices.png',
        label: 'Invoices',
        path: '/invoices'
    },
    {
        icon: '/assets/icons/sidebar/watchlist.png',
        activeIcon: '/assets/icons/sidebar/watchlistOn.png',
        label: 'Watchlist',
        path: '/watchlist'
    },
    {
        icon: '/assets/icons/sidebar/promotableWatches.png',
        activeIcon: '/assets/icons/sidebar/promotableWatches.png',
        label: 'Promotable Watches',
        path: '/promotableWatches'
    },
    {
        icon: '/assets/icons/sidebar/profile.png',
        activeIcon: '/assets/icons/sidebar/profileOn.png',
        label: 'My Profile',
        path: '/myProfile'
    },
    {
        icon: '/assets/icons/sidebar/settings.png',
        activeIcon: '/assets/icons/sidebar/settingsOn.png',
        label: 'Settings',
        path: '/settings'
    },
    {
        icon: '/assets/icons/sidebar/subscription.png',
        activeIcon: '/assets/icons/sidebar/subscriptionOn.png',
        label: 'My Subscriptions',
        path: '/mySubscriptions'
    },
    {
        icon: '/assets/icons/sidebar/logout.png',
        activeIcon: '/assets/icons/sidebar/logoutOn.png',
        label: 'Log Out',
        path: '/login'
    },
];

const Sidebar = ({ isOpen, onClose }) => {
    const router = useRouter();
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.sidebarContent}>
                <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }} className={styles.logoContainer}>
                    <Image
                        src="/assets/images/chronedo.png"
                        alt="Chronedo Logo"
                        width={150}
                        height={30}
                    />
                </div>

                <nav className={styles.navigation}>
                    {sidebarItems.map((item, index) => {
                        const isActive = router.pathname === item.path;
                        return (
                            <Link href={item.path} key={index}>
                                <div className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                                    <Image
                                        src={isActive ? item.activeIcon : item.icon}
                                        alt={item.label}
                                        width={28}
                                        height={24}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <button 
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
            >
                ×
            </button>
        </aside>
    );
};

export default Sidebar; 