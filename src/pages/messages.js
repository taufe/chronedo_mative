import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './messages.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const Messages = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello, Is it possible to give as a deposit a new Tudor Black bay58 39mm with black dial on steel bracelet plus 3000.-? Kind regards Michelle",
            sender: "other",
            timestamp: "01.11.2021",
            avatar: "/assets/images/person1.png",
        },
        {
            id: 2,
            text: "Hello Michelle Thank you rather not , the Tudor I would have to sell. Best regards",
            sender: "self",
            timestamp: "02.11.2021",
        }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "self",
            timestamp: new Date().toLocaleDateString(),
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

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
                                <p className={styles.lastMessage}>
                                    {messages[messages.length - 1]?.text.substring(0, 20)}...
                                </p>
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
                            {messages.map((message) => (
                                <div 
                                    key={message.id} 
                                    className={`${styles.messageItem} ${message.sender === 'self' ? styles.ownMessage : ''}`}
                                >
                                    {message.sender !== 'self' && (
                                        <Image 
                                            src={message.avatar} 
                                            alt="User" 
                                            width={32} 
                                            height={32} 
                                            className={styles.messageAvatar} 
                                        />
                                    )}
                                    <div className={styles.messageContent}>
                                        <p>{message.text}</p>
                                        <span className={styles.messageTime}>{message.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className={styles.messageInput}>
                            <input 
                                type="text" 
                                placeholder="Type Here...." 
                                className={styles.inputField}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
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