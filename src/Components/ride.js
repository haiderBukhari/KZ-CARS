import React, { useRef, useState, useEffect, useCallback } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { auth } from './Config/Firebase';
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
import { add, remove } from '../Store/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { database } from './Config/Firebase'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import underLinePic from "../Assets/underline.png"
// import { createProxyMiddleware } from 'http-proxy-middleware';


let googleApiLoaded = false;

const MapContainer = ({ options, apiKey }) => {
    const [directions, setDirections] = useState(null);

    const directionsCallback = useCallback(
        (result, status) => {
            if (status === 'OK') {
                setDirections(result);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        },
        []
    );

    return (
        <GoogleMap
            center={options.origin}
            zoom={8}
            mapContainerStyle={{ height: '510px', width: '100%' }}
        >
            {options.origin && options.destination && (
                <DirectionsService
                    options={{
                        destination: options.destination,
                        origin: options.origin,
                        travelMode: 'DRIVING',
                    }}
                    callback={directionsCallback}
                />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};


export const Ride = () => {
    let [disabled, setdisabled] = useState(false)
    let [disabled1, setdisabled1] = useState(false)
    let [islogined, setidlogined] = useState(!useSelector(state => state.loginState.islogin))
    let [isloginedemail, setidloginedemailemail] = useState(useSelector(state => state.loginState.email))
    let [isloginedcontact, setidloginedcontact] = useState(useSelector(state => state.loginState.contactnumber))
    let [isloginedname, setidloginedname] = useState(useSelector(state => state.loginState.username))
    let dispatch = useDispatch()
    let [register, setregister] = useState(true)
    let [lat, setlat] = useState(53.4808)
    let [long, setlong] = useState(-2.2426)
    let [distlat, setdistlat] = useState(53.9808)
    let [distlong, setdistlong] = useState(-2.2426)
    let naviage = useNavigate(useSelector(state => state.loginState.islogin))
    let [p2p, setp2p] = useState(false)
    let [fromairport, setfromairport] = useState(false)
    let [toairport, settoairport] = useState(true);
    const [directions, setDirections] = useState(null);
    const [options, setOption] = useState({});
    const [checkboxVerified, setCheckboxVerified] = useState(false);
    const apiKey = 'AIzaSyCgE_NjJK_ZRHTcZUCYSG8dYAAwS_idFPU';
    useEffect(() => {
        if (lat && long && distlat && distlong) {
            setOption({
                origin: { lat: lat, lng: long }, // Toronto
                destination: { lat: distlat, lng: distlong }, // Montreal
            })
        }
    }, [lat, long, distlat, distlong])
    let password = useRef()
    function success(name) {
        toast.success(`User Successfully ${name}`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }
    function error(err) {
        toast.error(err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }
    function error(err) {
        error(err.message)
    }
    const handlesubmitdata = async (e) => {
        setdisabled1(true)
        e.preventDefault()
        const data = {
            name: obj.FullName,
            contactnumber: obj.ContactNumber,
            email: obj.Email,
            password: password.current.value
        }
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password).then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: data.name,
                    phoneNumber: data.contactnumber
                })
                dispatch(add([obj.Email, obj.ContactNumber, obj.FullName]))
                success("Registered")
                setsumbit1(true)
                window.scrollTo({
                    top: 1500,
                    left: 0,
                    behavior: 'smooth'
                });
                setshowconfirm(false)
                setdisabled1(false)
            }).catch((err) => {
                setdisabled1(false)
                toast.error(err.message, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
        }
        catch (err) {
            setdisabled1(false)
            toast.error(err.message, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            // error(err.message)
        }
    }
    const datalist = collection(database, "kz-cars-orders")
    const handlesubmited = async (e) => {
        e.preventDefault()
        const data = {
            "name": obj.FullName,
            "fromlocation": obj.Airport,
            "tolocation": obj.Location,
            "email": obj.Email,
            "data": obj.Pickupdate,
            "time": obj.Time,
            "Contact": obj.ContactNumber,
            "price": obj.israndom ? obj.price * 2.00 : obj.price * 2.50 + (fromairport ? 10 : 5),
            "status": "Pending",
        }
        try {
            await addDoc(datalist, {
                name: obj.FullName,
                fromlocation: obj.Airport,
                tolocation: obj.Location,
                email: obj.Email,
                data: obj.Pickupdate,
                time: obj.Time,
                Contact: obj.ContactNumber,
                price: obj.israndom ? obj.price * 2.00 : obj.price * 2.50 + (fromairport ? 10 : 5),
                status: "Pending",
                status1: obj.israndom ? false : true,
                audi: obj.isaudi,
                mercedes: obj.isMercedes,
            }).then(data => {
                toast.success("Ride Booked Successfully!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                naviage('/dashboard')
            }).catch(err => {
                error(err)
            })
        }
        catch (err) {
            error(err.message)
        }
        const emailParams = {
            airporttype: obj.airporttype,
            Pickupdate: obj.Pickupdate,
            Time: obj.Time,
            Airport: obj.Airport,
            Location: obj.Location,
            Noofpassenger: obj.Noofpassenger,
            Noofluggage: obj.Noofluggage,
            israndom: obj.israndom === true ? 'Yes' : 'No',
            isselective: obj.isselective === true ? 'Yes' : 'No',
            isaudi: obj.isaudi === true ? 'Yes' : 'No',
            isMercedes: obj.isMercedes === true ? 'Yes' : 'No',
            FullName: obj.FullName,
            LastName: obj.LastName,
            Email: obj.Email,
            ContactNumber: obj.ContactNumber,
            price: obj.israndom ? obj.price * 2.00 : obj.price * 2.50 + (fromairport ? 10 : 5)
        }
        emailjs.send('service_3qvwwz1', 'template_6ud8jbi', emailParams, 'NOwvdl2jH-V4fF3VM')
            .then((result) => {
                console.log(result);
            }, (error) => {
                toast.error('Error in Booking order You can Contact!', {
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
    const handlelogin = async (e) => {
        setdisabled(true)
        e.preventDefault()
        const data = {
            email: obj.Email,
            password: password.current.value
        }
        try {
            signInWithEmailAndPassword(auth, data.email, data.password).then((userdata) => {
                dispatch(add([data.email, userdata.user.phoneNumber, userdata.user.displayName]))
                setobj({ ...obj, FullName: userdata.user.displayName, ContactNumber: userdata.user.phoneNumber, email: data.email })
                success("Logged In")
                setsumbit1(true)
                window.scrollTo({
                    top: 1300,
                    left: 0,
                    behavior: 'smooth'
                });
                setshowconfirm(false)
                setdisabled(false)
            }).catch(err => {
                setdisabled(false)
                toast.error(err.message, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                // throw new Error(err)
            })
        }
        catch (err) {
            setdisabled(false)
            toast.error(err.message, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            // error(err.message)
        }
    }
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function rad2deg(rad) {
        return rad * (180 / Math.PI);
    }

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            document.querySelector('#location1'),
            { types: ['geocode'] }
        );

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place.formatted_address); // Prints the selected location
            setdistlat(place.geometry.location.lat());
            setdistlong(place.geometry.location.lng());
            console.log(`${place.geometry.location.lat()} ${place.geometry.location.lng()}`);
        });
    }, [p2p]);

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            document.querySelector('#location'),
            { types: ['geocode'] }
        );
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place.formatted_address); // Prints the selected location
            if (toairport) {
                setdistlat(place.geometry.location.lat())
                setdistlong(place.geometry.location.lng())
            }
            if (fromairport || p2p) {
                setlat(place.geometry.location.lat())
                setlong(place.geometry.location.lng())
            }
        });
    }, [p2p, toairport, fromairport]);
    useEffect(() => {
        if (lat != null && long != null && distlat != null && distlong != null && lat != undefined && long != undefined && distlat != undefined && distlong != undefined) {
            var gps1 = new window.google.maps.LatLng(lat, long);
            var gps2 = new window.google.maps.LatLng(distlat, distlong);
            if (window.google.maps.geometry) {
                var total_distance = window.google.maps.geometry.spherical.computeDistanceBetween(gps1, gps2);
                var total_distance_mile = total_distance / 1609.34;
                // let totalprice = obj.israndom?total_distance_mile*1.80:total_distance_mile*2.00;
                setobj({ ...obj, price: total_distance_mile })
            } else {
                console.error('Google Maps Geometry library is not loaded.');
            }
        }
    }, [lat, long, distlat, distlong])
    useEffect(() => {
        console.log("ajaakajja");
    }, [])
    let arr = [1, 2, 3, 4, 5]
    let [passenger, setpassenger] = useState(1);
    let [luggage, setluggage] = useState(0);
    let [showvehicle, setshowvehicle] = useState(true)
    let [showconfirm, setshowconfirm] = useState(false)
    let [submit1, setsumbit1] = useState(false)
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
        FullName: "",
        Email: "",
        ContactNumber: 0,
        price: 0
    })
    useEffect(() => {
        if (!islogined) {
            setobj({ ...obj, FullName: isloginedname, ContactNumber: isloginedcontact, Email: isloginedemail })
        }
    }, [islogined])
    let handlechoice = () => {
        setshowconfirm(true)
        if (!islogined) {
            setsumbit1(true)
        }
        window.scrollTo({
            top: 1300,
            left: 0,
            behavior: 'smooth'
        });
    }
    let handlevsubmit = () => {
        window.scrollTo({
            top: 900,
            left: 0,
            behavior: 'smooth'
        });
    }
    let changeairport = (e) => {
        setlat(null)
        setlong(null)
        setdistlat(null)
        setdistlong(null)
        settoairport(() => {
            if (e.target.value === 'fairport') { return true }
            else { return false }
        })
        setfromairport(() => {
            if (e.target.value === 'tairport') { return true }
            else { return false }
        })
        setp2p(() => {
            if (e.target.value === 'ponitopoint') { return true }
            else { return false }
        })
        setobj({ ...obj, airporttype: `${e.target.value === 'fairport' ? `From Airport (Airport to Home)` : e.target.value === 'ponitopoint' ? `Point to Point` : `To Airport (Home to Airport)`}` })
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
        let result = data.find((arr) => arr.name === e.target.value)
        if (fromairport) {
            setdistlat(result.lat)
            setdistlong(result.long)
        }
        if (toairport) {
            setlat(result.lat)
            setlong(result.long)
        }
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
                            <option value="ponitopoint" id="ponitopoint">Point to Point</option>
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
                            toairport && (
                                <select onChange={handlechange}>
                                    <option id="" placeholder='Select Location' required disabled={true} selected={true}>Select Location</option>
                                    {
                                        data.map((arr) => (
                                            <option key={arr.key} id="">{arr.name}</option>
                                        ))
                                    }
                                </select>
                            )
                        }
                        {
                            fromairport && (
                                <input onChange={(e) => { setobj({ ...obj, Location: e.target.value }) }} type="text" name="" id="location" placeholder='Your Pick-Up Location' required />
                            )
                        }
                        {
                            p2p && (
                                <input onChange={(e) => { setobj({ ...obj, Airport: e.target.value }) }} type="text" name="" id="location" placeholder='Your Pick-Up Location' required />
                            )
                        }
                        <label className='label-tag margin' htmlFor="">{`${toairport ? `Drop-Off Location` : `Drop-Off Airport`}`}</label>
                        {
                            toairport && (<input onChange={(e) => { setobj({ ...obj, Location: e.target.value }) }} type="text" name="" id="location" placeholder='Your drop-off location' required />)
                        }
                        {
                            fromairport && (<select onChange={handlechange}>
                                <option id="" placeholder='Select Location' required disabled={true} selected={true}>Select Location</option>
                                {
                                    data.map((arr) => (
                                        <option key={arr.key} id="">{arr.name}</option>
                                    ))
                                }
                            </select>)
                        }
                        {
                            p2p && (<input onChange={(e) => { setobj({ ...obj, Location: e.target.value }) }} type="text" name="" id="location1" placeholder='Your drop-off location' required />)
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
                        <MapContainer options={options} apiKey={apiKey} />
                        {/* <div className='ifreame-width'><iframe width="100%" height="570" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=manchester+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population calculator map</a></iframe></div> */}
                    </div>
                </div>
                <div className="info-ride">
                    <label className='label-tag' htmlFor="">Step 2: Select Vehicle</label>
                </div>
                {
                    svehicle && <>
                        <div style={{ flexWrap: "wrap" }} className='bottom-s'>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }} className="random">
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
                                        Random Vehicle Charges £2.0/mile
                                    </span>
                                </label>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }} className="selective">
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
                                        Select Vehicle Charges £2.5/mile
                                    </span>
                                </label>
                            </div>
                        </div>
                        {
                            (showvehicle) && (
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
                                        <button onClick={() => { setobj({ ...obj, isaudi: true }); handlechoice() }}>Book</button>
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
                        <div className='m-auto' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <h3 style={{margin: 0, padding: 0}} className='cen'><span style={{color: "#000"}}>Total:</span> <span>£</span>{obj.israndom ? obj.price * 2.00 : obj.price * 2.50 + (fromairport ? 10 : 5)}</h3>
                            <img style={{margin: "0 0 20px 0", padding: 0}} src={underLinePic} alt="" />
                            <button onClick={handlechoice} type='submit' className='s-vehecle'>Confirm Choice</button>
                        </div>
                    </>
                }
                {
                    islogined && <div className="info-ride m-b">
                        <label className='label-tag' htmlFor="">Step 3: Register/ Login</label>
                    </div>
                }
                {
                    showconfirm && islogined && (
                        <>
                            <div className="l-r">
                                <button onClick={() => { setregister(true) }} className={`${register ? "active-rr" : ""}`}>Register</button>
                                <button onClick={() => { setregister(false) }} className={`${register ? "" : "active-rr1"}`}>Login</button>
                            </div>
                            <form onSubmit={(e) => { register ? handlesubmitdata(e) : handlelogin(e) }} className='confirmation'>
                                {
                                    register ? (<>
                                        <div className="name n1">
                                            <div className="f-name">
                                                <label htmlFor="fname" className='label-tag marg'>Full Name</label>
                                                <input onChange={(e) => { setobj({ ...obj, FullName: e.target.value }) }} type="text" name="" id="fname" placeholder='Full Name' />
                                            </div>
                                            <div className="l-name">
                                                <label htmlFor="contact" className='label-tag marg'>Contact Number</label>
                                                <input onChange={(e) => { setobj({ ...obj, ContactNumber: e.target.value }) }} type="text" name="" id="contact" placeholder='(555) 555-5555' required />
                                            </div>
                                        </div>
                                        <div className="name contact">
                                            <div className="f-name">
                                                <label htmlFor="email" className='label-tag marg'>Email Address</label>
                                                <input onChange={(e) => { setobj({ ...obj, Email: e.target.value }) }} type="email" name="" id="email" placeholder='Email' required />
                                            </div>
                                            <div className="l-name">
                                                <label htmlFor="contact" className='label-tag marg'>Password</label>
                                                <input type="password" name="" id="contact" placeholder='Password' required ref={password} />
                                            </div>
                                        </div>
                                    </>) : (<>
                                        <div className="name contact">
                                            <div className="f-name">
                                                <label htmlFor="email" className='label-tag marg'>Email Address</label>
                                                <input onChange={(e) => { setobj({ ...obj, Email: e.target.value }) }} type="email" name="" id="email" placeholder='Email' required />
                                            </div>
                                            <div className="l-name">
                                                <label htmlFor="contact" className='label-tag marg'>Password</label>
                                                <input type="password" name="" id="contact" placeholder='Password' required ref={password} />
                                            </div>
                                        </div>
                                    </>)
                                }
                                <div className='m-auto'>
                                    <button disabled={register ? disabled1 : disabled} type='submit' className='s-vehecle b-o'>{register ? 'Register' : 'Login'}</button>
                                </div>
                            </form>
                        </>
                    )
                }

                <div className="info-ride m-b">
                    <label className='label-tag' htmlFor="">{`Step ${islogined ? 4 : 3}:  Booking Confirmation & Price(Final Step)`}</label>
                </div>
                {
                    submit1 && <>
                        <h3 className='cen'><span>£</span>{obj.israndom ? obj.price * 2.00 : obj.price * 2.50 + (fromairport ? 10 : 5)}</h3>
                        <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <input style={{marginRight: "10px", width: "20px", padding: "4px"}} onChange={()=>{setCheckboxVerified(!checkboxVerified)}} type="checkbox" />
                            {
                                window.outerWidth > 700 ? <a style={{textDecoration: "none"}} href='/privacy-policy' target="_blank">I agree to the rule and regulations by KZ CARS Cars Service.</a> : <p style={{textDecoration: "none"}} >I agree to the rule and regulations by KZ CARS Cars Service.</p>
                            }
                        </div>
                        <div className='m-auto'>
                            <button disabled={!checkboxVerified} onClick={handlesubmited} type='submit' className='s-vehecle b-o'>Book</button>
                        </div>
                    </>
                }
            </section>
        </div>
    )
}