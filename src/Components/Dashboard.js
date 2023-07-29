import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { EmptyCart } from './Reservation'
import './Dashboard.css'
import emailjs from '@emailjs/browser';

import { toast } from 'react-toastify';
export const Dashboard = () => {
  let [dashboard, setdashboard] = useState([])
  const fetchdata = async () => {
    let data = await fetch(`https://kzcars-backend-data.onrender.com/orders`)
    let response = await data.json();
    setdashboard(response.reverse());
  }
  useEffect(() => {
    fetchdata()
  }, [])
  let handlechange = async (name, fromlocation, tolocation, email, date, time, price, status, id, contact) => {
    const data = {
      "name": name,
      "fromlocation": fromlocation,
      "tolocation": tolocation,
      "email": email,
      "data": date,
      "time": time,
      "price": price,
      "Contact": contact,
      "status": status,
    };
    if (status === 'Approved') {
      const emailParams = {
        user: name,
        date: date,
        time: time,
        plocation: fromlocation,
        dlocation: tolocation,
        email: email
      }
      emailjs.send('service_0rle6r6', 'template_p4hoyd9', emailParams, 'P2XINkRJP20txDqr2').then((result) => {
        toast.info(`${name} status changed to ${status}`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }, (error) => {
        toast.error(`Error in changes ${name} status to ${status}`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      });


    }
    if (status === 'Regected') {
      const emailParams = {
        user: name,
        email: email
      }
      emailjs.send('service_0rle6r6', 'template_z7lqums', emailParams, 'P2XINkRJP20txDqr2').then((result) => {
        toast.info(`${name} status changed to ${status}`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }, (error) => {
        toast.error(`Error in changes ${name} status to ${status}`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      });
    }
    try {
      const response = await fetch(`https://kzcars-backend-data.onrender.com/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const final_data = await response.json();
      console.log(final_data);
    } catch (err) {
      // error(err.message);
    }
  }
  return (
    <>
      <Header />
      {
        dashboard.length === 0 ? <EmptyCart /> : <div className="all">
          {
            dashboard.map((arr) => (
              <div className="above">
                <p className='ps pc-1'><span className='sps'>Date</span>: {arr.data}</p>
                <p className='ps pc-1'><span className='sps'>Time</span>: {arr.time}</p>
                <p className='ps pc-1'><span className='sps'>Price</span>: £{arr.price}</p>
                <div className="data">
                  <div className="flexs">
                    <span className='aps'>Name:</span>
                    <p className='ps'>{arr.name}</p>
                  </div>
                  <div className="flexs">
                    <span className='aps'>From Location:</span>
                    <p className='ps'>{arr.fromlocation}</p>
                  </div>
                  <div className="flexs">
                    <span className='aps'>To Location:</span>
                    <p className='ps'>{arr.tolocation}</p>
                  </div>
                </div>
                <div className="datassss">
                  <div className="flexs">
                    <span className='aps'>Email:</span>
                    <p className='ps'>{arr.email}</p>
                  </div>
                  <div className="flexs">
                    <span className='aps'>Contact Number:</span>
                    <p className='ps'>{arr.Contact}</p>
                  </div>
                </div>
                <p className='ps pc-1 pc-2'>Status: <span className='pen'><select onChange={(e) => { handlechange(arr.name, arr.fromlocation, arr.tolocation, arr.email, arr.data, arr.time, arr.price, e.target.value, arr.id, arr.Contact) }} className="akakak" name="" id="">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Regected">Regected</option>
                </select></span></p>
              </div>
            ))
          }
        </div>
      }
      <Footer />
    </>
  )
}