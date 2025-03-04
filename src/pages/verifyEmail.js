import React, { useState } from "react";
import Image from "next/image";
import styles from "./VerifyEmail.module.css";
import Head from "next/head";
import Link from "next/link";
import OtpInput from "../components/OtpInput";
import Button from "../components/Button";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { useRouter } from "next/router";
import emailIcon from "../../public/assets/icons/emailIcon.png";
import resendIcon from "../../public/assets/icons/resend.png";

const VerifyEmail = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");

  const handleOtpComplete = (otp) => {
    setVerificationCode(otp);
    // You can add additional logic here, such as auto-submitting the form
  };

  const handleBack = () => {
    router.back(); // This will navigate to the previous page in the browser history
  };

  const handleNext = () => {
    // Add logic for verifying the code if needed
    console.log("Verification code:", verificationCode);
    router.push("/registerPhone");
  };

  return (
    <>
      <Head>
        <title>Verify Email - Your Watch Selling Platform</title>
        <meta
          name="description"
          content="Verify your email to complete registration."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.innerContainer}>
        <Image
          src={emailIcon}
          alt="User"
          className={styles.userImage}
          width={100}
          height={50}
        />
        <h2 className={styles.title}>VERIFY EMAIL</h2>

        <h4 style={{ fontFamily: "Poppins", fontWeight: 400 }}>
          We have sent you an email with the verification code.
        </h4>

        <OtpInput length={4} onComplete={handleOtpComplete} />

        <h4 style={{ fontFamily: "Poppins", fontWeight: 400 }}>
          The code was sent to the following email address:
          <br />
          nico.baumgartner@testmail.com
        </h4>

        <div className={styles.resendContainer}>
          <Image
            src={resendIcon}
            alt="User"
            className={styles.resendImage}
            width={30}
            height={30}
          />
          <h4 style={{ fontFamily: "Poppins", fontWeight: 400 }}>
            Request code again
          </h4>
        </div>

        <div
          className={styles.buttonContainer}
          style={{ display: "flex", gap: "20px", justifyContent: "center" }}
        >
          <BackButton onClick={handleBack} width="175px">
            Back
          </BackButton>
          <NextButton onClick={handleNext} width="175px">
            Next
          </NextButton>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
