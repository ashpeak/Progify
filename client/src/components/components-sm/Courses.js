import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchCourseCard from './SearchCourseCard';
import "react-loading-skeleton/dist/skeleton.css";

import LoadingSkeleton from './LoadingSkeleton';


const Courses = () => {

    const [courses, setCourses] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const language = [], category = [], sub_category = [];


    const fetchCourse = async () => {
        const res = await axios.get("/api/course");
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
            const res = await axios.post("/api/search/course", { searchText });
            if (res) {
                setCourses(res.data);
            }
        } catch (error) {
        }
    }

    const filter = (e) => {
        const value = e.target.value;

        if (e.target.checked) {
            category.push(value);
        } else {
            category.pop(value);
        }

        console.log(category);
        console.log(value);
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
                                {/* <div class="accordion-item">
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
                                                <br />
                                                <input class="form-check-input" onChange={(e) => filter(e)} type="checkbox" value="C++" id="hi" />
                                                <label class="form-check-label" for="hi">
                                                    C++
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        {courses ? <div className='row'>

                            {courses.map(course => {
                                return <SearchCourseCard
                                    _id={course._id}
                                    course_pic={course.course_pic}
                                    name={course.name}
                                    creator={course.creator}
                                />
                            })}
                        </div> : <>
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </>}
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Courses;