import React from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHand, FaGear, FaRightFromBracket } from "react-icons/fa6";
import { userState } from "../store/userState";

// import logo from "../img/Braintube.png";


const Navbar = () => {

    const user = userState((state) => state.user);
    const { logout } = userState();

    const collapse = () => {
        const item = document.getElementById("navcol-2");
        item.classList.remove('show');
    }

    return (<>
        <nav className="navbar navbar-light navbar-expand-md py-3 fixed-top blur-background">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to={"/"}>
                    {/* <span className="Braintube">&lt; Progify /&gt;</span> */}
                    <img src={"/image/braintube.png"} alt="Braintube" style={{ height: '2.8125rem' }} />
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2">
                    <FaBarsStaggered /></button>
                <div className="collapse navbar-collapse flex-row justify-content-center align-items-center navbar-menu"
                    id="navcol-2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/about"}>ABOUT US</Link></li>
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/course"}>Courses</Link></li>
                        {/* <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/blog"}>BLOG</Link></li> */}
                        <li className="nav-item"><a onClick={collapse} className="nav-link" href="/community">Community</a></li>

                        {user.loggedIn ? (
                            <li className="nav-item custom-dropdown">
                                <Link className="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown">{(user.name)?.substring(0, 15)}</Link>
                                <div className="dropdown-menu" data-bs-popper="none">
                                    <Link className="dropdown-item" to={'/dashboard'}>
                                        <FaUser className="me-2" />Dashboard</Link>
                                    <Link className="dropdown-item" to={''}>
                                        <FaGear className="me-2" />Account Setting</Link>
                                    <Link className="dropdown-item" to={'/course/request'}>
                                        <FaHand className="me-2" />Request Course</Link>
                                    {/* <Link className="dropdown-item" to={''}><i className="fa-solid fa-wallet me-2"></i>
                                        <span style={{ color: "rgb(29, 215, 166)" }}>240 </span>C-Coins</Link> */}
                                    <Link onClick={() => logout()} className="dropdown-item" to={''}><FaRightFromBracket className="me-2" />Logout</Link>
                                </div>
                            </li>) : (
                            <div>
                                <Link onClick={() => collapse()} className="btn my-btn-outline nav-item" to={"/login"}><span>Log in</span></Link>
                                <Link onClick={collapse} className="btn my-btn nav-item" to={"/register"}><span>Sign up</span></Link>
                            </div>)}
                    </ul>
                </div>
            </div>
        </nav></>);
}

export default Navbar;