import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./DoctorDetail.css"; // Import custom CSS for additional styling
import { useNavigate } from "react-router-dom";

function DoctorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous history entry
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/doctors/${id}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, [id]);

  if (!doctor) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="doctor-detail container mt-5">
      <button className="btn btn-light mb-4" onClick={handleBackClick}>
        &larr; Back to list
      </button>
      <h1 className="text-center mb-4">Doctor Details</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{doctor.name}</h2>
          <p className="card-text">
            <strong>Location:</strong> {doctor.location}
          </p>
          <p className="card-text">
            <strong>Phone Number:</strong> {doctor.phone_number || "N/A"}
          </p>
          <p className="card-text">
            <strong>Fax Number:</strong> {doctor.fax_number || "N/A"}
          </p>
          <p className="card-text">
            <strong>Practice Discipline:</strong>{" "}
            {doctor.practice_discipline.join(", ")}
          </p>
          <p className="card-text">
            <strong>Gender:</strong> {doctor.gender}
          </p>
          <p className="card-text">
            <strong>Languages:</strong> {doctor.languages.join(", ")}
          </p>
          <p className="card-text">
            <strong>Accepting Patients:</strong>{" "}
            {doctor.accepting_patients ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
