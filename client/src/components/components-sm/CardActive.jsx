import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaCirclePlay } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardActive = (Props) => {
    const { course, creator, id, course_pic, isLiked } = Props;
    return (<>
        <div className="col-md-6 item-center" key={id}>
            <Link className="custom-link"
                to={"/play"}
                state={Props}>
                {/* state={{ data: Props }}> */}

                <div className="course-active-card card mb-2">
                    <div className="image">
                        <LazyLoadImage
                            alt="img"
                            effect="blur"
                            className='img-fluid'
                            src={course_pic} />
                        <div className='play-icon-holder'>
                            <FaCirclePlay className='display-4' />
                        </div>

                    </div>
                    <div className="card-content card-body">
                        <p className="card-p-h4 module">{course.substring(0, 100) + ".."}</p>
                        <div className='creator-love'>
                            <p className="active-creator">{creator}</p>
                            <p className="active-creator">
                                {isLiked ? <FaHeart style={{ color: "#ff0000", fontSize: "1.5em" }} /> : <FaRegHeart style={{ color: "#202124", fontSize: "1.5em" }} />}
                            </p>
                        </div>
                        {/* <h4 className="card-p-h4 card-h4">{chapter}<br /></h4>
                        <p className="card-p-h4 module">Last Played Module . {module}</p> */}
                    </div>
                </div>
            </Link></div>
    </>);
}

export default CardActive;