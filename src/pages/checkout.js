import { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './checkout.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useData } from '../context/contextApi';

const Checkout = () => {
  const { token } = useData();
  const [discountCode, setDiscountCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Switzerland');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoDetails, setPromoDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Secure Payment Service');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('Shipping to');

  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;

      const allowedFields = [
        'watch_id',
        'watch_price',
        'total_price',
        'watch_name',
        'reference_no',
        'brand',
        'model',
        'currency',
        'cover',
        'condition',
        'condition_description',
        'warranty_until',
        'box',
        'papers'
      ];

      const filteredParams = {};

      allowedFields.forEach((key) => {
        if (query[key] !== undefined && query[key] !== null) {
          filteredParams[key] = query[key];
        }
      });

      console.log("✅ Checkout Route Params (Filtered):", filteredParams);
      setParams(filteredParams);
    }
  }, [router.isReady]);

  const applyDiscountCode = async () => {
    if (!discountCode) {
      setError('Please enter a discount code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/checkCodeApi', {
        promo: discountCode.trim(),
        token: token
      });
      if (response.data.message === "Promo is valid") {
        const discount = parseFloat(response.data.promo.discount);
        setDiscountAmount(discount);
        setPromoDetails(response.data.promo);
        setError(null);
      } else {
        setError('Invalid discount code');
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.checkoutContainer}>
        <div className={styles.watchHeader}>
          <div className={styles.watchImage}>
            <Image
              src="/assets/watches/w9.png"
              alt="Watch"
              width={150}
              height={150}
              objectFit="cover"
            />
          </div>
          <div className={styles.watchInfo}>
            <h1>{params.watch_name || "Watch Name"}</h1>
            <p>{params.reference_no ? `Ref: ${params.reference_no}` : "No Reference"}</p>
          </div>
        </div>

        <div className={styles.productTags}>
          <div className={styles.tag}>
            <Image src="/assets/ProductPage/original.png" alt="Original" width={24} height={24} />
            <span>NEW/ORIGINAL PACKED</span>
          </div>
          <div className={styles.tag}>
            <Image src="/assets/ProductPage/private.png" alt="Private Seller" width={24} height={24} />
            <span>PRIVATE SELLER</span>
          </div>
          <div className={styles.tag}>
            <Image src="/assets/ProductPage/days.png" alt="Delivery Days" width={24} height={24} />
            <span>≈ 10 DAYS TO YOUR HOME</span>
          </div>
          <div className={styles.tag}>
            <Image src="/assets/ProductPage/warranty.png" alt="Warranty" width={24} height={24} />
            <span>WITH WARRANTY</span>
          </div>
        </div>

        <div className={styles.checkoutCard}>
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.priceSection}>
            <div className={styles.mainPrice}>
              <div className={styles.priceHeader}>
                <h2>Price</h2>
                <div className={styles.priceAmount}>
                  <h2>USD {params.watch_price || "0.00"}</h2>
                  <p className={styles.sellerCurrency}>
                    in currency of the seller:<br />
                    {params.currency || '---'} {params.total_price || '---'}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.discountSection}>
              <input
                type="text"
                placeholder="Gift card or discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className={styles.discountInput}
              />
              <button onClick={applyDiscountCode} className={styles.applyButton}>Apply</button>
              {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
            </div>

            <div className={styles.additionalCosts}>
              <h3 className={styles.additionalCost}>+ Additional costs</h3>
              <div className={styles.costItem}>
                <div>
                  <p className={styles.customCost}>Estimated Import Costs:</p>
                  <p className={styles.customCost}>Customs, Handling & VAT</p>
                </div>
                <span className={styles.customCost}>USD 280.00</span>
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
                  <p>1 Month Membership</p>
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
              {['Secure Payment Service', 'Direct bank payment to seller', 'Cash Payment'].map((option) => (
                <div key={option} className={styles.option} onClick={() => setSelectedPaymentMethod(option)}>
                  <div className={styles.optionLeft}>
                    <div className={selectedPaymentMethod === option ? styles.radioSelected : styles.radio} />
                    <span>{option}</span>
                  </div>
                  <div className={styles.optionRight}>
                    <span className={styles.questionMark}>?</span>
                    <span>{option === 'Secure Payment Service' ? 'USD 40.00' : 'USD 0.00'}</span>
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
              <div className={styles.option} onClick={() => setSelectedShippingMethod('Shipping to')}>
                <div className={styles.optionLeft}>
                  <div className={selectedShippingMethod === 'Shipping to' ? styles.radioSelected : styles.radio} />
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
              <div className={styles.option} onClick={() => setSelectedShippingMethod('Local Pickup at Sellers Location')}>
                <div className={styles.optionLeft}>
                  <div className={selectedShippingMethod === 'Local Pickup at Sellers Location' ? styles.radioSelected : styles.radio} />
                  <span>Local Pickup at Sellers Location</span>
                </div>
                <div className={styles.optionRight}>
                  <span className={styles.questionMark}>?</span>
                  <span>USD 0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className={styles.totalSection}>
            <div className={styles.totalAmount}>
              <h3>Total</h3>
              <h2>USD {params.total_price || '0.00'}</h2>
            </div>
            <button
              onClick={() => {
                router.push({
                  pathname: "/billing",
                  query: {
                    ...params,
                    final_price: params.total_price || "0.00", // Could subtract discount here
                    delivery_method: selectedShippingMethod,
                    payment_method: selectedPaymentMethod
                  }
                });
              }}
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
