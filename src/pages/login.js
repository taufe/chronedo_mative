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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


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
















// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import styles from "./Login.module.css";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import axios from "axios"; // Import axios
// import userIcon from "../../public/assets/icons/user.png";
// import eyeCloseIcon from "../../public/assets/icons/eyeclose.png";
// import eyeOpenIcon from "../../public/assets/icons/eyeopen.png";
// import checkIcon from "../../public/assets/icons/check.png";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secure, setSecure] = useState(true);
//   const [privacyPolicy, setPrivacyPolicy] = useState(false);
//   const [terms, setTerms] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   // const baseUlr = process.env.NEXT_PUBLIC_BASE_URL;


//   const handleLogin = async () => {



//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!privacyPolicy || !terms) {
//       setError("Please accept the privacy policy and terms.");
//       return;
//     }

//     setLoading(true);
//     setError("");


//     // useEffect(() => {
//     //   const fetchCredential = async () => {
//     //     try {
//     //       await axios.get("https://chronedo.webjerky.com/sanctum/csrf-cookie", {
//     //         withCredentials: true,
//     //       });
//     //     } catch (error) {
//     //       console.error("Error fetching credentials:", error);
//     //     }
//     //   };

//     //   fetchCredential();
//     // }, []);

//     try {
//       // const res = await axios.get("https://chronedo.webjerky.com/sanctum/csrf-cookie", {
//       //   withCredentials: true,
//       // });
//       const response = await axios.post("https://chronedo.webjerky.com/api/login", {
//         // const response = await axios.post(`${baseUlr}/login`, {
//         email,
//         password,
//       });
//       console.log('response of data', response)
//       if (response.data.success) {
//         localStorage.setItem("token", response.data.data.token);
//         router.push("/dashboard");
//       } else {
//         setError(response.data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const forgotPassword = () => {
//     router.push("/forgotPassword");
//   };

//   return (
//     <>
//       <Head>
//         <title>Login - Your Watch Selling Platform</title>
//         <meta
//           name="description"
//           content="Get in touch with us for inquiries about watches."
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div className={styles.innerContainer}>
//         <Image
//           src={userIcon}
//           alt="User"
//           className={styles.userImage}
//           width={100}
//           height={50}
//         />
//         <h2 className={styles.title}>LOG IN</h2>

//         {error && <p className={styles.errorMessage}>{error}</p>}

//         <div className={styles.inputWrapper}>
//           <input
//             type="email"
//             className={`${styles.input} ${styles.customPlaceholder}`}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//           />
//         </div>

//         <div className={styles.inputWrapper}>
//           <button
//             onClick={() => setSecure(!secure)}
//             className={styles.eyeButton}
//           >
//             <Image
//               src={secure ? eyeCloseIcon : eyeOpenIcon}
//               alt="Toggle visibility"
//               className={styles.eyeIcon}
//               width={22}
//               height={22}
//             />
//           </button>
//           <input
//             type={secure ? "password" : "text"}
//             className={`${styles.input} ${styles.customPlaceholder}`}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//         </div>

//         <div className={styles.forgotPasswordContainer}>
//           <span className={styles.forgotPassword} onClick={forgotPassword}>
//             Forgot Password?
//           </span>
//         </div>

//         <div className={styles.checkboxContainer}>
//           <label className={styles.checkboxLabel}>
//             <div
//               className={styles.customCheckbox}
//               onClick={() => setPrivacyPolicy(!privacyPolicy)}
//             >
//               {privacyPolicy && (
//                 <Image
//                   src="/assets/icons/on.png"
//                   alt="Checked"
//                   width={20}
//                   height={20}
//                 />
//               )}
//             </div>
//             I accept the privacy policy.
//           </label>
//           <label className={styles.checkboxLabel}>
//             <div
//               className={styles.customCheckbox}
//               onClick={() => setTerms(!terms)}
//             >
//               {terms && (
//                 <Image
//                   src="/assets/icons/on.png"
//                   alt="Checked"
//                   width={20}
//                   height={20}
//                 />
//               )}
//             </div>
//             I accept the terms and conditions.
//           </label>
//         </div>

//         <button
//           className={styles.submitButton}
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Log In"}
//         </button>

//         <p className={styles.orText}>Or</p>

//         <button
//           className={styles.socialButton}
//           onClick={() => console.log("LinkedIn login")}
//         >
//           <div className={styles.socialRectangle}>in</div>
//           Continue with LinkedIn
//         </button>

//         <button
//           className={styles.socialButton}
//           onClick={() => console.log("Google login")}
//         >
//           <div className={styles.socialRectangle}>G</div>
//           Continue with Google
//         </button>
//         <button
//           className={styles.socialButton}
//           onClick={() => console.log("Google login")}
//         >
//           <div className={styles.socialRectangle}>f</div>
//           Continue with FaceBook
//         </button>
//         <button
//           className={styles.socialButton}
//           onClick={() => console.log("Google login")}
//         >
//           <div className={styles.socialRectangle}>t</div>
//           Continue with Twitter
//         </button>

//         <Link href="/signup" passHref>
//           <button className={styles.alreadyHaveAccount}>
//             Create New Account
//           </button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Login;
