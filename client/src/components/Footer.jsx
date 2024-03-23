import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {

    const year = new Date().getFullYear();

    return (<>
        <footer className="footer">
            <div className="container pt-4 pt-lg-5">
                <div className="row">
                    <div className="col-md-3 text-center text-md-start">
                        <Link to="/">
                            <img src="/image/braintube.png" height={45} width={167.56} alt="logo" />
                        </Link>
                        <p style={{ color: "#f3f4f6", fontSize: "1rem" }} className='mt-2'>Never Stop Learning!<br />Join Us Now</p>
                    </div>
                    <div className="col-md-3 text-center text-md-start mt-4 mt-md-0">
                        <h5 className="mb-1 mb-md-3">QUICK LINKS</h5>
                        <Link to="/course">
                            <p>Courses</p>
                        </Link>
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                        <Link to="/register">
                            <p>Signup</p>
                        </Link>
                        <Link to="/terms-of-service">
                            <p>Terms of Service</p>
                        </Link>
                        <Link to="/privacy-policy">
                            <p>Privacy Policy</p>
                        </Link>
                    </div>
                    <div className="col-md-3 text-center text-md-start mt-4 mt-md-0">
                        <h5 className="mb-1 mb-md-3">CONNECT WITH US</h5>
                        <a rel='noopener noreferrer' target="_blank" href="https://www.facebook.com/profile.php?id=61557530494249">
                            <p>Facebook</p>
                        </a>
                        <a rel='noopener noreferrer' target="_blank" href="https://www.youtube.com/@kubasoftware">
                            <p>Youtube</p>
                        </a>
                        <a rel='noopener noreferrer' target="_blank" href="https://www.instagram.com/braintube_ind/">
                            <p>Instagram</p>
                        </a>
                        <a rel='noopener noreferrer' target="_blank" href="https://t.me/braintube">
                            <p>Telegram</p>
                        </a>
                    </div>
                    <div className="col-md-3 text-center text-md-start mt-4 mt-md-0">
                        <h5 className="mb-1 mb-md-3">GET IN TOUCH</h5>
                        <a href="mailto:kubabrandingsolutions@gmail.com">
                            <p style={{ wordBreak: 'break-all' }}>
                                <MdOutlineEmail />&nbsp; kubabrandingsolutions@gmail.com
                            </p>
                        </a>
                        <a href="tel:7068530524">
                            <p><FaPhoneAlt />&nbsp; 7068530524</p>
                        </a>
                    </div>
                </div>

                <hr style={{ color: "#959595" }} className='mt-4 mt-md-5' />

                <div className="row" style={{ marginTop: "2rem" }}>
                    <div className="col-md-12 text-center">
                        <span className='copyright'>Copyright © {year} BrainTube. All Rights Reserved.</span>
                    </div>

                    <div className="col-md-12 text-center mt-2">
                        <p className='ashish'>
                            Made with ❤️ by <a className='ashish-in' rel='noopener noreferrer' target="_blank" href="https://www.linkedin.com/in/ashishsingh09dev/"><CiLinkedin style={{ marginTop: "-0.25rem" }} /> Ashish Singh</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;