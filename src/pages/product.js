import DashboardLayout from "../components/Layout/DashboardLayout";
import Image from "next/image";
import styles from "./product.module.css";
import Link from "next/link";
import { useState, useEffect,useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {Chat} from "../components/chat";

const Product = () => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [productData, setProductData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://chronedo.webjerky.com/api/watches",
          {
            headers: {
              Authorization: `Bearer 229|T82cf8yYBJt9juodKPLIFlLKYMlrDhESB3ue4eXWc2cfa83e`,
            },
          }
        );
        console.log('product screen response------------',response.data.data[0])
        if (response.data.success && response.data.data.length > 0) {
          setProductData(response.data.data[0]); // Set the first product from the list
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);


  return (
    <DashboardLayout>
      <div className={styles?.dashboardContainer}>
        <div className={styles?.header}>
          <div className={styles?.searchContainer}>
            <div className={styles?.searchWrapper}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <svg
                  className={styles.searchIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles?.iconsContainer}>
            <Image
              src="/assets/icons/notification.png"
              alt="Notifications"
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/cart.png"
              alt="Cart"
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/profile.png"
              alt="Profile"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className={styles?.productContainer}>
          <div className={styles?.productHeader}>
            <div className={styles?.titleSection}>
              <h1 className={styles?.productTitle}>
                {productData?.listing_title}
              </h1>
              <p className={styles.productSubtitle}>{productData?.subtitle}</p>
            </div>
            <div className={styles.actionIcons}>
            <button
                  onClick={() => {
                    console.log('watch id in product screen', { watch_id: productData.id });
                    router.push({
                      pathname: "/affiliate",
                      query: {
                        watch_id: productData.id,
                        // discount: 100,
                        // sales_commission: 100,
                      },
                    });
                  }}
                  className={styles.iconButton}
                >
                <Image
                  src="/assets/ProductPage/dollar.png"
                  alt="Price"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </button>
              <button className={styles.iconButton}>
                <Image
                  src="/assets/ProductPage/share.png"
                  alt="Share"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </button>
              <button className={styles.iconButton}>
                <Image
                  src="/assets/ProductPage/compare.png"
                  alt="Compare"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </button>
              <button className={styles.iconButton}>
                <Image
                  src="/assets/ProductPage/like.png"
                  alt="Like"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </button>
            </div>
          </div>

          <div className={styles.imagesSection}>
            <div className={styles.mainImage}>
              <Image
                src={productData?.cover || "/assets/ProductPage/watch1.png"}
                alt={productData?.listing_title || "Rolex Daytona Main"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.thumbnailsColumn}>
              {[2, 3, 4].map((index) => (
                <div key={index} className={styles.thumbnail}>
                  <Image
                    src={`/assets/ProductPage/watch${index}.png`}
                    alt={`Thumbnail ${index}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
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

          <div className={styles.pricingSection}>
            <div className={styles.priceBox}>
              <div className={styles.sellerPrice}>
                <div>
                  <h3>{productData?.currency}</h3>
                  <p>in currency of the seller</p>
                </div>
                <span className={styles.amount}>
                  {productData?.fixed_price_value}
                </span>
              </div>
              <div className={styles.convertedPrice}>
                <span>USD {productData?.fixed_price_value}</span>
              </div>

              <div className={styles.additionalCosts}>
                <div className={styles.costHeader}>
                  <span>+ Additional costs</span>
                  <span>USD 340.00</span>
                </div>
                <div className={styles.costDetail}>
                  <div>
                    <p>Estimated Import Costs:</p>
                    <p>Customs, Handling & VAT</p>
                  </div>
                  <span>USD 340.00</span>
                </div>
              </div>
              <button
                className={`${styles.moreButton} ${
                  isMoreExpanded ? styles.expanded : ""
                }`}
                onClick={() => setIsMoreExpanded(!isMoreExpanded)}
              >
                {isMoreExpanded ? "LESS" : "MORE"}
              </button>

              {isMoreExpanded && (
                <div className={styles.expandedSection}>
                  <div className={styles.membershipSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Membership</h3>
                      <span className={styles.close}>CLOSE</span>
                    </div>
                    <div className={styles.membershipOption}>
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

                  <div className={styles.paymentSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Payment</h3>
                      <span className={styles.close}>CLOSE</span>
                    </div>
                    <div className={styles.paymentOptions}>
                      <div className={styles.paymentOption}>
                        <div className={styles.optionLeft}>
                          <div className={styles.radioSelected} />
                          <span>Secure Payment Service</span>
                        </div>
                        <div className={styles.optionRight}>
                          <span className={styles.questionMark}>?</span>
                          <span>USD 40.00</span>
                        </div>
                      </div>
                      {["Direct bank payment to seller", "Cash Payment"].map(
                        (option) => (
                          <div key={option} className={styles.paymentOption}>
                            <div className={styles.optionLeft}>
                              <div className={styles.radio} />
                              <span>{option}</span>
                            </div>
                            <div className={styles.optionRight}>
                              <span className={styles.questionMark}>?</span>
                              <span>USD 0.00</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className={styles.shippingSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Shipping</h3>
                      <span className={styles.close}>CLOSE</span>
                    </div>
                    <div className={styles.shippingOptions}>
                      <div className={styles.shippingOption}>
                        <div className={styles.optionLeft}>
                          <div className={styles.radioSelected} />
                          <div>
                            <div className={styles.shippingTo}>
                              <span>Shipping to</span>
                              <select defaultValue="Switzerland">
                                <option value="Switzerland">Switzerland</option>
                              </select>
                            </div>
                            <div className={styles.estimatedFees}>
                              <span>
                                + Estimated Customs Duties & Handling Fees
                              </span>
                              <span>USD 100.00</span>
                            </div>
                            <div className={styles.estimatedTaxes}>
                              <span>+ Estimated Import VAT/Taxes</span>
                              <span>USD 100.00</span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.optionRight}>
                          <span className={styles.questionMark}>?</span>
                          <span>USD 200.00</span>
                        </div>
                      </div>
                      <div className={styles.paymentOption}>
                        <div className={styles.optionLeft}>
                          <div className={styles.radio} />
                          <span>Local Pickup at Seller Location</span>
                        </div>
                        <div className={styles.optionRight}>
                          <span className={styles.questionMark}>?</span>
                          <span>USD 0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.descriptionSection}>
              <div className={styles.descriptionHeader}>
                <h2>Description</h2>
                <div className={styles.translationInfo}>
                  <span>automatically translated</span>
                  <button className={styles.showOriginal}>Show original</button>
                </div>
              </div>
              <p className={styles.descriptionText}>
                {productData?.condition_description}
              </p>
            </div>

            <div className={styles.purchaseSection}>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>
                  {productData?.listing_title}
                </h2>
                <p className={styles.location}>Switzerland</p>
                <div className={styles.sellerCurrency}>
                  <p>in currency of the seller:</p>
                  <span>
                    {productData?.currency} {productData?.fixed_price_value}
                  </span>
                </div>
                <div className={styles.timeInfo}>
                  <Image
                    src="/assets/icons/clock.png"
                    alt="Time"
                    width={20}
                    height={20}
                  />
                  <span>{productData?.created_at}</span>
                  <span>noch 9 Tage und 3h</span>
                </div>
                <div className={styles.services}>
                  <span>Added Services</span>
                  <span>CHF 60.00</span>
                </div>
              </div>
              <div className={styles.buySection}>
                <button
                  onClick={() => {
                    // router.push("/checkout");
                    router.push({
                      pathname:'/checkout',
                      query:{
                        id:productData.id,
                        watch_price:productData.starting_price,
                        total_price:productData.fixed_price,
                        watch_name:productData.listing_title
                      }
                    })
                  }}
                  className={styles.buyButton}
                >
                  BUY NOW
                  <span>CHF {productData?.fixed_price_value}</span>
                </button>
                <span className={styles.usdPrice}>
                  USD {productData?.fixed_price_value}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.videoSection}>
            <h2 className={styles.videoTitle}>Review Video</h2>
            <div className={styles.videoWrapper}>
              <iframe
                className={styles.videoFrame}
                src="https://www.youtube.com/embed/YGQBm9Mnad8"
                title="Watch Review Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <h2 className={styles.sectionTitle}>Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Brand</span>
                <span className={styles.detailValue}>{productData?.brand}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Model</span>
                <span className={styles.detailValue}>{productData?.model}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Reference Number</span>
                <span className={styles.detailValue}>
                  {productData?.reference_no}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Year of first sale</span>
                <span className={styles.detailValue}>
                  {productData?.age_year_of_sale}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Condition</span>
                <span className={styles.detailValue}>
                  {productData?.condition_name}
                </span>
              </div>
            </div>
            <button className={styles.showDetailsButton}>Show details</button>
          </div>

          <div className={styles.warrantySection}>
            <h2 className={styles.sectionTitle}>Warranty</h2>
            <div className={styles.warrantyGrid}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Manufacturer</span>
                <span className={styles.detailValue}>
                  {productData?.manufacturer_warranty_until}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Seller</span>
                <span className={styles.detailValue}>none</span>
              </div>
            </div>
          </div>

          <div className={styles.scopeSection}>
            <h2 className={styles.sectionTitle}>Scope of Delivery</h2>
            <div className={styles.scopeGrid}>
              <div className={styles.scopeRow}>
                <span className={styles.scopeLabel}>Box</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.scopeValue}>Original Box</span>
              </div>
              <div className={styles.scopeRow}>
                <span className={styles.scopeLabel}>Papers</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.scopeValue}>
                  Original Warranty Card
                </span>
              </div>
              <div className={styles.scopeRow}>
                <span className={styles.scopeLabel}></span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.scopeValue}>Original Manual</span>
              </div>
              <div className={styles.scopeRow}>
                <span className={styles.scopeLabel}></span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.scopeValue}>
                  Receipt from initial purchase
                </span>
              </div>
            </div>
            <div className={styles.furtherInfo}>
              <span className={styles.furtherLabel}>Further</span>
              <p className={styles.furtherText}>
                {productData?.scope_of_delivery_description}
              </p>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h2 className={styles.sectionTitle}>Payment</h2>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>Delivery Time</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>about 10 days</span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>Availability</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>
                  Ready for shipment in 3-5 workdays
                </span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>Payment</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>
                  Cash payment upon collection
                </span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}></span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>
                  Bank payment to seller in USD
                </span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}></span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>Bank payment in CHF</span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>Handover</span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>
                  Handover in Basel, Switzerland
                </span>
              </div>
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}></span>
                <Image
                  src="/assets/icons/checkGreen.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                <span className={styles.paymentValue}>Shipping Worldwide</span>
              </div>
            </div>
          </div>

          <div className={styles.sellerSection}>
            <h2 className={styles.sectionTitle}>Seller</h2>
            <div className={styles.sellerGrid}>
              <div className={styles.sellerRow}>
                <div className={styles.sellerIconWrapper}>
                  <Image
                    src="/assets/ProductPage/private.png"
                    alt="Private User"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className={styles.sellerLabel}>Private User</span>
                <span className={styles.sellerValue}>Watch_Lover1993</span>
              </div>

              <div className={styles.sellerRow}>
                <div className={styles.sellerIconWrapper}>
                  <Image
                    src="/assets/ProductPage/location.png"
                    alt="Location"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className={styles.sellerLabel}>Switzerland</span>
                <span className={styles.sellerValue}>4665 Oftenrigen</span>
              </div>

              <div className={styles.sellerRow}>
  <div className={styles.sellerIconWrapper}>
    <Image
      src="/assets/ProductPage/original.png"
      alt="Rating"
      width={24}
      height={24}
      style={{ objectFit: "contain" }}
    />
  </div>
  <span className={styles.sellerLabel}>Rating</span>
  <div className={styles.ratingWrapper}>
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, index) => {
        const ratingValue = index + 1;
        const overallRating = productData?.seller_ratings?.overall_rating || 0;
        return (
          <span
            key={index}
            style={{
              color: ratingValue <= overallRating ? "#ffc107" : "#e4e5e9",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
    <span className={styles.ratingCount}>
      ({productData?.seller_ratings?.total_reviews || 0})
    </span>
  </div>
</div>

              <div className={styles.sellerRow}>
                <div className={styles.sellerIconWrapper}>
                  <Image
                    src="/assets/ProductPage/response.png"
                    alt="Response Time"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className={styles.sellerLabel}>Ø response time</span>
                <span className={styles.sellerValue}>2 hours</span>
              </div>
            </div>
            <button className={styles.showMoreButton}>Show more</button>
          </div>
        </div>
      </div>
     
     {/* message container */}
      <Chat />
{/* phose section */}

<div className={styles.photosSection}>
  <h3 className={styles.photosSectionTitle}>Added Services</h3>
  <p className={styles.description}>To make your shopping at CHRONEDO easy and safe, we offer you our Added Services.</p>
  
  <div className={styles.photosGrid}>
    {[
      {
        id: "cover",
        label: "Polishing and Cleaning",
        icon: "/assets/WatchDetails/cover.png",
        title: "Learn more",
      },
      {
        id: "back",
        label: "Trust Check incl. Fake Check",
        icon: "/assets/WatchDetails/back.png",
        title: "Learn more",
      },
      {
        id: "wristshot",
        label: "Transport Insurance",
        icon: "/assets/WatchDetails/wristshot.png",
        title: "Learn more",
      },
      {
        id: "defects",
        label: "Shipping",
        icon: "/assets/WatchDetails/defects.png",
        title: "Learn more",
      },
    ].map((item) => (
      <div key={item.id} className={styles.photoUploadBox}>
        <div htmlFor={item.id} className={styles.uploadLabel}>
          <Image
            src={item.icon}
            alt={item.label}
            width={80}
            height={120}
            style={{ objectFit: "contain" }}
          />
          </div>
          <div>
          <span className={styles.label}>{item.label}</span>
          <p className={styles.paragraph}>{item.title}</p>
          </div>
        </div>
      // </div>
    ))}
</div>
                </div>
    </DashboardLayout>
  );
};

export default Product;
