import React from 'react'
import success from '../assets/Images/Covers/sucess.webp'
import './style/email.css'

const SuccessOrder = () => {
  return (
    <div>
        <div className="containerEmail">
                    <h3>Order Has Been Confirmed Successfully, Enjoy The Meal!</h3>
                    <img src={success} alt="Logo" />
                </div>
    </div>
  )
}

export default SuccessOrder
