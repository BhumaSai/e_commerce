import React from 'react'
import Nav from '../nav/Nav'
import { NavLink, Outlet } from 'react-router-dom'
import './home.css'

function Home() {

    return (
        <>
            <Nav />
            <div className='home-section'>
                <div className='main-links'>
                    <NavLink className='link' to='/men_fashions'>men's</NavLink>
                    <NavLink className='link' to='/women_fashions'>women's</NavLink>
                    <NavLink className='link' to='/kids_wear'>kid's</NavLink>
                    <NavLink className='link' to='/Mobiles'>Mobiles</NavLink>
                    <NavLink className='link' to='/Laptops'>Laptops</NavLink>
                    <NavLink className='link' to='/Furniture'>Furniture</NavLink>
                    <NavLink className='link' to='/Electronics'>Electronics</NavLink>
                </div><br />
                <div className='data-content'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home