import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
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
                    <span>Log in</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='Enter your email' />
                    <input type='password' placeholder='Password' />

                    <button>Log in</button>
                    {err && <span>Something went wrong!</span>}
                </form>
                <span>You don't have an account ? <Link to='/register'>Register</Link></span>
            </div>
        </div>
    )
}
export default Login