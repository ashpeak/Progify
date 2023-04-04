import React, { useState } from 'react';
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
                <h4>Sign Up for Coursely</h4><a className="google-btn btn" href="#"><i className="fa-brands fa-google me-2"></i>Continue with Google</a>
                <form method='POST'>
                    <div><input type="text" onChange={handleInput} name='name' placeholder="Name" value={user.name} /></div>
                    <div><input type="text" onChange={handleInput} name='username' placeholder="Email" value={user.username} /></div>
                    <div><input type="password" onChange={handleInput} name='password' placeholder="password" value={user.password} autoComplete="true" /></div>
                    <div style={{textAlign: "center"}}><button className="btn my-btn" onClick={formSubmit}>Sign Up</button></div>
                </form>
                <div><span>Have an Account?&nbsp;<strong><Link className="custom-link" to={"/login"}>Login</Link></strong></span></div>
            </div>
        </div>
        </section>
    </>);
}

export default Register;