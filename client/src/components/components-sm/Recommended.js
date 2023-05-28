import React, { useEffect, useState } from 'react';
import CardCourse from './CardCourse';
import axios from 'axios';

const Recommended = () => {

    const [courses, setCourses] = useState(null);

    const fetchCourse = async () => {
        try {
            const res = await axios.get("/api/recommended/course");
            if (res.status === 200) {
                setCourses(res.data);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    return (<>
        <section className='my-4'>
            <div className="container">
                <h4 className="fw-bold">Recommended for you</h4>
                <div className="row card-holder">
                    {courses && courses.map((course) => {
                        return <CardCourse
                            id={course._id}
                            name={course.name}
                            creator={course.creator}
                            language={course.language}
                            course_pic={course.course_pic}
                        />
                    })}
                </div>
            </div>
        </section>
    </>);
}

export default Recommended;