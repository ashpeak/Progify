import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import ReactGA from "react-ga4";

// ProtectedRoute component that waits for auth check before redirecting
const ProtectedRoute = ({ children }) => {
  const user = userState((state) => state.user);
  const authChecked = userState((state) => state.authChecked);
  const location = useLocation();

  // Show nothing while checking auth status
  if (!authChecked) {
    return null; // Or a loading spinner
  }

  if (!user.loggedIn) {
    const redirectPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  return children;
};

// GuestRoute component for pages that should only be accessible when NOT logged in
const GuestRoute = ({ children, redirectTo = "/dashboard" }) => {
  const user = userState((state) => state.user);
  const authChecked = userState((state) => state.authChecked);

  // Show nothing while checking auth status
  if (!authChecked) {
    return null;
  }

  if (user.loggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

const TRACKING_ID = "G-ZVWK1VVKBD"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

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

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search});

    if (firstRender) {
      firstRender = false;
      refreshState();
    }

    const intervalId = setInterval(refreshState, 290000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    // whenever the location changes, report a new page view
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search});
  }, [location]);

  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Navbar />
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/course" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/id/:id/detail" element={<CourseDetail />} />
          <Route path="/play/:id" element={<ProtectedRoute><Play /></ProtectedRoute>} />
          {/* <Route path="/blog" element={<Blog
              setLoggedOff={setLoggedOff}
            />} /> */}
          <Route path="/course/request" element={<ProtectedRoute><CourseRequest /></ProtectedRoute>} />
          <Route path="/request/list" element={<ProtectedRoute><RequestList /></ProtectedRoute>} />
          {/* <Route path="/request/list" element={(user.loggedIn && user.role === "admin") ? <RequestList /> : <Navigate to={`/error`} />} /> */}
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/users/:id/reset/:token" element={<PasswordReset />} />
          <Route path="/users/reset/" element={<GuestRoute><PassResetForm /></GuestRoute>} />
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
