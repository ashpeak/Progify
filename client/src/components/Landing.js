import React from 'react';
import Home from "./components-sm/Home";
import Banner from "./components-sm/Banner";
import ChooseUs from "./components-sm/ChooseUs";
import AboutMe from "./components-sm/AboutMe";
import Recommended from './components-sm/Recommended';
import Testimonial from "./components-sm/Testimonial";
import Join from "./components-sm/Join";

const Landing = () => {
    return (<>
        <Home />
        <Banner />
        <ChooseUs />
        <AboutMe />
        <Recommended />
        <Testimonial />
        <Join />
    </>);
}

export default Landing;