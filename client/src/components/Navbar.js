import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => {

    const collapse = () => {
        const item = document.getElementById("navcol-2");
        item.classList.remove('show');
    }

    return (<>
    <nav className="navbar navbar-light navbar-expand-md py-3 fixed-top blur-background">
        <div className="container-fluid"><Link className="navbar-brand d-flex align-items-center" to={"/"}><span className="coursely">&lt; Progify /&gt;</span></Link><button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2">
            <i className="fa-solid fa-bars-staggered navbar-toggler-icon"></i></button>
            <div className="collapse navbar-collapse flex-row justify-content-center align-items-center navbar-menu"
                id="navcol-2">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/about"}>ABOUT US</Link></li>
                    <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/course"}>Courses</Link></li>
                    <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/blog"}>BLOG</Link></li>
                    <li className="nav-item"><a onClick={collapse} className="nav-link" href="/community">Community</a></li>

                    <div>
                        <Link onClick={collapse} className="btn my-btn-outline nav-item" to={"/login"}><span>Log in</span></Link>
                        <Link onClick={collapse} className="btn my-btn nav-item" to={"/register"}><span>Sign up</span></Link>
                    </div>
                </ul>
            </div>
        </div>
    </nav></>);
}

export default Navbar;