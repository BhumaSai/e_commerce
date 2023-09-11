import React from 'react'
import './messageHandle.css'
function AuthError({ message }) {
    return (
        <div className="auth-msg flex-center">
            <p style={{ color: 'red' }}>{message}</p>
        </div>
    )
}

export default React.memo(AuthError)