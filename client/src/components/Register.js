import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import Google from '../img/Social-google.svg';

const Register = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [data, setData] = useState({
        color: "",
        msg: ""
    });
    const [show, setShow] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const formSubmit = async (e) => {

        setShow(false);
        if (!user.name || !user.username || !user.password || !user.confirmPassword) {
            return;
        }

        if (user.password !== user.confirmPassword) {
            window.alert("Password & Confirm Password should be same!");
            return;
        }
        if (user.name.length > 20 || user.name.length < 5 || user.password.length < 8 || user.password.length > 30) {
            setData({
                color: "#dc5a5a",
                msg: "Invalid inputs!"
            });
            return;
        }

        try {
            const res = await axios.post('/register', user);

            if (res.status === 201) {
                setUser({
                    name: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
                setData({
                    color: "#5cdc5a",
                    msg: res.data.msg
                });

                setShow(true);
            }

        } catch (error) {
            const { status, data } = error.response;
            if (status === 400) {
                setUser({
                    ...user,
                    password: "",
                    confirmPassword: ""
                });
                setData({
                    color: "#dc5a5a",
                    msg: data.msg
                });
            }
        }
    }

    useEffect(() => {
        if (props.setLoggedOff()) {
            navigate('/dashboard');
        }
    });

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Sign up for Coursely</h4>
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
                    <form method='POST'>
                        <div>
                            <div><input className='login-input form-control' type="text" maxLength={20} minLength={5} onChange={handleInput} name='name' placeholder="Name" value={user.name} required /></div>
                            <div><input className='login-input form-control' type="email" onChange={handleInput} name='username' placeholder="Email" value={user.username} required /></div>
                            <div>
                                <input className='login-input form-control' type="password"
                                    style={{ marginBottom: "0" }} maxLength={30} minLength={8} onChange={handleInput} name='password' autoComplete='true' placeholder="password" value={user.password} required />
                                <input id="password" className='login-input form-control' type="password"
                                    style={{ marginBottom: "0" }} maxLength={30} minLength={8} onChange={handleInput} name='confirmPassword' autoComplete='true' placeholder="Confirm Password" value={user.confirmPassword} required />
                                <label for="password" className="form-label" style={{ color: "#656d77", fontSize: "0.79rem" }}>*Minimum 8 characters</label>

                                {data.msg && <><div className='login-input verify' style={{ backgroundColor: data.color }}>
                                    <span>{data.msg}</span>
                                </div>
                                    {show && <><span style={{ color: "#656d77", fontSize: "0.79rem" }} data-bs-toggle="modal" data-bs-target="#notreceived">
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
                                        </div></>}</>}

                            </div>
                            <div>
                                <button type='button' className="btn my-btn btn-lg-rg" onClick={formSubmit}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <div className='switch-holder'>
                        <span className='acc-switch'>
                            Have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/login"}>Login</Link></strong>
                        </span>
                    </div>
                </div>
            </div >
        </section >
    </>);
}

export default Register;