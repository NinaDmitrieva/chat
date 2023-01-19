import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

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
        socket.on('message', ({data}) =>{
            setState((state)=> ([...state, data]));
        });
    }, []);
    console.log(state);
    return (
        <div>
            Chat
        </div>
    )

};

export default Chat;