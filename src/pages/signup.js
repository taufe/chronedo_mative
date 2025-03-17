import React, { useState } from "react";
import Image from "next/image";
import styles from "./Signup.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import userIcon from "../../public/assets/icons/user.png";
import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
import checkIcon from "../../public/assets/icons/check.png";
import axios from "axios";

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

  const sendData = async () => {
    // Validation
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate pin code generation
      const pin_code = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random pin

      // Send email, password, and pin code to the backend or use them for redirection
      const response = await axios.post("/api/verifythemailApi", { email });

      console.log("API Response:", response.data);

      if (response.data.success === true) {
        console.log(response.data.message);
        
        // Redirect with email, password, and pin_code in the query string
        router.push({
          pathname: "/verifyEmail",  // or another page like /registerPhone
          query: {
            email: email,
            password: password,
            pin_code: pin_code,
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
          />
        </div>

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

        <button className={styles.submitButton} onClick={sendData}>
          Next
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
          onClick={() => console.log("Facebook login")}
        >
          <div className={styles.socialRectangle}>f</div>
          Continue with Facebook
        </button>

        <button
          className={styles.socialButton}
          onClick={() => console.log("Twitter login")}
        >
          <div className={styles.socialRectangle}>t</div>
          Continue with Twitter
        </button>

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
