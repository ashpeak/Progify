import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Google from '../img/Social-google.svg';

const Login = () => {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser(
            { ...user, [name]: value }
        );
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/login', user);

            const data = res.data.msg;
            if (res.status === 200) {
                console.log(data);
                navigate("/dashboard");
            } else if (res.status === 401) {
                console.log(data);
            }
        } catch (error) {
            window.alert("Login Unsuccessful!")
            console.log(error.response.data);
        }
    }

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Log in to Coursely</h4>
                    <div>
                        <button className="google-btn btn">
                        <img src={Google} alt='google' />&nbsp;Continue with Google
                        </button>
                    </div>
                    <div className='emailOrgoogle'>
                        <span className='emailOrgoogle-text'>Or continue with email</span>
                    </div>

                    <div>
                        <div>
                            <input className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                placeholder="Email" name='username' value={user.email} />
                        </div>
                        <div>
                            <input className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                placeholder="password" name='password' value={user.password} />

                        </div>
                        <div>
                            <button className="btn my-btn btn-lg-rg" onClick={formSubmit}>Login</button>
                        </div>
                    </div>
                    <div className='my-2'>
                        <span><strong><Link className="custom-link alter-lg-rg" to={"/register"}>Forgot password?</Link></strong></span>
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