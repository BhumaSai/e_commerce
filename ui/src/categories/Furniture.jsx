import React from 'react'
import useFetchProducts from '../customhook/fetchProducts'
import ProductContainer from './productContainer'

function Furniture() {
    const { loading, Product } = useFetchProducts('/all_products/men')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default Furniture