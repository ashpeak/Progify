import React from 'react';
import { Link } from 'react-router-dom';

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
                        <img src={course_pic} className='img-fluid' alt='img' width="100%" height="100%" />
                        <div className='play-icon-holder'>
                            <i className="fa-solid fa-circle-play fa-3x"></i>
                        </div>

                    </div>
                    <div className="card-content card-body">
                        <p className="card-p-h4 module">{course.substring(0, 100) + ".."}</p>
                        <div className='creator-love'>
                            <p className="active-creator">{creator}</p>
                            <p className="active-creator">
                                <i class={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: (isLiked ? "#b8172e" : "#202124"), fontSize: "1.5em" }}></i>
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