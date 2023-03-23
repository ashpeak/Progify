import React from "react";

const Banner = () => {
    return (<><section className="achievement-banner">
    <div className="container achievement-count">
        <div className="text-center border rounded border-0">
            <h3 style={{color: "#fff"}}>WHAT WE OFFER</h3>
            <div className="row row-cols-2 row-cols-md-4">
                <div className="col border-right">
                    <div className="p-3">
                        <h4 className="display-5 fw-bold text-white mb-0">100+</h4>
                        <p className="mb-0">Courses</p>
                    </div>
                </div>
                <div className="col border-right">
                    <div className="p-3">
                        <h4 className="display-5 fw-bold text-white mb-0">40+</h4>
                        <p className="mb-0">Teachers</p>
                    </div>
                </div>
                <div className="col border-right">
                    <div className="p-3">
                        <h4 className="display-5 fw-bold text-white mb-0">20+</h4>
                        <p className="mb-0">Rich features</p>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h4 className="display-5 fw-bold text-white mb-0">50</h4>
                        <p className="mb-0">Awards</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section></>);
}

export default Banner;