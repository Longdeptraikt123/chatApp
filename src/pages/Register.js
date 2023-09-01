import './Register.scss'
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";


const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(

                (error) => {
                    setErr(true)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        })

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        navigate("/")
                    });
                }
            );

        }
        catch (error) {
            setErr(true)
        }

    }


    return (
        <div className="form-container">
            <div className='form-wrapper'>
                <div className="form-header">
                    <h1>Chat app</h1>
                    <span>Register</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter your name' />
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input style={{ display: 'none' }} type='file' id='file' />
                    <label htmlFor='file'>
                        <AiOutlineFileAdd />
                        <span>Add an avatar</span>
                    </label>
                    <button type='submit'>Sign up</button>
                    {err && <span>Something went wrong!</span>}
                </form>
                <span>You do have an account ? <Link to='/login'>Login</Link></span>
            </div>
        </div>
    )
}
export default Register