import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const searchCourseCard = (course) => {
    return (<>
        <div className="col-md-12 course-card">
            <Link className="custom-link" to={`/course/id/${course._id}/detail`}>
                <div className="card">
                    <LazyLoadImage
                        alt={"course pic"}
                        effect="blur"
                        className="fit-cover course-image"
                        width="260"
                        height="145"
                        src={course.course_pic} />
                    {/* <img className="fit-cover course-image" width="260" height="145" alt='course pic' src={course.course_pic} /> */}
                    <div className="card-body">
                        <h4 className="card-title card-p-h4 card-h4">{course.name}</h4>
                        <p className="card-text card-p-h4">{course.creator}</p>

                        <div style={{ "color": "var(--han-blue)" }}>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <p className="card-text">&nbsp;(56,667)</p>
                        </div>
                        <p className="fw-bold price card-p-h4">Free</p>
                    </div>
                </div>
            </Link>
        </div>
    </>);
}

export default searchCourseCard;