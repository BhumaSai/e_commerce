import React from 'react'
import './auth.css'

function ForgetPassword() {


    const forgetPassword = (e) => {
        e.preventDefault();
    }

    return (
        <div className='forget-password'>

            <form method="post" onSubmit={forgetPassword}>
                <input type="email" name="mail" id="mail" placeholder='enter your registerd mail ' required />
                {
                    !true ? <input type="submit" className='submit sending' value='sending...' disabled /> :
                        <input type="submit" className='submit' value="send" />
                }
            </form>

        </div>
    )
}

export default ForgetPassword