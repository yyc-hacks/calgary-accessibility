import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./App.css"; // Import custom CSS for additional styling

import logoImage from "./logo-no-background.png";

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState(
    sessionStorage.getItem("filterLanguage") || "English"
  );
  const [filterGender, setFilterGender] = useState(
    sessionStorage.getItem("filterGender") || ""
  );
  const [allLanguages, setAllLanguages] = useState([]);

  useEffect(() => {
    const savedFilterLanguage = sessionStorage.getItem("filterLanguage");
    const savedFilterGender = sessionStorage.getItem("filterGender");

    if (savedFilterLanguage) {
      setFilterLanguage(savedFilterLanguage);
    }
    if (savedFilterGender) {
      setFilterGender(savedFilterGender);
    }
    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        setDoctorList(response.data);
        const uniqueLanguages = new Set(
          response.data.reduce((acc, doctor) => {
            acc.push(...doctor.languages);
            return acc;
          }, [])
        );
        uniqueLanguages.add("Sidhi");

        // Convert the Set to an array, sort it, and then update state
        const sortedLanguages = Array.from(uniqueLanguages).sort();
        setAllLanguages(sortedLanguages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Save the current search filters to sessionStorage when they change
    sessionStorage.setItem("filterLanguage", filterLanguage);
    sessionStorage.setItem("filterGender", filterGender);
  }, [filterLanguage, filterGender]);

  const handleLanguageChange = (e) => {
    setFilterLanguage(e.target.value);
  };

  const handleGenderChange = (e) => {
    setFilterGender(e.target.value);
  };

  // Define 'filteredDoctors' here
  const filteredDoctors = doctorList.filter((doctor) => {
    const languageMatch =
      !filterLanguage || doctor.languages.includes(filterLanguage);
    const genderMatch = !filterGender || doctor.gender === filterGender;
    return languageMatch && genderMatch;
  });

  return (
    <div className="App container mt-5">
      <Link to="/" className="home-link">
        <img src={logoImage} className="app-logo" alt="YYC MedMatch Logo" />{" "}
        {/* Use the PNG image */}
      </Link>

      <div className="filters row g-3 align-items-center justify-content-center">
        <div className="col-auto">
          <label htmlFor="languageSelect" className="form-label">
            Filter by Language
          </label>
          <select
            id="languageSelect"
            className="form-select"
            value={filterLanguage}
            onChange={handleLanguageChange}
          >
            <option value="">All</option>
            {allLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <label htmlFor="genderSelect" className="form-label">
            Filter by Gender
          </label>
          <select
            id="genderSelect"
            className="form-select"
            value={filterGender}
            onChange={handleGenderChange}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <ul className="list-group list-group-flush mt-4">
        {filteredDoctors.map((doctor) => (
          <li key={doctor._id} className="list-group-item">
            <Link to={`/doctors/${doctor._id}`} className="doctor-link">
              {doctor.name}
            </Link>{" "}
            - Language: {doctor.languages.join(", ")}, Gender: {doctor.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
