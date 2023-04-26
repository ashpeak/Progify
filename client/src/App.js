import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Play from "./components/Play";
import Login from "./components/Login";
import Register from "./components/Register";
import Errorpage from "./components/Errorpage";
import CourseDetail from "./components/courseDetail";
import Courses from "./components/components-sm/Courses";
import AddCourse from "./components/AddCourse";
import Blog from "./components/Blog";
import About from "./components/About";
import Community from "./components/Community";

class App extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course-detail" element={<CourseDetail />} />
            <Route path="/play" element={<Play />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
