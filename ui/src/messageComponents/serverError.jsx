import React from 'react'
import './messageHandle.css'
import { useNavigate } from 'react-router-dom'



function ServerError({ msg }) {
    const navigate = useNavigate()
    return (
        <div className=' server '>
            <h3>🛑</h3>
            <h2>{msg}</h2>
            <p>please try after some time</p>
            <button onClick={() => navigate('/')} className='btn'> back to home page</button>
        </div>
    )
}

export default React.memo(ServerError)