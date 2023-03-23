import React from 'react';
import { Link } from 'react-router-dom';

const CardActive = (Props) => {
    const { course, chapter, module, id } = Props;
    return (<>
        <div className="col-md-6" key={id}>
            <Link className="custom-link"
                to={"/play"}
                state={{ data: Props }}>
                
                <div className="course-active-card mb-2">
                    <div className="image">
                        <div><i className="fa-solid fa-circle-play fa-3x"></i></div>
                    </div>
                    <div className="card-content">
                        <p className="card-p-h4 module">{course}<br /></p>
                        <h4 className="card-p-h4 card-h4">{chapter}<br /></h4>
                        <p className="card-p-h4 module">Module . {module}</p>
                    </div>
                </div>
            </Link></div>
    </>);
}

export default CardActive;