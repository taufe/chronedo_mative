import React, { useEffect, useState } from 'react';
import styles from './onlinePayment.module.css';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import axios from 'axios';

const countryListOPP = [
  { name: 'Switzerland', code: 'CHE' },
  { name: 'Austria', code: 'AUT' },
];

const OnlinePaymentRegistration = () => {
  const [country, setCountry] = useState({ name: "Switzerland", code: "CHE" });
  const [accountType, setAccountType] = useState('consumer');
  const [chamberNumber, setChamberNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('checking');
  const [profileData, setProfileData] = useState(null);
  const [verificationUrl, setVerificationUrl] = useState('');

  const checkProfile = async () => {
    setLoading(true);
    setCurrentStep('checking');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const response = await axios.get('https://chronedo.webjerky.com/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data?.success) {
        setProfileData(response.data.data);
        
        const oppAccount = response.data.data.online_payment_platform_account;
        
        if (oppAccount) {
          if (!oppAccount.bank_uid) {
            setCurrentStep('createBank');
          } else if (oppAccount.compliance_status === 'unverified') {
            setCurrentStep('verify');
            setVerificationUrl(oppAccount.overview_url);
          } else {
            setCurrentStep('complete');
          }
        } else {
          setCurrentStep('register');
        }
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch profile');
      setCurrentStep('register');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  const registerMerchant = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('Please login first');
      }
  
      const data = {
        type: accountType,
        country: country.code,
        ...(accountType === 'business' && chamberNumber && { coc_nr: chamberNumber }),
      };
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
  
      const response = await axios.post(
        '/api/merchantApi',
        data,
        config
      );
  
      if (response.status === 200) {
        // After successful registration, check profile again to update status
        await checkProfile();
      } else {
        throw new Error(response.data?.message || 'Registration failed');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      console.error('Error registering merchant:', err);
    } finally {
      setLoading(false);
    }
  };

  const createBankAccount = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login first');
      }

      const response = await axios.get('https://chronedo.webjerky.com/api/createBankAccount', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200) {
        // After creating bank account, check profile again to update status
        await checkProfile();
      } else {
        throw new Error('Failed to create bank account');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to create bank account');
      console.error('Error creating bank account:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countryListOPP.find(c => c.code === e.target.value);
    if (selectedCountry) setCountry(selectedCountry);
  };

  if (currentStep === 'checking') {
    return (
      <DashboardLayout>
        <div className={styles.dashboardContainer}>
          <div className={styles.loader}>Checking your account status...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <Image
            src="/assets/icons/accountSettings.png" 
            alt="accountSettings"
            width={24}
            height={24}
          />
          <h1 className={styles.title}>Online Payment Platform</h1>
          <h2 className={styles.subtitle}>Registration</h2>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {currentStep === 'register' && (
          <>
            <div className={styles.accountTypeContainer}>
              <button
                className={`${styles.accountTypeButton} ${accountType === 'consumer' ? 'active' : ''}`}
                onClick={() => setAccountType('consumer')}
              >
                Consumer
              </button>
              <button
                className={`${styles.accountTypeButton} ${accountType === 'business' ? 'active' : ''}`}
                onClick={() => setAccountType('business')}
              >
                Business
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <select
                className={styles.select}
                value={country.code}
                onChange={handleCountryChange}
              >
                {countryListOPP.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {accountType === 'business' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Chamber of Commerce Number</label>
                <input
                  type="text"
                  className={styles.input}
                  value={chamberNumber}
                  onChange={(e) => setChamberNumber(e.target.value)}
                  placeholder="Enter your chamber of commerce number"
                />
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button 
                onClick={registerMerchant} 
                className={styles.registerButton}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Register'}
              </button>
            </div>
          </>
        )}

        {currentStep === 'createBank' && (
          <div className={styles.registrationWrapper}>
            <p className={styles.paragraph}>
              You have registered for the Online Payment Platform. Please create a bank account to complete the process.
            </p>
            <button 
              className={styles.actionButton}
              disabled={loading}
              onClick={createBankAccount}
            >
              {loading ? 'Processing...' : 'Create Bank Account'}
            </button>
          </div>
        )}

{currentStep === 'verify' && (
  <div className={styles.bankVerificationWrapper}>
    <h3 className={styles.h3}>Verification Required</h3>
    <p className={styles.paragraph}>
      Your Online Payment Platform registration requires personal verification. We are required to review your personal details in order to comply with financial legislation.
    </p>
    
    <div className={styles.verificationBox}>
      <p className={styles.verificationText}>Please visit the following link to complete verification:</p>
      <div className={styles.linkContainer}>
        <input
          type="text"
          value={verificationUrl}
          readOnly
          className={styles.verificationUrl}
          onClick={(e) => e.target.select()}
        />
        <button 
          className={styles.copyButton}
          onClick={() => {
            navigator.clipboard.writeText(verificationUrl);
            alert('Link copied to clipboard!');
          }}
        >
          Copy
        </button>
      </div>
      <div className={styles.verificationButtons}>
        <a 
          href={verificationUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.verificationButton}
        >
          Open Verification Page
        </a>
        <button 
          className={styles.refreshButton}
          onClick={checkProfile}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'I have completed verification'}
        </button>
      </div>
    </div>
  </div>
)}
        {currentStep === 'complete' && (
          <div className={styles.merchantStatus}>
            <h3 className={styles.h3}>Registration Complete</h3>
            <p>Your Online Payment Platform account is fully set up and verified.</p>
            {profileData?.online_payment_platform_account && (
              <div className={styles.merchantDetails}>
                <p><strong>Status:</strong> {profileData.online_payment_platform_account.status}</p>
                <p><strong>Compliance:</strong> {profileData.online_payment_platform_account.compliance_status}</p>
                <p><strong>Country:</strong> {profileData.online_payment_platform_account.country}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OnlinePaymentRegistration;















// import React, { useEffect, useState } from 'react';
// import styles from './onlinePayment.module.css';
// import DashboardLayout from '../components/Layout/DashboardLayout';
// import Image from 'next/image';
// import axios from 'axios';
// import Loader from '../components/Loader';

// const countryListOPP = [
//   { name: 'Switzerland', code: 'CHE' },
//   { name: 'Austria', code: 'AUT' },
// ];

// const OnlinePaymentRegistration = () => {
//   const [country, setCountry] = useState({ name: "Switzerland", code: "CHE" });
//   const [accountType, setAccountType] = useState('consumer');
//   const [chamberNumber, setChamberNumber] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentStep, setCurrentStep] = useState('checking');
//   const [bankAccountData, setBankAccountData] = useState(null);
//   const [bankCreated, setBankCreated] = useState(false);
//   const [verificationUrl, setVerificationUrl] = useState('');

  // const checkProfile = async () => {
  //   setLoading(true);
  //   setCurrentStep('checking');
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       setError('Please login first');
  //       setLoading(false);
  //       return;
  //     }

  //     const response = await axios.get('https://chronedo.webjerky.com/api/profile', {
  //       headers: { 'Authorization': `Bearer ${token}` }
  //     });

  //     if (response.data?.success) {
  //       setProfileData(response.data.data);
        
  //       const oppAccount = response.data.data.online_payment_platform_account;
        
  //       if (oppAccount) {
  //         if (!oppAccount.bank_uid) {
  //           setCurrentStep('createBank');
  //         } else if (oppAccount.compliance_status === 'unverified') {
  //           setCurrentStep('verify');
  //           setVerificationUrl(oppAccount.overview_url);
  //         } else {
  //           setCurrentStep('complete');
  //         }
  //       } else {
  //         setCurrentStep('register');
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Profile fetch error:', err);
  //     setError(err.response?.data?.message || 'Failed to fetch profile');
  //     setCurrentStep('register');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkProfile();
  // }, []);

  // const createBankAccount = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('Please login first');
  //     }

  //     const response = await axios.get(
  //       'https://chronedo.webjerky.com/api/createBankAccount',
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     );

  //     if (response.data?.success) {
  //       setBankAccountData(response.data.data);
  //       setBankCreated(true);
  //       setVerificationUrl(response.data.data.verification_url);
  //       // Don't check profile immediately - let user see success message
  //     } else {
  //       throw new Error(response.data?.message || 'Bank account creation failed');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message || 'Failed to create bank account');
  //     console.error('Bank account creation error:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const handleContinueVerification = () => {
//     if (verificationUrl) {
//       window.open(verificationUrl, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const handleCheckStatus = () => {
//     checkProfile(); // Refresh status after user completes verification
//   };

//   if (loading || currentStep === 'checking') {
//     return (
//       <DashboardLayout>
//         <div className={styles.loaderContainer}>
//           <Loader />
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (currentStep === 'complete') {
//     return (
//       <DashboardLayout>
//         <div className={styles.dashboardContainer}>
//           <div className={styles.header}>
//             <Image
//               src="/assets/icons/accountSettings.png" 
//               alt="accountSettings"
//               width={24}
//               height={24}
//             />
//             <h1 className={styles.title}>Online Payment Platform</h1>
//           </div>
//           <div className={styles.successMessage}>
//             <p>Your online payment platform setup is complete!</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className={styles.dashboardContainer}>
//         <div className={styles.header}>
//           <Image
//             src="/assets/icons/accountSettings.png" 
//             alt="accountSettings"
//             width={24}
//             height={24}
//           />
//           <h1 className={styles.title}>Online Payment Platform</h1>
//           <h2 className={styles.subtitle}>
//             {currentStep === 'register' ? 'Registration' : 
//              currentStep === 'createBank' ? 'Bank Account Setup' : 
//              'Verification'}
//           </h2>
//         </div>

//         {error && <div className={styles.error}>{error}</div>}

//         {bankCreated && (
//           <div className={styles.successMessage}>
//             <p>Bank account created successfully!</p>
//             <p>Please complete verification to finish setup.</p>
//             <div className={styles.buttonGroup}>
//               <button
//                 onClick={handleContinueVerification}
//                 className={styles.verifyButton}
//               >
//                 Complete Verification Now
//               </button>
//               <button
//                 onClick={handleCheckStatus}
//                 className={styles.secondaryButton}
//               >
//                 I've Completed Verification
//               </button>
//             </div>
//           </div>
//         )}

//         {!bankCreated && currentStep === 'createBank' && (
//           <div className={styles.stepContainer}>
//             <p className={styles.instructions}>
//               Your merchant account has been created. The next step is to set up your bank account.
//             </p>
//             <button
//               onClick={createBankAccount}
//               className={styles.actionButton}
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : 'Create Bank Account'}
//             </button>
//           </div>
//         )}

//         {currentStep === 'verify' && verificationUrl && (
//           <div className={styles.stepContainer}>
//             <p className={styles.instructions}>
//               Your Online Payment Platform registration requires personal verification. 
//               We are required to review your personal details to comply with financial legislation.
//             </p>
//             <div className={styles.buttonGroup}>
//               <button
//                 onClick={() => window.open(verificationUrl, '_blank', 'noopener,noreferrer')}
//                 className={styles.verifyButton}
//               >
//                 Complete Verification
//               </button>
//               <button 
//                 onClick={handleCheckStatus}
//                 className={styles.secondaryButton}
//               >
//                 Check Verification Status
//               </button>
//             </div>
//           </div>
//         )}

//         {currentStep === 'register' && (
//           <>
//             <div className={styles.accountTypeContainer}>
//               <button
//                 className={`${styles.accountTypeButton} ${accountType === 'consumer' ? styles.active : ''}`}
//                 onClick={() => setAccountType('consumer')}
//               >
//                 Consumer
//               </button>
//               <button
//                 className={`${styles.accountTypeButton} ${accountType === 'business' ? styles.active : ''}`}
//                 onClick={() => setAccountType('business')}
//               >
//                 Business
//               </button>
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Country</label>
//               <select
//                 className={styles.select}
//                 value={country.code}
//                 onChange={(e) => {
//                   const selectedCountry = countryListOPP.find(c => c.code === e.target.value);
//                   if (selectedCountry) setCountry(selectedCountry);
//                 }}
//               >
//                 {countryListOPP.map((country) => (
//                   <option key={country.code} value={country.code}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {accountType === 'business' && (
//               <div className={styles.formGroup}>
//                 <label className={styles.label}>Chamber of Commerce Number</label>
//                 <input
//                   type="text"
//                   className={styles.input}
//                   value={chamberNumber}
//                   onChange={(e) => setChamberNumber(e.target.value)}
//                   placeholder="Enter your chamber of commerce number"
//                 />
//               </div>
//             )}

//             <div className={styles.buttonGroup}>
//               <button 
//                 onClick={registerMerchant} 
//                 className={styles.registerButton}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Register'}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default OnlinePaymentRegistration;





