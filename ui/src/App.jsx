import React, { Suspense, createContext, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import Login from './authentification/Login';
import Register from './authentification/Register'
import ForgetPassword from './authentification/forgetpassword';
import NotFound from './errorhandlers/404/notFound';
import MultiProducts from './components/myOrdersComponents/MultiProducts'
import SingleProduct from './components/myOrdersComponents/SingleProduct'
import OrderMethod from './orders/orderMethod';
import Search from './components/Search'
import Test from './orders/test';

// dynamic  importing
const Home = React.lazy(() => import('./components/Home'))
const Cart = React.lazy(() => import('./items/Cart'))
const Wishlist = React.lazy(() => import('./items/Wishlist'))
const Kids = React.lazy(() => import('./categories/kidsWear'))
const MensProduct = React.lazy(() => import('./categories/mensProducts'))
const WomenProducts = React.lazy(() => import('./categories/womenProducts'))
const Mobile = React.lazy(() => import('./categories/Mobile'))
const Laptops = React.lazy(() => import('./categories/Laptops'))
const Furniture = React.lazy(() => import('./categories/Furniture'))
const Electronics = React.lazy(() => import('./categories/Electronics'))
const MyProfile = React.lazy(() => import('./components/my-profile'))
const MyOrders = React.lazy(() => import('./components/my-orders'))

export const Store = createContext()

function App() {
  const [products, setProducts] = useState(null)

  return (
    <>
      <Store.Provider value={[products, setProducts]}>
        <HashRouter>
          <Routes>
            <Route path='/e_commerce' element={<Suspense fallback={''}><Home /></Suspense>} />
            <Route path='/' element={<Suspense fallback={''}><Home /></Suspense>} >
              <Route index element={<MensProduct />} />
              <Route path='men_fashions' element={<Suspense fallback={''}><MensProduct /></Suspense>} />
              <Route path='women_fashions' element={<Suspense fallback={''}><WomenProducts /></Suspense>} />
              <Route path='kids_wear' element={<Suspense fallback={''}><Kids /></Suspense>} />
              <Route path='Mobiles' element={<Suspense fallback={''}><Mobile /></Suspense>} />
              <Route path='Laptops' element={<Suspense fallback={''}><Laptops /></Suspense>} />
              <Route path='Furniture' element={<Suspense fallback={''}><Furniture /></Suspense>} />
              <Route path='Electronics' element={<Suspense fallback={''}><Electronics /></Suspense>} />
            </Route>
            <Route path='/log_in' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/wishlist' element={<Suspense fallback={''}><Wishlist /></Suspense>} />
            <Route path='/cart' element={<Suspense fallback={''}><Cart /></Suspense>} />
            <Route path='/my-profile' element={<Suspense fallback={''}><MyProfile /></Suspense>} />
            <Route path='/search/:search' element={<Suspense fallback={''}><Search /></Suspense>} />
            <Route path='/my-orders' element={<Suspense fallback={''}><MyOrders /></Suspense>}>
              <Route index element={<SingleProduct />} />
              <Route path='singleProduct' element={<SingleProduct />} />
              <Route path='multiProduct' element={<MultiProducts />} />
            </Route>
            <Route path="/order-method?" element={<OrderMethod />} />
            <Route path='/test' element={<Test />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HashRouter>
      </Store.Provider>
    </>
  );
}

export default App;
