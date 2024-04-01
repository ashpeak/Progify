import React, { useState, useEffect } from "react";
import axiosHelper from "../lib/axiosHelper";
import { toast } from "sonner";

import CardActive from "./components-sm/CardActive";
import Recommended from "./components-sm/Recommended";

const Dashboard = () => {

    const [userData, setUserData] = useState([]);
    const [likes, setLikes] = useState([]);

    const fetchUserData = async () => {

        const res = await axiosHelper('/api/users/dashboard', 'GET');

        if (res.status !== 200) {
            toast.error(res.data.msg);
        }

        const Courses = res.data.courseEnrolled;
        setLikes(res.data.courseLoved);

        setUserData([]);
        Courses.map(course => {
            setUserData(prevValue => {
                return [
                    ...prevValue,
                    course.courseId
                ];
            });
        });
    }
    useEffect(() => {
        fetchUserData();
    }, []);

    return (<>
        <section className="py-3">
            <div className="container">
                {userData.length ? <h2>My Courses</h2> : <h2>Hey! Pick some course to continue</h2>}
            </div>
            <div className="container">

                {userData && <div className="row">{userData.map(course => {
                    const isLiked = likes.includes(course._id);
                    return <CardActive
                        key={course._id}
                        id={course._id}
                        course={course.name}
                        creator={course.creator}
                        course_pic={course.course_pic}
                        isLiked={isLiked}
                    />;
                })}
                </div>}
            </div>
        </section>
        {userData && <Recommended />}
    </>);
}

export default Dashboard;