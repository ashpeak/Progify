import React from 'react';
import CardCourse from './CardCourse';

const Recommended = () => {
    return (<>
        <section>
    <div className="container">
        <h4 className="fw-bold">Recommended for you</h4>
        <div className="row card-holder">
            <CardCourse
            chapter={{lessons: [{lessonName: "Introduction to mern stack"}]}}
            course="Complete Web Development Course"
            creator="Ashish Kumar Singh"
            star="4"
            rating="56,667" />
            <CardCourse
            course="Complete Django Development"
            creator="Ashish Singh"
            star="5"
            rating="6,667" />
        </div>
    </div>
</section>
    </>);
}

export default Recommended;