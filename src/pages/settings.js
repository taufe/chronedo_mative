import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './settings.module.css';
import { useState } from 'react';

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

                    <div className={styles.stayLoggedIn}>
                        <label className={styles.toggleSwitch}>
                            <input type="checkbox" />
                            <span className={styles.slider}></span>
                        </label>
                        <span>Stay logged in</span>
                        <p className={styles.loginHelper}>I would like to store my login details on this device so that I have to log in to it less often.</p>
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
                                    className={styles.formInput} 
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
                                <span>EMAIL</span>
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
                                <span>SMS</span>
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
                                <span>APP</span>
                            </div>
                        </div>
                    </div>

                    {/* Add similar notification groups for other categories */}
                    {/* Offer from chronedo suitable for you */}
                    {/* System Messages */}
                    {/* When you are outbid */}
                    {/* When an item from your watchlist is about to expire */}
                    {/* When you have successfully sold an item */}
                    {/* Message when you have received a bid */}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings; 