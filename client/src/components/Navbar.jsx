import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import logo from "../img/Braintube.png";


const Navbar = (props) => {

    const collapse = () => {
        const item = document.getElementById("navcol-2");
        item.classList.remove('show');
    }

    const isLoggedIn = (props.status.isLoggedIn === 'true');
    const navigate = useNavigate();

    const check = async () => {
        try {
            const response = await axios.get('/checklogin');
            if (response.data.loggedin === true) {
                props.setLoggedIn(response.data.name);
            }
        } catch (error) {
            const { data, request } = error.response;
            if (data.msg === 'Unauthorized' || request.status === 401) {
                props.setLoggedOff(false);
            }
        }
    }
    const logout = async () => {
        try {
            const response = await axios.get('/logout');
            if (response.status === 200) {
                props.setLoggedOff(false);
                navigate('/');
            }
        } catch (error) {
            window.alert("Failed to logout!");
        }
    }

    useEffect(() => {
        check();
    }, []);

    return (<>
        <nav className="navbar navbar-light navbar-expand-md py-3 fixed-top blur-background">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to={"/"}>
                    {/* <span className="Braintube">&lt; Progify /&gt;</span> */}
                    <img src={"/image/braintube.png"} alt="Braintube" style={{height: '2.8125rem'}} />
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2">
                    <i className="fa-solid fa-bars-staggered navbar-toggler-icon"></i></button>
                <div className="collapse navbar-collapse flex-row justify-content-center align-items-center navbar-menu"
                    id="navcol-2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/about"}>ABOUT US</Link></li>
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/course"}>Courses</Link></li>
                        {/* <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/blog"}>BLOG</Link></li> */}
                        <li className="nav-item"><a onClick={collapse} className="nav-link" href="/community">Community</a></li>

                        {isLoggedIn ?
                            <li className="nav-item custom-dropdown">
                                <Link className="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown">{(props.status.name)?.substring(0, 15)}</Link>
                                <div className="dropdown-menu" data-bs-popper="none">
                                    <Link className="dropdown-item" to={'/dashboard'}>
                                        <i className="fa-solid fa-user me-2"></i>Dashboard</Link>
                                    <Link className="dropdown-item" to={''}>
                                        <i className="fa-solid fa-gear me-2"></i>Account Setting</Link>
                                    <Link className="dropdown-item" to={'/course/request'}>
                                        <i className="fa-solid fa-hand me-2"></i>Request Course</Link>
                                    {/* <Link className="dropdown-item" to={''}><i className="fa-solid fa-wallet me-2"></i>
                                        <span style={{ color: "rgb(29, 215, 166)" }}>240 </span>C-Coins</Link> */}
                                    <Link onClick={() => logout()} className="dropdown-item" to={''}><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</Link>
                                </div>
                            </li> :
                            <div>
                                <Link onClick={() => collapse()} className="btn my-btn-outline nav-item" to={"/login"}><span>Log in</span></Link>
                                <Link onClick={collapse} className="btn my-btn nav-item" to={"/register"}><span>Sign up</span></Link>
                            </div>}
                    </ul>
                </div>
            </div>
        </nav></>);
}

export default Navbar;