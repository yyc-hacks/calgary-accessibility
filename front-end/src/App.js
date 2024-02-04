import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logoImage from "./logo-no-background.png";
import backgroundImage from "./doctor.jpg"; // Adjust the path as needed

function App() {
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        const uniqueLanguages = new Set(
          response.data.flatMap((doctor) => doctor.languages)
        );
        setAllLanguages(Array.from(uniqueLanguages).sort());
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddLanguage = (e) => {
    const language = e.target.value;
    if (language && !selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    e.target.value = "";
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setSelectedLanguages(
      selectedLanguages.filter((language) => language !== languageToRemove)
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGenders((prevGenders) =>
      prevGenders.includes(gender)
        ? prevGenders.filter((g) => g !== gender)
        : [...prevGenders, gender]
    );
  };

  const handleSearch = () => {
    const languageQuery = selectedLanguages
      .map((lang) => `language=${encodeURIComponent(lang)}`)
      .join("&");
    const genderQuery = selectedGenders
      .map((gender) => `gender=${encodeURIComponent(gender)}`)
      .join("&");
    navigate(`/search?${languageQuery}&${genderQuery}`);
  };

  return (
    <div className="App">
      {/* Background Image */}
      <div className="background-image"></div>
      <div className="background-overlay"></div>

      {/* Container for Content */}
      <div className="container mt-5 app-content">
        <Link to="/" className="home-link">
          <img src={logoImage} className="app-logo" alt="YYC MedMatch Logo" />
        </Link>
        {/* Descriptive Text */}
        <h1 className="slogan">Find a family doctor that's right for you</h1>
        <p className="subtext">
          Enter a language and/or preferred gender below to find out which
          family doctors and clinics are taking new patients in your area.
        </p>
        <div className="search-filters">
          <select
            className="form-select mb-3"
            onChange={handleAddLanguage}
            defaultValue=""
          >
            <option value="" disabled>
              Add Language
            </option>
            {allLanguages.map(
              (language) =>
                !selectedLanguages.includes(language) && (
                  <option key={language} value={language}>
                    {language}
                  </option>
                )
            )}
          </select>

          <div className="selected-languages mb-3">
            {selectedLanguages.map((language) => (
              <div key={language} className="badge bg-secondary me-2">
                {language}{" "}
                <span
                  className="remove-language"
                  onClick={() => handleRemoveLanguage(language)}
                  style={{ cursor: "pointer" }}
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <div className="gender-selection mb-3">
            <label className="form-label">Filter by Gender:</label>
            <div>
              {["Male", "Female", "Other"].map((gender) => (
                <div key={gender} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`gender-${gender}`}
                    value={gender}
                    checked={selectedGenders.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`gender-${gender}`}
                  >
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="btn btn-primary search-button"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
