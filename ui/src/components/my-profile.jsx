import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import profile from '../assets/profile.avif'
import './home.css'
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import { isNumber } from 'lodash'
import PopUp from '../messageComponents/popup'

function MyProfile() {

    const [Details, setDetails] = useState([])
    const [address, setAddress] = useState('')
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        URL.get('/authorized/my-profile').then(res => {
            setDetails(res.data);
            setAddress(res.data.address)
        }).catch(err => {
            if (err.response.status === 404) {
                navigate('/log_in')
            } else {
                alert(err.response.data.errorMsg)
            }
        })

    }, [navigate])

    const editItem = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }


    return (
        <>
            <Nav />
            <div className="my-profile-section">
                <div className="my-profile-body">
                    <div className="edit-section">
                        <button className='btn' onClick={editItem}>edit<AiOutlineEdit className='icon' /></button>
                    </div><br />
                    <div className="my-profile-content">
                        <img src={profile} alt="" />
                        <span>Name :-</span>
                        <h4 value='name'>{Details.name}</h4>
                        <span>Mail Id :-</span>
                        <h4>{Details.mail}</h4>
                        <span>Mobile :-</span>
                        <h4>{Details.mobile}</h4>
                        <h3>my-product-details</h3>
                        <Link to='#' className='link links'>my uploads</Link>
                        <Link to='/my-orders' className='link links'>my orders</Link>
                        <Link to='/cart' className='link links'>cart <AiOutlineShoppingCart className='icon' /></Link>
                        <Link to='/wishlist' className='link links'>wishlist <AiOutlineHeart className='icon' /></Link>
                        <h3>contact</h3>
                        <Link to='/my-orders' className='link links'>contact us </Link>
                        <address className='address'>
                            <h3>address :-</h3>
                            State    : <span className='address-det'> {address.State} </span> <br />
                            district : <span className='address-det'> {address.District} </span> <br />
                            city     : <span className='address-det'> {address.City} </span> <br />
                            pin code : <span className='address-det'> {address.PinCode} </span> <br />
                            Door No : <span className='address-det'> {address.DoorNo}</span>
                        </address>
                    </div>
                    {
                        edit ? <EditUserDetails Details={Details} close={editItem} setEdit={setEdit} edit={edit} /> : null
                    }
                </div>
            </div>
        </>
    )
}


const EditUserDetails = (props) => {
    const { name, mail, mobile, gender, address } = props.Details
    const { State, District, City, PinCode, DoorNo } = address
    // invalid state
    const [invalid, setInvalid] = useState('')
    // msg
    const [msg, setMsg] = useState('')
    //loading
    const [loading, setLoading] = useState(false)
    // userDetails
    const [editDetails, setEditDetails] = useState({
        name: name,
        mail: mail,
        mobile: mobile,
        gender: gender,
        state: State,
        district: District,
        city: City,
        pincode: PinCode,
        doorno: DoorNo
    })
    const UserDetails = (e) => {
        setEditDetails({ ...editDetails, [e.target.name]: e.target.value })
    }
    const submitEditDetails = (e) => {
        e.preventDefault()
        if (!isNumber(editDetails.mobile)) {
            setInvalid('invalid mobile no')
        } else {
            try {
                setLoading(true)
                URL.put('/authorized/update-profile', editDetails)
                    .then(res => {
                        setMsg(res.data.errorMsg)
                        setLoading(false)
                        if (res.status === 200) {
                            localStorage.setItem('User', JSON.stringify(res.data.user))
                            window.location.reload()
                        }
                    }).catch(err => {
                        setMsg(err.response.data.errorMsg)
                        setLoading(false)
                    })
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (

        <>
            <div className="edit-user-details" onKeyUp={() => setInvalid('')}>
                <div className="edit-details">
                    <h4>Edit Profile</h4>
                    <button className='btn closeBtn' onClick={props.close}><AiOutlineCloseCircle className='closeIcon' /></button>
                    <form className='edit-details-form' onSubmit={submitEditDetails} autoComplete='off'>
                        <label htmlFor="name" className='detL'>name :</label>
                        <input type="text" name="name" id="name" placeholder='enter your name' value={editDetails.name} onChange={UserDetails} required autoComplete='off' />
                        <label htmlFor="mail" className='detL'>mail :</label>
                        <input type="email" name="mail" id="mail" placeholder='@gmail.com' value={editDetails.mail} onChange={UserDetails} required />
                        <label htmlFor="mobile" className='detL'>mobile :</label>
                        <input type="text" name="mobile" id="mobile" placeholder='+91 1234567890' value={editDetails.mobile} onChange={UserDetails} required />
                        <label htmlFor="gender" className='detL'>gender :</label>
                        <input type="text" name="gender" id="gender" placeholder='gender' value={editDetails.gender} onChange={UserDetails} required />
                        <label htmlFor="state" className='detL'>state :</label>
                        <input type="text" name="state" id="state" placeholder='enter your state' value={editDetails.state} onChange={UserDetails} required />
                        <label htmlFor="district" className='detL'>district :</label>
                        <input type="text" name="district" id="district" placeholder='enter your district' value={editDetails.district} onChange={UserDetails} required />
                        <label htmlFor="city" className='detL'>city :</label>
                        <input type="text" name="city" id="city" placeholder='enter your city' value={editDetails.city} onChange={UserDetails} required />
                        <label htmlFor="pincode" className='detL'>pin code :</label>
                        <input type="text" name="pincode" id="pincode" placeholder='enter your city pincode' value={editDetails.pincode} onChange={UserDetails} required />
                        <label htmlFor="doorno" className='detL'>door no :</label>
                        <input type="text" name="doorno" id="doorno" placeholder='enter your house no' value={editDetails.doorno} onChange={UserDetails} required />
                        <input type="submit" id='saveEditDet' value={loading ? 'updating....' : 'save'} onChange={UserDetails} />
                    </form>
                </div>
            </div>
            {
                invalid ? <PopUp msg={invalid} /> : null
            }
            {
                msg && !invalid ? <PopUp msg={msg} /> : null
            }
        </>
    )
}

export default MyProfile