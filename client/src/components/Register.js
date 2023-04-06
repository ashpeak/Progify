import React, { useState } from 'react';
import Google from '../img/Social-google.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/register', user);

            const data = res.data.msg;
            console.log(data);
            if (res.status === 201) {
                window.alert("Registration sucessfull!");
                console.log(data);
                return navigate("/login");
            }
        } catch (error) {
            const { status, data } = error.response;
            window.alert(data.error)
            console.log(error.response);
            if (status === 400 && data.error === "User already exists!") {
                return navigate("/login");
            }
        }
    }

    return (<>
        <section><div className="login-holder">
            <div className="login">
                <h4>Sign up for Coursely</h4><button className="google-btn btn" href="#"><img src={Google} alt='google' />&nbsp;Continue with Google</button>
                <div className='emailOrgoogle'>
                    <span className='emailOrgoogle-text'>Or continue with email</span>
                </div>
                <div>
                    <div><input className='login-input form-control' type="text" onChange={handleInput} name='name' placeholder="Name" value={user.name} /></div>
                    <div><input className='login-input form-control' type="text" onChange={handleInput} name='username' placeholder="Email" value={user.username} /></div>
                    <div><input className='login-input form-control' type="password" onChange={handleInput} name='password' placeholder="password" value={user.password} autoComplete="true" /></div>
                    <div>
                        <button className="btn my-btn btn-lg-rg" onClick={formSubmit}>Sign Up</button>
                    </div>
                </div>
                <div className='switch-holder'>
                    <span className='acc-switch'>
                        Have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/login"}>Login</Link></strong>
                    </span>
                </div>
            </div>
        </div>
        </section>
    </>);
}

export default Register;