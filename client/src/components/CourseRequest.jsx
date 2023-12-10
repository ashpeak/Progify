import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function CourseRequest(props) {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        playlist: "",
        message: "",
    });
    const [alert, setAlert] = useState({
        status: false,
        success: false,
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (data.name === "" || data.email === "" || data.playlist === "" || data.message === "") {
            window.alert("Please fill all the fields!");
            return;
        }

        try {
            const response = await axios.post('/course/request', data);
            if (response.status === 201) {
                setAlert({
                    status: true,
                    success: true,
                    message: "Your request has been submitted!",
                });

                setData({
                    name: "",
                    email: "",
                    playlist: "",
                    message: "",
                });
            }
        } catch (error) {
            setAlert({
                status: true,
                success: false,
                message: "Failed to submit your request!",
            });
        }
    }

    useEffect(() => {
        if (props.setLoggedOff() === false) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {

        setTimeout(() => {
            setAlert({
                status: false,
                success: false,
                message: "",
            });
        }, 5000);

        return () => {
            clearTimeout();
        }
    }, [alert.status]);


    return (
        <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: "40rem", marginTop: "2rem" }}>
            <div style={{ width: "26rem" }} className='mb-3'>
                <h6>
                    Want to add a course to our database? Fill out the form below and we'll get back to you as soon as possible!
                </h6>
                <div class={(alert.status ? " d-block " : " d-none ") + (alert.success ? " alert-success " : " alert-warning ") + " alert mt-3"} role="alert">
                    {alert.message}
                </div>
            </div>
            <form style={{ width: "26rem" }} onSubmit={handleFormSubmit}>
                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form4Example1">Name</label>
                    <input type="text" required id="form4Example1" onChange={handleChange} name='name' value={data.name} class="form-control" />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form4Example2">Email address</label>
                    <input type="email" required id="form4Example2" onChange={handleChange} name='email' value={data.email} class="form-control" />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form4Example5">Playlist Link</label>
                    <input type="text" required id="form4Example5" onChange={handleChange} name='playlist' value={data.playlist} class="form-control" />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form4Example3">Message</label>
                    <textarea class="form-control" required id="form4Example3" onChange={handleChange} name='message' value={data.message} rows="4"></textarea>
                </div>

                <button type="submit" data-mdb-ripple-init style={{ backgroundColor: "#5766c7", color: "#fff" }} class="btn btn-block mb-4">Send</button>
            </form>
        </div>
    )
}
