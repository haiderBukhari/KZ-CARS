import React from 'react'
import './style.css'
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
export const ContactData = () => {
  let naviage = useNavigate();
  let [name, setname] = useState();
  let [email, setemail] = useState();
  let [contact, setcontact] = useState();
  let [message, setmessage] = useState();
  const handlesubmit = (e)=>{
    e.preventDefault();
    const emailParams = {
       name: name,
       email: email,
       contact: contact,
       message:message
    }
    emailjs.send('service_3qvwwz1', 'template_6ud8jbi', emailParams, 'NOwvdl2jH-V4fF3VM')
      .then((result) => {
        toast.success('Your Contact Detail has been Shared!', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        naviage('/reservation')
      }, (error) => {
          toast.error('Error in sending the details', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        naviage('/reservation')
      });
  }
  return (
    <>
      <Header />

      <div className="container tom">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
            Feel free to contact us with any feedback or inquiries you may have. We're always happy to help in any way we can!
            </p>

            <div className="info">
              <div className="information">
                <img src="img/location.png" className="icon" alt="" />
                <p>19 SULLIVAN STREET, LONGSIGHT, MANCHESTER, M12 4WS, GREATER MANCHESTER UNITED state</p>
              </div>
              <div className="information">
                <img src="img/email.png" className="icon" alt="" />
                <p>kz.cars.mcr@gmail.com</p>
              </div>
              <div className="information">
                <img src="img/phone.png" className="icon" alt="" />
                <div className='kapa'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="contact_contact__option__icon__1ce87" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path></svg>
                   <a href='https://api.whatsapp.com/send/?phone=%2B447827882962&text&type=phone_number&app_absent=0' target='_blank'><p className='ppp'>+447827882962</p></a>
                   <p className='mm'> /</p>
                   <a href='https://api.whatsapp.com/send/?phone=%2B447446158821&text&type=phone_number&app_absent=0' target='_blank'><p> +447446158821</p></a>

                </div>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100090151488287&mibextid=ZbWKwL" target='blank'>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form onSubmit={handlesubmit} className='f-dta' action="index.html" autocomplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input onChange={(e)=>{setname(e.target.value)}} type="text" name="name" className="input my-input" placeholder='Name' required/>
                <span></span>
              </div>
              <div className="input-container">
                <input onChange={(e)=>{setemail(e.target.value)}} type="email" name="email" className="input my-input" placeholder='Email' required/>
              </div>
              <div className="input-container">
                <input onChange={(e)=>{setcontact(e.target.value)}} type="tel" name="phone" className="input my-input" placeholder='Contact Number' required/>
              </div>
              <div className="input-container textarea">
                <textarea  onChange={(e)=>{setmessage(e.target.value)}} name="message" className="input my-input" placeholder='Message' required></textarea>
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
