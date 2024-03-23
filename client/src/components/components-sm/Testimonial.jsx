import React from 'react';
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
    return (<><section className="testimonial">
        <div className="container">
            <div className="row">
                <div className="col-md-8 order-1">
                    <h2 className="review" style={{ color: "var(--han-blue)" }}>Student Reviews on Us</h2>
                </div>
                <div className="testimonial-btn col-md-4 order-2"><a className="btn my-btn-outline" href="#carousel-1"
                    role="button" data-bs-slide="prev"><svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor">

                        <path
                            d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z">
                        </path>
                    </svg></a><a className="btn my-btn" href="#carousel-1" role="button" data-bs-slide="next"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em"
                        fill="currentColor">

                        <path
                            d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z">
                        </path>
                    </svg></a></div>
            </div>
            <div className="review-underline"></div>
            <div className="carousel slide my-3" data-bs-ride="carousel" id="carousel-1">
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ textAlign: "center" }}>
                        <div className="card d-inline-block" style={{ textAlign: "center", background: "rgba(255,255,255,0)" }}>
                            <div className="card-body">
                                <h2 className="card-title">Rahul</h2>
                                <p className="lead card-text">I've completed several courses from Braintube, and I'm impressed by the breadth of topics covered. From learning a new language to developing programming skills, the courses are well-structured and engaging. The instructors are friendly and knowledgeable, and I appreciate the effort they put into explaining every concept in detail. Thank you for providing such a valuable resource!</p>
                                <div>
                                    <picture className="d-inline-block"><img className="img-testimonial"
                                        src={"/image/user.jpg"} alt='avatar' /></picture>
                                </div>
                                <div>
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ textAlign: "center" }}>
                        <div className="card d-inline-block" style={{ textAlign: "center", background: "rgba(255,255,255,0)" }}>
                            <div className="card-body">
                                <h2 className="card-title">Saurabh</h2>
                                <p className="lead card-text">I stumbled upon this website a few months ago, and I'm blown away by the quality of the courses. The instructors are knowledgeable and passionate about their subjects, and the lessons are easy to follow. I've learned so much, and it's all for free! I highly recommend this website to anyone looking to expand their knowledge.</p>
                                <div>
                                    <picture className="d-inline-block"><img className="img-testimonial"
                                        src={"/image/user.jpg"} alt='' /></picture>
                                </div>
                                <div>
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ "textAlign": "center" }}>
                        <div className="card d-inline-block" style={{ "textAlign": "center", "background": "rgba(255,255,255,0)" }}>
                            <div className="card-body">
                                <h2 className="card-title">Ashish</h2>
                                <p className="lead card-text">This is an amazing website for anyone looking to learn new skills. The courses are free, informative, and comprehensive. The instructors are wonderful and teach from the basics, making it easy to follow along. I've learned so much from this website and have been able to apply it to my personal and professional life. I highly recommend this website to anyone looking to expand their knowledge and skills.</p>
                                <div>
                                    <picture className="d-inline-block"><img className="img-testimonial"
                                        src={"/image/user.jpg"} alt='' /></picture>
                                </div>
                                <div>
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                    <FaStar style={{ color: "#ff9e2a" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>);
}

export default Testimonial;