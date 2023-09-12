import React from 'react'
import ProductContainer from './productContainer'
import useFetchProducts from '../customhook/fetchProducts'

function KidsWear() {
    const { loading, Product } = useFetchProducts('/api/all_products/women')


    return (
        <>
            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default KidsWear