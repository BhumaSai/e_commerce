import React from 'react'
import './loader.css'

function Loading() {
    return (
        <div className='loader-section'>
            <div className='loader'>
                <div className="load"></div>
            </div>
        </div>
    )
}

export default React.memo(Loading);