import React, { useState } from "react";
import Image from "next/image";
import styles from "./Signup.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import userIcon from "../../public/assets/icons/user.png";
import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
import checkIcon from "../../public/assets/icons/check.png";

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

  const isValidEmail = (labelValue) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(labelValue);
  };

  const isValidForm = (password) => {
    setCapitalLetters(/[A-Z]/.test(password));
    setLower(/[a-z]/.test(password));
    setSpecial(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password));
    setNumber(/\d/.test(password));
    setLength(password.length >= 10 && password.length <= 20);
    setSpaces(!/\s/.test(password));
    setPassword(password);
  };

  const sendData = async () => {
    console.log("button is clicked");

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!privacyPolicy || !terms) {
      alert("Please accept privacy policy and terms");
      return;
    }

    if (
      !capitalLetters ||
      !lower ||
      !spaces ||
      (!special && !number) ||
      !length
    ) {
      alert("Password does not meet all requirements");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://chronedo.webjerky.com/api/verifyEmail",
        {
          email: email, // Ensure these are dynamic
          password: password,
        }
      );

      const data = response.data;
      console.log("API Response:", JSON.stringify(data, null, 2));

      if (data.success) {
        router.push("/verifyEmail");
        //   {
        //   pathname: "/verifyEmail",
        //   query: { email: data.data.email, pinCode: data.data.pin_code }
        // }
        // );
      } else {
        if (confirm("Email already exists. Would you like to login instead?")) {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
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
          onClick={() => console.log("Google login")}
        >
          <div className={styles.socialRectangle}>f</div>
          Continue with Facebook
        </button>
        <button
          className={styles.socialButton}
          onClick={() => console.log("Google login")}
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

// import React, { useState } from "react";
// import Image from "next/image";
// import styles from "./Signup.module.css";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";

// import userIcon from "../../public/assets/icons/user.png";
// import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
// import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
// import checkIcon from "../../public/assets/icons/check.png";

// const SignUp = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [capitalLetters, setCapitalLetters] = useState();
//   const [lower, setLower] = useState(false);
//   const [number, setNumber] = useState(false);
//   const [special, setSpecial] = useState(false);
//   const [length, setLength] = useState(false);
//   const [spaces, setSpaces] = useState(false);
//   const [secure, setSecure] = useState(true);
//   const [privacyPolicy, setPrivacyPolicy] = useState(false);
//   const [terms, setTerms] = useState(false);

//   const isValidForm = (password) => {
//     if (!isCapital(password)) {
//       setCapitalLetters(false);
//     } else {
//       setCapitalLetters(true);
//     }
//     if (!isLower(password)) {
//       setLower(false);
//     } else {
//       setLower(true);
//     }
//     if (!isSpecial(password)) {
//       setSpecial(false);
//     } else {
//       setSpecial(true);
//     }
//     if (!isNumber(password)) {
//       setNumber(false);
//     } else {
//       setNumber(true);
//     }
//     if (password.length < 10 || password.length > 20) {
//       setLength(false);
//     } else {
//       setLength(true);
//     }
//     if (isSpaces(password)) {
//       setSpaces(false);
//     } else {
//       setSpaces(true);
//     }
//     setPassword(password);
//   };

//   const isCapital = (labelValue) => {
//     const regx = /[A-Z]/;
//     return regx.test(labelValue);
//   };
//   const isLower = (labelValue) => {
//     const regx = /[a-z]/;
//     return regx.test(labelValue);
//   };
//   const isSpecial = (labelValue) => {
//     const regx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//     return regx.test(labelValue);
//   };

//   const isNumber = (labelValue) => {
//     const regx = /\d/;
//     return regx.test(labelValue);
//   };

//   const isSpaces = (labelValue) => {
//     const regx = /\s/;
//     return regx.test(labelValue);
//   };

//   const sendData = () => {
//     router.push("/verifyEmail");
//   };

//   return (
{
  /* <>
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
      <button onClick={() => setSecure(!secure)} className={styles.eyeButton}>
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
      onClick={() => console.log("Google login")}
    >
      <div className={styles.socialRectangle}>f</div>
      Continue with Facebook
    </button>
    <button
      className={styles.socialButton}
      onClick={() => console.log("Google login")}
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
</>; */
}
//   );
// };

// export default SignUp;
