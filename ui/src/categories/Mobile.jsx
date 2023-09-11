import React from 'react'
import ProductContainer from './productContainer'
import useFetchProducts from '../customhook/fetchProducts'

function Mobile() {
    const { loading, Product } = useFetchProducts('/all_products/gh')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default Mobile