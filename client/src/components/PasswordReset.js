import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {

    const [loaded, setLoaded] = useState(false);
    const [valid, setValid] = useState(false);
    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    });
    const [data, setData] = useState("");
    const [color, setColor] = useState("#dc5a5a");

    const params = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData("");
        setPass(
            { ...pass, [name]: value }
        );
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        setData("");

        if (!pass.password || pass.password.length < 8 || !(pass.password === pass.confirmPassword)) {
            setData("Invalid inputs!");
            return;
        }

        try {
            const response = await axios.get(`/api/users/${params.id}/reset/${params.token}/pass/${pass.password}`);
            if (response.status === 200) {
                setData(response.data.msg);
                setColor("#5cdc5a");
                setPass({
                    password: "",
                    confirmPassword: ""
                });
            }
        } catch (error) {
            const { data } = error.response;
            setData(data.msg);
        }
    }

    const checkUrl = async () => {
        const id = params.id;
        const token = params.token;

        try {
            const response = await axios.get(`/api/users/${id}/reset/${token}/pass/0`);
            if (response.status === 200) {
                setLoaded(true);
                setValid(true);
            }
        } catch (error) {
            setLoaded(true);
            setValid(false);
        }
    }

    useEffect(() => {
        checkUrl();
    }, []);

    return (<>
        <section>
            {loaded ? <>{valid ? <div className="login-holder">
                <div className="login">
                    <h4>Enter new password</h4>
                    <form method='POST'>
                        <div>
                            <div>
                                <input className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Password" name='password' required value={pass.password} />
                            </div>
                            <div>
                                <input id="confirmPassword" className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Confirm Password" style={{ marginBottom: 0 }} name='confirmPassword' required value={pass.confirmPassword} />
                                <label htmlFor="confirmPassword" class="form-label" style={{ color: "#656d77", fontSize: "0.79rem" }}>*Minimum 8 characters</label>
                            </div>
                            {data && <><div className='login-input verify' style={{ backgroundColor: color }}>
                                <span>{data}</span>
                            </div></>}
                            <div>
                                <button className="btn my-btn btn-lg-rg" onClick={formSubmit}>Submit</button>
                            </div>
                        </div>
                    </form>
                    <div className='switch-holder'>
                        <span className='acc-switch'>Have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/login"}>Login</Link></strong></span>
                    </div>
                </div>
            </div > : <h1>Invalid or expired Link</h1>}</> : <h1>Loading...</h1>}
        </section >
    </>);
}

export default PasswordReset;