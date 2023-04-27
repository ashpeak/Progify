import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import CardActive from "./components-sm/CardActive";
import Recommended from "./components-sm/Recommended";

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
            // navigate("/login");
        }



    }
    useEffect(() => {
        fetchUserData();
    }, []);

    return (<>
        <section className="py-3">
            <div className="container">
                {!userData && <h2>Hey! Pick some course to continue</h2>}
                <h2>My Courses</h2>
                {console.log(Cookies.get())}
            </div>
            <div className="container">
                <div className="row">
                    <CardActive
                        id="1"
                        course="C++ Full Course | Data Structures & Algorithms ctures & Algorithms"
                        chapter="Lecture 1: Intro to Programming & Flowcharts"
                        module="4"
                        creator="Apna College"
                        course_pic="https://i.ytimg.com/vi/j8nAHeVKL08/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_BwiZmJ_tj2A5CM-xX3-4lcabVw"
                    />
                    <CardActive
                        id="2"
                        course="C++ Full Course | Data Structures & Algorithms"
                        creator="Apna College"
                        course_pic="https://i.ytimg.com/vi/j8nAHeVKL08/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC_BwiZmJ_tj2A5CM-xX3-4lcabVw"
                    />
                    <CardActive
                        id="3"
                        course="C++ Full Course | Data Structures & Algorithms"
                        creator="Apna College"
                        course_pic="https://i.ytimg.com/vi/z9bZufPHFLU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATcUN7NPjsdcKSq8bFSEeilhzrMA"
                    />
                    <CardActive
                        id="3"
                        course="C++ Full Course | Data Structures & Algorithms"
                        chapter="Lecture 1: Intro to Programming & Flowcharts"
                        module="4"
                        creator="Apna College"
                        course_pic="https://i.ytimg.com/vi/z9bZufPHFLU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATcUN7NPjsdcKSq8bFSEeilhzrMA"
                    />
                </div>
                {userData && <div className="row">{userData.map(course => {
                    return <CardActive
                        id={course._id}
                        course={course.name}
                        creator={course.creator}
                        course_pic={course.course_pic}
                    />;
                })}</div>}
            </div>
        </section>
        {userData && <Recommended />}
    </>);
}

export default Dashboard;