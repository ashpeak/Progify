import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardCourse = (Props) => {

    return (<>
        <div className="my-card col-md-3">
            <Link className="custom-link" to={`/course/id/${Props.id}/detail`}>
                <div className="card">
                    <div className='mycard-img'>
                        <LazyLoadImage
                            alt={"courseImage"}
                            effect="blur"
                            className="card-img-top w-100 d-block fit-cover"
                            src={Props.course_pic} />
                    </div>
                    <div className="card-body">
                        <p className="module card-p-h4">{Props.name}</p>
                        <p className="card-p-h4 recommend">{Props.creator}</p>
                        <p className="card-p-h4 recommend">{Props.language}</p>
                        <p className="fw-bold price card-p-h4">Free</p>
                    </div>
                </div>
            </Link>
        </div>
    </>);
}

export default CardCourse;