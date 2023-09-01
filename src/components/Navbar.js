import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <h3>Chat app</h3>
            <div className='navbar-user'>
                <img src={currentUser.photoURL} alt='' />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Log out</button>
            </div >
        </div >
    )
}
export default Navbar