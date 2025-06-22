import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login Page/Login";
import Dashboard from "./DashBoard/Dashboard";
import ViewEnquiries from "./Dashboard/ViewEnquiries";
import Product from "./Component/Products/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashBoard" element={<Dashboard />}>
          <Route path="enquiries" element={<ViewEnquiries />} />
        </Route>
        <Route path="categories" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
