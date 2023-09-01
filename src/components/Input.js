import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsPaperclip } from 'react-icons/bs';
import { BiPhotoAlbum } from 'react-icons/bi';
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    const ref = useRef()
    
    const handleSend = async () => {
        if (image) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        }
        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

    }

    return (
        <div className='input'>
            <input type='text' placeholder='Type something' onChange={(e) => setText(e.target.value)} />
            <div className='input-send'>
                <BsPaperclip className='chat-icon' />
                <input style={{ display: 'none' }} type='file' id='file' onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor='file'>
                    <BiPhotoAlbum className='chat-icon' />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
export default Input