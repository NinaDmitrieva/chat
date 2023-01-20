import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
    const [state, setState] = useState([]);
    const { search } = useLocation();
    const [params, setParams] = useState(null)

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((state) => ([...state, data]));
        });
    }, []);
    console.log(state);

    const leftRoom = () => { }

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>{params.room}</div>
                <div className={styles.users}>0 users in this room</div>
                <button className={styles.left}
                    onClick={leftRoom}
                >
                    left the room
                </button>
            </div>
            <div className={styles.messages}>
                {state.map(({ messages }) => <span></span>)}
            </div>
            <form className={styles.form}>
                <div className={styles.input}>
                    <input
                        className={s.input}
                        placeholder="message"
                        type='text'
                        name="message"
                        value={values[NAME]}
                        autoComplete="off"
                        required
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    )

};

export default Chat;