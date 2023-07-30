import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { EmptyCart } from './Reservation'
import './Dashboard.css'
import { database } from './Config/Firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
export const Dashboard1 = () => {
    let [datass, setdatass] = useState(useSelector(state => state.loginState.email))
    let [dashboard, setdashboard] = useState([])
    let [loading, setloading] = useState(false)
    const datacollection = collection(database, "kz-cars-orders")
    const fetchdata = async () => {
        try {
            setloading(true)
            const listdata = await getDocs(datacollection)
            const filtereddata = listdata.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            let filteredResponse = filtereddata.filter((arr) => {
                if (arr.email === datass) {
                    return arr;
                }
            });
            setdashboard(filteredResponse)
            setloading(false)
        }
        catch (err) {
            console.log(err);
            setloading(true)
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])
    // const fetchdata1 = async () => {
    //     let data = await fetch(`https://kzcars-backend-data.onrender.com/orders`);
    //     let response = await data.json();
    //     let filteredResponse = response.filter((arr) => {
    //         if (arr.email === datass) {
    //             return arr;
    //         }
    //     });
    //     setdashboard(filteredResponse.reverse());
    // }

    // useEffect(() => {
    //     fetchdata()
    // }, [])
    return (
        <>
            <Header />
            {
                <p className='loading'>{loading && `Loading...`}</p>
            }
            {
                dashboard.length === 0 && !loading ? <EmptyCart /> : (!loading) &&  <div className="all">
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
                                        <span className='aps'>Car Status:</span>
                                        <p className='ps'>{arr.status ? arr.audi ? "Selected (Audi)" : (arr.mercedes) ? "Selected (Mercedes)" : "Any Selected Vehicle" : "Random Vehicle"}</p>
                                    </div>
                                    <div className="flexs">
                                        <span className='aps'>Contact Number:</span>
                                        <p className='ps'>{arr.Contact}</p>
                                    </div>
                                </div>
                                <p className='ps pc-1 pc-2'>Status: <span className='pen'>{arr.status}</span></p>
                            </div>
                        ))
                    }
                </div>
            }
            <Footer />
        </>
    )
}