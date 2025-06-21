import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login Page/Login";
import Dashboard from "./Dashboard/Dashboard";
import ViewEnquiries from "./Dashboard/ViewEnquiries";
import { H1Icon } from "@heroicons/react/24/outline";
import Product from "./DashBoard/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="enquiries" element={<ViewEnquiries />} />
        </Route>
          <Route path="/categories" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
