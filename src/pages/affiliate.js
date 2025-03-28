
import { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import styles from "./affiliate.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useData } from '../context/contextApi';

const Affiliate = () => {
  const router = useRouter();
  const { watch_id } = router.query;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [value, setValue] = useState(5);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [yourCommission, setYourCommission] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {token} = useData();
  console.log('affliate screen token',token)
  const originalPrice = 50000; // Example original price
  const salesCommission = (originalPrice * 0.10).toFixed(2);

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    calculateDiscount(newValue);
    e.target.style.setProperty('--value-percent', `${newValue}%`);
  };

  const calculateDiscount = (percentage) => {
    const commission = Number(salesCommission);
    const discountPercentage = Number(percentage);

    if (!isNaN(commission) && !isNaN(discountPercentage)) {
      const discount = (commission * discountPercentage) / 100;
      const finalAmount = commission - discount;
      setDiscountedAmount(finalAmount.toFixed(2));
      setYourCommission((commission - finalAmount).toFixed(2));
    } else {
      setDiscountedAmount('0.00');
    }
  };

  const handleGenerateCode = async () => {
    if (value === 0) {
      setError('Please set a discount value greater than 0 to generate code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/createPromoApi", {
        watch_id,
        discount: discountedAmount,
        sales_commission: yourCommission,
        token,

      });

      console.log('respone in affiliate screen--------',response.data)

      if (response.data) {
        setPromoCode(response.data.promo.promo_code);
        setShowSuccessPopup(true);
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
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
          <p style={{ fontWeight: 400, fontFamily: 'Poppins' }}>bought at Bucherer 2022</p>
          </div>
      </div>

      <div className={styles.billingContainer}>
        <div className={styles.billingCard}>
          <div className={styles.affiliateSection}>
            <h2>Affiliate: find a buyer and earn!</h2>
            <p>
              Create a code, share it with your followers, and earn money when
              one of them buys a watch using your code.
            </p>

            <div className={styles.affiliateRow}>
              <span>Price tag</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; {originalPrice}.00
              </span>
            </div>
            <div className={styles.affiliateRow}>
              <span>Available sales commission</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; {salesCommission}
              </span>
            </div>
            <div className={styles.affiliateRow}>
              <span>Discount</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; {discountedAmount}
              </span>
            </div>
            <div className={styles.affiliateRow}>
              <div className={styles.discount}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  className={styles.slider}
                  onChange={handleSliderChange}
                  style={{ '--value-percent': `${value}%` }}
                />
                <span>{value}%</span>
              </div>
            </div>
            <div className={styles.affiliateRow}>
              <span>Your sales commission</span>
              <span>USD {yourCommission}</span>
            </div>
            <button 
              className={styles.generateButton} 
              onClick={handleGenerateCode}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'GENERATE CODE'}
            </button>
            {promoCode && (
              <div className={styles.codeRow}>
                <span>Code:</span>
                <span className={styles.code}>{promoCode}</span>
              </div>
            )}
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>

        {showSuccessPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <button
                className={styles.closeButton}
                onClick={() => setShowSuccessPopup(false)}
              >
                <Image
                  src="/assets/icons/cross.png"
                  alt="Close"
                  width={24}
                  height={24}
                />
              </button>
              <div className={styles.popupContent}>
                <h2>Purchase Successful!</h2>
                <div className={styles.checkIcon}>
                  <Image
                    src="/assets/WatchDetails/check.png"
                    alt="Success"
                    width={120}
                    height={120}
                  />
                </div>
                <button
                  className={styles.backToDashboard}
                  onClick={() => router.push('/dashboard')}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Affiliate;
