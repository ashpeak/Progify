import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
// import Blog from "./components/Blog";
import About from "./components/About";
import Community from "./components/Community";
import EmailVerify from "./components/EmailVerify";
import PasswordReset from "./components/PasswordReset";
import PassResetForm from "./components/PassResetForm";
import CourseRequest from "./components/CourseRequest";
import RequestList from "./components/RequestList";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { userState } from "./store/userState";
import { Toaster } from 'sonner';
import axiosHelper from "./lib/axiosHelper";

let firstRender = true;
const App = () => {

  const user = userState((state) => state.user);
  const { setLoggedUser } = userState();

  const refreshState = async () => {
    const res = await axiosHelper('/api/token/refresh', 'GET');
    if (res.status === 200) {
      setLoggedUser(res.data);
    } else {
      setLoggedUser({ loggedIn: false, name: "", role: "" });
    }
  }

  console.log(user);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      refreshState();
    }

    const intervalId = setInterval(refreshState, 290000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Navbar />
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={user.loggedIn ? <Dashboard /> : <Navigate to={`/login?redirect=${encodeURIComponent(window.location.href)}`} />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={user.loggedIn ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/course/id/:id/detail" element={<CourseDetail />} />
          <Route path="/play/:id" element={user.loggedIn ? <Play /> : <Navigate to={`/login?redirect=${encodeURIComponent(window.location.href)}`} />} />
          {/* <Route path="/blog" element={<Blog
              setLoggedOff={setLoggedOff}
            />} /> */}
          <Route path="/course/request" element={user.loggedIn ? <CourseRequest /> : <Navigate to={`/login?redirect=${encodeURIComponent(window.location.href)}`} />} />
          <Route path="/request/list" element={(user.loggedIn) ? <RequestList /> : <Navigate to={`/login?redirect=${encodeURIComponent(window.location.href)}`} />} />
          {/* <Route path="/request/list" element={(user.loggedIn && user.role === "admin") ? <RequestList /> : <Navigate to={`/error`} />} /> */}
          <Route path="/community" element={<Community />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/users/:id/reset/:token" element={<PasswordReset />} />
          <Route path="/users/reset/" element={user.loggedIn ? <PassResetForm /> : <Navigate to={'/dashboard'} />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Errorpage />} />
          <Route path="*" element={<Errorpage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
