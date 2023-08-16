import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CartList.css'
export const EmptyCart = () => {
  let navigate = useNavigate();
  return (
    <div data-aos="fade-up"
    data-aos-anchor-placement="center-bottom" className='empty-cart '>
      <div className="sub-empty-cart dark:bg-slate-800 ">
        <i className="fa-solid fa-cart-shopping fa-bounce fa-4x "></i>
        <p className='dark:text-white text-lg mb-3 mt-10'>Oops! You don't make any Reservation in Past</p>
        <p className='dark:text-white text-lg'>Book a Reservation Now in the Best LUXURY CARS SERVICE IN THE TOWN</p>
        <button onClick={()=>navigate('/reservation')} className={`text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2 mr-2 mt-8 focus:outline-none`}> Make a Reservation  <i className="fa-solid fa-cart-shopping ml-2 text-xl"></i></button>
      </div>
    </div>
  )
}
