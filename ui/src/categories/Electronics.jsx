import React from 'react'
import ProductContainer from './productContainer'
import useFetchProducts from '../customhook/fetchProducts'

function Electronics() {
    const { loading, Product } = useFetchProducts('/all_products/men')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default Electronics