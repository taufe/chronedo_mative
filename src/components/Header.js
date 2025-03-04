import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
        className="logo"
      >
        <Image
          src="/assets/images/chronedo.png"
          alt="Chronedo Logo"
          width={150} // Adjust based on your logo's dimensions
          height={40} // Adjust based on your logo's dimensions
          priority // Logo should load first
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <nav
        style={{ paddingRight: "7%" }}
        className={`nav-links ${isMenuOpen ? "active" : ""}`}
      >
        <ul>
          <li>
            <Link
              href="/"
              style={{
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              Home
            </Link>
          </li>
          {/* <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/product">Products</Link></li> */}
          <li>
            <Link
              style={{
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "14px",
              }}
              href="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              style={{
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "14px",
              }}
              href="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-icons">
        {/* <FaShoppingCart className="icon" /> */}
        <FaUser onClick={() => router.push("/login")} className="icon" />
      </div>
      {isMobile && (
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
    </header>
  );
};

export default Header;
