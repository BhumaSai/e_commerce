import React from 'react'
import './showProduct.css'
import { GrClose } from 'react-icons/gr'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { IMGURL } from '../../url';

function ShowProduct({ addToCart, addToWishlist, product, setProduct }) {


    return (
        <div className='single-product-section'>
            <div className="single-product">
                <div className="product">
                    <button onClick={() => setProduct('')} className='btn close-btn'><GrClose fontSize={'1.5rem'} style={{ background: "#fff", borderRadius: '4px' }} /></button>
                    <img src={`${IMGURL}` + product.image} alt="" />
                    <div className="product-det">
                        <h4>title : {product.title} </h4>
                        <h5><b>type</b> : {product.type}</h5>
                        <h5><b>Price</b> : <span >{product.price}</span></h5>
                        <p><b>description</b>: {product.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio blanditiis molestias expedita nemo ex ducimus alias similique dolore! Repellendus ad, possimus odit consequuntur harum sed optio quaerat maiores accusamus totam?</p>
                        <div className="items-icons">
                            <button onClick={() => addToWishlist(product)} className='btn item-btn'>add to wishList <br /> <AiOutlineHeart className='itemIcon' color='#fff' fontSize={'1.3rem'} /></button>
                            <button onClick={() => addToCart(product)} className='btn item-btn'>add to cart <br /> <BsCart className='itemIcon' color='#fff' fontSize={'1.3rem'} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ShowProduct);