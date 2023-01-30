import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import EmojiPicker from "emoji-picker-react";

import styles from '../styles/Chat.module.css';
import icon from '../images/sun.svg'
import Messages from "./Messages";

const socket = io.connect('http://localhost:5000');

const Chat = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const [state, setState] = useState([]);
    const [params, setParams] = useState({ room: "", user: "" });
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [users, setUser] = useState(0);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((state) => [...state, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('joinRoom', ({ data: { users } }) => {
            setUser(users.length);
        });
    }, []);

    const leftRoom = () => {
        socket.emit('leftRoom', { params })
        navigate('/');
    };
    const handleChange = ({ target: { value } }) => setMessage(value);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message) return;

        socket.emit('sendMessage', { message, params });
        setMessage('');
    };
    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`)

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>{params.room}</div>
                <div className={styles.users}>{users} users in this room</div>
                <button className={styles.left} onClick={leftRoom}>
                    left the room
                </button>
            </div>
            <div className={styles.messages}>
                <Messages messages={state} name={params.name} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <input
                        className={styles.input}
                        placeholder="message"
                        type='text'
                        name="message"
                        value={message}
                        autoComplete="off"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.emoji}>
                    <img src={icon} alt="emoji" onClick={() => setOpen(!isOpen)} />

                    {isOpen && (
                        <div className={styles.emojies}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
                <div className={styles.button}>
                    <input type="submit" value="Send a message" onSubmit={handleSubmit} />
                </div>
            </form>
        </div>
    )

};

export default Chat;