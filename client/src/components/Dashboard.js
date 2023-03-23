import React, { useState, useEffect } from "react";
import CardActive from "./components-sm/CardActive";
import Recommended from "./components-sm/Recommended";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [userData, setUserData] = useState([]);

    const navigate = useNavigate();

    const fetchUserData = async () => {
        console.log("fetchUserdata called");

        try {
            const res = await axios.get('/dashboard');

            const Courses = res.data;
            if (res.status === 401) {
                window.alert("unAuthorized access");
            } else {
                Courses.forEach(course => {
                    const { name, _id } = course;
                    const [{ lessonName }] = course.lessons;
                    setUserData(prevValue => {
                        return [
                            ...prevValue,
                            {
                                _id,
                                name,
                                lessonName
                            }
                        ];
                    });
                })
            }
        } catch (error) {
            navigate("/login");
        }



    }
    useEffect(() => {
        fetchUserData();
    }, []);

    return (<>
        <section>
            <div className="container">
                {userData ? <h2>Hey! Pick up where you left off..</h2> : <h2>Hey! Pick some course to continue</h2>}
                <h2>My Courses</h2>
            </div>
        </section>
        <section>
            <div className="container">
                {userData && <div className="row">{userData.map(course => {
                    return <CardActive
                        id={course._id}
                        course={course.name}
                        chapter={course.lessonName}
                        module="4"
                    />;
                })}</div>}
            </div>
        </section>
        {userData && <Recommended />}
    </>);
}

export default Dashboard;