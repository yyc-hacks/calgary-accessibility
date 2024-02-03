import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/doctors/${id}`) // Replace with your API endpoint
      .then((response) => {
        const doctorWithArrayLanguages = {
          ...response.data,
          Languages: JSON.parse(response.data.Languages.replace(/'/g, '"')),
        };
        setDoctor(doctorWithArrayLanguages);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctor Details</h1>
      <h2>{doctor.Name}</h2>
      <p>Location: {doctor.Location}</p>
      <p>Practice Discipline: {doctor["Practice Discipline"]}</p>
      <p>Gender: {doctor.Gender}</p>
      <p>Languages: {doctor.Languages.join(", ")}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default DoctorDetail;
