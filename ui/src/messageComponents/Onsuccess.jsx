import React, { useEffect, useState } from 'react'
import "./messageHandle.css"
import { Navigate, useNavigate } from 'react-router-dom'

function Onsuccess({ message, login }) {

    const navigate = useNavigate()
    const [width, setWidth] = useState(null)

    useEffect(() => {
        let val = 0
        setInterval(() => {
            if (val === 100) {
                clearInterval()
            } else {
                val += 1
                setWidth(val)
            }
        }, 100)
    }, [])



    if (width === 100) {
        return <Navigate to={`/${login}`} />
    }
    return (
        <div className='onSuccess flex-center'>
            <div className="onsuccess-container flex-center">
                <h3>{message}</h3>
                <button onClick={() => navigate(`/${login}`)} className='btn'>continue</button>
                <div className="timeOut" style={{ width: width + '%' }}></div>
            </div>
        </div >
    )
}

export default React.memo(Onsuccess)