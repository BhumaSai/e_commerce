import React from 'react'
import useFetchProducts from '../customhook/fetchProducts'
import ProductContainer from './productContainer'

function WomenProducts() {
    const { loading, Product } = useFetchProducts('/all_products/women')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default WomenProducts