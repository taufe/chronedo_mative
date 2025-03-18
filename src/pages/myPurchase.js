import DashboardLayout from "../components/Layout/DashboardLayout";
import Image from "next/image";
import styles from "./myPurchase.module.css";
import WatchCard from "../components/WatchCard";
import PurchasedCardPending from "../components/PurchasedCardPending";
import PurchasedCardInprogress from "../components/PurchasedCardInprogress";
import PurchasedCardCompleted from "../components/PurchasedCardCompleted";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const MyPurchase = () => {
  const [bottomTabIndex, setBottomTabIndex] = useState(1);
  const [purchaseStatus, setPurchaseStatus] = useState("pending");
  const [selectedCard, setSelectedCard] = useState(null); // New state
  const [purchasedData, setPurchasedData] = useState([]);
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [inProgressPurchases, setInProgressPurchases] = useState([]);
  const [completedPurchases, setCompletedPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openWatch, setOpenWatch] = useState([]);

  const getPurchasedWatches = async () => {
    setLoading(true);
    console.log("Fetching purchased watches...");
    const STATIC_TOKEN = "223|fQCZy8Ol01rCyB1aAH7bAM1vqLWG7h1mGUYVEzid85dc39bc";
    try {
      const headers = {
        Authorization: `Bearer ${STATIC_TOKEN}`,
      };
      const url = `https://chronedo.webjerky.com/api/getPurchasedWatches`;
      const response = await axios.get(url, { headers });

      console.log("Response from getPurchasedWatches", response.data.data);
      setPurchasedData(response.data.data);

      // Filter data based on order_status
      const pending = response.data.data.filter(
        (purchase) => purchase.order_status === 0
      );
      const inProgress = response.data.data.filter(
        (purchase) => purchase.order_status === 1
      );
      const completed = response.data.data.filter(
        (purchase) => purchase.order_status === 2
      );

      setPendingPurchases(pending);
      setInProgressPurchases(inProgress);
      setCompletedPurchases(completed);
    } catch (error) {
      console.error("Error fetching watches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPurchasedWatches();
  }, []);


  useEffect(() => {
    const fetchOpenWatchApi = async () => {
      const response = await axios.get('https://chronedo.webjerky.com/api/getOpenWatches', {
        headers: {
          Authorization: "Bearer 223|fQCZy8Ol01rCyB1aAH7bAM1vqLWG7h1mGUYVEzid85dc39bc"
        }
      });

      console.log('open watch----------', response);

      // Only set the state if response.data.data is an array
      if (Array.isArray(response.data.data)) {
        setOpenWatch(response.data.data);
      } else {
        console.error('Data is not an array');
      }
    };

    fetchOpenWatchApi();
  }, []);

  const openWatches = [
    {
      image: "/assets/watches/rolexDatejust.png",
      name: "Rolex Datejust Oyster 41mm",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 1,
    },
    {
      image: "/assets/watches/omegaSpeedmaster.png",
      name: "Omega Speedmaster",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 2,
    },
    {
      image: "/assets/watches/rolexDaydate.png",
      name: "Rolex Day-Date",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 3,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 4,
    },
    {
      image: "/assets/watches/w1.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 5,
    },
    {
      image: "/assets/watches/w2.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 6,
    },
    {
      image: "/assets/watches/w3.jpeg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 7,
    },
    {
      image: "/assets/watches/w4.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 8,
    },
    {
      image: "/assets/watches/w5.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 9,
    },
    {
      image: "/assets/watches/w6.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 10,
    },
    {
      image: "/assets/watches/w7.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 11,
    },
    {
      image: "/assets/watches/w8.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 12,
    },
    {
      image: "/assets/watches/w9.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 13,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
      id: 14,
    },
  ];

  const handleSellNow = (card) => {
    setSelectedCard(card);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  const renderPurchasedContent = () => {
    let content;

    if (selectedCard) {
      content = (
        <div
          className={`${styles.purchasedGrid} ${styles.purchasedGridSingleColumn}`}
        >
          <PurchasedCardInprogress
            key={selectedCard.id}
            {...selectedCard}
            showDetails={true}
            onBack={handleBack}
          />
        </div>
      );
    } else {
      content = (
        <div className={styles.purchasedGrid}>
          {purchaseStatus === "pending" &&
            pendingPurchases.map((purchase) => (
              <PurchasedCardPending
                key={purchase.id}
                image={purchase.watch.cover}
                name={purchase.watch.listing_title}
                price={purchase.watch.fixed_price_value}
                date={purchase.created_at}
                email={purchase.buyer.email}
                sellerName={`${purchase.seller.first_name} ${purchase.seller.last_name}`}
              />
            ))}
       

          {purchaseStatus === "inProgress" &&
            inProgressPurchases.map((purchase) => {
              return (
                <PurchasedCardInprogress
                  key={purchase.id}
                  image={purchase.watch.cover}
                  name={purchase.watch.listing_title}
                  price={purchase.watch.fixed_price_value}
                  date={purchase.created_at}
                  email={purchase.buyer.email}
                  sellerName={`${purchase.seller.first_name} ${purchase.seller.last_name}`}
                  onSellNow={handleSellNow}
                  showDetails={false}
                  purchaseOrderId={purchase.buyer.id}
                />
              );
            })}

          {purchaseStatus === "completed" &&
            completedPurchases.map((purchase) => (
              <PurchasedCardCompleted
                key={purchase.id}
                image={purchase.watch.cover}
                name={purchase.watch.listing_title}
                price={purchase.watch.fixed_price_value}
                date={purchase.created_at}
                email={purchase.buyer.email}
                sellerName={`${purchase.seller.first_name} ${purchase.seller.last_name}`}
              />
            ))}
        </div>
      );
    }

    return content;
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
          <div className={styles.iconsContainer}>
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

        <div className={styles.bottomTabBG}>
          <button
            onClick={() => setBottomTabIndex(1)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 1 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/open.png"
              alt="Open"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Open</span>
          </button>
          <div
            className={`${styles.bottomTabLine} ${
              bottomTabIndex === 0 || bottomTabIndex === 3
                ? styles.activeLine
                : ""
            }`}
          />
          <button
            onClick={() => setBottomTabIndex(2)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 2 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/ended.png"
              alt="Lost"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Lost</span>
          </button>
          <div
            className={`${styles.bottomTabLine} ${
              bottomTabIndex === 0 || bottomTabIndex === 1
                ? styles.activeLine
                : ""
            }`}
          />
          <button
            onClick={() => setBottomTabIndex(3)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 3 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/sold.png"
              alt="Purchased"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Purchased</span>
          </button>
        </div>

        {bottomTabIndex === 1 && (
          <div className={styles.watchesGrid}>
            {/* {openWatch.slice(0, 8).map((watch, index) => (
              <WatchCard
                key={index}
                image={watch.image}
                name={watch.name}
                date={watch.date}
                buyNowPrice={watch.buyNowPrice}
                bidPrice={watch.bidPrice}
              />
            ))} */}
           {openWatch?.map((watch, index) => (
          <WatchCard
            key={index}
            image={watch.cover}  
            name={watch.reference_no}  
            date= {watch?.created_at
              ? `${watch.created_at.split("T")[0]} ${watch.created_at.split("T")[1].split(".")[0]}`
              : "N/A"}
            buyNowPrice={watch.fixed_price}  
            bidPrice={watch.starting_price} 
          />
        ))}

          </div>
        )}
        {bottomTabIndex === 2 && (
          <div className={styles.watchesGrid}>
            {openWatches.slice(0, 6).map((watch, index) => (
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
        )}
        {bottomTabIndex === 3 && (
          <>
            <div className={styles.purchasedBar}>
              <button
                onClick={() => setPurchaseStatus("pending")}
                className={`${styles.purchaseStatusButton} ${
                  purchaseStatus === "pending" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/pending.png"
                  alt="Pending"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>Pending</span>
              </button>
              <div className={styles.statusLine} />
              <button
                onClick={() => setPurchaseStatus("inProgress")}
                className={`${styles.purchaseStatusButton} ${
                  purchaseStatus === "inProgress" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/inprogress.png"
                  alt="In-Progress"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>In-Progress</span>
              </button>
              <div className={styles.statusLine} />
              <button
                onClick={() => setPurchaseStatus("completed")}
                className={`${styles.purchaseStatusButton} ${
                  purchaseStatus === "completed" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/completed.png"
                  alt="Completed"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>Completed</span>
              </button>
            </div>
            {renderPurchasedContent()}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyPurchase;
