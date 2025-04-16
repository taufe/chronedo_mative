import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tokenAvailable, setTokenAvailable] = useState(false);

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

  useEffect(() => {
    const token =  localStorage?.getItem("token");
    console.log('token-------++++++++ in header',token)
    setTokenAvailable(!!token);
  }, []);

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
      <nav style={{ paddingRight: "7%" }} className={`nav-links ${isMenuOpen ? "active" : ""}`}>
  <ul>
    <li>
      <Link
        href="/"
        style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "14px" }}
      >
        Home
      </Link>
    </li>

    {/* 👇 These stay in DOM but are hidden when logged in */}
    <li style={{ visibility: tokenAvailable ? 'hidden' : 'visible' }}>
      <Link
        href="/login"
        style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "14px" }}
      >
        Login
      </Link>
    </li>
    <li style={{ visibility: tokenAvailable ? 'hidden' : 'visible' }}>
      <Link
        href="/signup"
        style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "14px" }}
      >
        Sign Up
      </Link>
    </li>
  </ul>
</nav>

{/* ✅ Show user icon when logged in */}
<div className="header-icons">
  <FaUser
    onClick={() => router.push("/dashboard")}
    className="icon"
    style={{ visibility: tokenAvailable ? "visible" : "hidden" }}
  />
</div>




      {/* <div className="header-icons">
        {!tokenAvailable && (
          <FaUser onClick={() => router.push("/login")} className="icon" />
        )}
      </div> */}

      {isMobile && (
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
    </header>
  );
};

export default Header;
