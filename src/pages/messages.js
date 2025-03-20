import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './messages.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Messages = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [loader, setLoader] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser);
        }
    }, [selectedUser]);

    const fetchConversations = async () => {
        setLoader(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://chronedo.webjerky.com/api/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserID(response.data.message.user_id);

            const allMessages = response.data.data.Messages;
            const filteredMessages = allMessages.filter(msg =>
                msg.user_id === msg.from_id || msg.user_id === msg.to_id);

            const sortedMessages = filteredMessages.sort((a, b) =>
                new Date(b.created_at) - new Date(a.created_at));

            const lastMessages = {};
            sortedMessages.forEach(msg => {
                const otherUserId = msg.from_id === msg.user_id ? msg.to_id : msg.from_id;
                if (!(otherUserId in lastMessages)) {
                    lastMessages[otherUserId] = msg;
                }
            });

            const formattedMessages = Object.values(lastMessages).map(msg => ({
                Name: msg.from_id === msg.user_id ? msg.to_name : msg.from_name,
                LastMessage: msg.message,
                TimeStamp: msg.created_at,
                userID: response.data.message.user_id,
                fromID: msg.from_id,
                toID: msg.to_id
            }));

            setConversations(formattedMessages);
            setLoader(false);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const fetchMessages = async (user) => {
        setLoader(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://chronedo.webjerky.com/api/chat/${user.fromID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const transformedMessages = response.data.data.Messages.map(msg => ({
                id: msg.id,
                text: msg.message,
                sender: msg.from_id === userID ? 'self' : 'other',
                timestamp: new Date(msg.created_at).toLocaleDateString(),
                avatar: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
            }));

            setMessages(transformedMessages);
            setLoader(false);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const handleSendMessage = async (e) => {
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

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/sendMessage', {
                to_id: selectedUser.fromID,
                message: inputMessage,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error sending message:', error);
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
                        {conversations.map((conversation, index) => (
                            <div 
                                key={index} 
                                className={styles.chatItem}
                                onClick={() => setSelectedUser(conversation)}
                            >
                                <Image 
                                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" 
                                    alt="User" 
                                    width={40} 
                                    height={40} 
                                    className={styles.userAvatar} 
                                />
                                <div className={styles.chatInfo}>
                                    <div className={styles.chatHeaderListItem}>
                                        <h4>{conversation.Name}</h4>
                                        <span className={styles.date}>{conversation.TimeStamp}</span>
                                    </div>
                                    <p className={styles.lastMessage}>
                                        {conversation.LastMessage.substring(0, 20)}...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Chat Window */}
                    <div className={styles.chatWindow}>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatUser}>
                                <Image 
                                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" 
                                    alt="User" 
                                    width={32} 
                                    height={32} 
                                    className={styles.userAvatar} 
                                />
                                <h3>{selectedUser ? selectedUser.Name : 'Select a conversation'}</h3>
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
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                            />
                            <button className={styles.sendButton} onClick={handleSendMessage}>
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
// import DashboardLayout from '../components/Layout/DashboardLayout';
// import Image from 'next/image';
// import styles from './messages.module.css';
// import Link from 'next/link';
// import { useState, useRef, useEffect } from 'react';

// const Messages = () => {
//     const [inputMessage, setInputMessage] = useState('');
//     const [messages, setMessages] = useState([
//         {
//             id: 1,
//             text: "Hello, Is it possible to give as a deposit a new Tudor Black bay58 39mm with black dial on steel bracelet plus 3000.-? Kind regards Michelle",
//             sender: "other",
//             timestamp: "01.11.2021",
//             avatar: "/assets/images/person1.png",
//         },
//         {
//             id: 2,
//             text: "Hello Michelle Thank you rather not , the Tudor I would have to sell. Best regards",
//             sender: "self",
//             timestamp: "02.11.2021",
//         }
//     ]);

//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (!inputMessage.trim()) return;

//         const newMessage = {
//             id: messages.length + 1,
//             text: inputMessage,
//             sender: "self",
//             timestamp: new Date().toLocaleDateString(),
//         };

//         setMessages([...messages, newMessage]);
//         setInputMessage('');
//     };

//     // const handleKeyPress = (e) => {
//     //     if (e.key === 'Enter' && !e.shiftKey) {
//     //         e.preventDefault();
//     //         handleSendMessage(e);
//     //     }
//     // };


//     const handleKeyPress = async () => {
    
//         try {

//           const response = await axios.post("/api/fixedPriceApi", { to_id, message });
        
//           if (response.data.success === true) {
//             console.log(response.data);
//             setShowSuccessPopup(true);
//           } else {
//             setError(response.data || "Verification failed. Please try again.");
//           }
//         } catch (err) {
//           console.error("API error:", err);
    
//           if (err.response?.status === 401) {
//             setError("Invalid email or password.");
//           } else {
//             setError(err.response?.data || "An error occurred. Please try again later.");
//           }
//         } finally {
//           setLoading(false);
//         }
//       };

//     return (
//         <DashboardLayout>
//             <div className={styles.dashboardContainer}>
//                 <div className={styles.header}>
//                     <div className={styles.searchContainer}>
//                         <div className={styles.searchWrapper}>
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 className={styles.searchInput}
//                             />
//                             <button className={styles.searchButton}>
//                                 <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                     <div className={styles.iconsContainer}>
//                         <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
//                         <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
//                         <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
//                     </div>
//                 </div>
                
//                 <div className={styles.messagesContainer}>
//                     {/* Left Sidebar */}
//                     <div className={styles.chatsList}>
//                         <div className={styles.chatItem}>
//                             <Image src="/assets/images/person1.png" alt="User" width={40} height={40} className={styles.userAvatar} />
//                             <div className={styles.chatInfo}>
//                                 <div className={styles.chatHeaderListItem}>
//                                     <h4>Michelle</h4>
//                                     <span className={styles.date}>12.02.2022</span>
//                                 </div>
//                                 <p className={styles.lastMessage}>
//                                     {messages[messages.length - 1]?.text.substring(0, 20)}...
//                                 </p>
//                             </div>
//                         </div>
//                         {/* Add more chat items similarly */}
//                     </div>

//                     {/* Right Chat Window */}
//                     <div className={styles.chatWindow}>
//                         <div className={styles.chatHeader}>
//                             <div className={styles.chatUser}>
//                                 <Image src="/assets/images/person1.png" alt="Diana Wolf" width={32} height={32} className={styles.userAvatar} />
//                                 <h3>Michelle</h3>
//                             </div>
//                             <div className={styles.chatActions}>
//                                 <Image src="/assets/icons/info.png" alt="Info" width={24} height={24} />
//                                 <Image src="/assets/icons/more.png" alt="More" width={24} height={24} />
//                             </div>
//                         </div>

//                         <div className={styles.messagesList}>
//                             {messages.map((message) => (
//                                 <div 
//                                     key={message.id} 
//                                     className={`${styles.messageItem} ${message.sender === 'self' ? styles.ownMessage : ''}`}
//                                 >
//                                     {message.sender !== 'self' && (
//                                         <Image 
//                                             src={message.avatar} 
//                                             alt="User" 
//                                             width={32} 
//                                             height={32} 
//                                             className={styles.messageAvatar} 
//                                         />
//                                     )}
//                                     <div className={styles.messageContent}>
//                                         <p>{message.text}</p>
//                                         <span className={styles.messageTime}>{message.timestamp}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div ref={messagesEndRef} />
//                         </div>

//                         <div className={styles.messageInput}>
//                             <input 
//                                 type="text" 
//                                 placeholder="Type Here...." 
//                                 className={styles.inputField}
//                                 value={inputMessage}
//                                 onChange={(e) => setInputMessage(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                             />
//                             <button className={styles.sendButton}>
//                                 <Image src="/assets/icons/send.png" alt="Send" width={45} height={45} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DashboardLayout>
//     );
// };

// export default Messages; 