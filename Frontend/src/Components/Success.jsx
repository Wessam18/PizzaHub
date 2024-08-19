import React from 'react'
import success from '../assets/Images/Covers/sucess.webp'
import './style/email.css'

const Success = () => {
  return (
    <div>
        <div className="containerEmail">
                    <h3>Password Updated Successfully, Please Exit The Page And Login!</h3>
                    <img src={success} alt="Logo" />
                </div>
    </div>
  )
}

export default Success
