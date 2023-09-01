import React, { useContext } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { TfiMoreAlt } from 'react-icons/tfi';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

export const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className='chat-info'>
        <span>{data.user?.displayName}</span>
        <div className='chat-icons'>
          <BsFillCameraVideoFill className='chat-icon' />
          <AiOutlineUserAdd className='chat-icon' />
          <TfiMoreAlt className='chat-icon' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
export default Chat