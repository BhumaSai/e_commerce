import React, { useEffect, useState } from 'react'
import './ordersuccess.css'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function OrderSuccess({ msg }) {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        let val = 0
        setInterval(() => {
            if (val === 100) {
                clearInterval()
            } else {
                val += 1
                setWidth(val)
            }
        }, 50)
    }, [])
    const navigate = useNavigate()

    return (
        <div className='order-success flex-center'>
            <div className="order-width flex-center">
                <h2>{msg}</h2>
                <FaCheckCircle className='success-icon' />
                <button className='btn success-btn' onClick={() => navigate('/my-orders')}>ok</button>
                <div className="time-out" style={{ width: width + '%' }}>

                </div>
            </div>
        </div>
    )
}

export default React.memo(OrderSuccess)