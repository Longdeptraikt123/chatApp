import React, { useContext, useEffect, useState } from 'react'
import Image from '../img/download.jpeg'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';

export const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          // If the document doesn't exist, set an empty object
          setChats({});
        }
      });

      return () => {
        unsub();
      };
    };

    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);


  const dataChats = Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  return (
    <div className='chats'>
      {dataChats?.map(chat => {
        return (
          <div className='chats-container'
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}>

            <div className='chats-logo'>
              <img src={chat[1].userInfo.photoURL} alt='' />
            </div>
            <div className='chats-user'>

              <span>
                {chat[1].userInfo.displayName}
              </span>

              <p>{chat[1].lastMessage?.text}</p>

            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Chats