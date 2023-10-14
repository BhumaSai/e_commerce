import React, { useState } from 'react'
import './myOrderComponents.css'
import useFetchProducts from '../../customhook/fetchProducts'
import Loading from '../../errorhandlers/loading'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import NotSigned from '../../messageComponents/notsigned'
import { IMGURL } from '../../url'

function MultiProducts() {
    const { loading, Status, Product, Msg } = useFetchProducts('/authorized/my-orders-multipleProducts')
    const [showItems, setShowItems] = useState(false)
    const [showData, setShowData] = useState(null)
    const showProducts = (data) => {
        setShowItems(true)
        setShowData(data)
    }
    return (
        <>
            <div className='multi-product-section'>
                {
                    Status === 404 ? <NotSigned msg={Msg} /> : null
                }
                {
                    loading ? <Loading /> :
                        Array.isArray(Product) && Product.map((data, idx) => {
                            return (
                                <div className="orders-data" key={idx} >
                                    <h2>order:- {idx+1}</h2><br />
                                    <h5>ordered Date :- {data[1].orderedDate.split(' ').join('_')}</h5>
                                    < h5 > Total Price :-  <mark> ₹ {data[1].itemsPrice}</mark></h5>
                                    <h5>payment method :- <mark>{data[1].paymentType}</mark></h5>
                                    <button onClick={() => showProducts(data[0])} className='btn'>show products</button>
                                </div>
                            )
                        })
                }
                {showItems ? <div className='show-ordered-products'>
                    <button onClick={() => setShowItems(false)}><AiOutlineArrowLeft color='red' /></button>
                    {
                        Array.isArray(showData) && showData.map(item => {
                            const { _id, product, category, type, color, image, title, price } = item
                            console.log(category);
                            return (
                                <div className="ordered-item" key={_id}>
                                    <h1>title:- {title}</h1><br />
                                    <img src={`${IMGURL}` + image} alt="product" />
                                    <div className="details">
                                        <h5>type :- {type}</h5>
                                        <h5>product :- {product}</h5>
                                        <h5>category :- {category}</h5>
                                        <h5>color :- {color}</h5>
                                        <h5>price :- {price}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : null}
            </div >

        </>
    )
}

export default MultiProducts