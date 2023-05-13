import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();

    const verifyEmailUrl = async () => {
        const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
        try {
            const url = `${BASE_URL}/api/users/${params.id}/verify/${params.token}`;

            const res = await axios.get(url);
            setValidUrl(true);

            console.log(res.data);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, []);

    return (<>
        <div className='container'>
            {validUrl ? <>
                <h1>Email verified!</h1>
                <Link to={'/login'}><button className='btn my-btn'>Login</button></Link>
            </> : <h1>Invalid or expired url!</h1>}
        </div>
    </>);
}

export default EmailVerify;