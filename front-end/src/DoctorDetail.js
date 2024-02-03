import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/doctors/${id}`) // Adjust as needed for your API endpoint
      .then((response) => {
        // Directly use the data without needing to parse languages
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  // Update to reflect your schema
  return (
    <div>
      <h1>Doctor Details</h1>
      <h2>{doctor.name}</h2>
      <p>Location: {doctor.location}</p>
      <p>Phone Number: {doctor.phone_number || "N/A"}</p>
      <p>Fax Number: {doctor.fax_number || "N/A"}</p>
      <p>Practice Discipline: {doctor.practice_discipline.join(", ")}</p>
      <p>Gender: {doctor.gender}</p>
      <p>Languages: {doctor.languages.join(", ")}</p>
      <p>Accepting Patients: {doctor.accepting_patients ? "Yes" : "No"}</p>
    </div>
  );
}

export default DoctorDetail;
