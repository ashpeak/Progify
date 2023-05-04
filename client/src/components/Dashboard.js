import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CardActive from "./components-sm/CardActive";
import Recommended from "./components-sm/Recommended";

const Dashboard = (props) => {

    const [userData, setUserData] = useState([]);

    const navigate = useNavigate();

    const fetchUserData = async () => {

        try {
            const res = await axios.get('/dashboard');

            const Courses = res.data.result;
            if (res.status === 401) {
                window.alert("unAuthorized access");
            } else {
                Courses.forEach(course => {
                    const { name, _id, creator, course_pic } = course;
                    setUserData(prevValue => {
                        return [
                            ...prevValue,
                            {
                                _id,
                                name,
                                creator,
                                course_pic
                            }
                        ];
                    });
                })
            }
        } catch (error) {
            const { data, request } = error.response;
            if (data.msg === 'Unauthorized' || request.status === 401) {
                props.setLoggedOff(false);
                navigate("/login");
            }
        }
    }
    useEffect(() => {
        if (props.setLoggedOff() === false) {
            // navigate("/login");
        }
        fetchUserData();
    }, []);

    return (<>
        <section className="py-3">
            <div className="container">
                {userData.length ? <h2>My Courses</h2> : <h2>Hey! Pick some course to continue</h2>}
            </div>
            <div className="container">

                {userData && <div className="row">{userData.map(course => {
                    return <CardActive
                        id={course._id}
                        course={course.name}
                        creator={course.creator}
                        course_pic={course.course_pic}
                    />;
                })}
                    <CardActive
                        id={6}
                        course={"C Language Tutorials In Hindi by Code With Harry.."}
                        creator={"coure.creator"}
                        course_pic={"https://i.ytimg.com/vi/z9bZufPHFLU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATcUN7NPjsdcKSq8bFSEeilhzrMA"}
                    />
                </div>}
            </div>
        </section>
        {userData && <Recommended />}
    </>);
}

export default Dashboard;