import React, { useState } from "react";

const initialDoctorList = [
  { id: 1, name: "Dr. John Doe", language: "English", gender: "Male" },
  { id: 2, name: "Dr. Jane Smith", language: "Spanish", gender: "Female" },
  // Add more doctor data here
];

function App() {
  const [doctorList, setDoctorList] = useState(initialDoctorList);
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterGender, setFilterGender] = useState("");

  const handleLanguageChange = (e) => {
    setFilterLanguage(e.target.value);
  };

  const handleGenderChange = (e) => {
    setFilterGender(e.target.value);
  };

  const filteredDoctors = doctorList.filter((doctor) => {
    const languageMatch = !filterLanguage || doctor.language === filterLanguage;
    const genderMatch = !filterGender || doctor.gender === filterGender;
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
            <li key={doctor.id}>
              {doctor.name} - Language: {doctor.language}, Gender:{" "}
              {doctor.gender}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
