import React, { useState } from 'react'
import './products.css'
import ShowProduct from './showproducts/showProduct'
import { AiOutlineHeart } from 'react-icons/ai'
import { URL } from '../url'
import PopUp from '../messageComponents/popup'
import Loading from '../errorhandlers/loading'


function ProductContainer({ loading, Products }) {
    const [product, setProduct] = useState(null)
    const [msg, setmsg] = useState('')
    // show product function
    const showProduct = (item) => {
        setProduct(item)
    }


    const addToWishlist = (item) => {
        URL.put('/authorized/wishlist', item)
            .then(res => {
                setmsg(res.data.errorMsg)
            })
            .catch(err => {
                setmsg(err.response.data.errorMsg);
            })
    }
    const addToCart = (item) => {
        URL.put('/authorized/cart', item)
            .then(res => {
                setmsg(res.data.errorMsg)
            })
            .catch(err => {
                setmsg(err.response.data.errorMsg);
            })
    }

    setTimeout(() => {
        setmsg('')
    }, 5000);

    return (
        <>
            <div className="mens-products-section">
                <div className="mens-products">
                    {loading ? <Loading /> : null}
                    {
                        Products ?
                            Array.isArray(Products) &&
                            Products.map((data, idx) => {
                                const { color, image, title, price, type, description } = data
                                return (
                                    <div key={idx} className='men-product-card' >
                                        <button title='add to wishlist' className='btn wishlist' onClick={() => addToWishlist(data)}><AiOutlineHeart className='icon' /></button>
                                        <img src={image} onClick={() => showProduct(data)} alt={type} title={title} />
                                        <p className='color'>color:<span style={{ color: color === 'black' ? 'purple' : color }}>{color}</span></p>
                                        <h5>price: <span> ₹ {price} </span></h5>
                                        <p>{description}</p>
                                    </div>
                                )
                            }) : null
                    }

                </div>
            </div>
            {
                product ? <ShowProduct addToWishlist={addToWishlist} addToCart={addToCart} product={product} setProduct={setProduct} /> : null
            }

            {
                msg ? <PopUp msg={msg} /> : null
            }
        </>
    )
}

export default React.memo(ProductContainer)