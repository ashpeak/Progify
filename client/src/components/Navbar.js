import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";


const Navbar = (props) => {

    const collapse = () => {
        const item = document.getElementById("navcol-2");
        item.classList.remove('show');
    }

    const isLoggedIn = (props.status.isLoggedIn === 'true');

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

    useEffect(() => {
        check();
    }, []);

    return (<>
        <nav className="navbar navbar-light navbar-expand-md py-3 fixed-top blur-background">
            <div className="container-fluid"><Link className="navbar-brand d-flex align-items-center" to={"/"}><span className="coursely">&lt; Progify /&gt;</span></Link><button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2">
                <i className="fa-solid fa-bars-staggered navbar-toggler-icon"></i></button>
                <div className="collapse navbar-collapse flex-row justify-content-center align-items-center navbar-menu"
                    id="navcol-2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/dashboard"}>ABOUT US</Link></li>
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/course"}>Courses</Link></li>
                        <li className="nav-item"><Link onClick={collapse} className="nav-link" to={"/blog"}>BLOG</Link></li>
                        <li className="nav-item"><a onClick={collapse} className="nav-link" href="/community">Community</a></li>

                        {isLoggedIn ?
                            <li className="nav-item custom-dropdown">
                                <a className="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown" href="#">{props.status.name}</a>
                                <div className="dropdown-menu" data-bs-popper="none">
                                    <a className="dropdown-item" href="#">
                                        <i className="fa-solid fa-gear me-2"></i>Account Setting</a>
                                    <a className="dropdown-item" href="#"><i className="fa-solid fa-wallet me-2"></i>
                                        <span style={{ color: "rgb(29, 215, 166)" }}>240 </span>C-Coins</a>
                                    <a onClick={() => Cookies.remove('user')} className="dropdown-item" href="#"><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</a>
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