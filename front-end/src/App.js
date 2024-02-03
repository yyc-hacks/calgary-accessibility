import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState("Sidhi"); // Set "Sidhi" as the default value
  const [filterGender, setFilterGender] = useState("");
  const [allLanguages, setAllLanguages] = useState([]); // Store all unique languages

  useEffect(() => {
    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        // Directly use the languages array from the response, no need for JSON parsing
        setDoctorList(response.data);

        // Extract unique languages from the doctors and store them in allLanguages state
        const uniqueLanguages = new Set(
          response.data.reduce((acc, doctor) => {
            acc.push(...doctor.languages); // Note the lowercase 'languages'
            return acc;
          }, [])
        );

        // Ensure "Sidhi" is in the list of languages
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

  const filteredDoctors = doctorList.filter((doctor) => {
    const languageMatch =
      !filterLanguage || doctor.languages.includes(filterLanguage);
    const genderMatch = !filterGender || doctor.gender === filterGender;
    return languageMatch && genderMatch;
  });

  return (
    <div className="App">
      <h1>Doctor Search App</h1>
      <div>
        <label>Filter by Language:</label>
        <select value={filterLanguage} onChange={handleLanguageChange}>
          <option value="Sidhi">Sidhi</option>
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
              <Link to={`/doctors/${doctor._id}`}>{doctor.name}</Link> -
              Language: {doctor.languages.join(", ")}, Gender: {doctor.gender}
            </li> // Wrap doctor's name with Link
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
