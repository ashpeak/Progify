import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosHelper from '../lib/axiosHelper';
import HashLoader from "react-spinners/HashLoader";
import MoonLoader from "react-spinners/MoonLoader";

const PasswordReset = () => {

    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(true);
    const [moon, setMoon] = useState(false);
    const [valid, setValid] = useState(false);
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
        setMoon(true);

        if (!pass.password || pass.password.length < 8 || !(pass.password === pass.confirmPassword)) {
            setColor("#dc5a5a");
            setData("Invalid inputs!");
            return;
        }

        try {
            const response = await axiosHelper(`/api/users/${params.id}/reset/${params.token}/pass/${pass.password}`, 'GET');
            if (response.status === 200) {
                setData(response.data.msg);
                setColor("#5cdc5a");
                setMoon(false);
                setPass({
                    password: "",
                    confirmPassword: ""
                });
            } else {
                setColor("#dc5a5a");
                setMoon(false);
                setData(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkUrl = async () => {
        const id = params.id;
        const token = params.token;

        try {
            const response = await axiosHelper(`/api/users/${id}/reset/${token}/pass/0`, 'GET');
            if (response.status === 200) {
                setLoading(false);
                setValid(true);
            }
        } catch (error) {
            setLoading(false);
            setValid(false);
        }
    }

    useEffect(() => {
        checkUrl();
    }, []);

    return (<>
        <section>
            <div className="login-holder">
                {loading ? <div className='container load-msg'>
                    <HashLoader
                        color={"#0102ff"}
                        size={60}
                        aria-label="Processing"
                        data-testid="loader"
                    />
                    <br />
                    <h4 style={{ color: "#363636" }}>Processing your request... Please wait.</h4></div> : <>{valid ? <div className="login">
                        <h4>Enter new password</h4>
                        <form method='POST' onSubmit={formSubmit}>
                            <div>
                                <div>
                                    <input className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                        placeholder="Password" name='password' required value={pass.password} />
                                </div>
                                <div>
                                    <input id="confirmPassword" className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                        placeholder="Confirm Password" style={{ marginBottom: 0 }} name='confirmPassword' required value={pass.confirmPassword} />
                                    <label htmlFor="confirmPassword" className="form-label" style={{ color: "#656d77", fontSize: "0.79rem" }}>*Minimum 8 characters</label>
                                </div>
                                {data && <><div className='login-input verify' style={{ backgroundColor: color }}>
                                    <span>{data}</span>
                                </div></>}
                                <div>
                                    {moon ?
                                        <div className='login-loader'>
                                            <MoonLoader
                                                color={"#0102ff"}
                                                size={22}
                                                aria-label="Processing"
                                                data-testid="loader"
                                            />
                                        </div> : <button className="btn my-btn btn-lg-rg" type='submit'>Submit</button>}
                                </div>
                            </div>
                        </form>
                        <div className='switch-holder'>
                            <span className='acc-switch'>Have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/login"}>Login</Link></strong></span>
                        </div>
                    </div> : <div className='container load-msg'>
                        <img src={"/image/expired.png"} alt='expired' />
                        <br />
                        <h4 style={{ color: "#363636" }}>Sorry, the link you have clicked is invalid or has expired. Please try again or contact support.</h4></div>}</>}
            </div >
        </section >
    </>);
}

export default PasswordReset;