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
  const [gotMerchant, setGotMerchant] = useState(false);
  const [merchantData, setMerchantData] = useState(null);
  const [error, setError] = useState(null);

  const handleCountryChange = (e) => {
    const selectedCountry = countryListOPP.find(c => c.code === e.target.value);
    if (selectedCountry) setCountry(selectedCountry);
  };

  const getMerchant = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first');
  
      const response = await axios.get('https://chronedo.webjerky.com/api/getMerchant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setMerchantData(response.data);
        setGotMerchant(true);
      }
    } catch (err) {
      console.error('GET Merchant Error:', err);
      // Silently fail - we'll assume no merchant exists yet
      setGotMerchant(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMerchant();
  }, []);

  const registerMerchant = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
      console.log('token in get api', token);
  
      if (!token) {
        throw new Error('Please login first');
      }
  
      const payload = {
        accountType,
        country,
        chamberNumber: accountType === 'business' ? chamberNumber : undefined,
        token,
      };
  
      const response = await axios.post('/api/merchantApi', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response of post api',response.data)
    
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Registration failed';
      setError(message);
      console.error('Error registering merchant:', err);
    } finally {
      setLoading(false);
    }
  };


  const createBankAccount = async () => {
    const token = await localStorage.getItem('token');
    try {
        const response = await axios.get('https://chronedo.webjerky.com/api/createBankAccount', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log('respone of get api for create bank account',response.data)
        if (response.status === 200) {
            console.log('Bank account created successfully');
        } else {
            console.log('Error creating bank account');
        }
    } catch (error) {
        console.log('Error creating bank account please try again later', error);
    }
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
          <h2 style={{marginTop:0}} className={styles.subtitle}>Registration</h2>
        </div>

        {loading && <div className={styles.loader}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!gotMerchant ? (
          <>
           <div className={styles.accountTypeContainer}>
            <button
                className={`${styles.accountTypeButton} ${
                accountType === 'consumer' ? styles.active : ''
                }`}
                onClick={() => setAccountType('consumer')}
                style={{
                backgroundColor: accountType === 'consumer' ? '#A98754' : 'transparent',
                color: accountType === 'consumer' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                }}
            >
                Consumer
            </button>
            <button
                className={`${styles.accountTypeButton} ${
                accountType === 'business' ? styles.active : ''
                }`}
                onClick={() => setAccountType('business')}
                style={{
                backgroundColor: accountType === 'business' ? '#A98754' : 'transparent',
                color: accountType === 'business' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                }}
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
        ) : (
          <div className={styles.merchantStatus}>
            {merchantData?.bank_uid ? (
              <>
                <h3>Registration Complete</h3>
                <p>Your merchant account has been successfully created.</p>
                <div className={styles.merchantDetails}>
                  <p>Status: {merchantData.status}</p>
                  <p>Compliance: {merchantData.compliance_status}</p>
                </div>
              </>
            ) : (
              <div className={styles.registrationWrapper}>
                {/* <h3>Registration Successful</h3> */}
                <p className={styles.paragraph}>You have registered for the online payment Platform. Create a bank account to complete the process.</p>
                <button 
                  className={styles.actionButton}
                  disabled={loading}
                  onClick={createBankAccount}
                >
                  Create Bank Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OnlinePaymentRegistration;