import React, { Suspense, useState } from 'react'
import Nav from '../nav/Nav'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import AuthError from '../messageComponents/authError'

function Login() {

    const [Mail, setMail] = useState('')
    const [Password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState()
    const [Error, setError] = useState('')
    const [wait, setWait] = useState(false)

    const navigate = useNavigate()

    const loginAuth = (e) => {
        e.preventDefault();
        if (Mail !== '' || Password !== '') {
            try {
                setWait(true)
                URL.post('/authentification/login', { Mail, Password }).then((res) => {
                    setError(res.data.errorMsg);
                    localStorage.setItem('User', JSON.stringify(res.data.UserDet))
                    setWait(false)
                    if (res.status === 201) {
                        return navigate('/')
                    }
                }).catch((err) => {
                    setError(err.response.data.errorMsg);
                    setWait(false)
                })
            } catch (error) {
                setWait(false)
                alert(error.message)
            }
        }
    }




    return (
        <>
            <Suspense fallback={<p>loading......</p>}><Nav /></Suspense>
            <div className='login-section'>
                <div className="login-container">
                    <h3>sign in</h3>
                    <form className='login-form' method='post' autoComplete='off' onSubmit={loginAuth} onKeyUp={() => { setError('') }}>
                        <input type="email" name="e-mail" id="mail" placeholder='enter your registered email or number' value={Mail} onChange={e => setMail(e.target.value)} required />
                        <input type={showPassword ? 'text' : "password"} name="password" id="password" placeholder='password' value={Password} onChange={e => setPassword(e.target.value)} required />
                        <input type="checkbox" name="showPassword" id="showPassword" onChange={(e) => setShowPassword(e.target.checked)} />
                        {
                            wait ? <input type="submit" className='submit submit-load' value="Log In" disabled /> :
                                <input type="submit" className='submit' value="Log In" />
                        }
                    </form>
                    <div className="auth-links">
                        <Link to='/forgetPassword'>forget password</Link>
                        <p>don't have account <Link to='/register'>sign up</Link></p>
                    </div>
                </div>
            </div>
            {
                Error ? <AuthError message={Error} /> : null
            }
        </>
    )
}

export default Login