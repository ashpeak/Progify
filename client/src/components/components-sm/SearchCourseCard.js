import React from 'react';
import { Link } from 'react-router-dom';

const searchCourseCard = (course) => {
    return (<>
        <div className="col-md-12 course-card">
            <Link className="custom-link" to={"/course-detail"} state={{ data: course._id }}>
                <div className="card">
                    <img className="fit-cover course-image" width="260" height="145" alt='course pic' src={course.course_pic} />
                    <div className="card-body">
                        <h4 className="card-title card-p-h4 card-h4">{course.name}</h4>
                        <p className="card-text card-p-h4">{course.creator}</p>

                        <div style={{ "color": "var(--han-blue)" }}>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
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