import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterGender, setFilterGender] = useState("");

  useEffect(() => {
    // Replace 'YOUR_BACKEND_API_ENDPOINT_HERE' with your actual backend API endpoint
    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        // Convert the Languages property from a string to an array
        const doctorsWithArrayLanguages = response.data.map((doctor) => ({
          ...doctor,
          Languages: JSON.parse(doctor.Languages.replace(/'/g, '"')),
        }));
        setDoctorList(doctorsWithArrayLanguages);
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
      !filterLanguage || doctor.Languages.includes(filterLanguage);
    const genderMatch = !filterGender || doctor.Gender === filterGender;
    return languageMatch && genderMatch;
  });

  return (
    <div className="App">
      <h1>Doctor Search App</h1>
      <div>
        <label>Filter by Language:</label>
        <select value={filterLanguage} onChange={handleLanguageChange}>
          <option value="">All</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          {/* Add more language options here */}
        </select>
      </div>
      <div>
        <label>Filter by Gender:</label>
        <select value={filterGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          {/* Add more gender options here */}
        </select>
      </div>
      <div>
        <h2>Doctors List</h2>
        <ul>
          {filteredDoctors.map((doctor) => (
            <li key={doctor._id}>
              {doctor.Name} - Language: {doctor.Languages.join(", ")}, Gender:{" "}
              {doctor.Gender}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
