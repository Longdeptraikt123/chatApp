import React, { useContext, useRef } from 'react'
import Image from '../img/download.jpeg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  return (
    <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className='message-info'>
        <img src={message.senderId ===
          currentUser.uid
          ? currentUser.photoURL
          : data.user.photoURL} alt='' />

      </div>
      <div className='message-content'>
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt='' />}
      </div>
    </div>
  )
}
export default Message