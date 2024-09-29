import React, { Fragment } from "react";
import PetWebsite from "./pages/PetWebsite";
import EcommerceComponent from "./pages/EcommerceComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail2 from "./components/ProductDetail";
import ProductListingPage from "./components/ProductListingPage";
import MedicalPortal from "./components/MedicalPortal";
import DoctorDetail from "./components/DoctorDetail";
import EcommercePetWebsite from "./pages/EcommercePetWebsite";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<EcommercePetWebsite />} />
          <Route path="/pet" element={<PetWebsite />} />
          <Route path="/product" element={<EcommerceComponent />} />
          <Route path="/detail" element={<ProductDetail2 />} />
          <Route path="/listing" element={<ProductListingPage />} />
          <Route path="/doctor" element={<MedicalPortal />} />
          <Route path="/doctor-detail" element={<DoctorDetail />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;