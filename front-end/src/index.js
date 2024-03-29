import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DoctorDetail from "./DoctorDetail";
import SearchResults from "./SearchResults"; // Make sure to import the SearchResults component
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchResults />} />{" "}
        {/* Add this line for search results */}
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
