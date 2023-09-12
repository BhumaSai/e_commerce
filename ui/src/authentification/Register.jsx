import React, { useState } from 'react'
import Nav from '../nav/Nav'
import useFetchProducts from '../customhook/fetchProducts';
import './auth.css'
import { Link } from 'react-router-dom';
import { URL } from '../url';
import Onsuccess from '../messageComponents/Onsuccess';
import AuthError from '../messageComponents/authError';

function Register() {
    const [Districts, setDistricts] = useState([])
    const [District, setDist] = useState('')
    const [State, setState] = useState('')
    const [Process, setProcess] = useState(false)
    // register details 
    const [Name, setName] = useState('')
    const [Mail, setMail] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Gender, setGender] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    // invalid content
    const [invalidInput, setInvalidInput] = useState('')
    //  final and error message
    const [Final, setFinal] = useState('')
    const [Error, setError] = useState('')

    const Details = {
        Name, Mail, Mobile, Password, ConfirmPassword, State, District, Gender
    }

    // location details
    const { Product } = useFetchProducts('/api/location')

    // filter districts
    const filteritems = (e) => {
        setState(e.target.value)
        const item = Product.filter(data => {
            return data.state === e.target.value
        })
        const items = item.map(da => {
            return da.districts
        })
        setDistricts(items[0]);
    }

    // form submit
    const registerForm = (e) => {
        e.preventDefault()
        if (State === '') {
            setInvalidInput('*please select your State')
        } else if (District === '') {
            setInvalidInput('*please select your district')

        } else if (Gender === '') {
            setInvalidInput('*please select your gender')

        } else if (Password.length <= 6) {
            setInvalidInput('*password must be 6 to 20 charecters')
        } else if (Password !== ConfirmPassword) {
            setInvalidInput('*password and confirm password must be same')
        } else if (Mobile.length !== 10 || !Number(Mobile)) {
            setInvalidInput('*invalid mobile number')
        } else {
            try {
                setProcess(true)
                URL.post('/authentification/register', Details)
                    .then(res => {
                        setProcess(false)
                        setFinal(res.data.successMsg)
                    }).catch(err => {
                        setError(err.response.data.errorMsg)
                        setProcess(false)
                    })
            } catch (error) {
                setProcess(false)
                alert(error.message);
            }
        }
    }

    setTimeout(() => {
        setError('')
    }, 3000);
    return (
        <>
            <Nav />
            <div className="register-section">
                <div className="register-container ">
                    <h3>sign up</h3>
                    <form className='register-form' autoComplete='off' onSubmit={registerForm} onKeyUp={() => { setInvalidInput(''); setError('') }} required>
                        <input type="text" name="name" id="name" placeholder='enter your name' onChange={e => setName(e.target.value)} required />
                        <input type="email" name="emial" id="mail" placeholder='enter valid @gmail.com' onChange={e => setMail(e.target.value)} required />
                        <input type="text" name="number" id="number" max={10} placeholder=' +91 123456789' size={10} onChange={e => setMobile(e.target.value)} required />
                        <input type="password" name="password" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} required />
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='confirm password' onChange={e => setConfirmPassword(e.target.value)} required /><br />
                        <p style={{ textAlign: 'center', textTransform: 'capitalize' }}>select state and district</p>
                        <div className="address">
                            <select name="location" onChange={filteritems} >

                                <option value="" >Select State</option>
                                {
                                    Array.isArray(Product) && Product.map((data, idx) => {
                                        const { state } = data
                                        return (
                                            <option value={state} key={idx}> {state}</option>
                                        )

                                    })

                                }
                            </select>
                            <select onChange={e => setDist(e.target.value)}>
                                <option value="">Select District</option>
                                {
                                    Array.isArray(Districts) && Districts.map((data, idx) => {
                                        return (
                                            <option value={data} key={idx} > {data}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="gender">
                            <input type="radio" name="male" id="male" value="Male" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="male">male</label>
                            <input type="radio" name="male" id="female" value="female" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="female">female</label>
                            <input type="radio" name="male" id="other" value="other" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="other">other</label>
                        </div>
                        <div className="invalidInput">
                            <p>{invalidInput}</p>
                        </div>
                        {
                            Process ? <input type="submit" className='submit submit-load' value='Register' disabled /> :
                                <input type="submit" className='submit' value="Register" />
                        }
                    </form><br />
                    <div className='login'>
                        <span>already have account</span>
                        <Link to='/log_in'>sign in</Link>
                    </div>
                </div >
            </div >
            {
                Final ? <Onsuccess message={Final} login={'log_in'} /> : null
            }
            {
                Error ? <AuthError message={Error} /> : null
            }
        </>
    )
}

export default Register