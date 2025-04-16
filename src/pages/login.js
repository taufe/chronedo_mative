"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Login.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import { GoogleLogin } from '@react-oauth/google';
import Spinner from '../components/Spinner';

import userIcon from "../../public/assets/icons/user.png";
import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
import { useData } from "../context/contextApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  // const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { setToken } = useData();

  // Add error timeout effect
  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        setError('');
      }, 4000); // 4 seconds
    }
    
    // Cleanup timeout on component unmount or when error changes
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [error]);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }


    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/loginApi", {
        email: email,
        password: password,
      });
      console.log("Login Response:", response.data.data.token);

      if (response.data.success) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
        setToken(token);
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(
          err.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      setError("");
      
      const res = await axios.post('/api/googleAuthApi', {
        idToken: response.credential
      });

      if (res.data.success) {
        const token = res.data.token;
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
        setToken(token);
        router.push("/dashboard");
      } else {
        setError(res.data.message || 'Google Sign-In failed');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError(error.response?.data?.message || 'An error occurred during Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError('Google Sign-In failed');
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

        {error && <p className={styles.errorMessage}>{error}</p>}

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
            type="button"
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
          <span
            className={styles.forgotPassword}
            onClick={() => router.push("/forgotPassword")}
          >
            Forgot Password?
          </span>
        </div>

      

        <button
          className={styles.submitButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Spinner size="small" />
            </div>
          ) : (
            "Log In"
          )}
        </button>

        <p className={styles.orText}>Or</p>

        <div style={{ width: '95%', margin: '0 auto' }}>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button
                className={styles.socialButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled || loading}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Spinner size="small" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <div className={styles.socialRectangle}>G</div>
                    Continue with Google
                  </>
                )}
              </button>
            )}
          />
        </div>

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