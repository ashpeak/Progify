import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const ChooseUs = () => {
    return (
        <>
            <section>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h3 className="text-capitalize">Why Choose <span className="sub-red">Us?</span></h3>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #b1a3fe" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#e0e7ff" }}>
                                        <div className="my-icon">
                                            <FaRegCheckCircle style={{ color: "#6366f1", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Course</h4>
                                    <p>We offer tons of courses to choose from, providing a vast array of educational opportunities to our students.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #ec4899" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#fce7f3" }}>
                                        <div className="my-icon">
                                        <FaRegCheckCircle style={{ color: "#ec4899", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Community</h4>
                                    <p>We are a community of coders, entrepreneurs, and more. Collaborate with us using our community chat to grow yourself.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #22c55e" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#dcfce7" }}>
                                        <div className="my-icon">
                                        <FaRegCheckCircle style={{ color: "#22c55e", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Online test</h4>
                                    <p>Our assessment tests help you measure your progress and identify areas where you need to improve, ensuring your success.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #a855f7" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#f3e8ff" }}>
                                        <div className="my-icon">
                                        <FaRegCheckCircle style={{ color: "#a855f7", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Certification</h4>
                                    <p>We offer certificates of completion, an addition to any resume or portfolio, validating the skills you've gained.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #f59e0b" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#fef3c7" }}>
                                        <div className="my-icon">
                                        <FaRegCheckCircle style={{ color: "#f59e0b", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Notes</h4>
                                    <p>Our note-making tools help students stay organized and improve retention, ensuring they get the most out of each lesson.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card why-card" style={{ borderBottom: "5px solid #14b8a6" }}>
                                <div style={{ minHeight: "15rem" }} className="card-body text-center p-4">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary-light d-inline-block justify-content-center align-items-center d-inline-block mb-3 bs-icon choose-icon" style={{ backgroundColor: "#ccfbf1" }}>
                                        <div className="my-icon">
                                        <FaRegCheckCircle style={{ color: "#14b8a6", fontSize: "2em" }} />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Educator</h4>
                                    <p>Our platform is staffed with the best teachers, who bring a wealth of knowledge and experience to the classroom.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChooseUs;