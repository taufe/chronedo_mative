import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './myProfile.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            // Get the token from localStorage or wherever you store it
            const token = localStorage.getItem('token');
            
            const response = await axios.get('https://chronedo.webjerky.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (response.data.success) {
                setProfileData(response.data.data);
            } else {
                setError('Failed to fetch profile data');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('An error occurred while fetching profile data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinnerWrapper}>
                    <div className={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={fetchProfileData} className={styles.retryButton}>
                        Retry
                    </button>
                </div>
            </DashboardLayout>
        );
    }

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
                
                <div className={styles.profileSection}>
                    <div className={styles.profileCard}>
                        <div className={styles.profileHeader}>
                            <Image 
                                src={profileData?.avatar || "/assets/images/person.png"} 
                                alt="Profile Picture" 
                                width={80} 
                                height={80} 
                                className={styles.profilePicture}
                            />
                            <h2 className={styles.profileName}>
                                {profileData?.first_name && profileData?.last_name 
                                    ? `${profileData.first_name} ${profileData.last_name}` 
                                    : profileData?.email || 'User'}
                            </h2>
                        </div>

                        <div className={styles.profileDetails}>
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/privateSeller.png" alt="Seller Type" width={24} height={24} />
                                <span>{profileData?.account_type || 'Private seller'}</span>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/location2.png" alt="Location" width={24} height={24} style={{ objectFit: 'contain' }} />
                                <span>
                                    {profileData?.city && profileData?.country 
                                        ? `${profileData.city}, ${profileData.country}` 
                                        : 'Location not set'}
                                </span>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/phone.png" alt="Phone" width={24} height={24} />
                                <span>{profileData?.phone_no || 'Phone not set'}</span>
                            </div>
                            <div className={styles.divider}></div>
                            
                            <div className={styles.detailRow}>
                                <Image src="/assets/profile/email.png" alt="Email" width={24} height={24} />
                                <span>{profileData?.email || 'Email not set'}</span>
                            </div>
                            <div className={styles.divider}></div>
                        </div>
                    </div>
                    
                    <div className={styles.ratingsCard}>
                        <h2 className={styles.ratingsTitle}>Seller Plan</h2>
                        
                        {profileData?.seller_plan && (
                            <div className={styles.planDetails}>
                                <div className={styles.planRow}>
                                    <span>Level:</span>
                                    <span>{profileData.seller_plan.level}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Monthly Fees:</span>
                                    <span>${profileData.seller_plan.monthly_fees}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Yearly Fees:</span>
                                    <span>${profileData.seller_plan.yearly_fees}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Available Boosters:</span>
                                    <span>{profileData.seller_plan.available_boosters}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Free Code Listing:</span>
                                    <span>{profileData.seller_plan.free_code_listing}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.ratingsCard}>
                        <h2 className={styles.ratingsTitle}>Influencer Plan</h2>
                        
                        {profileData?.influencer_plan && (
                            <div className={styles.planDetails}>
                                <div className={styles.planRow}>
                                    <span>Level:</span>
                                    <span>{profileData.influencer_plan.level}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Monthly Fees:</span>
                                    <span>${profileData.influencer_plan.monthly_fees}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Yearly Fees:</span>
                                    <span>${profileData.influencer_plan.yearly_fees}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Available Boosters:</span>
                                    <span>{profileData.influencer_plan.available_boosters}</span>
                                </div>
                                <div className={styles.planRow}>
                                    <span>Free Code Listing:</span>
                                    <span>{profileData.influencer_plan.free_code_listing}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyProfile; 