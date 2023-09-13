import React, { useState } from 'react'
import './order.css'
import useFetchProducts from '../customhook/fetchProducts'
import Loading from '../errorhandlers/loading'
import ServerError from '../messageComponents/serverError'
import { IMGURL, URL } from '../url'
import PopUp from '../messageComponents/popup'
import OrderSuccess from '../messageComponents/ordermsg/OrderSuccess'
import NotSigned from '../messageComponents/notsigned'

function OrderMethod() {
    const { Msg, Status, loading, Product } = useFetchProducts(`/orders/payment-method${window.location.search}`)
    const [quantity, setQuantity] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [L, setL] = useState(false)
    const [msg, setMsg] = useState('')
    const [err, seterr] = useState('')

    const orderItem = (e) => {
        e.preventDefault()
        if (paymentMethod === '') {
            seterr('select payment method')
        } else if (quantity === 0) {
            seterr('please select quantity')
        } else {
            try {
                setL(true)
                URL.post('/orders/ordered-item', { Product, quantity, paymentMethod, orderedDate: new Date().toString() }).then(res => {
                    setMsg(res.data.errorMsg);
                    setL(false)
                }).catch(err => {
                    alert(err.response.data.erroMsg)
                    setL(false)
                })
            } catch (error) {
                alert(error.message)
                setL(false)
            }
        }

    }

    return (
        <>
            {
                loading ? <Loading /> : null
            }
            {Status === 500 ? <ServerError msg={Msg} /> : null}
            {
                Status === 404 ? <NotSigned msg={Msg} /> :

                    <div className="order-method-section" onMouseUp={() => seterr('')}>
                        <div className="order-method">
                            {
                                Product || !Status === 500 ? <div className="item">
                                    <div className="item-img">
                                        <img src={`${IMGURL}` + Product.image} alt="product" width='100%' height='auto' />
                                        <div className="buttons">
                                            <button onClick={() => {
                                                if (quantity <= 0) {
                                                    setQuantity(0)
                                                } else {
                                                    setQuantity(quantity - 1)
                                                }

                                            }}>-</button>
                                            <span className='quantity'>{quantity !== 0 ? quantity : 'QTY'}</span>
                                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <h3 >title:{Product.title} </h3>
                                        <p >color : {Product.color}</p>
                                        <p>type :  {Product.type}</p>
                                        <p>price : ₹ {Product.price}</p>
                                    </div>
                                </div> : null
                            }
                            <br />
                            <form className='payment-type' autoComplete='off' onSubmit={orderItem}>
                                <h3>select payment method</h3>
                                <div>
                                    <input type="radio" name="pm" id="cashOnDelivery" value="cash on delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="cashOnDelivery">cash on delivery</label>
                                    <input type="radio" name="Pm" id="netBanking" value="net banking" onChange={(e) => setPaymentMethod(e.target.value)} disabled />
                                    <label htmlFor="netBanking">net banking</label>
                                </div>
                                {
                                    L ?
                                        <input type="submit" id='buy-btn' value="processing..." disabled />
                                        :
                                        <input type="submit" className='buy' id='buy' value="buy" />
                                }
                            </form>
                        </div>
                    </div >
            }
            {
                msg ? <OrderSuccess msg={msg} /> : null
            }
            {
                err ? <PopUp msg={err} /> : null
            }
        </>
    )
}


export default OrderMethod