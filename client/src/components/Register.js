import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Google from '../img/Social-google.svg';

const Register = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const formSubmit = async (e) => {

        if (!user.name || !user.username || !user.password || !user.confirmPassword) {
            return;
        }

        if (user.password !== user.confirmPassword) {
            window.alert("Password & Confirm Password should be same!");
            return;
        }
        if(user.name.length > 20 || user.name.length < 5 || user.password.length < 8 || user.password.length > 15){
            window.alert("Invalid inputs!");
            return;
        }

        try {
            const res = await axios.post('/register', user);

            if (res.status === 201) {
                window.alert("Registration sucessfull!");
                return navigate("/login");
            }
        } catch (error) {
            const { status, data } = error.response;
            window.alert(data.error)
            if (status === 400 && data.error === "User already exists!") {
                return navigate("/login");
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
                    <h4>Sign up for Coursely</h4><button className="google-btn btn" href="#"><img src={Google} alt='google' />&nbsp;Continue with Google</button>
                    <div className='emailOrgoogle'>
                        <span className='emailOrgoogle-text'>Or continue with email</span>
                    </div>
                    <form method='POST'>
                        <div>
                            <div><input className='login-input form-control' type="text" maxLength={20} minLength={5} onChange={handleInput} name='name' placeholder="Name" value={user.name} required /></div>
                            <div><input className='login-input form-control' type="email" onChange={handleInput} name='username' placeholder="Email" value={user.email} required /></div>
                            <div>
                                <input id="password" className='login-input form-control' type="password"
                                    style={{ marginBottom: "0" }} maxLength={15} minLength={8} onChange={handleInput} name='password' autoComplete='true' placeholder="password" value={user.password} required />
                                <input id="password" className='login-input form-control' type="password"
                                    style={{ marginBottom: "0" }} maxLength={15} minLength={8} onChange={handleInput} name='confirmPassword' autoComplete='true' placeholder="Confirm Password" value={user.confirmPassword} required />
                                <label for="password" class="form-label" style={{ color: "#656d77", fontSize: "0.79rem" }}>*Minimum 8 characters</label>
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