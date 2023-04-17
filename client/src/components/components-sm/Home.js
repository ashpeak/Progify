import React from "react";
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Home = () => {
    return (<>
        <section id="home" className="banner-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 order-md-1 order-2 banner-content">
                        <h2 className="subheading"><span style={{ color: "rgb(38, 38, 38)" }}><span
                            style={{ color: "var(--blush)" }}>WANT</span> TO LEARN</span><br /></h2>
                        <h1 style={{ color: "rgb(54 58 69/1)" }}>
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('Pro<span style="color: #df3b69; text-decoration: underline">gramming</span>')
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString('Dev<span style="color: #df3b69; text-decoration: underline">elopment</span>')
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString('Des<span style="color: #df3b69; text-decoration: underline">igning</span>')
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString('Much<span style="color: #df3b69; text-decoration: underline">More</span> ?')
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .start();
                            }}
                        />
                        </h1>
                        <h4>Join Now And Start Learning<br />From Leading Teachers In Industry.</h4>
                        <Link className="btn my-btn-outline" to={"/register"}>Sign Up</Link>
                        <Link className="btn my-btn" to={"/course"}>Courses</Link>
                    </div>
                    <div className="col-md-5 order-md-2 order-1 banner-img" style={{ textAlign: "center" }}><img className="img-fluid"
                        src={require("../../img/juicy-man-programmer-writing-code-and-make-web-design-on-a-pc.gif")}
                        style={{ paddingBottom: "0px", paddingTop: "0px", marginTop: "-20px" }} alt="program" /></div>
                </div>
            </div>
        </section></>);
}

export default Home;