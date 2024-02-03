import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [allLanguages, setAllLanguages] = useState([]); // Store all unique languages

  useEffect(() => {
    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        // Directly use the languages array from the response, no need for JSON parsing
        setDoctorList(response.data);

        // Extract unique languages from the doctors and store them in allLanguages state
        const uniqueLanguages = Array.from(
          new Set(
            response.data.reduce((acc, doctor) => {
              acc.push(...doctor.languages); // Note the lowercase 'languages'
              return acc;
            }, [])
          )
        );
        setAllLanguages(uniqueLanguages);
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

  const filteredDoctors = doctorList.filter((doctor) => {
    const languageMatch =
      !filterLanguage || doctor.languages.includes(filterLanguage); // Note the lowercase 'languages'
    const genderMatch = !filterGender || doctor.gender === filterGender; // Note the lowercase 'gender'
    return languageMatch && genderMatch;
  });

  return (
    <div className="App">
      <h1>Doctor Search App</h1>
      <div>
        <label>Filter by Language:</label>
        <select value={filterLanguage} onChange={handleLanguageChange}>
          <option value="">All</option>
          {allLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Filter by Gender:</label>
        <select value={filterGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <h2>Doctors List</h2>
        <ul>
          {filteredDoctors.map((doctor) => (
            <li key={doctor._id}>
              {doctor.name} - Language: {doctor.languages.join(", ")}, Gender:{" "}
              {doctor.gender}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
