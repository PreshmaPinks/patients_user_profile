import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeletePopUp from "./deletePopup";
import { PatientContext } from "../../contexts/patientContext";
import "./index.css";

const PatientTextData = ({ name, value }) => {
  return (
    <p>
      <b>{name}: </b>
      {value}
    </p>
  );
};

const UserDetails = () => {
  const navigate = useNavigate();
  const { patientData } = useContext(PatientContext);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const UserInfo = useCallback(
    (id) => {
      const userInfoDetails = [...patientData]?.find((item) => {
        return item.patient_id.toString() === id;
      });

      setSelectedPatientData(userInfoDetails);
    },
    [patientData]
  );

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const id = params.id;
    UserInfo(id);
  }, [UserInfo, params.id]);

  const deletePatientsData = () => {
    setIsOpen(true);
  };

  const onCancelDeletePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div className="patient-detail-container">
      <h1 className="patient-detail-header">Patient Details</h1>
      <div className="patient-detail-back-container">
        <button onClick={goBack}>Go Back</button>
      </div>
      <div className="patient-details">
        <p>
          <img alt="user" src={selectedPatientData?.avatar}></img>
        </p>
        <PatientTextData name="ID" value={selectedPatientData?.patient_id} />
        <PatientTextData
          name="First Name"
          value={selectedPatientData?.first_name}
        />
        <PatientTextData
          name="Last Name"
          value={selectedPatientData?.last_name}
        />
        <PatientTextData name="Email" value={selectedPatientData?.email} />
        <PatientTextData name="Gender" value={selectedPatientData?.gender} />
        <PatientTextData name="Age" value={selectedPatientData?.age} />
      </div>
      <div className="delete-button-container">
        <button onClick={deletePatientsData}>Delete Patient</button>
      </div>
      {isOpen && (
        <DeletePopUp
          onCancelDeletePopUp={onCancelDeletePopUp}
          user={selectedPatientData}
        />
      )}
    </div>
  );
};
export default UserDetails;
