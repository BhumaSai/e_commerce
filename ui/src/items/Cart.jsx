import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import Nav from '../nav/Nav'
import './items.css'
import useFetchProducts from '../customhook/fetchProducts'
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { IMGURL, URL } from '../url'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = loadable(() => import('../messageComponents/ordermsg/OrderSuccess'))
const PopUp = loadable(() => import('../messageComponents/popup'))
const Empty = loadable(() => import('../messageComponents/empty'))
const Loading = loadable(() => import('../errorhandlers/loading'))
const NotSigned = loadable(() => import('../messageComponents/notsigned'))
const ServerError = loadable(() => import('../messageComponents/serverError'))




function Cart() {

    const [Items, setItems] = useState([])
    const { Msg, Status, loading, Product } = useFetchProducts('/authorized/cart/items')
    // popup
    const [pop, setPop] = useState('')
    // total price
    const [Price, setPrice] = useState('')
    // buy status
    const [BuyStatus, setBuyStatus] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setItems(Product)
        if (Array.isArray(Product) && Product.length >= 1) {
            const price = Array.isArray(Product) && Product.map(da => {
                let a = parseInt(da.price)
                return a
            })
            let Total = Array.isArray(price) && price.reduce((a, b) => a + b)
            setPrice(Total)

        }
    }, [Product])


    // deleting cart items func
    const deleteItem = (e, id, price) => {
        e.preventDefault()
        let delI = Items.filter(data => {
            return data._id !== id
        })
        setItems(delI)
        URL.delete(`/authorized/deleteCartItems/${id}`).then(res => {
            setPop(res.data.errorMsg)
        }).catch(err => {
            setPop(err.response.data.errorMsg)
        })
        let reducePrice = Price - price
        setPrice(reducePrice)

    }
    // buy single product 
    const buySingleProduct = (id) => {
        navigate(`/order-method?id=${id}`)
    }

    // onclick window close popup
    document.addEventListener('click', () => {
        setPop('')
    })


    return (
        <>
            <Nav />
            {
                Status === 500 ? <ServerError msg={Msg} /> :
                    <div className='cart-container'>
                        {
                            Status === 404 ? <NotSigned msg={Msg} icon={<AiOutlineShoppingCart fontSize={'9rem'} />} /> :

                                <div className="cart-items">

                                    {loading ? <Loading /> :
                                        Array.isArray(Items) && Items.map(data => {
                                            const { _id, category, price, color, description, image, title } = data

                                            return (
                                                <div key={_id} className="item">
                                                    <h1><span className='spanEle'>title : </span>{title}</h1>
                                                    <button onClick={(e) => deleteItem(e, _id, price)} className=' btn trash' title='Delete From Wishlist'>< BsTrashFill className='icon' color='#000' /></button>
                                                    <img src={`${IMGURL}` + image} alt="" />
                                                    <div className="content">
                                                        <h4><span className='spanEle'>category : </span>{category}</h4>
                                                        <p><span className='spanEle'>description : </span>{description}</p>
                                                        <h3 style={{ color: color === 'black' ? '#fff' : color }}><span className='spanEle'>color : </span>{color}</h3>
                                                        <h5><span className='spanEle'>price</span> :- ₹{price}</h5>
                                                        <button className='btn' onClick={() => buySingleProduct(_id)}>proceed to buy</button>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        Array.isArray(Items) && Items.length >= 1 ?
                                            <div className="allItems">
                                                <p>Total Products :- <span>{Items.length}</span></p>
                                                <h5>Total amount :- ₹ {Price}</h5>
                                                <button className='btn' onClick={() => setBuyStatus(true)}>Buy all</button>
                                            </div> : <Empty msg='Your cart is empty' text='add items in cart' icon={<AiOutlineShoppingCart style={{ height: 'auto', width: '30%' }} />} />
                                    }
                                    {
                                        pop ? <PopUp msg={pop} /> : null
                                    }
                                </div>
                        }
                    </div>
            }

            {
                BuyStatus ? <BuyAll Price={Price} itemsPrice={Items.length > 1 ? Math.floor(Price - Price / 100 * 5) : Price} items={Items} setBuyStatus={setBuyStatus} /> : null
            }
        </>
    )
}

const BuyAll = ({ itemsPrice, Price, items, setBuyStatus }) => {
    const [paymentType, setPaymentType] = useState('')
    const [status, setStatus] = useState({
        Status: '',
        msg: ''
    })
    const [lazy, setLazy] = useState(false)
    const close = (e) => {
        e.preventDefault()
        setBuyStatus(false)
    }
    const BuyAllItems = (e) => {
        e.preventDefault()
        if (paymentType === '') {
            alert('Please Select Payment Method')
        } else {
            try {
                setLazy(true)
                URL.post('/orders/bulk-items', { items, itemsPrice, paymentType, orderedDate: new Date().toString() }).then(res => {
                    setStatus({
                        Status: res.status,
                        msg: res.data.errorMsg
                    })
                    setLazy(false)
                }).catch(err => {
                    alert(err.response.data.errorMsg || err.message)
                    setLazy(false)
                })
            } catch (error) {
                alert(error.message)
            }
        }
    }
    return (
        <>
            {
                status.Status === 202 ? <OrderSuccess msg={status.msg} /> :
                    <div className="buy-all-c flex-center">
                        <form onSubmit={BuyAllItems}>
                            <button className='btn' onClick={close}><AiOutlineCloseCircle className='icon' /></button><br />
                            <h3 id='dk'>select payment method</h3><br />
                            <div className='PD'>
                                <h5>total Products :- {items.length}</h5>
                                <h5>Total Price :- <s>₹{Price}</s></h5>
                                <h5>{items.length > 1 ? ' Discount 5%' : 'discount 0%'} :- <mark>₹{itemsPrice}</mark></h5>
                            </div><br />
                            <div className="inputs">
                                <input type="radio" name="PM" id="cashOnDelivery" value='cash on delivery' onChange={(e) => setPaymentType(e.target.value)} />
                                <label htmlFor="cashOnDelivery">cash On Delivery</label><br />
                            </div><br />
                            <div className='inputs'>
                                <input type="radio" name="PM" id="online" value='net banking' onChange={(e) => setPaymentType(e.target.value)} disabled />
                                <label htmlFor="online"><s>net banking</s></label>
                            </div><br />
                            {
                                lazy ? <input type="submit" className='order-btn' value="please wait...." disabled />
                                    : <input type="submit" className='order' value="order" />
                            }
                        </form>
                    </div>
            }
        </>
    )
}

export default Cart