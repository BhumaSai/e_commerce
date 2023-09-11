const products = require('express').Router()
const allProducts = require('../api/allprodcuts.json')
const location = require('../api/states.json');


products.get('/all_products/:product', (req, res) => {
    try {
        const data = allProducts.filter(data => {
            return data.product === req.params.product
        })

        if (data.length === 0) {
            return res.json(allProducts)
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error.Message)
    }
})

// location api
products.get('/location', (req, res) => {
    try {
        return res.json(location)
    } catch (error) {
        console.log(error);
    }
})


// search products
products.get('/search/product', async (req, res) => {
    try {
        const inputSearch = await req.query.product
        const getSearch = allProducts.filter(data => {
            const type = data.type.toLowerCase() === inputSearch.toLowerCase() ||
                data.title.toLowerCase() === inputSearch.toLowerCase() || data.category.toLowerCase() === inputSearch.toLowerCase() || data.color.toLowerCase() === inputSearch.toLowerCase() ||
                data.type.slice(0, 3) === inputSearch.slice(0, 3) || data.category.slice(0, 3) === inputSearch.slice(0, 3) || data.color.slice(0, 3) === inputSearch.slice(0, 3) || data.title.slice(0, 3) === inputSearch.slice(0, 3)
            return type

        })
        if (getSearch.length === 0 || !getSearch) {
            return res.json(allProducts)
        }
        return res.status(201).json(getSearch)

    } catch (error) {
        return res.status(403).json({
            msg: 'Data Not Found'
        })
    }
})


module.exports = products