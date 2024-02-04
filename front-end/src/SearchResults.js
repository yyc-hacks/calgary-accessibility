// SearchResults.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchResults() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterLanguage = searchParams.get("language") || "English";
    const filterGender = searchParams.get("gender") || "";

    axios
      .get("http://localhost:8080/doctors")
      .then((response) => {
        const filteredDoctors = response.data.filter((doctor) => {
          const languageMatch =
            !filterLanguage || doctor.languages.includes(filterLanguage);
          const genderMatch = !filterGender || doctor.gender === filterGender;
          return languageMatch && genderMatch;
        });
        setDoctorList(filteredDoctors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [location.search]);

  const handleBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={handleBack}>
        &larr; Back
      </button>
      {/* Display the filtered list of doctors */}
      <ul className="list-group">
        {doctorList.map((doctor) => (
          <li key={doctor._id} className="list-group-item">
            <Link to={`/doctors/${doctor._id}`}>{doctor.name}</Link> -
            Languages: {doctor.languages.join(", ")}, Gender: {doctor.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
