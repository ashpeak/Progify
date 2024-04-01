import React, { useEffect, useState, } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosHelper from '../lib/axiosHelper';
import { userState } from '../store/userState';
import { toast } from 'sonner';

import MoonLoader from "react-spinners/MoonLoader";
// import Google from '../img/Social-google.svg';

const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const Login = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');
    const loggedUser = userState((state) => state.user);
    const { setLoggedUser } = userState();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(
            { ...user, [name]: value }
        );
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        setShow(false);

        if (!user.email || !user.password) {
            return;
        }

        setLoader(true);

        try {
            const response = await axiosHelper("/api/login", "POST", user);

            setLoader(false);
            if (response.status === 200) {
                setLoggedUser(response.data);
            } else {
                const { data } = response;
                setLoader(false);

                setUser({
                    ...user,
                    password: ""
                });

                toast.error(data.msg);

                if (data.msg === "Account not verified, please verify!") setShow(true);
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        if (loggedUser.loggedIn) {
            if (redirect) {
                navigate(decodeURIComponent(redirect).split(frontendUrl)[1]);
            } else {
                navigate("/dashboard");
            }
        }
    }, [loggedUser]);

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Log in to Braintube</h4>
                    {/* <div>
                        <button className="google-btn btn">
                            <Link className='custom-link' to={"/auth/google"}>
                                <img src={Google} alt='google' />&nbsp;Continue with Google
                            </Link>
                        </button>
                    </div> */}
                    <div className='emailOrgoogle'>
                        <span className='emailOrgoogle-text'>Continue with email</span>
                    </div>

                    <form method='POST' onSubmit={formSubmit}>
                        <div>
                            <div>
                                <input className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Email" name='email' required value={user.email} />
                            </div>
                            <div>
                                <input className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                    placeholder="password" name='password' required value={user.password} />

                            </div>
                            {show && <>
                                <span style={{ color: "#656d77", fontSize: "0.79rem" }} data-bs-toggle="modal" data-bs-target="#notreceived">
                                    Can't find Email?
                                </span>
                                <div className="modal fade" id="notreceived" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                If you can't find email in inbox, kindly check spam folder and rest other folders too.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                            {loader ?
                                <div className='login-loader'>
                                    <MoonLoader
                                        color={"#0102ff"}
                                        size={22}
                                        aria-label="Processing"
                                        data-testid="loader"
                                    />
                                </div> : <button type='submit' className="btn my-btn btn-lg-rg">Login</button>}
                        </div>
                    </form>
                    <div className='my-2'>
                        <span><strong><Link className="custom-link alter-lg-rg" to={"/users/reset"}>Forgot password?</Link></strong></span>
                    </div>
                    <div className='switch-holder'>
                        <span className='acc-switch'>Don't have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/register"}>Sign up</Link></strong></span>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Login;