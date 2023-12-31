import React, { useEffect, useRef, useState } from 'react'
import './Login.css'
import { Register } from './Register';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { auth } from './Config/Firebase';
import Footer from './Footer';
import Header from './Header';
import signup from './signup.svg'
import signin from './signin.svg'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { add } from '../Store/loginSlice';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    let [disabled, setdisabled] = useState(false)
    let [disabled1, setdisabled1] = useState(false)
    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [contact, setcontact] = useState('')
    let [pass, setpass] = useState('')
    let dispatch = useDispatch()
    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
    }, [])
    let navigate = useNavigate()
    let [time, settime] = useState(true)
    function success() {
        toast.success("Successfully Registered", {
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
    function callerror(err){
        setdisabled(false)
        error(err.message)
    }
    let handlelogin = async(e) => {
        setdisabled(true)
        e.preventDefault();
        const data = {
            email: email,
            password: pass
        }
        try {
            signInWithEmailAndPassword(auth, data.email, data.password).then((userdata)=>{
                dispatch(add([data.email, userdata.user.phoneNumber, userdata.user.displayName]))
                success()
                navigate('/dashboard')
            }).catch(err => {
                callerror(err)
                // console.log(err);
                // throw new Error(err)
            })
        }
        catch (err) {
            setdisabled(false)
            error(err.message)
        }
    }
    let handlesignup = async(e) => {
        setdisabled1(true)
        e.preventDefault();
        const data = {
            name:name, 
            contact: contact,
            email: email,
            password: pass
        }
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password).then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: data.name,
                    phoneNumber: data.contact
                })
                dispatch(add([email, contact, name]))
                success()
                navigate('/dashboard')
                setdisabled1(false)
            }).catch((err)=>{
                throw new Error(err)
            })
        }
        catch (err) {
            setdisabled1(false)
            error(err.message)
        }
    }
    return (
        <main className='main'>
            <Header />
            <div class="container">
                <div class="forms-container">
                    <div class="signin-signup">
                        <form onSubmit={handlelogin} action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input onChange={(e)=>{setemail(e.target.value)}} type="email" placeholder="Email" required/>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input onChange={(e)=>{setpass(e.target.value)}} type="password" placeholder="Password" required/>
                            </div>
                            <input disabled={disabled} type="submit" value="Login" class="btn solid" />
                        </form>
                        <form onSubmit={handlesignup} action="#" class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input onChange={(e)=>{setname(e.target
                                    .value)}} type="text" placeholder="FullName" required/>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input onChange={(e)=>{setcontact(e.target
                                    .value)}} type="number" placeholder="Contact Number" required/>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-envelope"></i>
                                <input onChange={(e)=>{setemail(e.target
                                    .value)}} type="email" placeholder="Email" required/>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input onChange={(e)=>{setpass(e.target
                                    .value)}} type="password" placeholder="Password" required/>
                            </div>
                            <input disabled={disabled1} type="submit" class="btn" value="Sign up" />
                        </form>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>First Time User ?</h3>
                            <p>
                                Want to made a reservation for a luxury cab service. Please sign up to make it.
                            </p>
                            <button class="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="img/log.svg" class="image" alt="" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>Already have an account?</h3>
                            <p>
                                Already made a reservation or want to make reservation for a luxury cab service. Please sign in to check the booking status and make new reservation.
                            </p>
                            <button class="btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" class="image" alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
// <div class="container">
//                 <div class="signin-signup">
//                     {
//                         time && <form action="" class="sign-in-form">
//                         <h2 class="title">Sign in</h2>
//                         <div class="input-field">
//                             <i class="fas fa-user"></i>
//                             <input type="text" placeholder="Username" />
//                         </div>
//                         <div class="input-field">
//                             <i class="fas fa-lock"></i>
//                             <input type="password" placeholder="Password" />
//                         </div>
//                         <input type="submit" value="Login" class="btn" />
//                         <p class="account-text">Don't have an account? <a onClick={()=>{settime(false)}} href="#" id="sign-up-btn2">Sign up</a></p>
//                     </form>
//                     }
//                     {
//                         !time &&  <form action="" class="sign-up-form">
//                         <p class="account-text">Already have an account? <a onClick={()=>{settime(true)}} href="#" id="sign-in-btn2">Sign in</a></p>
//                         <h2 class="title">Sign up</h2>
//                         <div class="input-field">
//                             <i class="fas fa-user"></i>
//                             <input type="text" placeholder="Full Name" />
//                         </div>
//                         <div class="input-field">
//                             <i class="fas fa-user"></i>
//                             <input type="number" placeholder="Contact" />
//                         </div>
//                         <div class="input-field">
//                             <i class="fas fa-envelope"></i>
//                             <input type="text" placeholder="Email" />
//                         </div>
//                         <div class="input-field">
//                             <i class="fas fa-lock"></i>
//                             <input type="password" placeholder="Password" />
//                         </div>
//                         <input type="submit" value="Sign up" class="btn" />
//                         <p class="account-text">Already have an account? <a onClick={()=>{settime(true)}} href="#" id="sign-in-btn2">Sign in</a></p>
//                     </form>
//                     }
//                 </div>
//                 <div class="panels-container">
//                     <div class="panel left-panel">
//                         <div class="content">
//                             <h3>Already Signed Up?</h3>
//                             <p>I have already made a reservation or want to make reservation for a luxury cab service. Please sign in to check the booking status.</p>
//                             <button onClick={()=>{settime(true)}} class="btn" id="sign-in-btn">Sign in</button>
//                         </div>
//                         <img src={signin} alt="" class="image" />
//                     </div>
//                     <div class="panel right-panel">
//                         <div class="content">
//                             <h3>First Time User?</h3>
//                             <p>Want to made a reservation for a luxury cab service. Please sign up to make it.</p>
//                             <button onClick={()=>{settime(false)}} class="btn" id="sign-up-btn">Sign up</button>
//                         </div>
//                         <img src={signup} alt="" class="image" />
//                     </div>
//                 </div>
//             </div>