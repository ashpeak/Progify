import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const RecommendSkeleton = () => {
    return (<>
        <div className="my-card col-md-3">
            <div className="card">
                    <div>
                        <Skeleton height={"7rem"} style={{borderRadius: 0}} />
                    </div>
                    <div className="card-body">
                        <p className="module card-p-h4"><Skeleton /></p>
                        <p className="card-p-h4 recommend"><Skeleton /></p>
                        <p className="card-p-h4 recommend"><Skeleton /></p>
                        <p className="fw-bold price card-p-h4" style={{background: "none"}}><Skeleton height={"1.4rem"} /></p>
                    </div>
                </div>
        </div>
    </>);
}

export default RecommendSkeleton;