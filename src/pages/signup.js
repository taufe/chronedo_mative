import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Signup.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from '../components/Spinner';
import userIcon from "../../public/assets/icons/user.png";
import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
import checkIcon from "../../public/assets/icons/check.png";

// Import Google Sign-In
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [capitalLetters, setCapitalLetters] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [length, setLength] = useState(false);
  const [spaces, setSpaces] = useState(false);
  const [secure, setSecure] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const isValidForm = (password) => {
    if (!isCapital(password)) {
      setCapitalLetters(false);
    } else {
      setCapitalLetters(true);
    }
    if (!isLower(password)) {
      setLower(false);
    } else {
      setLower(true);
    }
    if (!isSpecial(password)) {
      setSpecial(false);
    } else {
      setSpecial(true);
    }
    if (!isNumber(password)) {
      setNumber(false);
    } else {
      setNumber(true);
    }
    if (password.length < 10 || password.length > 20) {
      setLength(false);
    } else {
      setLength(true);
    }
    if (isSpaces(password)) {
      setSpaces(false);
    } else {
      setSpaces(true);
    }
    setPassword(password);
  };

  const isCapital = (labelValue) => {
    const regx = /[A-Z]/;
    return regx.test(labelValue);
  };

  const isLower = (labelValue) => {
    const regx = /[a-z]/;
    return regx.test(labelValue);
  };

  const isSpecial = (labelValue) => {
    const regx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regx.test(labelValue);
  };

  const isNumber = (labelValue) => {
    const regx = /\d/;
    return regx.test(labelValue);
  };

  const isSpaces = (labelValue) => {
    const regx = /\s/;
    return regx.test(labelValue);
  };

  const isValidEmail = (email) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(email);
  };

  const sendData = async () => {
    // Validation
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!(privacyPolicy && terms)) {
      setError("Please accept Terms & Conditions/Privacy Policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const pin_code = Math.floor(1000 + Math.random() * 9000); 
      const response = await axios.post("/api/verifythemailApi", { email });

      console.log("API Response:", response.data);

      if (response.data.success === true) {
        console.log(response.data.message);
        router.push({
          pathname: "/verifyEmail",  
          query: {
            email: email,
            password: password,
            pin_code: pin_code,
            latitude: latitude,
            longitude: longitude
          }
        });
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

  // Handle Google Sign-In
  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post('/api/googleAuthApi', {
        idToken: response.credential
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        router.push('/');
      } else {
        setError(res.data.message || 'Google Sign-In failed');
      }
    } catch (error) {
      setError('Failed to authenticate with Google');
    }
  };

  const handleGoogleFailure = (error) => {
    setError('Google Sign-In failed');
  };

  return (
    <>
      <Head>
        <title>Sign Up - Your Watch Selling Platform</title>
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
        <h2 className={styles.title}>REGISTER</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

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
            style={{ marginBottom: "20px" }}
            value={password}
            onChange={(e) => isValidForm(e.target.value)}
            placeholder="Password"
            onFocus={()=>setPasswordFocused(true)}
          />
        </div>
        {passwordFocused ? (
        <div className={styles.conditionsContainer}>
          {capitalLetters ? (
            <div className={styles.condition}>
              <Image
                src={checkIcon}
                alt="Check"
                className={styles.checkIcon}
                width={17}
                height={17}
              />
              <p>Capital letters {"[ABC]"}</p>
            </div>
          ) : (
            <div className={styles.condition}>
              <div className={styles.uncheckedIcon}></div>
              <p className={styles.errorText}>Capital letters {"[ABC]"}</p>
            </div>
          )}

          {lower ? (
            <div className={styles.condition}>
              <Image
                src={checkIcon}
                alt="Check"
                className={styles.checkIcon}
                width={17}
                height={17}
              />
              <p>Lowercase letters {"[abc]"}</p>
            </div>
          ) : (
            <div className={styles.condition}>
              <div className={styles.uncheckedIcon}></div>
              <p className={styles.errorText}>Lowercase letters {"[abc]"}</p>
            </div>
          )}

          {spaces ? (
            <div className={styles.condition}>
              <Image
                src={checkIcon}
                alt="Check"
                className={styles.checkIcon}
                width={17}
                height={17}
              />
              <p>No spaces</p>
            </div>
          ) : (
            <div className={styles.condition}>
              <div className={styles.uncheckedIcon}></div>
              <p className={styles.errorText}>No spaces</p>
            </div>
          )}

          {special || number ? (
            <div className={styles.condition}>
              <Image
                src={checkIcon}
                alt="Check"
                className={styles.checkIcon}
                width={17}
                height={17}
              />
              <p>A digit {"[123] / special character [! $ @]"}</p>
            </div>
          ) : (
            <div className={styles.condition}>
              <div className={styles.uncheckedIcon}></div>
              <p className={styles.errorText}>
                A digit {"[123] / special character [! $ @]"}
              </p>
            </div>
          )}

          {length ? (
            <div className={styles.condition}>
              <Image
                src={checkIcon}
                alt="Check"
                className={styles.checkIcon}
                width={17}
                height={17}
              />
              <p>10 - 20 letters</p>
            </div>
          ) : (
            <div className={styles.condition}>
              <div className={styles.uncheckedIcon}></div>
              <p className={styles.errorText}>10 - 20 letters</p>
            </div>
          )}
        </div>):null
}

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
            <div className={styles.customCheckbox} onClick={() => setTerms(!terms)}>
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

        <button 
          className={styles.submitButton} 
          onClick={sendData}
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
                disabled={renderProps.disabled}
                style={{ padding: '18px 0', fontSize: '1.1rem' }}
              >
                <div className={styles.socialRectangle}>G</div>
                Continue with Google
              </button>
            )}
          />
        </div>

        <Link href="/login" passHref>
          <button className={styles.alreadyHaveAccount}>
            Already have an account?
          </button>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
