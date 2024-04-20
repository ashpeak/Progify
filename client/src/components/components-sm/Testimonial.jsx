import React from 'react';
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const testimonials = [
    {
        name: "Rahul",
        review: "I've completed several courses from Braintube, and I'm impressed by the breadth of topics covered. From learning a new language to developing programming skills, the courses are well-structured and engaging. The instructors are friendly and knowledgeable, and I appreciate the effort they put into explaining every concept in detail. Thank you for providing such a valuable resource!",
        rating: 5
    },
    {
        name: "Saurabh",
        review: "I stumbled upon this website a few months ago, and I'm blown away by the quality of the courses. The instructors are knowledgeable and passionate about their subjects, and the lessons are easy to follow. I've learned so much, and it's all for free! I highly recommend this website to anyone looking to expand their knowledge.",
        rating: 5
    },
    {
        name: "Ashish",
        review: "This is an amazing website for anyone looking to learn new skills. The courses are free, informative, and comprehensive. The instructors are wonderful and teach from the basics, making it easy to follow along. I've learned so much from this website and have been able to apply it to my personal and professional life. I highly recommend this website to anyone looking to expand their knowledge and skills.",
        rating: 5
    },
    {
        name: "Geetanjali",
        review: "I've been using this website for a few weeks now, and I'm loving it! The courses are well-organized and easy to follow, and the instructors are knowledgeable and engaging. I've learned so much from this website and have been able to apply it to my work. I highly recommend this website to anyone looking to learn new skills.",
        rating: 4
    },
    {
        name: "Raj",
        review: "Taken a few courses from Braintube, and I'm impressed by the quality of the content. The instructors are knowledgeable and passionate about their subjects, and the lessons are easy to follow. I've learned so much from this website and have been able to apply it to my work. I highly recommend this website to anyone looking to learn new skills.",
        rating: 4
    },
];

const images = ['test-avatar-1.jpg', 'test-avatar-2.jpg', 'test-avatar-3.jpeg'];

const Testimonial = () => {
    const [swiper, setSwiper] = React.useState(null);
    return (
        <>
            <section className="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 order-1">
                            <h2 className="review" style={{ color: "var(--han-blue)" }}>Student Reviews on Us</h2>
                        </div>
                        <div className="testimonial-btn col-md-4 order-2">
                            <button className="btn my-btn-outline" type='button' onClick={() => swiper.slidePrev(300)}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor">
                                    <path
                                        d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z">
                                    </path>
                                </svg>
                            </button>
                            <button className="btn my-btn" type='button' onClick={() => swiper.slideNext(300)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em"
                                    fill="currentColor">
                                    <path
                                        d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="review-underline"></div>
                    <div className="my-3 mt-5">
                        <Swiper
                            onSwiper={setSwiper}
                            slidesPerView={2}
                            breakpoints={
                                {
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 5
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 20
                                    },
                                    1528: {
                                        slidesPerView: 3,
                                        spaceBetween: 40
                                    }
                                }
                            }
                            loop={true}
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={`testimonial${index}`}>
                                    <div style={{ textAlign: "center" }}>
                                        <div className="card d-inline-block" style={{ textAlign: "center", background: "rgba(255,255,255,0)", border: "1px solid #b1a3febd", boxShadow: "rgb(209 215 220 / 74%) 0px 0px 18px 0px" }}>
                                            <div className="card-body">
                                                <h2 className="card-title">{testimonial.name}</h2>
                                                <p className="lead card-text">{testimonial.review}</p>
                                                <div>
                                                    <picture className="d-inline-block">
                                                        <img className="img-testimonial" src={"/image/" + images[index % images.length]} alt='avatar' />
                                                    </picture>
                                                </div>
                                                <div>
                                                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                                                        <FaStar key={`star${starIndex}${Date.now()}`} color="#ff9e2a" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>);
}

export default Testimonial;