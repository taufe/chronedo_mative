import { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import styles from "./affiliate.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Affiliate = () => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [value, setValue] = useState(5);

  const handleConfirmPurchase = () => {
    setShowSuccessPopup(true);
  };

  const [billingAddress, setBillingAddress] = useState({
    name: "John Green",
    street: "Street 1",
    zipCity: "769787 Berlin",
    country: "Germany",
    phone: "+49 7676 56 426",
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: "John Green",
    street: "Street 1",
    zipCity: "769787 Berlin",
    country: "Germany",
    phone: "+49 7676 56 426",
  });

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    e.target.style.setProperty('--value-percent', `${newValue}%`);
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
          <p>bought at Bucherer 2022</p>
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
              <span>Discount</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; 45,000.00
              </span>
            </div>
            <div className={styles.affiliateRow}>
              <span>Available sales commission</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; 5,000.00
              </span>
            </div>
            <div className={styles.affiliateRow}>
              <span>Discount</span>
              <span className={styles.code}>
                USD &nbsp;&nbsp;&nbsp;&nbsp; 45,000.00
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
              <span>USD 2,750.00</span>
            </div>
            <button className={styles.generateButton}>GENERATE CODE</button>
            <div className={styles.codeRow}>
              <span>Code:</span>
              <span className={styles.code}>SELLER-1234</span>
            </div>
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
                  onClick={() => router.push("/dashboard")}
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
