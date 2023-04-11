import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [courses, setCourses] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const language = [], category = [], sub_category = [];
    const filters = {
        language,
        category,
        sub_category
    }


    const fetchCourse = async () => {
        const res = await axios.get("/course");
        if (res) {
            setCourses(res.data);
        }
    }

    const searchCourse = async (e) => {
        e.preventDefault();

        if (!searchText) {
            window.alert("Can't be empty!")
            return;
        }

        setCourses(null);
        try {
            const res = await axios.post("/search", { searchText });
            if (res) {
                setCourses(res.data);
            }
        } catch (error) {
        }
    }

    const filter = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        [name].push(value);
        console.log([name]);
    }

    useEffect(() => {
        fetchCourse();
        if (window.innerWidth < 992) {
            const element = document.querySelector("#idfilter");
            element.classList.remove("show");
        }
    }, []);

    return (<>
        <section className="trending-courses py-4 mb-3">
            <div className="container-fluid">
                <form method='post'>
                    <div className='search-box'>
                        <input className='form-control search-input' value={searchText} onChange={e => setSearchText(e.target.value)} placeholder='Search for anything' />
                        <button type='submit' onClick={searchCourse} className='search-btn'>
                            <i className='fa fa-search search-icon'></i>
                        </button>
                    </div>
                </form>
                <h2 className="text-center">Some trending&nbsp;<span className="sub-red">courses</span></h2>
                <div className="row card-holder">
                    <div className='col-lg-3 course-filter'>

                        <h4>
                            <a class="btn btn-outline-secondary" data-bs-toggle="collapse" href="#idfilter" role="button" aria-expanded="true" aria-controls="idfilter"><i class="fa-solid fa-filter"></i> Filter by</a>
                        </h4>
                        <div id="idfilter" className='collapse show'>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapsezero" aria-expanded="true" aria-controls="collapsezero">
                                            Language
                                        </button>
                                    </h2>
                                    <div id="collapsezero" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="english" id="english" />
                                                <label class="form-check-label" for="english">
                                                    English
                                                </label>
                                                <br />
                                                <input class="form-check-input" type="checkbox" value="hindi" id="hindi" />
                                                <label class="form-check-label" for="hindi">
                                                    Hindi
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                <input class="form-check-input" onChange={(e) => filter(e)} type="checkbox" value="DSA" id="englis" />
                                                <label class="form-check-label" for="englis">
                                                    DSA
                                                </label>
                                                <br />
                                                <input class="form-check-input" onChange={(e) => filter(e)} type="checkbox" value="programming" id="hind" />
                                                <label class="form-check-label" for="hind">
                                                    programming
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Subcategory
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="c++" id="eng" />
                                                <label class="form-check-label" for="eng">
                                                    c++
                                                </label>
                                                <br />
                                                <input class="form-check-input" type="checkbox" value="python" id="hin" />
                                                <label class="form-check-label" for="hin">
                                                    python
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        {courses ? <div className='row'>
                            {courses && courses.map(course => {
                                return <div className="col-md-12 course-card">
                                    <Link className="custom-link" to={"/course-detail"} state={{ data: course._id }}>
                                        <div className="card">
                                            <img className="fit-cover course-image" width="260" height="145" alt='course pic' src={course.course_pic} />
                                            <div className="card-body">
                                                <h4 className="card-title card-p-h4 card-h4">{course.name}</h4>
                                                <p className="card-text card-p-h4">{course.creator}</p>
                                                <div style={{ "color": "var(--han-blue)" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 -32 576 576" width="1em" height="1em" fill="currentColor">

                                                        <path
                                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                        </path>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                                        height="1em" fill="currentColor">

                                                        <path
                                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                        </path>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                                        height="1em" fill="currentColor">

                                                        <path
                                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                                        </path>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
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
                        </div> : <i class="fa-solid fa-3x fa-circle-notch fa-spin" style={{ color: "#df3b69" }}></i>}
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Courses;