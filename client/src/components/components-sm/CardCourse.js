import React from 'react';
import { Link } from 'react-router-dom';

const CardCourse = (Props) => {

    const tempData = {
        _id: "4",
        name: "MERN STACK In Hindi 2023",
        creator: "Thapa Technical",
        category: "Web development",
        lessons: [
            {
                _id: "641bdfba2b071aba03254bd8",
                lesson: 1,
                lessonName: "1: Prerequisite To Learn MERN Stack in 2021 | All Resources Provided For Free",
                link: "fSmp7Cv-c_0"
            }
        ]
    }
    const starInit = () => {
        return <i className="fa-solid fa-star"></i>;
    }

    return (<>
        <div className="my-card">
            <Link className="custom-link" to={"/course-detail"} state={{ data: tempData }}>
                <div className="card"><img alt="courseImage" className="card-img-top w-100 d-block fit-cover" src={require("../../img/web-development.jpg")} />
                    <div className="card-body">
                        <h4 className="card-title card-p-h4 card-h4">{Props.course}</h4>
                        <p className="card-text card-p-h4">{Props.creator}</p>
                        <div style={{ color: "var(--han-blue)" }}>
                            {starInit()}
                            {starInit()}
                            {starInit()}
                            {starInit()}
                            <p className="card-text" style={{ color: "#000" }}>&nbsp;({Props.rating})</p>
                        </div>
                        <p className="fw-bold price card-p-h4">Free</p>
                    </div>
                </div>
            </Link>
        </div>
    </>);
}

export default CardCourse;