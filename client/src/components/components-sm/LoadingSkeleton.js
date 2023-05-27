import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
    return (<>
        <div className="col-md-12 course-card" style={{minWidth: "19rem"}}>
        
                <div className="card" style={{paddingBottom: "0.4rem"}}>
                    <Skeleton
                        // circle="true"
                        height="10rem"
                        width="15rem"
                        className="course-image"
                        style={{marginLeft: "8px"}}
                    />
                    <div className="card-body">
                        <h4 className="card-title card-p-h4 card-h4"><Skeleton/></h4>
                        <p className="card-text card-p-h4"><Skeleton/></p>

                        <div style={{ "color": "var(--han-blue)" }}>
                            <Skeleton inline="true" height="1rem" width="1rem" circle="true" style={{marginRight: "4px"}} />
                            <Skeleton inline="true" height="1rem" width="1rem" circle="true" style={{marginRight: "4px"}} />
                            <Skeleton inline="true" height="1rem" width="1rem" circle="true" style={{marginRight: "4px"}} />
                            <Skeleton inline="true" height="1rem" width="1rem" circle="true" style={{marginRight: "4px"}} />
                            <Skeleton inline="true" height="1rem" width="1rem" circle="true" style={{marginRight: "4px"}} />
                            <p className="card-text"><Skeleton width="5rem" /></p>
                        </div>
                        <p className="fw-bold card-p-h4"><Skeleton width="3rem" height="1.7rem" /></p>
                    </div>
                </div>
        </div>
    </>);
}

export default LoadingSkeleton;