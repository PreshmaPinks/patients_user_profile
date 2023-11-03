import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../contexts/patientContext";
import "./index.css";

const DeletePopUp = (props) => {
  const navigate = useNavigate();
  const { initialData, setInitialData } = useContext(PatientContext);

  const onConfirmDelete = () => {
    const patientIdToDelete = props.user.patient_id;
    const updatedPatientData = [...initialData].filter((item) => {
      return item.patient_id !== patientIdToDelete;
    });
    setInitialData(updatedPatientData);
    navigate("/");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>
          Are you sure you want to delete patient id{" "}
          <b>{props.user.patient_id}</b>
        </p>
        <button onClick={props.onCancelDeletePopUp}>cancel</button>
        <button onClick={onConfirmDelete}>confirm</button>
      </div>
    </div>
  );
};

export default DeletePopUp;
