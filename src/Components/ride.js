import React, { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import '../Components/Footer.css'
import './ride.css'
import svg from './svg.png'
import luggages from './160345.png'
import audi from './audibck-removebg-preview.png'
import merceedeez from './merc-removebg-preview.png'
import map_pic from './map-pic.png'
import { useNavigate } from 'react-router-dom';
export const Ride = () => {
    let naviage = useNavigate()
    useEffect(() => {
        console.log("ajaakajja");
    }, [])
    let arr = [1, 2, 3, 4, 5]
    let [passenger, setpassenger] = useState(1);
    let [luggage, setluggage] = useState(0);
    let [showvehicle, setshowvehicle] = useState(true)
    let [showconfirm, setshowconfirm] = useState(false)
    let [toairport, settoairport] = useState(true);
    let [obj, setobj] = useState({
        airporttype: 'From Airport (Airport to Home)',
        Pickupdate: '',
        Time: '',
        Airport: '',
        Location: '',
        Noofpassenger: passenger,
        Noofluggage: luggage,
        israndom: false,
        isselective: true,
        isaudi: false,
        isMercedes: false,
        FirstName: "",
        LastName:"",
        Email:"",
        ContactNumber:0,
    })
    let handlechoice = () => {
        setshowconfirm(true)
        window.scrollTo({
            top: 1300,
            left: 0,
            behavior: 'smooth'
          });   
    }
    let finalsubmit = (e)=>{
        e.preventDefault();
        const emailParams = {
            airporttype:obj.airporttype, 
            Pickupdate:obj.Pickupdate, 
            Time:obj.Time, 
            Airport:obj.Airport, 
            Location:obj.Location, 
            Noofpassenger:obj.Noofpassenger, 
            Noofluggage:obj.Noofluggage, 
            israndom:obj.israndom===true?'Yes':'No',
            isselective:obj.isselective===true?'Yes':'No', 
            isaudi:obj.isaudi===true?'Yes':'No', 
            isMercedes:obj.isMercedes===true?'Yes':'No', 
            FirstName:obj.FirstName, 
            LastName:obj.LastName, 
            Email:obj.Email, 
            ContactNumber:obj.ContactNumber, 
        }    
        emailjs.send('service_3qvwwz1', 'template_6ud8jbi', emailParams, 'NOwvdl2jH-V4fF3VM')
      .then((result) => {
        naviage('/')
        toast.success('Your Order has been Successfully Booked!', {
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
          toast.error('Error in Booking order!', {
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
    let handlevsubmit = ()=>{
        window.scrollTo({
            top: 900,
            left: 0,
            behavior: 'smooth'
          });        
    }
    let changeairport = (e) => {
        settoairport(e.target.value === 'fairport' ? true : false)
        setobj({ ...obj, airporttype: `${e.target.value === 'fairport' ? `From Airport (Airport to Home)` : `To Airport (Home to Airport)`}` })
    }
    let handleridesubmit = (e) => {
        e.preventDefault();
        console.log(obj);
        setsvehicle(true)
        handlevsubmit()
    }
    let [svehicle, setsvehicle] = useState(false)
    const data = [
        {
            key: 1,
            long: -2.2708,
            lat: 53.3619,
            name: 'Manchester Airport'
        },
        {
            key: 2,
            long: -2.8432,
            lat: 53.3335,
            name: 'Liverpool John Lennon Airport'
        },
        {
            key: 3,
            long: -1.6563,
            lat: 53.8595,
            name: 'Leeds Bradford International Airport'
        },
        {
            key: 4,
            long: -0.4607,
            lat: 51.4731,
            name: 'Heathrow Airport'
        },
        {
            key: 5,
            long: -0.1821,
            lat: 51.1537,
            name: 'Gatwick Airport'
        },
        {
            key: 6,
            long: 0.2389,
            lat: 51.8860,
            name: 'Stansted Airport'
        },
    ]
    let [change, setchange] = useState('')
    function printchange() {
        console.log(change);
    }
    function handlechange(e) {
        setchange(e.target.value)
        setobj({ ...obj, Airport: e.target.value })
    }
    return (
        <div className="all">
            <section className='ride-sec'>
                <div className="info-ride">
                    <label className='label-tag' htmlFor="">Step 1: Ride Info</label>
                </div>
                <div className="ride-part apply-margin">
                    <form onSubmit={handleridesubmit} className="left ">
                        <label className='label-tag margin' htmlFor="">Select Service Type</label>
                        <select onChange={changeairport}>
                            <option value="tairport" id="tairport" checked>To Airport</option>
                            <option value="fairport" id="fairport" selected>From Airport</option>
                        </select>                        <div className="sub">
                            <div className="left-div">
                                <label className='label-tag margin' htmlFor="">Pick-Up Date</label>
                                <div class="input-group" id="pickupDateHolder">
                                    <input onChange={(e) => { setobj({ ...obj, Pickupdate: e.target.value }) }} className='date' type="date" name="" id="" required />
                                </div>
                            </div>
                            <div className="right-div">
                                <label className='label-tag margin' htmlFor="">Pick-Up Time</label>
                                <input onChange={(e) => { setobj({ ...obj, Time: e.target.value }); console.log(e.target.value) }} className='time' type="time" name="" id="" required />
                            </div>
                        </div>
                        {
                            <label className='label-tag margin' htmlFor="">{` ${toairport ? `Pick-Up Airport` : `Pick-Up Location`}`}</label>
                        }
                        {
                            toairport ? (
                                <select onChange={handlechange}>
                                    <option id="" placeholder='Current Location' required>Current Location</option>
                                    {
                                        data.map((arr) => (
                                            <option key={arr.key} id="">{arr.name}</option>
                                        ))
                                    }
                                </select>
                            ) : (
                                <input onChange={(e) => { setobj({ ...obj, Location: e.target.value }) }} type="text" name="" id="" placeholder='Your Pick-Up Location' required />
                            )
                        }
                        <label className='label-tag margin' htmlFor="">{`${toairport ? `Drop-Off Location` : `Drop-Off Airport`}`}</label>
                        {
                            toairport ? (<input onChange={(e) => { setobj({ ...obj, Location: e.target.value }) }} type="text" name="" id="" placeholder='Your drop-off location' required />) : (<select onChange={handlechange}>
                                <option id="" placeholder='Current Location' required>Current Location</option>
                                {
                                    data.map((arr) => (
                                        <option key={arr.key} id="">{arr.name}</option>
                                    ))
                                }
                            </select>)
                        }
                        <div className='luggage'>
                            <div className='left-luggage'>
                                <div className='main-p'>
                                    <div className='persvg1'>
                                        <p className='label-tag m-t'>Number of Passengers</p>
                                        <div className='m-table'>
                                            <img className='person-svg' src={svg} alt="" />
                                            <p className='apply-p' onClick={() => { { passenger < 2 ? setpassenger(passenger) : setpassenger(passenger - 1); setobj({ ...obj, Noofpassenger: passenger < 2 ? passenger : passenger - 1 }) } }}>-</p>
                                            <p>{passenger}</p>
                                            <p className='apply-p' onClick={() => { { setpassenger(passenger + 1) }; setobj({ ...obj, Noofpassenger: passenger + 1 }) }}>+</p>
                                        </div>
                                    </div>
                                    <div className='persvg ips'>
                                        <p className='label-tag m-t'>Luggage Count</p>
                                        <div className='m-table'>
                                            <img className='person-svg' src={luggages} alt="" />
                                            <p className='apply-p' onClick={() => { { luggage < 1 ? setluggage(luggage) : setluggage(luggage - 1) }; setobj({ ...obj, Noofluggage: luggage < 1 ? luggage : luggage - 1 }) }}>-</p>
                                            <p>{luggage}</p>
                                            <p className='apply-p' onClick={() => { { setluggage(luggage + 1) }; setobj({ ...obj, Noofluggage: luggage + 1 }) }}>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m2k">
                            <button type='submit' className='s-vehecle'>Select Vehicle</button>
                        </div>
                    </form>
                    <div className="right">
                        <img src={map_pic} alt="" />
                        {/* <div className='ifreame-width'><iframe width="100%" height="570" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=manchester+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population calculator map</a></iframe></div> */}
                    </div>
                </div>
                <div className="info-ride">
                    <label className='label-tag' htmlFor="">Step 2: Select Vehicle</label>
                </div>
                {
                    svehicle && <>
                        <div className='bottom-s'>
                            <div className="random">
                                <input
                                    className="radio"
                                    type="radio"
                                    name="apply"
                                    id="random"
                                    onChange={() => {
                                        setshowvehicle(false);
                                        setobj({ ...obj, israndom: true, isselective: false, isaudi: false, isMercedes: false })
                                    }}
                                    checked={!showvehicle}
                                />
                                <label className="label-tag ap-pa apply" htmlFor="random" onClick={() => { setshowvehicle(false); setobj({ ...obj, israndom: true, isselective: false, isaudi: false, isMercedes: false }) }}>
                                    <span
                                     onClick={() => {
                                            document.getElementById("random").click();
                                            setshowvehicle(false);
                                            setobj({ ...obj, israndom: true, isselective: false, isaudi: false, isMercedes: false })
                                        }}
                                    >
                                        Random Vehicle Charges £1.80/mile
                                    </span>
                                </label>
                            </div>
                            <div className="selective">
                                <input
                                    className="radio"
                                    type="radio"
                                    name="apply"
                                    id="selective"
                                    onChange={() => {
                                        setshowvehicle(true);
                                        setobj({ ...obj, israndom: false, isselective: true, isaudi: false, isMercedes: false })
                                    }}
                                    checked={showvehicle}
                                />
                                <label className="label-tag ap-pa pop" htmlFor="selective" onClick={() => { setshowvehicle(true); setobj({ ...obj, israndom: false, isselective: true, isaudi: false, isMercedes: false }) }}>
                                    <span
                                        onClick={() => {
                                            document.getElementById("selective").click();
                                            setshowvehicle(true);
                                            setobj({ ...obj, israndom: false, isselective: true, isaudi: false, isMercedes: false })
                                        }}
                                    >
                                        Select Vehicle Charges £2.0/mile
                                    </span>
                                </label>
                            </div>
                        </div>
                        {
                            showvehicle && (
                                <div className='vehicle-main'>
                                    <div className='vehicles'>
                                        <h4 className='aaa'>Audi</h4>
                                        <img src={audi} alt="" />
                                        <div className="star">
                                            {
                                                arr.map((data) => (
                                                    <i key={Math.floor(Math.random() * 100000)} className="fa-solid fa-star fa-beat"></i>
                                                ))
                                            }
                                        </div>
                                        <button onClick={() => { setobj({ ...obj, isaudi: true });handlechoice() }}>Book</button>
                                    </div>
                                    <div className='vehicles'>
                                        <h4 className='aaa'>Mercedes</h4>
                                        <img src={merceedeez} alt="" />
                                        <div className="star">
                                            {
                                                arr.map((data) => (
                                                    <i key={Math.floor(Math.random() * 100000)} className="fa-solid fa-star fa-beat"></i>
                                                ))
                                            }
                                        </div>
                                        <button onClick={() => { setobj({ ...obj, isMercedes: true }); handlechoice() }}>Book</button>
                                    </div>
                                </div>
                            )
                        }
                        <div className='m-auto'>
                            <button onClick={handlechoice} type='submit' className='s-vehecle'>Confirm Choice</button>
                        </div>
                    </>
                }
                <div className="info-ride m-b">
                    <label className='label-tag' htmlFor="">Step 3: Booking Confirmation (Final Step)</label>
                </div>
                {
                    showconfirm && (
                        <>
                            <form onSubmit={finalsubmit} className='confirmation'>
                                <div className="name n1">
                                    <div className="f-name">
                                        <label htmlFor="fname" className='label-tag marg'>First Name</label>
                                        <input onChange={(e)=>{setobj({...obj, FirstName:e.target.value})}} type="text" name="" id="fname" placeholder='First Name' />
                                    </div>
                                    <div className="l-name">
                                        <label htmlFor="lname" className='label-tag marg'>Last Name</label>
                                        <input onChange={(e)=>{setobj({...obj, LastName:e.target.value})}} type="text" name="" id="lname" placeholder='Last Name' />
                                    </div>
                                </div>
                                <div className="name contact">
                                    <div className="f-name">
                                        <label htmlFor="contact" className='label-tag marg'>Contact Number</label>
                                        <input onChange={(e)=>{setobj({...obj, ContactNumber:e.target.value})}} type="text" name="" id="contact" placeholder='(555) 555-5555' required />
                                    </div>
                                    <div className="l-name">
                                        <label htmlFor="email" className='label-tag marg'>Email Address</label>
                                        <input onChange={(e)=>{setobj({...obj, Email:e.target.value})}} type="email" name="" id="email" placeholder='Email' required />
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <button type='submit' className='s-vehecle b-o'>Book Order</button>
                                </div>
                            </form>
                        </>
                    )
                }
            </section>
            {/* <div className='confirmation'> */}
        </div>
        // </div>
    )
}