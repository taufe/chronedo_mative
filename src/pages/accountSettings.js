import React, { useState } from "react";
import Image from "next/image";
import styles from "./AccountSettings.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import accountSttingsIcon from "../../public/assets/icons/accountSettings.png";
import Dropdown from "../components/Dropdown";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";

const AccountSettings = () => {
  const router = useRouter();
  const { email } = router.query; // Email from query string
  console.log('email-----------', email);

  const [accountType, setAccountType] = useState("");
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [deliveryCountry, setDeliveryCountry] = useState("");



  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // Pass the values through the route to the next page
    router.push({
      pathname: "/accountSettings2",
      query: {
        email: email, 
        accountType: accountType,
        language: language,
        currency: currency,
        deliveryCountry: deliveryCountry
      }
    });
  };

  return (
    <>
      <Head>
        <title>Account Settings - Your Watch Selling Platform</title>
        <meta
          name="description"
          content="Configure your account settings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.innerContainer}>
        <Image
          src={accountSttingsIcon}
          alt="User"
          className={styles.userImage}
          width={100}
          height={50}
        />
        <h2 className={styles.title}>ACCOUNT SETTINGS</h2>

        <div style={{ marginTop: "10px" }} />
        <h4 style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Type of your account</h4>
        <Dropdown
          options={[
            { value: "personal", label: "Personal" },
            { value: "business", label: "Business" },
          ]}
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          placeholder="Select account type"
        />

        <h4 style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Language</h4>
        <Dropdown
          options={[
            { value: "en", label: "English" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
          ]}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Select language"
        />

        <h4 style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Show Prices in</h4>
        <Dropdown
          options={[
            { value: "usd", label: "USD" },
            { value: "eur", label: "EUR" },
            { value: "gbp", label: "GBP" },
          ]}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="Select currency"
        />

        <h4 style={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Delivery and customs charges calculate for
          <br />
          delivery to:
        </h4>
        <Dropdown
          options={[
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
          ]}
          value={deliveryCountry}
          onChange={(e) => setDeliveryCountry(e.target.value)}
          placeholder="Select delivery country"
        />

        <div
          className={styles.buttonContainer}
          style={{ display: "flex", gap: "20px", justifyContent: "center" }}
        >
          <BackButton onClick={handleBack} width="190px">
            Back
          </BackButton>
          <NextButton onClick={handleNext} width="190px">
            Next
          </NextButton>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
