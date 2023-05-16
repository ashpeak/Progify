import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";

const PassResetForm = () => {

    const [user, setUser] = useState("");
    const [data, setData] = useState("");
    const [color, setColor] = useState("#dc5a5a");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setUser(e.target.value);

    const formSubmit = async (e) => {
        e.preventDefault();
        setData("");
        setLoading(true);

        if (!user) {
            return;
        }

        try {
            const response = await axios.get(`/api/users/${user}/reset/`);
            if (response.status === 200) {
                setUser("");
                setData(response.data.msg);
                setColor("#5cdc5a");
                setLoading(false);
            }
        } catch (error) {
            const { data } = error.response;
            setData(data.msg);
            setColor("#dc5a5a");
            setLoading(false);
        }
    }

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Forgot password</h4>
                    <form method='POST'>
                        <div>
                            <div>
                                <label htmlFor="email" className="form-label" style={{ color: "#656d77", fontSize: "0.82rem", marginBottom: 0, marginLeft: "0.3rem" }}>Enter email to reset password</label>
                                <input id="email" className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Email" name='email' required value={user} />
                            </div>
                            {data && <><div className='login-input verify' style={{ backgroundColor: color }}>
                                <span>{data}</span>
                            </div>
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
                                </div></>}
                            <div>
                                {loading ?
                                    <div className='login-loader'>
                                        <MoonLoader
                                            color={"#0102ff"}
                                            size={22}
                                            aria-label="Processing"
                                            data-testid="loader"
                                        />
                                    </div> : <button className="btn my-btn btn-lg-rg" onClick={formSubmit}>Reset</button>}
                            </div>
                        </div>
                    </form>
                    <div className='switch-holder'>
                        <span className='acc-switch'>Have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/login"}>Login</Link></strong></span>
                    </div>
                </div>
            </div >
        </section >
    </>);
}

export default PassResetForm;