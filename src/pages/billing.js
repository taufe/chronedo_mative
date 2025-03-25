import { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import styles from "./billing.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useData } from '../context/contextApi';

const Billing = () => {
    const router = useRouter();
const { id, watch_price, total_price, watch_name, final_price, delivery_method } = router.query;
console.log('query in billing screen',router.query);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [customsDutyAccepted, setCustomsDutyAccepted] = useState(false);
    const [legalBindingAccepted, setLegalBindingAccepted] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState('')
    const {token} = useData()
    console.log('billing page token for fixed price',token)

    const handleConfirmPurchase = async () => {
    
        try {

          const response = await axios.post("/api/fixedPriceApi", { id, watch_price,total_price, watch_name,final_price,delivery_method, token });
        
          if (response.data.success === true) {
            console.log(response.data.message);
            setShowSuccessPopup(true);
          } else {
            setError(response.data.message || "Verification failed. Please try again.");
          }
        } catch (err) {
          console.error("API error:", err);
    
          if (err.response?.status === 401) {
            setError("Invalid email or password.");
          } else {
            setError(err.response?.data?.message || "An error occurred. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
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

            <div className={styles.productTags}>
                <div className={styles.tag}>
                    <Image
                        src="/assets/ProductPage/original.png"
                        alt="Original"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                    <span>NEW/ORIGINAL PACKED</span>
                </div>
                <div className={styles.tag}>
                    <Image
                        src="/assets/ProductPage/private.png"
                        alt="Private Seller"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                    <span>PRIVATE SELLER</span>
                </div>
                <div className={styles.tag}>
                    <Image
                        src="/assets/ProductPage/days.png"
                        alt="Delivery Days"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                    <span>≈ 10 DAYS TO YOUR HOME</span>
                </div>
                <div className={styles.tag}>
                    <Image
                        src="/assets/ProductPage/warranty.png"
                        alt="Warranty"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                    <span>WITH WARRANTY</span>
                </div>
            </div>

            <div className={styles.billingContainer}>
                <div className={styles.billingCard}>
                    <h1 className={styles.title}>Billing and Shipping</h1>

                    {/* Billing Address Section */}
                    <div className={styles.addressSection}>
                        <div className={styles.addressHeader}>
                            <h2>Billing Address</h2>
                            <button className={styles.editButton}>Edit</button>
                        </div>
                        <div className={styles.addressContent}>
                            <p>{billingAddress.name}</p>
                            <p>{billingAddress.street}</p>
                            <p>{billingAddress.zipCity}</p>
                            <p>{billingAddress.country}</p>
                            <p>{billingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Shipping Address Section */}
                    <div className={styles.addressSection}>
                        <div className={styles.addressHeader}>
                            <h2>Shipping Address</h2>
                            <button className={styles.editButton}>Edit</button>
                        </div>
                        <div className={styles.addressContent}>
                            <p>{shippingAddress.name}</p>
                            <p>{shippingAddress.street}</p>
                            <p>{shippingAddress.zipCity}</p>
                            <p>{shippingAddress.country}</p>
                            <p>{shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className={styles.orderSection}>
                        <h2>Your Order</h2>
                        <div className={styles.purchaseContract}>
                            <h3>Purchase contract with XYZ</h3>
                            <div className={styles.priceBreakdown}>
                                <div className={styles.priceRow}>
                                    <span>Item price</span>
                                    <span>EUR 10989.00</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span>Shipping</span>
                                    <span>EUR 200.00</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <div>
                                        <h4>Total price</h4>
                                        <p>in the currency of payment</p>
                                    </div>
                                    <div className={styles.totalAmount}>
                                        <h4>EUR 10989.00</h4>
                                        <p>≈ USD 10950.10</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Services Section */}
                        <div className={styles.additionalServices}>
                            <h3>Additional services from Chronedo</h3>
                            <div className={styles.serviceRow}>
                                <span>Secure Payment Service</span>
                                <span>USD 40.00</span>
                            </div>
                            <div className={styles.serviceRow}>
                                <span>Chronedo Protection Club Membership per Month</span>
                                <span>USD 40.00</span>
                            </div>
                        </div>

                        {/* Terms and Conditions Section */}
                        <div className={styles.termsSection}>
                            <div className={styles.checkboxRow}>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <p>
                                    I hereby acknowledge and accept the{" "}
                                    <Link href="/terms">Terms and Conditions</Link>.
                                </p>
                            </div>
                            <div className={styles.checkboxRow}>
                                <input
                                    type="checkbox"
                                    checked={customsDutyAccepted}
                                    onChange={(e) => setCustomsDutyAccepted(e.target.checked)}
                                />
                                <p>
                                    I am aware that this purchase may incur additional customs
                                    duties and import taxes.
                                </p>
                            </div>
                            <div className={styles.checkboxRow}>
                                <input
                                    type="checkbox"
                                    checked={legalBindingAccepted}
                                    onChange={(e) => setLegalBindingAccepted(e.target.checked)}
                                />
                                <p>
                                    I am aware that this is a legally binding purchase request to
                                    the seller.
                                </p>
                            </div>
                        </div>

                        <button
                            className={styles.confirmButton}
                            disabled={
                                !termsAccepted || !customsDutyAccepted || !legalBindingAccepted
                            }
                            onClick={handleConfirmPurchase}
                        >
                            CONFIRM PURCHASE
                        </button>
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

export default Billing;
