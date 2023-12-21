import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// import clsx from "clsx";

import LayoutDefault from "./Layout/LayoutDefault";
import MainApp from "./pages/Main";
import LayoutLogin from "./Layout/LayoutLogin";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import Community from "./pages/Community/Community";
import Contact from "./pages/Contact/Contact";
import Admin from "./Layout/LayoutAdmin";
import News from "./pages/News/News";
import User from "./pages/User/User";
import NewDetail from "./pages/News/View/NewsDetail.jsx";
import NewContentDetail from "./pages/News/View/NewContentDetail.jsx";
import SearchPage from "./pages/search/index.jsx";
import PostDetail from "./pages/Community/components/PostDetail.jsx";
import YourPost from "./pages/Community/components/YourPost.jsx";
import { getTokenInfo, setTokenInfo } from "./utils/auth/auth.js";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import socket from "./socketService.js";
const AppLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route path="/" element={<MainApp />} />

        <Route path="/community" element={<Community />} />
        <Route path="/chi-tiet-bai-viet/:id" element={<PostDetail />} />
        <Route path="/community/bai-viet-cua-ban" element={<YourPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewDetail />} />
        <Route path="/:slug" element={<NewContentDetail />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/user-info/:id" element={<User />} />
      </Route>
      <Route path="/login-page" element={<LayoutLogin />}>
        <Route path="" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="admin/*" element={<Admin />} />
      {/* <Route path="/contactManager/:id" element={<ContactManagerDetail />} /> */}
      {/* </Route> */}
    </Routes>
  );
};
function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <BrowserRouter>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
