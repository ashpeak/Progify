import axiosHelper from '../lib/axiosHelper';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { FaCheckCircle } from "react-icons/fa";
import { userState } from "../store/userState";

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setLoggedUser } = userState();

    const params = useParams();

    const verifyEmailUrl = async () => {
        try {
            const url = `/api/users/${params.id}/verify/${params.token}`;

            const response = await axiosHelper(url, 'GET');

            if (response.status === 200) {
                setLoggedUser(response.data);
                setLoading(false);
                setValidUrl(true);
            } else {
                setLoading(false);
                setValidUrl(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, []);

    return (<>
        <div className='container'>
            {loading ? <div className='load-msg' style={{ height: "80vh" }}>
                <HashLoader
                    color={"#0102ff"}
                    size={60}
                    aria-label="Processing"
                    data-testid="loader"
                />
                <br />
                <h4 style={{ color: "#363636" }}>Processing your request... Please wait.</h4></div> : <div className='load-msg' style={{ height: "80vh" }}>
                {validUrl ? <>
                    <FaCheckCircle style={{ color: "#5cdc5a", fontSize: "120px" }} />
                    <br />
                    <h4>Your email has been verified successfully. Welcome aboard!</h4>
                    <span>Go to <Link to={'/dashboard'}>Dashboard</Link></span>
                </> : <>
                    <img src={"/image/expired.png"} alt='expired' />
                    <br />
                    <h4 style={{ color: "#363636" }}>Sorry, the link you have clicked is invalid or has expired. Please try again or contact support.</h4></>}</div>}
        </div>
    </>);
}

export default EmailVerify;