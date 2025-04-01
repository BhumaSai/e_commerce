const products = require("express").Router();
const location = require("../api/states.json");
const product = require("../models/product");

products.get("/all_products/:product", async (req, res) => {
  try {
    const allProduct = await product.find();
    const data = allProduct.filter((data) => {
      return data.product === req.params.product;
    });

    if (data.length === 0) {
      return res.json(allProduct);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.Message);
  }
});

// location api
products.get("/location", (req, res) => {
  try {
    return res.json(location);
  } catch (error) {
    console.log(error);
  }
});

// search products
products.get("/search/product", async (req, res) => {
  try {
    const allProducts = await product.find();
    const inputSearch = await req.query.product;
    const getSearch = allProducts.filter((data) => {
      const type =
        data.type === inputSearch.toLowerCase() ||
        data.title === inputSearch.toLowerCase() ||
        data.category === inputSearch.toLowerCase() ||
        data.color === inputSearch.toLowerCase();
      return type;
    });
    if (getSearch.length === 0 || !getSearch) {
      return res.json(allProducts);
    }
    return res.status(201).json(getSearch);
  } catch (error) {
    return res.status(403).json({
      msg: "Data Not Found",
    });
  }
});

module.exports = products;
