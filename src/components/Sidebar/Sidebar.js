import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./Sidebar.module.css";

const sidebarItems = [
  {
    icon: "/assets/icons/sidebar/overview.png",
    activeIcon: "/assets/icons/sidebar/overviewOn.png",
    label: "Overview",
    path: "/dashboard",
  },
  {
    icon: "/assets/icons/sidebar/watchlist.png",
    activeIcon: "/assets/icons/sidebar/watchlistOn.png",
    label: "Watches",
    path: "/watches",
  },
  {
    icon: "/assets/icons/sidebar/messages.png",
    activeIcon: "/assets/icons/sidebar/messagesOn.png",
    label: "Messages",
    path: "/messages",
  },
  {
    icon: "/assets/icons/sidebar/purchase.png",
    activeIcon: "/assets/icons/sidebar/purchaseOn.png",
    label: "My Purchase",
    path: "/myPurchase",
  },
  {
    icon: "/assets/icons/sidebar/selling.png",
    activeIcon: "/assets/icons/sidebar/sellingOn.png",
    label: "My Selling",
    path: "/mySelling",
  },
  {
    icon: "/assets/icons/sidebar/myPromotings.png",
    activeIcon: "/assets/icons/sidebar/myPromotings.png",
    label: "My Promotings",
    path: "/myPromotings",
  },
  // {
  //   icon: "/assets/icons/sidebar/invoices.png",
  //   activeIcon: "/assets/icons/sidebar/invoices.png",
  //   label: "Invoices",
  //   path: "/invoices",
  // },
  {
    icon: "/assets/icons/sidebar/watchlist.png",
    activeIcon: "/assets/icons/sidebar/watchlistOn.png",
    label: "Watchlist",
    path: "/watchlist",
  },
  {
    icon: "/assets/icons/sidebar/promotableWatches.png",
    activeIcon: "/assets/icons/sidebar/promotableWatches.png",
    label: "Promotable Watches",
    path: "/promotableWatches",
  },
  {
    icon: "/assets/icons/sidebar/profile.png",
    activeIcon: "/assets/icons/sidebar/profileOn.png",
    label: "My Profile",
    path: "/myProfile",
  },
  {
    icon: "/assets/icons/sidebar/settings.png",
    activeIcon: "/assets/icons/sidebar/settingsOn.png",
    label: "Settings",
    path: "/settings",
  },
  {
    icon: "/assets/icons/sidebar/subscription.png",
    activeIcon: "/assets/icons/sidebar/subscriptionOn.png",
    label: "My Subscriptions",
    path: "/mySubscriptions",
  },
  {
    icon: "/assets/icons/sidebar/subscription.png",
    activeIcon: "/assets/icons/sidebar/subscriptionOn.png",
    label: "Online Payment",
    path: "/onlinePayment",
  },
  {
    icon: "/assets/icons/sidebar/logout.png",
    activeIcon: "/assets/icons/sidebar/logoutOn.png",
    label: "Log Out",
    action: (router) => {
      Cookies.remove("token");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        window.innerWidth <= 768 && // Apply only for mobile screens
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <aside ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContent}>
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
          className={styles.logoContainer}
        >
          <Image src="/assets/images/chronedo.png" alt="Chronedo Logo" width={150} height={30} />
        </div>

        {/* Sidebar Navigation */}
        <nav className={styles.navigation}>
          {sidebarItems.map((item, index) => {
            const isActive = router.pathname === item.path;
            return (
              <div
                key={index}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                onClick={() => {
                  if (item.action) {
                    item.action(router);
                  } else {
                    router.push(item.path);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={28}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Close Button (Visible only on mobile) */}
      <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
        ×
      </button>
    </aside>
  );
};

export default Sidebar;
