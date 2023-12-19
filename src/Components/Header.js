import { useNavigate } from 'react-router-dom'
import './alpha.css'
import Logo from './Logo.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { auth } from './Config/Firebase';
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../Store/loginSlice'
import { toast } from 'react-toastify';
const Header = () => {
    let [email, setEmail] = useState(useSelector(state => state.loginState.islogin));
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let handledelete = () => {
        dispatch(remove())
        signOut(auth).then(() => {
            console.log("signed out");
        }).catch((error) => {
            console.log("error signed out");
        });
        toast.info("User Logged Out", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        navigate('/')
    }
    let clocation = useLocation();
    let [data, setdata] = useState({
        home: true,
        about: false,
        reservation: false,
        contact: false
    })
    let changehover = (e) => {
        console.log(e);
    }
    return (
        <header id="masthead" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
            <p class="main-title bhf-hidden" itemprop="headline"><a href="https://airportmetrolimo.com"
                title="KZ Cars" rel="home">KZ Cars</a></p>
            <div data-elementor-type="wp-post" data-elementor-id="54" class="elementor elementor-54">
                <header
                    class="elementor-section elementor-top-section elementor-element elementor-element-26779241 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="26779241" data-element_type="section"
                    data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                    <div class="elementor-container elementor-column-gap-default">
                        <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-535290dd"
                            data-id="535290dd" data-element_type="column">
                            <div class="elementor-widget-wrap elementor-element-populated">
                                <div class="elementor-element elementor-element-5ae04ee8 elementor-widget elementor-widget-image"
                                    data-id="5ae04ee8" data-element_type="widget" data-widget_type="image.default">
                                    <div class="elementor-widget-container">
                                        <a href="/">
                                            <img className='img-logo' src={Logo} alt="" /> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7cfbeb30"
                            data-id="7cfbeb30" data-element_type="column">
                            <div class="elementor-widget-wrap elementor-element-populated">
                                <div class="elementor-element elementor-element-70e89ab9 elementor-nav-menu__align-left elementor-nav-menu--stretch elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu"
                                    data-id="70e89ab9" data-element_type="widget"
                                    data-settings="{&quot;full_width&quot;:&quot;stretch&quot;,&quot;layout&quot;:&quot;horizontal&quot;,&quot;submenu_icon&quot;:{&quot;value&quot;:&quot;&lt;i class=\&quot;fas fa-caret-down\&quot;&gt;&lt;\/i&gt;&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;toggle&quot;:&quot;burger&quot;}"
                                    data-widget_type="nav-menu.default">
                                    <div class="elementor-widget-container">
                                        <link rel="stylesheet" href="https://airportmetrolimo.com/wp-content/plugins/elementor-pro/assets/css/widget-nav-menu.min.css" />
                                        <nav
                                            class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-double-line e--animation-slide">
                                            <ul id="menu-1-70e89ab9" class="elementor-nav-menu">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-60">
                                                    <a onClick={changehover} href="/" aria-current="page"
                                                        class={`elementor-item ${clocation.pathname === '/' ? 'elementor-item-active' : ''}`}>Home</a></li>
                                                {
                                                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-170">
                                                        <a href="/about" class={`elementor-item ${clocation.pathname === '/about' ? 'elementor-item-active' : ''}`}>About</a></li>
                                                }
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-145"><a href="/" class="elementor-item" tabindex="-1">Our Services</a>
                                                    <ul class="sub-menu elementor-nav-menu--dropdown">
                                                        {
                                                            useSelector(state => state.loginState.islogin) ? <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169">
                                                                <a href="/dashboard" class={`elementor-item ${clocation.pathname === '/dashboard' ? ` elementor-item-active` : ''}`}>DashBoard</a></li> : <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169">
                                                                <a href="/login" class={`elementor-item ${clocation.pathname === '/login' ? ` elementor-item-active` : ''}`}>Login/Register</a></li>
                                                        }
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-236"><a href="/discounts" class="elementor-sub-item" tabindex="-1">Discounts</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-255"><a href="/reviews" class="elementor-sub-item" tabindex="-1">Reviews</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-254"><a href="/gallery" class="elementor-sub-item" tabindex="-1">Gallery</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-273"><a href="/privacy-policy" class="elementor-sub-item" tabindex="-1">Privacy Policy</a></li>
                                                    </ul>
                                                </li>
                                                <li
                                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                    <a href="/reservation" class={`elementor-item ${clocation.pathname === '/reservation' ? ` elementor-item-active` : ''}`}>Reservation</a></li>

                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169">
                                                    <a href="/contact" class={`elementor-item ${clocation.pathname === '/contact' ? ` elementor-item-active` : ''}`}>Contact Us</a></li>
                                            </ul>
                                        </nav>
                                        <div class="elementor-menu-toggle" role="button" tabindex="0"
                                            aria-label="Menu Toggle" aria-expanded="false">
                                            <i aria-hidden="true" role="presentation"
                                                class="elementor-menu-toggle__icon--open fa-solid fa-bars"></i><i
                                                    aria-hidden="true" role="presentation"
                                                    class="elementor-menu-toggle__icon--close fa-solid fa-xmark"></i> <span
                                                        class="elementor-screen-only">Menu</span>
                                        </div>
                                        <nav class="elementor-nav-menu--dropdown elementor-nav-menu__container"
                                            aria-hidden="true">
                                            <ul id="menu-2-70e89ab9" class="elementor-nav-menu abcde">
                                                <li
                                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-6 current_page_item menu-item-60">
                                                    <a href="/" aria-current="page"
                                                        class={`elementor-item ${clocation.pathname === '/' ? 'elementor-item-active' : ''}`} tabindex="-1">Home</a>
                                                </li>
                                                {/* <li
                                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-170">
                                                    <a href="/about" class={`elementor-item ${clocation.pathname === '/about' ? 'elementor-item-active' : ''}`}
                                                        tabindex="-1">About</a></li> */}
                                                {
                                                    <li
                                                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-170">
                                                        <a href="/about" class={`elementor-item ${clocation.pathname === '/about' ? 'elementor-item-active' : ''}`}
                                                            tabindex="-1">About</a></li>
                                                }
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-145"><a href="/" class="elementor-item" tabindex="-1">Our Services</a>
                                                    <ul class="sub-menu elementor-nav-menu--dropdown">
                                                        {
                                                            useSelector(state => state.loginState.islogin) ? <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                                <a href="/dashboard" class={`elementor-item ${clocation.pathname === '/dashboard' ? ` elementor-item-active` : ''}`}>DashBoard</a></li> : <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                                <a href="/login" class={`elementor-item ${clocation.pathname === '/login' ? ` elementor-item-active` : ''}`}>Login/Register</a></li>
                                                        }
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a href="/discounts" class="elementor-sub-item" tabindex="-1">Discounts</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a href="/reviews" class="elementor-sub-item" tabindex="-1">Reviews</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a href="/gallery" class="elementor-sub-item" tabindex="-1">Gallery</a></li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a href="/privacy-policy" class="elementor-sub-item" tabindex="-1">Privacy Policy</a></li>
                                                    </ul>
                                                </li>
                                                <li
                                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                    <a href="/reservation"
                                                        class={`elementor-item ${clocation.pathname === '/reservation' ? ` elementor-item-active` : ''}`} tabindex="-1">Reservation</a></li>
                                                {
                                                    useSelector(state => state.loginState.islogin) ? <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                        <a href="/dashboard" class={`elementor-item ${clocation.pathname === '/dashboard' ? ` elementor-item-active` : ''}`}>DashBoard</a></li> : <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                        <a href="/login" class={`elementor-item ${clocation.pathname === '/login' ? ` elementor-item-active` : ''}`}>Login/Register</a></li>
                                                }
                                                <li
                                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                                    <a href="contact"
                                                        class={`elementor-item ${clocation.pathname === '/contact' ? ` elementor-item-active` : ''}`} tabindex="-1">Contact Us</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-cfb1eb0"
                            data-id="cfb1eb0" data-element_type="column">
                            <div class="elementor-widget-wrap elementor-element-populated">
                                <div class="elementor-element elementor-element-24863c56 elementor-align-justify elementor-mobile-align-center elementor-widget elementor-widget-button"
                                    data-id="24863c56" data-element_type="widget" data-widget_type="button.default">
                                    <div class="elementor-widget-container">
                                        <div class="elementor-button-wrapper">
                                            <a href="tel:+447446158821"
                                                class="elementor-button-link elementor-button elementor-size-md"
                                                role="button " style={{ width: '250px' }}>
                                                <span class="elementor-button-content-wrapper">
                                                    <span class="elementor-button-icon elementor-align-icon-left">
                                                        <i aria-hidden="true" class="fas fa-phone-alt"></i> </span>
                                                    <span class="elementor-button-text">+447446158821</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    {
                                        useSelector(state => state.loginState.islogin) && <div onClick={handledelete} className="bnn">
                                            <button className='btnj'>Sign Out</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </header>
    )
}

export default Header