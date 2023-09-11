import React from 'react'
import ProductContainer from './productContainer'
import useFetchProducts from '../customhook/fetchProducts'

function Laptops() {
    const { loading, Product } = useFetchProducts('/all_products/d')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default Laptops