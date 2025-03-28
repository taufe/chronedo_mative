import Image from 'next/image';
import styles from './chat.module.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const Chat = ({ questionId }) => {
    const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        lastMessageDate: '',
        avatar: '/assets/images/person1.png'
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (questionId) {
            fetchConversationData();
        }
    }, [questionId]);

    const fetchConversationData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://chronedo.webjerky.com/api/watches/${questionId}/questions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            if (response.data.questions && response.data.questions.length > 0) {
                const formattedMessages = response.data.questions.flatMap(q => {
                    const messages = [{
                        id: q.id,
                        text: q.question,
                        sender: "other",
                        timestamp: new Date(q.created_at).toLocaleDateString(),
                        avatar: '/assets/images/person1.png',
                    }];
                    
                    if (q.answer) {
                        messages.push({
                            id: q.answer.id,
                            text: q.answer.answer,
                            sender: "self",
                            timestamp: new Date(q.answer.created_at).toLocaleDateString(),
                        });
                    }
                    return messages;
                });

                const firstQuestion = response.data.questions[0];
                setUserInfo({
                    name: 'Michelle',
                    lastMessageDate: new Date(firstQuestion.created_at).toLocaleDateString(),
                    avatar: '/assets/images/person1.png'
                });
                
                setMessages(formattedMessages);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching conversation data:', error);
        } finally {
            setLoading(false);
        }
    };

    const postQuestion = async (questionText) => {
        try {
            const response = await axios.post('/api/questionApi', {
                watchId: questionId,
                question: questionText,
                token: token
            });
            return response.data.question;
        } catch (error) {
            console.error('Error posting question:', error);
            throw error;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        try {
            const newQuestion = await postQuestion(inputMessage);
            if (newQuestion) {
                const newMessage = {
                    id: newQuestion.id,
                    text: inputMessage,
                    sender: "self",
                    timestamp: new Date().toLocaleDateString(),
                };

                setMessages([...messages, newMessage]);
                setInputMessage('');
                
                setUserInfo(prev => ({
                    ...prev,
                    lastMessageDate: new Date().toLocaleDateString()
                }));
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.chatUser}>
                    <Image src={userInfo.avatar} alt="User" width={32} height={32} className={styles.userAvatar} />
                    <h3>{userInfo.name}</h3>
                </div>
                <div className={styles.chatActions}>
                    <Image src="/assets/icons/info.png" alt="Info" width={24} height={24} />
                    <Image src="/assets/icons/more.png" alt="More" width={24} height={24} />
                </div>
            </div>

            {loading ? (
                <div className={styles.loadingContainer}>
                    <p>Loading conversation...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className={styles.noMessages}>
                    <p>No messages yet. Start the conversation!</p>
                </div>
            ) : (
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
            )}

            <div className={styles.messageInput}>
                <input
                    type="text"
                    placeholder="Type Here...."
                    className={styles.inputField}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                >
                    <Image src="/assets/icons/send.png" alt="Send" width={45} height={45} />
                </button>
            </div>
        </div>
    );
};