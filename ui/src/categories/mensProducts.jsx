import React from 'react'
import './products.css'
import ProductContainer from './productContainer'
import useFetchProducts from '../customhook/fetchProducts'

function MensProducts() {

    const { loading, Product } = useFetchProducts('/api/all_products/men')
    

    return (
        <>
            <ProductContainer loading={loading} Products={Product} item={"men"} />
        </>
    )
}

export default MensProducts