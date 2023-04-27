import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie'

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

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  setLoggedIn = () => {
    const inTwoDay = new Date(new Date().getTime() + 2880 * 60 * 1000); //2 days
    Cookies.set('user', JSON.stringify({ name: 'ashish', isLoggedIn: true, coins: '500' }), { expires: inTwoDay });

    this.setState({
      isLoggedIn: JSON.parse(Cookies.get('user')).isLoggedIn
    });
  }

  componentDidMount() {
    const status = Cookies.get('user');
    if (status) {
      this.setState({
        isLoggedIn: JSON.parse(Cookies.get('user')).isLoggedIn
      });
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar
            status={this.state}
            setLoggedIn={this.setLoggedIn}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/login" element={<Login setLoggedIn={this.setLoggedIn} />} />
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
