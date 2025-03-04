import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './messages.module.css';
import Link from 'next/link';

const Messages = () => {
    return (
        <DashboardLayout>
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className={styles.searchInput}
                            />
                            <button className={styles.searchButton}>
                                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.iconsContainer}>
                        <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>
                
                <div className={styles.messagesContainer}>
                    {/* Left Sidebar */}
                    <div className={styles.chatsList}>
                        <div className={styles.chatItem}>
                            <Image src="/assets/images/person1.png" alt="User" width={40} height={40} className={styles.userAvatar} />
                            <div className={styles.chatInfo}>
                                <div className={styles.chatHeaderListItem}>
                                    <h4>Michelle</h4>
                                    <span className={styles.date}>12.02.2022</span>
                                </div>
                                <p className={styles.lastMessage}>Hello Mr. Baumberger, the...</p>
                            </div>
                        </div>
                        {/* Add more chat items similarly */}
                    </div>

                    {/* Right Chat Window */}
                    <div className={styles.chatWindow}>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatUser}>
                                <Image src="/assets/images/person1.png" alt="Diana Wolf" width={32} height={32} className={styles.userAvatar} />
                                <h3>Michelle</h3>
                            </div>
                            <div className={styles.chatActions}>
                                <Image src="/assets/icons/info.png" alt="Info" width={24} height={24} />
                                <Image src="/assets/icons/more.png" alt="More" width={24} height={24} />
                            </div>
                        </div>

                        <div className={styles.messagesList}>
                            <div className={styles.messageItem}>
                                <Image src="/assets/images/person1.png" alt="User" width={32} height={32} className={styles.messageAvatar} />
                                <div className={styles.messageContent}>
                                    <p>Hello, Is it possible to give as a deposit a new Tudor Black bay58 39mm with black dial on steel bracelet plus 3000.-? Kind regards Michelle</p>
                                    <span className={styles.messageTime}>01.11.2021</span>
                                </div>
                            </div>
                            
                            <div className={`${styles.messageItem} ${styles.ownMessage}`}>
                                <div className={styles.messageContent}>
                                    <p>Hello Michelle Thank you rather not , the Tudor I would have to sell. Best regards</p>
                                    <span className={styles.messageTime}>02.11.2021</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.messageInput}>
                            <input 
                                type="text" 
                                placeholder="Type Here...." 
                                className={styles.inputField}
                            />
                            <button className={styles.sendButton}>
                                <Image src="/assets/icons/send.png" alt="Send" width={45} height={45} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Messages; 