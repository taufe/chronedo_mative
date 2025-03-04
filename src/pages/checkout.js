import { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './checkout.module.css';
import { useRouter } from 'next/router';

const Checkout = () => {
    const [discountCode, setDiscountCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('Switzerland');
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className={styles.checkoutContainer}>

                <div className={styles.watchHeader}>
                    <div className={styles.watchImage}>
                        <Image
                            src="/assets/watches/w9.png"
                            alt="Rolex Daytona"
                            width={150}
                            height={150}
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.watchInfo}>
                        <h1>Rolex Daytona White Panda 2017</h1>
                        <p>bought at Bucherer 2022</p>
                    </div>
                </div>

                <div className={styles.productTags}>
                    <div className={styles.tag}>
                        <Image src="/assets/ProductPage/original.png" alt="Original" width={24} height={24} style={{ objectFit: 'contain' }} />
                        <span>NEW/ORIGINAL PACKED</span>
                    </div>
                    <div className={styles.tag}>
                        <Image src="/assets/ProductPage/private.png" alt="Private Seller" width={24} height={24} style={{ objectFit: 'contain' }} />
                        <span>PRIVATE SELLER</span>
                    </div>
                    <div className={styles.tag}>
                        <Image src="/assets/ProductPage/days.png" alt="Delivery Days" width={24} height={24} style={{ objectFit: 'contain' }} />
                        <span>≈ 10 DAYS TO YOUR HOME</span>
                    </div>
                    <div className={styles.tag}>
                        <Image src="/assets/ProductPage/warranty.png" alt="Warranty" width={24} height={24} style={{ objectFit: 'contain' }} />
                        <span>WITH WARRANTY</span>
                    </div>
                </div>


                <div className={styles.checkoutCard}>
                    <h1 className={styles.title}>Checkout</h1>
                    {/* Price Section */}
                    <div className={styles.priceSection}>
                        <div className={styles.mainPrice}>
                            <div className={styles.priceHeader}>
                                <h2>Price</h2>
                                <div className={styles.priceAmount}>
                                    <h2>USD 11002.15</h2>
                                    <p className={styles.sellerCurrency}>
                                        in currency of the seller:<br />
                                        EUR 10989.00
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Discount Code Input */}
                        <div className={styles.discountSection}>
                            <input
                                type="text"
                                placeholder="Gift card or discount code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className={styles.discountInput}
                            />
                            <button className={styles.applyButton}>Apply</button>
                        </div>

                        {/* Additional Costs */}
                        <div className={styles.additionalCosts}>
                            <h3>+ Additional costs</h3>
                            <div className={styles.costItem}>
                                <div>
                                    <p>Estimated Import Costs:</p>
                                    <p>Customs, Handling & VAT</p>
                                </div>
                                <span>USD 280.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Membership Section */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Membership</h3>
                            <span className={styles.close}>CLOSE</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.optionLeft}>
                                <div className={styles.radioSelected} />
                                <div>
                                    <h4>Chronedo Protection Club</h4>
                                    <p>1 Month Mebership</p>
                                </div>
                            </div>
                            <div className={styles.optionRight}>
                                <span className={styles.questionMark}>?</span>
                                <span>USD 40.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Payment</h3>
                            <span className={styles.close}>CLOSE</span>
                        </div>
                        <div className={styles.options}>
                            <div className={styles.option}>
                                <div className={styles.optionLeft}>
                                    <div className={styles.radioSelected} />
                                    <span>Secure Payment Service</span>
                                </div>
                                <div className={styles.optionRight}>
                                    <span className={styles.questionMark}>?</span>
                                    <span>USD 40.00</span>
                                </div>
                            </div>
                            {['Direct bank payment to seller', 'Cash Payment'].map((option) => (
                                <div key={option} className={styles.option}>
                                    <div className={styles.optionLeft}>
                                        <div className={styles.radio} />
                                        <span>{option}</span>
                                    </div>
                                    <div className={styles.optionRight}>
                                        <span className={styles.questionMark}>?</span>
                                        <span>USD 0.00</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Section */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Shipping</h3>
                            <span className={styles.close}>CLOSE</span>
                        </div>
                        <div className={styles.options}>
                            <div className={styles.option}>
                                <div className={styles.optionLeft}>
                                    <div className={styles.radioSelected} />
                                    <div>
                                        <div className={styles.shippingTo}>
                                            <span>Shipping to</span>
                                            <select
                                                value={selectedCountry}
                                                onChange={(e) => setSelectedCountry(e.target.value)}
                                            >
                                                <option value="Switzerland">Switzerland</option>
                                            </select>
                                        </div>
                                        <div className={styles.fees}>
                                            <div className={styles.feeItem}>
                                                <span>+ Estimated Customs Duties & Handling Fees</span>
                                                <span>USD 100.00</span>
                                            </div>
                                            <div className={styles.feeItem}>
                                                <span>+ Estimated Import VAT/Taxes</span>
                                                <span>USD 100.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.optionRight}>
                                    <span className={styles.questionMark}>?</span>
                                    <span>USD 200.00</span>
                                </div>
                            </div>
                            <div className={styles.option}>
                                <div className={styles.optionLeft}>
                                    <div className={styles.radio} />
                                    <span>Local Pickup at Sellers Location</span>
                                </div>
                                <div className={styles.optionRight}>
                                    <span className={styles.questionMark}>?</span>
                                    <span>USD 0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total and Checkout Button */}
                    <div className={styles.totalSection}>
                        <div className={styles.totalAmount}>
                            <h3>Total</h3>
                            <h2>USD 11562.15</h2>
                        </div>
                        <button
                            onClick={() => router.push('/billing')}
                            className={styles.checkoutButton}
                        >
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Checkout; 