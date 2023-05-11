import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Google from '../img/Social-google.svg';

const Login = (props) => {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(
            { ...user, [name]: value }
        );
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            return;
        }

        try {
            const response = await axios.post('/login', user);
            if (response.status === 200) {
                props.setLoggedIn(response.data.name);
                navigate("/dashboard");
            }
        } catch (error) {
            window.alert("Login Unsuccessful!");
        }
    }

    useEffect(() => {
        if (props.setLoggedOff()) {
            navigate("/dashboard");
        } else {
            props.setLoggedOff();
        }
    }, []);

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Log in to Coursely</h4>
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
                            <div>
                                <input className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Email" name='username' required value={user.email} />
                            </div>
                            <div>
                                <input className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                    placeholder="password" name='password' required value={user.password} />

                            </div>
                            <div>
                                <button className="btn my-btn btn-lg-rg" onClick={(e) => formSubmit(e)}>Login</button>
                            </div>
                        </div>
                    </form>
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