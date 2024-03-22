import React from 'react';
import { Link } from 'react-router-dom';

const AboutMe = () => {
    return (<><section className="about-me mb-5">
    <div className="container">
        <div className="row">
            <div className="col-md-6 about-content">
                <picture><img className="img-fluid" alt='' src={"/image/hello-user.png"} /></picture>
            </div>
            <div className="col-md-6 about-content">
                <div>
                    <h3>know</h3>
                    <h3>About<span className="sub-red">&nbsp;Us</span></h3>
                    <p>Braintube is an online education platform offering high-quality courses supported by top-notch free content. Discover hundreds of courses for free.&nbsp;Our courses offer content from experts in a wide range of fields, such as business, finance, marketing, programming, and more. You’ll be able to learn in a structured and organized fashion, with videos, assignments, and updates included in the courses to help you stay on track and get the most out of learning....</p>
                    <Link to={"/about"} className="btn my-btn">More</Link>
                </div>
            </div>
        </div>
    </div>
</section></>);
} 

export default AboutMe;