import React from 'react'
import './notFound.css'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div className="url-not-found ">
                <legend>404</legend>
                <h2>page not found</h2>
                <Link to='/' className='link'>back to home</Link>
            </div>
        </>
    )
}

export default React.memo(NotFound)