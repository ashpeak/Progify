import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [courses, setCourses] = useState(null);

    const fetchCourse = async () => {
        const res = await axios.get("course");
        if (res) {
            setCourses(res.data);
        }
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    return (<>
        <section className="trending-courses py-4 mb-3">
            <div className="container-fluid">
                <h2 className="text-center">Some trending&nbsp;<span className="sub-red">courses</span></h2>
                <div className="row card-holder">
                    {courses && courses.map(course => {
                        return <div className="col-md-3 my-card">
                            <Link className="custom-link" to={"/course-detail"} state={{ data: course }}>
                                <div className="card"><img className="card-img-top w-100 d-block fit-cover" src={require("../../img/dsa.jpg")} />
                                    <div className="card-body">
                                        <h4 className="card-title card-p-h4 card-h4">{course.name}</h4>
                                        <p className="card-text card-p-h4">{course.creator}</p>
                                        <div style={{ "color": "var(--han-blue)" }}><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 -32 576 576" width="1em" height="1em" fill="currentColor">

                                            <path
                                                d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                            </path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                            height="1em" fill="currentColor">

                                                <path
                                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                                height="1em" fill="currentColor">

                                                <path
                                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                                height="1em" fill="currentColor">

                                                <path
                                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                </path>
                                            </svg>
                                            <p className="card-text">&nbsp;(56,667)</p>
                                        </div>
                                        <p className="fw-bold price card-p-h4">Free</p>
                                    </div>
                                </div>
                            </Link>
                        </div>;
                    })}
                </div>
            </div>
        </section>
    </>);
}

export default Courses;