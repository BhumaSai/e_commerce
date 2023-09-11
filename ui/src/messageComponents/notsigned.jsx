import React from 'react'
import './messageHandle.css'
import { useNavigate } from 'react-router-dom'
import { FaUserLock } from 'react-icons/fa'

function NotSigned({ msg, icon }) {
    const navigate = useNavigate()
    return (
        <div className="not-signed-section">
            <h1>{msg}</h1>
            {icon ? icon : <FaUserLock fontSize={'7rem'} />}
            <p>you didn't log in yet,<br />please log in with your registered mail or password</p>
            <button className='btn notSignedBtn' onClick={() => navigate('/log_in')}>log in</button>
        </div>
    )
}

export default React.memo(NotSigned)