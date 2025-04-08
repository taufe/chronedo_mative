import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './mySubscriptions.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
// import Stripe from "stripe";
const MySubscriptions = () => {
    const [bottomTabIndex, setBottomTabIndex] = useState(1);
    const [sellerPlans, setSellerPlans] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [influencerCurrentPlan, setInfluencerCurrentPlan] = useState([])
    const [sellerCurrentPlan, setSellerCurrentPlan] = useState([])
    const [loading, setLoading] = useState(false)
    const [noPlan, setNoPlan] = useState(false);


    useEffect(() => {
        if (bottomTabIndex === 1) {
            const fetchCurrentPlan = async () => {
                setIsLoading(true); 
                const token = await localStorage.getItem('token'); 
    
                try {
                    const response = await axios.get('https://chronedo.webjerky.com/api/getInfluencerCurrentPlan', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    console.log('Current Plan API Response:', response.data);
    
                    if (response.data && response.data.plan_details) {
                        influencerCurrentPlan(response.data.plan_details);
                        setNoPlan(false);
                    } else {
                        console.log('No current plan found');
                        setNoPlan(true);
                    }
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                    setNoPlan(true);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchCurrentPlan();
        }
    }, [bottomTabIndex]);
    

    useEffect(() => {
        if (bottomTabIndex === 2) {
            const fetchSellerPlans = async () => {
                setIsLoading(true); // Start loading
                const token = await localStorage.getItem('token');
    
                try {
                    const response = await axios.get('https://chronedo.webjerky.com/api/getPlans', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    console.log('response in seller level subscription-----', response.data);
    
                    const sellerPlanVariables = response.data.plans.filter(plan => plan.account_type === 'Seller');
                    setSellerPlans(sellerPlanVariables);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                } finally {
                    setIsLoading(false); // Stop loading
                }
            };
    
            fetchSellerPlans();
        }
    }, [bottomTabIndex]);


    useEffect(() => {
        if (bottomTabIndex === 3) {
            const fetchSellerPlans = async () => {
                setIsLoading(true);
                const token = await localStorage.getItem('token');
                try {
                    const response = await fetch('https://chronedo.webjerky.com/api/getPlans', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    const sellerPlans = data.plans.filter(plan => plan.account_type === 'Seller');
                    setSellerCurrentPlan(sellerPlans); // Use the corrected name here
                } catch (error) {
                    console.error('Fetch error:', error);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchSellerPlans();
        }
    }, [bottomTabIndex]);


    // const handleCheckout = async (plan) => {
    //     console.log("plan",plan);
    //     setLoading(true);
    
    //     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
    //     const response = await fetch("/api/stripePaymentApi", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         priceId: plan.id, // ✅ use the passed plan here
    //         packageDetails: {
    //             plan_id:  user._id,
    //           name: plan.level, // use fallback if `title` is not available
    //           trx_id: trx_id,
    //           price:  plan.monthly_fees,
    //           images: null, // make sure it's an array
    //         }
    //       }),
    //     });
    
    //     const session = await response.json();
    //     const result = await stripe.redirectToCheckout({ sessionId: session.id });
    //     setLoading(false);
    
    //     if (result.error) {
    //       console.error(result.error.message);
    //     }
    // };


    const handleCheckout = async (plan) => {
        console.log("checkout");
        setLoading(true);
    
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
        const response = await fetch("/api/stripePaymentApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // priceId: card.id,
            packageDetails: {
                plan_id: plan?.id,
                // trx_id: 10,
              price: plan.monthly_fees,
            //   images: card.images,
            }
          }),
        });
    
        const session = await response.json();
    
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        setLoading(false);
    
        if (result.error) {
          console.error(result.error.message);
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

                <div className={styles.bottomTabBG}>
                    <button
                        onClick={() => setBottomTabIndex(1)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 1 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/influencerLevel.png" alt="Open" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>My Influencer Level</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 3 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(2)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 2 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/sellerLevel.png" alt="Lost" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>My Sellers Level</span>
                    </button>
                    <div className={`${styles.bottomTabLine} ${bottomTabIndex === 0 || bottomTabIndex === 1 ? styles.activeLine : ''}`} />
                    <button
                        onClick={() => setBottomTabIndex(3)}
                        className={`${styles.bottomTabButton} ${bottomTabIndex === 3 ? styles.activeTab : ''}`}>
                        <Image src="/assets/Home/cpc.png" alt="Purchased" width={32} height={35} className={styles.bottomTabImage} style={{ objectFit: 'contain' }} />
                        <span className={styles.bottomTabText}>CPC</span>
                    </button>
                </div>
                {bottomTabIndex === 1 && (
                <div className={styles.subscriptionCards}>
                    {isLoading ? (
                        <div className={styles.loader}>Loading...</div>
                    ) : influencerCurrentPlan?.length === 0 ? (
                        <div className={styles.noPlan}>No active plan found for the user.</div>
                    ) : (
                        influencerCurrentPlan?.map((plan) => (
                            <div key={plan.id} className={styles.card}>
                                <div className={styles.feeSection}>
                                    <h3 className={styles.feeAmount}>
                                        {plan.monthly_fees === "0" ? "None" : `$${plan.monthly_fees}`}
                                    </h3>
                                    <p className={styles.feeType}>Monthly Fees</p>
                                </div>
                                <h2 className={styles.cardTitle}>{plan.level}</h2>
                                <div className={styles.features}>
                                    <div className={styles.feature}>
                                        <span>✓</span> {plan.type_of_commission === 0 ? 'Fixed Commission' : 'Variable Commission'}
                                    </div>
                                    <div className={styles.feature}>
                                        <span>✓</span> {plan.free_code_listing === 0 ? 'No Free Listings' : `${plan.free_code_listing} Free Listings`}
                                    </div>
                                    <div className={styles.feature}>
                                        <span>✓</span> {plan.commission_payout_period_months ? `${plan.commission_payout_period_months} days Payout` : 'No Payout Period'}
                                    </div>
                                </div>
                                <button className={styles.buyButton}>Buy Now</button>
                            </div>
                        ))
                    )}
                </div>
            )}

        {bottomTabIndex === 2 && (
            <div className={styles.subscriptionCards}>
             {isLoading ? (
            <div className={styles.loader}>Loading...</div>
             ) : (
            sellerPlans?.map((plan) => (
                <div key={plan.id} className={styles.card}>
                    <div className={styles.feeSection}>
                        <h3 className={styles.feeAmount}>
                            {plan.monthly_fees === "0" ? "None" : `$${plan.monthly_fees}`}
                        </h3>
                        <p className={styles.feeType}>Monthly Fees</p>
                    </div>
                    <h2 className={styles.cardTitle}>{plan.level}</h2>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span>✓</span> {plan.type_of_commission === 0 ? 'Fixed Commission' : 'Variable Commission'}
                        </div>
                        <div className={styles.feature}>
                            <span>✓</span> {plan.free_code_listing === 0 ? 'No Free Listings' : `${plan.free_code_listing} Free Listings`}
                        </div>
                        <div className={styles.feature}>
                            <span>✓</span> {plan.commission_payout_period_months ? `${plan.commission_payout_period_months} months Payout` : 'No Payout Period'}
                        </div>
                    </div>
                    <button onClick={()=>handleCheckout(plan)} className={styles.buyButton}>Buy Now</button>
                </div>
            ))
        )}
         </div>
        )}

        {bottomTabIndex === 3 && (
            <div className={styles.subscriptionCards}>
                {isLoading ? (
                    <div className={styles.loader}>Loading...</div>
                ) : (
                    sellerCurrentPlan?.map((plan) => (
                        <div key={plan.id} className={`${styles.card} ${styles.professionalCard}`}>
                            <div className={styles.feeSection}>
                                <h3 className={styles.feeAmount}>
                                    {plan.monthly_fees === "0" ? "None" : `$${plan.monthly_fees}`}
                                </h3>
                                <p className={styles.feeType}>Monthly Fees</p>
                            </div>
                            <h2 className={styles.cardTitle}>{plan.level}</h2>
                            <div className={`${styles.features} ${styles.cpcFeatures}`}>
                                <div className={styles.feature}>
                                    • {plan.type_of_commission === 0 ? 'Fixed Commission' : 'Variable Commission'}
                                </div>
                                <div className={styles.feature}>
                                    • {plan.free_code_listing === 0 ? 'No Free Listings' : `${plan.free_code_listing} Free Listings`}
                                </div>
                                <div className={styles.feature}>
                                    • {plan.commission_payout_period_months ? `${plan.commission_payout_period_months} months Payout` : 'No Payout Period'}
                                </div>
                                <div className={styles.feature}>
                                    • Priority customer service through a dedicated channel.
                                </div>
                                <div className={styles.feature}>
                                    • Exclusive offers and discounts via the Club newsletter.
                                </div>
                            </div>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    ))
                )}
    </div>
)}

            </div>
        </DashboardLayout>
    );
};

export default MySubscriptions;

