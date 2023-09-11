import React from 'react'
import { useNavigate } from 'react-router-dom'
import './messageHandle.css'

function Empty({ msg, text, icon }) {
    const navigate = useNavigate()
    return (
        <div className="not-signed-section">
            <h1>{msg}</h1>
            {icon}
            <button className='btn notSignedBtn' onClick={() => navigate('/')}>{text}</button>
        </div>
    )
}

export default React.memo(Empty)