import React, { useEffect, useState } from 'react';
import { UseSelector, useSelector } from 'react-redux/';
import { storage } from './Config/Firebase';
import {
    ref,
    uploadBytes,
    listAll,
    getDownloadURL
} from 'firebase/storage';
import { database } from './Config/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './Galary.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export function PeopleReviews() {
    const [islogin, setislogin] = useState(useSelector(state=>state.loginState.islogin))
    const [show, setShow] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fileUpload, setFileUpload] = useState(null);
    const [loading, setLoading] = useState(false)
    const [sendData, setSendData] = useState({
        name: '',
        profession: '',
        review: ''
    });
    const [fetchImages, setFetchImages] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const navigate = useNavigate('');

    useEffect(() => {
        const path = ref(storage, 'people_reviews_images/');
        listAll(path).then(res => {
            setLoading(true)
            const downloadPromises = res.items.map(item =>
                getDownloadURL(item).then(url => url)
            );
            Promise.all(downloadPromises).then(urls => {
                setFetchImages(urls);
                setLoading(false)
            });
        });

        getReviewData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % reviewData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [reviewData]);

    const getReviewData = async () => {
        try {
            setLoading(true)
            const data = await getDocs(collection(database, 'reviews'));
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setReviewData(filteredData);
            setLoading(false)
        } catch (err) {
            console.log("Can't get data");
            setLoading(true)
        }
    };

    const uploadImage = async () => {
        if (!fileUpload) return;
        const fileUploadData = ref(
            storage,
            `people_reviews_images/${fileUpload.name}`
        );

        try {
            await uploadBytes(fileUploadData, fileUpload);
            submitData();
        } catch (err) {
            console.log(err);
        }
    };

    const submitData = async () => {
        try {
            const submit = {
                ...sendData,
                uploaded: !!fileUpload
            };
            await addDoc(collection(database, 'reviews'), submit);
            setSendData({ name: '', profession: '', review: '' });
            getReviewData();
            show(true)
            navigate('/reviews');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='main-reviews-sec'>
            <Header />
            <h1 className='gallery-h1 update-h1'>REVIEWS</h1>
            <div className='center'>
                {
                    islogin && <button onClick={() => setShow(!show)} className='write-review'>
                    {
                        show ? 'Write a Review' : 'Back'
                    }
                </button>
                }
            </div>
            <section className='container0101'>
                <div className='slider-wrapper'>
                    <div className='slider'>
                        {show &&
                            reviewData.length !== 0 &&
                            fetchImages.length !== 0 &&
                            reviewData.map((arr, index) => (
                                <div
                                    className='main-review'
                                    key={index}
                                    style={{ display: index === currentIndex ? 'block' : 'none' }}
                                >
                                    <img className='image-review' src={fetchImages[index]} alt='' />
                                    <div className="apply">
                                        <h1 className='h1-reviews'>{arr.name}</h1>
                                        <h1 className='h1-reviews1'>{arr.profession}</h1>
                                        <p className='p-reviews1'>{arr.review}</p>
                                    </div>
                                    <div className='left-reviews'></div>
                                    <div className='top-reviews'></div>
                                    <div className='bottom-reviews'></div>
                                    <div className='right-reviews'></div>
                                </div>
                            ))}
                        {!show && (
                            <div className='data-reviews'>
                                <label htmlFor='' >Upload Your Image</label><br />
                                <input
                                    className='margin-1'
                                    onChange={e => {
                                        setFileUpload(e.target.files[0]);
                                    }}
                                    type='file'
                                    name=''
                                    id=''
                                    accept='image/*' required
                                /><br />
                                <label className='margin-2' htmlFor=''>
                                    Your Full Name
                                </label>
                                <input
                                    onChange={e => {
                                        setSendData({ ...sendData, name: e.target.value });
                                    }}
                                    className='margin-1'
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='Full Name' required
                                />
                                <label className='margin-2' htmlFor=''>
                                    Your Profession
                                </label>
                                <input
                                    onChange={e => {
                                        setSendData({ ...sendData, profession: e.target.value });
                                    }}
                                    className='margin-1'
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='Profession' required
                                />
                                <label className='margin-2' htmlFor=''>
                                    Write a Review
                                </label>
                                <textarea
                                    onChange={e => {
                                        setSendData({ ...sendData, review: e.target.value });
                                    }}
                                    className='margin-1'
                                    name=''
                                    id=''
                                    cols='30'
                                    rows='10'
                                    placeholder='Reviews' required
                                ></textarea>
                                <div className='center c1'>
                                    <button onClick={uploadImage} type='submit' className='add-review'>
                                        Add Review
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {

                loading && <div className='loading-state'>
                    <h1 className='l-s'>Loading...</h1>
                </div>
            }
            <Footer />
        </div>
    );
}
