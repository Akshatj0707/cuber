
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getSocketUrl } from '../config';

export const SocketContext = createContext();

let socket;
try {
  socket = io(getSocketUrl());
} catch (err) {
  console.error(err.message);
}

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;