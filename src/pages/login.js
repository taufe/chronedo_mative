import React, { useState } from "react";
import Image from "next/image";
import styles from "./Login.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import userIcon from "../../public/assets/icons/user.png";
import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
import checkIcon from "../../public/assets/icons/check.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [terms, setTerms] = useState(false);
  const router = useRouter();

  const sendData = () => {
    // Send registration data
    router.push("/dashboard");
  };
  const forgotPassword = () => {
    router.push("/forgotPassword");
  };

  return (
    <>
      <Head>
        <title>Login - Your Watch Selling Platform</title>
        <meta
          name="description"
          content="Get in touch with us for inquiries about watches."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.innerContainer}>
        <Image
          src={userIcon}
          alt="User"
          className={styles.userImage}
          width={100}
          height={50}
        />
        <h2 className={styles.title}>LOG IN</h2>

        <div className={styles.inputWrapper}>
          <input
            type="email"
            className={`${styles.input} ${styles.customPlaceholder}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className={styles.inputWrapper}>
          <button
            onClick={() => setSecure(!secure)}
            className={styles.eyeButton}
          >
            <Image
              src={secure ? eyeCloseIcon : eyeOpenIcon}
              alt="Toggle visibility"
              className={styles.eyeIcon}
              width={22}
              height={22}
            />
          </button>
          <input
            type={secure ? "password" : "text"}
            className={`${styles.input} ${styles.customPlaceholder}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className={styles.forgotPasswordContainer}>
          <span className={styles.forgotPassword} onClick={forgotPassword}>
            Forgot Password?
          </span>
        </div>

        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <div
              className={styles.customCheckbox}
              onClick={() => setPrivacyPolicy(!privacyPolicy)}
            >
              {privacyPolicy && (
                <Image
                  src="/assets/icons/on.png"
                  alt="Checked"
                  width={20}
                  height={20}
                />
              )}
            </div>
            I accept the privacy policy.
          </label>
          <label className={styles.checkboxLabel}>
            <div
              className={styles.customCheckbox}
              onClick={() => setTerms(!terms)}
            >
              {terms && (
                <Image
                  src="/assets/icons/on.png"
                  alt="Checked"
                  width={20}
                  height={20}
                />
              )}
            </div>
            I accept the terms and conditions.
          </label>
        </div>

        <button className={styles.submitButton} onClick={sendData}>
          Log In
        </button>

        <p className={styles.orText}>Or</p>

        <button
          className={styles.socialButton}
          onClick={() => console.log("LinkedIn login")}
        >
          <div className={styles.socialRectangle}>in</div>
          Continue with LinkedIn
        </button>

        <button
          className={styles.socialButton}
          onClick={() => console.log("Google login")}
        >
          <div className={styles.socialRectangle}>G</div>
          Continue with Google
        </button>
        <button
          className={styles.socialButton}
          onClick={() => console.log("Google login")}
        >
          <div className={styles.socialRectangle}>f</div>
          Continue with FaceBook
        </button>
        <button
          className={styles.socialButton}
          onClick={() => console.log("Google login")}
        >
          <div className={styles.socialRectangle}>t</div>
          Continue with Twitter
        </button>

        <Link href="/signup" passHref>
          <button className={styles.alreadyHaveAccount}>
            Create New Account
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;
