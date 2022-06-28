import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [inputFieldVal, setInputFieldVal] = useState();
  const socket = io('ws://localhost:4000');

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setInputFieldVal(e.target.value);
  };

  useEffect(() => {
    console.log('RENDERED');
    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('message', (message: string) => {
      setChatMessages([...chatMessages, message]);
    });
  }, []);

  return (
    <div>
      <h2>Chat messages</h2>
      <div>LA la</div>
      <ul></ul>
      <input placeholder='message' onChange={handleChange} />
      <button
        onClick={() => {
          socket.emit('message', inputFieldVal);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Home;
