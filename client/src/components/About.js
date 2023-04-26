import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (<>
        <section>
            <div className='about-banner'>
                <div className="container h-100">
                    <div className="row h-100 mb-4">
                        <div className="py-5 col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
                            <div style={{ maxWidth: "350px" }}>
                                <h1 style={{ color: "#fff" }} className="text-uppercase fw-bold">About Our Educational Platform</h1>
                                <p className="my-3">Learn more about our mission and the team behind our free courses</p>
                                <Link to={"/course"} className='btn btn-light'>Courses</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mb-5'>
                <div>
                    <h2>
                        Who we are ?
                    </h2>
                    <p>
                        Welcome to <strong style={{ color: "var(--han-blue)" }}>Coursely</strong>! We are a leading brand providing top-quality free courses across a wide range of fields. Whether you are looking to enhance your skills, develop new ones or just learn something new, we have something for everyone.

                        Our mission is to make education accessible to all, irrespective of their background or financial status. We believe that everyone has the right to learn and grow, and our platform is designed to empower individuals with the knowledge and skills they need to succeed.

                        We offer a diverse range of courses, including designing, development, skill enhancement, and many more. Our courses are carefully curated and designed by experts in their respective fields, ensuring that you receive the best possible education.

                        At our platform, we strive to create a supportive and engaging learning environment that fosters growth and development. We believe that learning should be fun and interactive, and our courses are designed with this in mind.

                        So, whether you are a beginner looking to learn a new skill or an experienced professional looking to enhance your knowledge, we have something for you. Join us today and take the first step towards a brighter future!
                    </p>
                </div>
            </div>
        </section>
    </>);
}

export default About;