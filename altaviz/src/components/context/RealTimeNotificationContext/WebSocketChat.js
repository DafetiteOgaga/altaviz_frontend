import React, { useEffect, useState } from 'react';

const WebSocketChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = React.useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socket.current = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

        // Listen for messages
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.current.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => socket.current.close(); // Cleanup on unmount
    }, []);

    const sendMessage = () => {
        if (socket.current && input.trim() !== '') {
            socket.current.send(JSON.stringify({ message: input }));
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default WebSocketChat;
