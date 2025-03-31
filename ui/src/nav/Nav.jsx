import React, { useContext, useEffect, useRef, useState } from 'react'
import './nav.css'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import { Store } from '../App'
import { BsCartPlus } from 'react-icons/bs'
import PopUp from '../messageComponents/popup'

function Nav({ query }) {
    const [arrowToggle, setArrowToggle] = useState(false)
    const [search, setsearch] = useState(query || '')
    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [product, setProduct] = useContext(Store)
    const navigate = useNavigate()
    const clickOutside = useRef(null)

    const searchProdcut = (e) => {
        e.preventDefault()
        if (search !== '') {
            localStorage.setItem('query', search)
            URL.get(`/api/search/product?product=${localStorage.getItem('query')}`).then((res) => {
                setProduct(res.data);
            }).catch((err) => {
                alert(err.message);
            })
            navigate(`/search/query=${search || query}`)
        }
    }


    const signOut = () => {
        URL.get('/signout').then(res => {
            setMsg(res.data.errorMsg)
            navigate('/log_in')
        }).catch(err => {
            setMsg(err.message || err.response.data.errorMsg)
        })
    }

    useEffect(() => {
        URL.get('/auth').then(res => {
            setAuth(res.data.signed)
        }).catch(err => {
            console.log(err);
            setAuth(err.response.data.signed || false);
        })
    }, [])
    // drop dowm close function
    const clickedOutside = (e) => {
        if (clickOutside.current && !clickOutside.current.contains(e.target)) {
            setArrowToggle(false)
        }
    }
    document.addEventListener('mousedown', clickedOutside)

    return (
        <>
            <nav className="nav-section-container">
                <div className="nav-section-items">
                    <div className="nav-section-title">
                        <Link to='/' className='link'><h3>E-commerce</h3></Link>
                    </div>
                    <div className="search-area padding">
                        <form>
                            <input type="search" className='input-search' name="search" id="search" placeholder='Search' value={search} onChange={(e) => setsearch(e.target.value)} />
                            <button type="submit" onClick={searchProdcut} className='btn' aria-label='lable'><AiOutlineSearch /></button>
                        </form>
                    </div>
                    <div className="items padding display-mobile">
                        <ul>
                            <li><NavLink to='/wishlist' title='wishlist'><AiOutlineHeart className='activeicon' /></NavLink></li>
                            <li><NavLink to='/cart' title='cart'><BsCartPlus className='activeicon' /></NavLink></li>
                        </ul>
                    </div>
                    {
                        auth ?
                            <div className="my-profile">
                                <span className='profile' style={{ textTransform: 'capitalize' }}>{localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).name[0] : ''}</span>
                                {
                                    arrowToggle ?
                                        <button onClick={() => setArrowToggle(!arrowToggle)} className='btn'><AiOutlineUp /></button> :
                                        <button onClick={() => setArrowToggle(!arrowToggle)} className='btn'><AiOutlineDown /></button>
                                }
                                {
                                    arrowToggle ? <div className="my-profile-links" ref={clickOutside}>
                                        <ul>
                                            <li><Link to='/my-profile' className='link'>my-profile</Link></li>
                                            <li className='display-d'><Link to='/wishlist' className='link'>wishlist <AiOutlineHeart /></Link></li>
                                            <li className='display-d'><Link to='/cart' className='link'>cart <BsCartPlus /></Link></li>
                                            <li><Link to='/my-orders' className='link'>my orders </Link></li>
                                            <li><button onClick={signOut} className='btn signout'>sign out <FiLogOut /></button></li>
                                        </ul>
                                    </div> : null
                                }
                            </div> :
                            <div className="authentification-links">
                                <Link to='/log_in' title='signIn'><FiLogIn color='#fff' fontWeight={'900'} fontSize={'1.3rem'} /></Link>
                            </div>
                    }
                </div>
            </nav>
            {
                msg ? <PopUp msg={msg} setMsg={setMsg} /> : null
            }
            {
                product ? null : null
            }
        </>
    )
}

export default React.memo(Nav)