import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login Page/Login";
import Dashboard from "./DashBoard/Dashboard";
import ViewEnquiries from "./Dashboard/ViewEnquiries";
import Product from "./Component/Products/Product";
import SubcategoryPage from "./Component/SubCategoryPage";
import ProductList from "./Component/ProductManagement/ProductList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashBoard" element={<Dashboard />}>
          <Route path="enquiries" element={<ViewEnquiries />} />
        </Route>
        <Route path="categories" element={<Product />} />
        <Route path="subcategories/:id" element={<SubcategoryPage />} />
        <Route path="products" element={<ProductList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
