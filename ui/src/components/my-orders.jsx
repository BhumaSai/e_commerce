import React from 'react'
import Nav from '../nav/Nav'
import { NavLink, Outlet } from 'react-router-dom'
import './myorders.css'

function MyOrders() {
    return (
        <>
            <Nav />
            <div className="orders-links">
                <NavLink className='link' to='/my-orders/singleProduct'>single Products</NavLink>
                <NavLink className='link' to='/my-orders/multiProduct'>multiple Products</NavLink>
            </div>
            <Outlet />
        </>
    )
}

export default MyOrders