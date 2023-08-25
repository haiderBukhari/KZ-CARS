import React, { useEffect, useState } from 'react'
import './reviews.css'
import { auth } from './Config/Firebase'
import { database } from './Config/Firebase'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
export const Reviews = () => {
    const reviewcollection = collection(database, 'offers')
    let [loading, setloading] = useState(false)
    let [change, setchange] = useState(false);
    let [email, setEmail] = useState(useSelector(state => state.loginState.email));
    let navigation = useNavigate('')
    useEffect(() => {
        let getdata = async () => {
            setloading(true)
            try {
                const data = await getDocs(reviewcollection)
                const filtereddata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setDiscountarray(filtereddata)
                setloading(false)
            }
            catch (err) {
                console.log("Can't get data");
            }
        }
        getdata()
    }, [change])
    const onsubmit = async () => {
        try {
            await addDoc(reviewcollection, data)
            setchange(!change)
            setdata(initial)
        }
        catch (err) {
            console.log(err);
        }
    }
    const deletedata = async (id) => {
        try {
            const review = doc(database, "offers", id)
            await deleteDoc(review)
            setchange(!change)
            setdata(initial)
        }
        catch (err) {
            console.log(err);
        }
    }
    let [discountarray, setDiscountarray] = useState([])
    let initial = {
        price: 0,
        t1: '',
        t2: ''
    }
    let [data, setdata] = useState(initial)
    return (
        <>
            <Header />
            <div className="main-sec">
                {email === 'kz.cars.mcr@gmail.com' && (
                    <div className='main-reviews'>
                        <div className="center-review">
                            <input onChange={e => setdata({ ...data, price: e.target.value * 1 })} className='number-review' type="number" placeholder='Discount Percentage' />
                            <p className='ppp'></p>
                            <input onChange={e => setdata({ ...data, t1: e.target.value })} className='number-review-1' type="text" placeholder='Text-1' maxlength='80'/>
                            <p className='ppp'></p>
                            <input onChange={e => setdata({ ...data, t2: e.target.value })} className='number-review-2' type="text" placeholder='Text-2' maxlength='80'/>
                            <div className="btn-review">
                                <button onClick={onsubmit} className='adding-btn'>Add</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="all-reviews">
                    {
                        loading && 
                        <div className='loading-state'>
                            <p>Loading...</p>
                        </div>
                    }
                    {!loading &&
                        discountarray.map((arr) => (
                            <div key={arr.id} className='box-reviews'>
                                {
                                    email === 'kz.cars.mcr@gmail.com' && <button onClick={() => { deletedata(arr.id) }} className='delete-review'>Delete</button>
                                }
                                <h2 className='h2-discountplan'>Discount Plan</h2>
                                <h1 className='h1-discountplan'>{arr.price}% <span>of Total Amount</span></h1>
                                <p className='p1-discountplan-1'>{arr.t1}</p>
                                <p className='p1-discountplan-1'>{arr.t2}</p>
                                <button onClick={()=>{navigation('/reservation?redirected')}} className='button-discountplan'>SUBSCRIBE</button>
                                <div className='ribbon-wrap'>
                                    <div className='ribbon'>Special Offer</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}