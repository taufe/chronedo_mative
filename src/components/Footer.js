import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const linkStyle = {
    display: "block",
    marginBottom: "10px",
    fontFamily: "Poppins",
    fontWeight: 400, // Corrected the typo
  };

  return (
    <footer className="footer">
      <div className="footer-divider"></div>
      <div style={{ marginBottom: "20px" }} className="footer-container">
        <div className="footer-section">
          <div className="logo2">
            <Image
              src="/assets/images/chronedo.png"
              alt="Chronedo Logo"
              width={150}
              height={40}
              priority
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <p className="footer-description">
            Simple innate summer fat
            <br />
            appear basket his desire joy.
          </p>
          <div
            className="social-icons"
            style={{ display: "flex", gap: "15px" }}
          >
            <Link href="#">
              <Image
                src="/assets/icons/linkedin.png"
                alt="LinkedIn"
                width={18}
                height={18}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/icons/messenger.png"
                alt="Messenger"
                width={18}
                height={18}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/icons/twitter.png"
                alt="Twitter"
                width={18}
                height={18}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/icons/twoo.png"
                alt="Twoo"
                width={18}
                height={18}
              />
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h4 style={{ fontFamily: "Poppins", fontWeight: 600 }}>Company</h4>
          <div>
            <Link href="#" style={linkStyle}>
              About Us
            </Link>
          </div>
          <div>
            <Link href="#" style={linkStyle}>
              Careers
            </Link>
          </div>
          <div>
            <Link href="#" style={linkStyle}>
              Blog
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h4 style={{ fontFamily: "Poppins", fontWeight: 600 }}>Resources</h4>
          <div>
            <Link href="#" style={linkStyle}>
              Templates
            </Link>
          </div>
          <div>
            <Link href="#" style={linkStyle}>
              Tutorials
            </Link>
          </div>
          <div>
            <Link href="#" style={linkStyle}>
              Free resources
            </Link>
          </div>
          <div>
            <Link href="#" style={linkStyle}>
              Contract templates
            </Link>
          </div>
        </div>
        <div className="footer-section newsletter">
          <h4 style={{ fontFamily: "Poppins", fontWeight: 600 }}>
            Join Our Newsletter
          </h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button
              style={{ fontFamily: "Poppins", fontWeight: 600 }}
              type="submit"
            >
              Subscribe
            </button>
          </form>
          <p className="newsletter-description">
            * Will send you weekly updates for your better finance management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
