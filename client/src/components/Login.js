import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                <form method='POST'>
                    <div className="login">
                        <h4>Log in to Coursely</h4><Link className="google-btn btn" to={"/"}><i className="fa-brands fa-google me-2"></i>Continue with Google</Link>
                        <div><input type="text" onChange={handleChange} autoComplete="off"
                            placeholder="Email" name='username' value={user.email} /></div>
                        <div><input type="password" onChange={handleChange} autoComplete="off"
                            placeholder="password" name='password' value={user.password} /></div>
                        <button type='submit' onClick={formSubmit} className="btn my-btn">Login</button>
                        <div><span>Don't have an Account?&nbsp;<strong><Link className="custom-link" to={"/register"}>Sign up</Link></strong></span></div>
                    </div>
                </form>
            </div>
        </section>
    </>);
}

export default Login;