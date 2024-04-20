import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { FiUser } from "react-icons/fi";
import { userState } from "../store/userState";

const url = import.meta.env.VITE_BACKEND_URL;

let socket;

const Community = () => {

    const user = userState((state) => state.user);
    const chatBottomRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [length, setLength] = useState(0);


    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setMessage(value);
            setLength(value.length);
        }
    }

    const connectSocket = () => {
        socket = io(url, { withCredentials: true });

        socket.on('connect', () => {
            console.log('Connected to server...');
        });

        socket.on('chat', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        socket.on('chat_history', (msg) => {
            setMessages(msg);
        });
    }

    const sendSocketMessage = () => {
        if (message.length > 0 && message.length <= 200) {
            socket.emit('send_chat', { message, user: user.name });
            setMessage('');
            setLength(0);
        }
    }

    useEffect(() => {

        if (user.loggedIn) {
            connectSocket();
        }

        return () => {
            if (socket) {
                socket.disconnect();
                socket.off('connect');
                socket.off('chat');
                socket.off('chat_history');
            }
        }
    }, [user.loggedIn]);

    useEffect(() => {
        if (chatBottomRef.current) {
            chatBottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    return (<>
        <section className="my-4">
            <div className='container'>
                <div className='chat-box width-100 height-100'>
                    <ul className='chat-msg-list'>
                        {messages?.length === 0 ? (
                            <h5 style={{ textAlign: "center" }}>No messages yet!</h5>
                        ) : (
                            <>
                                {messages.map((msg, index) => {
                                    return (
                                        <li className={`chat-msg ${index % 2 === 1 ? 'chat-msg-bck' : ''}`} key={"msg" + index}>
                                            <img src='./image/chat-user.png' alt='User' className='msg-avatar' />
                                            <div className='msg-box'>
                                                <div className='author'>
                                                    <FiUser />
                                                    <span>{msg.user}</span>
                                                </div>
                                                <div>
                                                    <p className='chat-text'>{msg.message}</p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                                <div ref={chatBottomRef}></div>
                            </>
                        )}
                    </ul>
                </div>

                <div className='input-group mt-3'>
                    <input type='text' onChange={handleInputChange} onKeyUp={e => {
                        if (e.key === 'Enter') {
                            sendSocketMessage();
                        }
                    }} value={message} className='form-control msg-input' placeholder='Type your message here' />
                    <button className='btn send-btn' type='button' onClick={sendSocketMessage}>Send</button>
                </div>
                <div className='limit'>
                    <span>{length}/200</span>
                </div>
            </div>
        </section>
    </>);
}

export default Community;