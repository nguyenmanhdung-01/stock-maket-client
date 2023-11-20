import React, { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
// import clsx from "clsx";

import LayoutDefault from "./Layout/LayoutDefault";
import MainApp from "./pages/Main";
import BieuDoCot from "./pages/BieuDoCot/BieuDoCot";
import BieuDothanh from "./pages/BieuDoThanh/BieuDothanh";
import BieuDoVung from "./pages/BieuDoVung/BieuDoVung";
import BieuDoNen from "./pages/BieuDoNen/BieuDoNen";
import BieuDoCotRange from "./pages/BieuDoCot/BieuDoCotRange";
import BieuDoOHLC from "./pages/BieuDoOHLC/BieuDoOHLC";
import Heikin_Ashi from "./pages/Main/Heikin_Ashi";
import BieuDoNenRong from "./pages/BieuDoNen/BieuDoNenRong";
import LayoutLogin from "./Layout/LayoutLogin";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import Community from "./pages/Community/Community";
import Contact from "./pages/Contact/Contact";
import Admin from "./Layout/LayoutAdmin";
import MainDashboard from "./pages/Admin/Views/MainDashboard/MainDashboard";
import News from "./pages/News/News";
import User from "./pages/User/User";
import ContactManagerDetail from "./pages/Admin/Views/ContactManager/ContactManagerDetail.jsx";
import NewDetail from "./pages/News/View/NewsDetail.jsx";
import NewContentDetail from "./pages/News/View/NewContentDetail.jsx";
import SearchPage from "./pages/search/index.jsx";
import PostDetail from "./pages/Community/components/PostDetail.jsx";
import YourPost from "./pages/Community/components/YourPost.jsx";
const AppLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route path="/" element={<MainApp />} />
        <Route path="/bieudocot" element={<BieuDoCot />} />
        <Route path="/bieudothanh" element={<BieuDothanh />} />
        <Route path="/bieudovung" element={<BieuDoVung />} />
        <Route path="/bieudonen" element={<BieuDoNenRong />} />
        <Route path="/bieudophamvicot" element={<BieuDoCotRange />} />
        <Route path="/bieudoOHLC" element={<BieuDoOHLC />} />
        <Route path="/aapl-ohlcv" element={<Heikin_Ashi />} />

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
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="admin/*" element={<Admin />} />
      {/* <Route path="/contactManager/:id" element={<ContactManagerDetail />} /> */}
      {/* </Route> */}
    </Routes>
  );
};
function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
