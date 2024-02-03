import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState("Sidhi");
  const [filterGender, setFilterGender] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);

  useEffect(() => {
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
        setAllLanguages(Array.from(uniqueLanguages));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      <h1 className="mb-3">Doctor Search App</h1>
      <div className="row g-3 align-items-center justify-content-center">
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
            <option value="Sidhi">Sidhi</option>
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
            <Link to={`/doctors/${doctor._id}`} className="App-link">
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
