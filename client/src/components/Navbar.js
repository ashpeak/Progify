import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (<><nav className="navbar navbar-light navbar-expand-md py-3 fixed-top blur-background">
        <div className="container-fluid"><Link className="navbar-brand d-flex align-items-center" to={"/"}><span className="coursely">&lt; Progify /&gt;</span></Link><button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2">
            <i className="fa-solid fa-bars-staggered navbar-toggler-icon"></i></button>
            <div className="collapse navbar-collapse flex-row justify-content-center align-items-center navbar-menu"
                id="navcol-2">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link className="nav-link" to={"/"}>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={"/dashboard"}>ABOUT</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={"/course"}>Courses</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={"/blog"}>BLOG</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={"/contact"}>CONTACT</Link></li>
                </ul><Link className="btn my-btn" to={"/dashboard"}><span>Dashboard&nbsp;</span><i className="fa-solid fa-arrow-right"></i></Link>
            </div>
        </div>
    </nav></>);
}

export default Navbar;