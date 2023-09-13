import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import Nav from '../nav/Nav'
import './items.css'
import useFetchProducts from '../customhook/fetchProducts'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { IMGURL, URL } from '../url'


const PopUp = loadable(() => import('../messageComponents/popup'))
const Empty = loadable(() => import('../messageComponents/empty'))
const Loading = loadable(() => import('../errorhandlers/loading'))
const NotSigned = loadable(() => import('../messageComponents/notsigned'))
const ServerError = loadable(() => import('../messageComponents/serverError'))


function Wishlist() {

    const { Msg, Status, loading, Product } = useFetchProducts('/authorized/wishlist/items')
    // items
    const [Items, setItems] = useState('')

    const [msg, setMsg] = useState('')

    useEffect(() => {
        setItems(Product)
    }, [Product])

    // delete product
    const deleteItem = (e, id) => {
        e.preventDefault()
        // deleting array item
        URL.delete(`/authorized/deleteWishlistItems/${id}`).then(res => {
            setMsg(res.data.errorMsg);
        }).catch(err => {
            setMsg(err.response.data.erroMsg);
        })
        const del = Items.filter((data) => {
            return data._id !== id
        })
        setItems(del)
    }

    // add item to cart 
    const addItemToCart = (item, id) => {
        URL.put('/authorized/cart', item).then(res => {
            setMsg(res.data.errorMsg)
        }).catch(err => {

            setMsg(err.response.data.errorMsg)
        })
    }

    setTimeout(() => {
        setMsg('')
    }, 4000);

    return (
        <>
            <Nav />
            {
                Status === 500 ? <ServerError msg={Msg} /> :
                    <div className="wishlist-section">
                        {Status === 404 ? <NotSigned msg={Msg} icon={<AiOutlineHeart style={{ height: 'auto', width: '100%' }} />} /> :
                            <div className="wishlist-items">

                                {
                                    loading ? <Loading /> :
                                        Array.isArray(Items) && Items.map(data => {
                                            const { _id, category, color, description, image, title, price } = data
                                            return (
                                                <div key={_id} className="item">
                                                    <h1><span>Title</span> :- {title}</h1>
                                                    <img src={`${IMGURL}` + image} alt="product item" />
                                                    <div className="content">
                                                        <h4><span>category</span> :- {category}</h4>
                                                        <p><span>description</span> :- {description}</p>
                                                        <div className='space'>
                                                            <h3><span>color</span> :- <i style={{ color: color }}>{color}</i></h3>
                                                            <h3><span>Price</span> :- ₹ <b>{price}</b></h3>

                                                        </div>
                                                    </div>
                                                    <button className='btn trash' onClick={(e) => deleteItem(e, _id)}><BsTrashFill className='icon' /></button>
                                                    <button className='btn addCart' onClick={() => addItemToCart(data, _id)}>add item in cart</button>
                                                </div>
                                            )
                                        })

                                }

                                {
                                    Array.isArray(Items) && Items.length < 1 ? <Empty msg='your wishlist is empty' text='add items in wishlist' icon={<AiOutlineHeart fontSize={'7rem'} style={{ height: 'auto', width: '50%' }} />} /> : null
                                }
                            </div>
                        }
                        {
                            msg ? <PopUp msg={msg} /> : null
                        }
                    </div >
            }
        </>
    )
}

export default Wishlist