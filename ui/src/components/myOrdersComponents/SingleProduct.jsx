import React from 'react'
import './myOrderComponents.css'
import useFetchProducts from '../../customhook/fetchProducts'
import Loading from '../../errorhandlers/loading';
import NotSigned from '../../messageComponents/notsigned';
import { IMGURL } from '../../url';
import { useNavigate } from 'react-router-dom';

function SingleProduct() {
    const Navigate = useNavigate()

    const { loading, Status, Product, Msg } = useFetchProducts('/authorized/my-orders-singleProducts')


    return (
        <div className='single-order-products'>
            {
                Status === 404 ? <NotSigned msg={Msg} /> : null
            }
            {
                loading ? <Loading /> :
                    Array.isArray(Product) && Product.map((data, idx) => {
                        const { title, category, color, image, paymentMethod, price, product, quantity, type } = data
                        return (
                            <div key={idx} className='ordered-items'>
                                <figure className="image-section">
                                    <img src={`${IMGURL}` + image} alt="product" /><br />
                                    <figcaption>title :- {title}</figcaption>
                                </figure>
                                <div className="item-details">
                                    <h5>type :-{type}</h5>
                                    <h5>category :- {category}</h5>
                                    <h5>color :- {color}</h5>
                                    <h5>price :- {price}</h5>
                                    <h5>Product :- {product}</h5>
                                    <h5>quantity :- {quantity}</h5>
                                    <h5>payment method :- {paymentMethod}</h5>
                                    <button title='Currently Not Available' className='btn'>check Status</button>
                                </div>
                            </div>
                        )
                    })
            }
            {
                Array.isArray(Product) && Product.length ===0  && !loading?
                <center><div><br />
                    <h1>you didn't order anything</h1><br />
                    <button className='btn' style={{textTransform:'capitalize', background:"var(--btn-bg)",color:'#fff',padding:'8px'}} onClick={()=> Navigate('/')}>shop now</button>
                    </div></center>
                :null
            }
        </div>
    )
}

export default SingleProduct