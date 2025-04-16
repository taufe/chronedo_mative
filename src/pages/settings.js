import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './settings.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
    // States for form values
    const [email, setEmail] = useState('Nico.baumgartner@testmail.com');
    const [password, setPassword] = useState('**********');
    const [phone, setPhone] = useState('41 79 123 45 67');
    const [nickname, setNickname] = useState('Nico Baumgartner');
    const [language, setLanguage] = useState('Deutsch');
    const [currency, setCurrency] = useState('CHF');
    const [firstName, setFirstName] = useState('Nicolas');
    const [lastName, setLastName] = useState('Baumgartner');
    const [birthday, setBirthday] = useState('02.03.1991');
    const [isLoading, setIsLoading] = useState(false);

    // States for address
    const [addressFirstName, setAddressFirstName] = useState('Nicolas');
    const [addressLastName, setAddressLastName] = useState('Baumgartner');
    const [company, setCompany] = useState('');
    const [addressSuffix, setAddressSuffix] = useState('');
    const [street, setStreet] = useState('Kleinweg 15');
    const [zip, setZip] = useState('3008');
    const [city, setCity] = useState('Bern');
    const [state, setState] = useState('Luzern');
    const [country, setCountry] = useState('Switzerland');

    // States for notification toggles
    const [notifications, setNotifications] = useState({
        generalEmail: true,
        generalSMS: false,
        generalApp: true,
        offerEmail: true,
        offerSMS: true,
        offerApp: true,
        outbidEmail: true,
        outbidSMS: false,
        outbidApp: false,
        watchlistEmail: true,
        watchlistSMS: false,
        watchlistApp: true,
        soldEmail: true,
        soldSMS: true,
        soldApp: false,
        bidEmail: false,
        bidSMS: false,
        bidApp: true
    });

    const handleNotificationToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    useEffect(() => {
        const fetchProfileApi = async () => {
          setIsLoading(true);
          const token = await localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            setIsLoading(false);
            return;
          }
      
          try {
            const response = await axios.get('https://chronedo.webjerky.com/api/profile', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            if (response.data.success) {
              const userData = response.data.data;
              setEmail(userData?.email ?? '');
              setFirstName(userData?.first_name ?? '');
              setLastName(userData?.last_name ?? '');
              setNickname(userData?.first_name + ' ' + userData?.last_name ?? '');
              setPhone(userData?.phone_no ?? '');
              setLanguage(userData?.default_language ?? 'Deutsch');
              setCurrency(userData?.default_price ?? 'CHF');
              setBirthday(userData?.date_of_birth ?? '');
      
              setAddressFirstName(userData?.first_name ?? '');
              setAddressLastName(userData?.last_name ?? '');
              setCompany(userData?.company ?? '');
              setAddressSuffix(userData?.address_suffix ?? '');
              setStreet(userData?.street ?? '');
              setZip(userData?.zip_code ?? '');
              setCity(userData?.city ?? '');
              setState(userData?.state ?? '');
              setCountry(userData?.country ?? 'Switzerland');
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchProfileApi();
      }, []);
      
    

    return (
        <DashboardLayout>
            <div className={styles.settingsContainer}>
                {/* Your Account Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Your Account</h2>
                    <div className={styles.formGroup}>
                        <label>E-mail <span className={styles.verified}>✓ Verified</span></label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="email"
                                className={styles.formInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                            <button className={styles.changeButton}>change</button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="password"
                                className={styles.formInput}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled
                            />
                            <button className={styles.changeButton}>change</button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Phone <span className={styles.verified}>✓ Verified</span></label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="tel"
                                className={styles.formInput}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled
                            />
                            <button className={styles.changeButton}>change</button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nickname (will be displayed publicly)</label>
                        <input
                            type="text"
                            className={styles.formInput}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                </div>

                {/* Language and Currency Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Language and currency</h2>
                    <div className={styles.formGroup}>
                        <label>Language</label>
                        <select
                            className={styles.formSelect}
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="Deutsch">Deutsch</option>
                            <option value="English">English</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Preferred currency</label>
                        <select
                            className={styles.formSelect}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="CHF">CHF</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>

                {/* User Details Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>User Details</h2>
                    <div className={styles.formGroup}>
                        <label>First name</label>
                        <input
                            type="text"
                            className={styles.formInput}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Last name</label>
                        <input
                            type="text"
                            className={styles.formInput}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Birthday</label>
                        <input
                            type="text"
                            className={styles.formInput}
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                </div>

                {/* Address Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Address</h2>
                    <div className={styles.addressGrid}>
                        <div className={styles.formGroup}>
                            <label>First name</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={addressFirstName}
                                onChange={(e) => setAddressFirstName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Last name</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={addressLastName}
                                onChange={(e) => setAddressLastName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Company</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Street</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Address suffix</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={addressSuffix}
                                onChange={(e) => setAddressSuffix(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>State/Province/Region</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <div className={styles.zipCityGroup}>
                            <div className={styles.formGroup}>
                                <label>ZIP</label>
                                <input
                                    type="text"
                                    className={`${styles.formInput} ${styles.withMarginRight}`}
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    

                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Country</label>
                            <select
                                className={styles.formSelect}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="Switzerland">Switzerland</option>
                                <option value="Germany">Germany</option>
                                <option value="Austria">Austria</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Advertising Messages Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Advertising Messages</h2>

                    <div className={styles.notificationGroup}>
                        <h3>General news from chronedo</h3>
                        <div className={styles.toggleGroup}>
                            <div className={styles.toggle}>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.generalEmail}
                                        onChange={() => handleNotificationToggle('generalEmail')}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <span className={styles.email}>EMAIL</span>
                            </div>
                            <div className={styles.toggle}>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.generalSMS}
                                        onChange={() => handleNotificationToggle('generalSMS')}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <span className={styles.email}>SMS</span>
                            </div>
                            <div className={styles.toggle}>
                                <label className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.generalApp}
                                        onChange={() => handleNotificationToggle('generalApp')}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <span className={styles.email}>APP</span>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinnerWrapper}>
                            <div className={styles.spinner}></div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Settings; 