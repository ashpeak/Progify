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
import Blog from "./components/Blog";
import About from "./components/About";
import Community from "./components/Community";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: 'false',
      name: 'user'
    }
  }

  setLoggedIn = (username) => {
    const inTwoDay = new Date(new Date().getTime() + 2880 * 60 * 1000); //2 days
    Cookies.set('user', JSON.stringify({ name: username, isLoggedIn: 'true', coins: '500' }), { expires: inTwoDay });

    const {isLoggedIn, name} = JSON.parse(Cookies.get('user'));
    this.setState({
      isLoggedIn,
      name
    });
  }

  setLoggedOff = (state = true) => {
    if (state) {
      const cookie = Cookies.get('user');
      if (cookie === undefined) {
        return false;
      }
      try {
        const loginStatus = JSON.parse(cookie).isLoggedIn;

        if (loginStatus === 'true') {
          return true;
        } else {
          this.setState({
            isLoggedIn: 'false',
          });
          Cookies.remove('user');
        }
      } catch (error) {
        this.setState({
          isLoggedIn: 'false',
        });
        Cookies.remove('user');
      }
      return false;
    }
    Cookies.remove('user');
    this.setState({
      isLoggedIn: 'false',
      name: 'user'
    });
  }

  componentDidMount() {
    let status = 'false';
    if (this.setLoggedOff()) {
      status = 'true';

      this.setState({
        isLoggedIn: status,
        name: JSON.parse(Cookies.get('user')).name
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
            setLoggedOff={this.setLoggedOff}
          />
          <Routes>

            <Route path="/" element={<Landing
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/dashboard" element={<Dashboard
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/course" element={<Courses
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/login" element={<Login
              setLoggedIn={this.setLoggedIn}
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/register" element={<Register
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/course-detail" element={<CourseDetail
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/play" element={<Play
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/course" element={<Courses
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/blog" element={<Blog
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/about" element={<About
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="/community" element={<Community
              setLoggedOff={this.setLoggedOff}
            />} />
            <Route path="*" element={<Errorpage
              setLoggedOff={this.setLoggedOff}
            />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
