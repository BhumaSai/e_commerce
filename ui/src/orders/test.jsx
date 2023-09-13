import React, { useEffect, useState } from 'react'
import { IMGURL, URL } from '../url'

function Test() {

    const [image, setImages] = useState(null)
    useEffect(() => {
        URL.get('/image').then(res => setImages(res.data)).catch(err => console.log(err))
    }, [])

    return (
        <div>
            {
                Array.isArray(image) && image.map((da, idx) => {
                    const { image } = da
                    console.log(image);
                    return (
                        <div key={idx}>
                            <h2>gwk</h2>
                            <img src={`${IMGURL}` + da.image} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Test