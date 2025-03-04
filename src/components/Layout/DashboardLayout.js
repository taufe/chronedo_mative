import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
// import styles from './DashboardLayout.module.css';
import styles from "./DashboardLayout.module.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose the font weights you need
  variable: "--font-poppins", // Creates a CSS variable for Tailwind or CSS use
});
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <button
        className={styles.menuToggle}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
