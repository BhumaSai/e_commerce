import React from 'react'
import Nav from '../nav/Nav'
import ProductContainer from '../categories/productContainer'
import useFetchProducts from '../customhook/fetchProducts'
import './home.css'

function Search() {
    const { loading, Product } = useFetchProducts(`/api/search/product?product=${localStorage.getItem('query')}`)
    return (
        <>
            <Nav query={localStorage.getItem('query')} />

            <ProductContainer loading={loading} Products={Product} />
        </>
    )
}

export default Search