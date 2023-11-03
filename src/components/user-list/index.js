import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../contexts/patientContext";
import { debounce } from "../../utils/debounce";
import { sortByAlphabet } from "../../utils/common";
import "./index.css";
import { PatientFilters } from "./filters";
import { searchFilter, ageFilter, genderFilter } from "./utils";

const UserList = () => {
  const navigate = useNavigate();

  const {
    patientData,
    setPatientData,
    initialData,
    searchedValue,
    setSearchedValue,
    selectedGender,
    setSelectedGender,
    selectedAge,
    setSelectedAge,
  } = useContext(PatientContext);

  const openUserDetails = (row) => {
    navigate(`/details/${row.patient_id}`, { state: { row } });
  };

  const searchPatientData = (e) => {
    setSearchedValue(e.target.value);
  };

  const handlePatientAge = (e) => {
    setSelectedAge(e.target.value);
  };
  const handlePatientGender = (e) => {
    setSelectedGender(e.target.value);
  };

  const filterAndSearch = () => {
    const filteredData = initialData
      .filter((item) => searchFilter(item, searchedValue))
      .filter((item) => genderFilter(item, selectedGender))
      .filter((item) => ageFilter(item, selectedAge));

    setPatientData(filteredData);
  };

  const handleSearch = debounce(filterAndSearch, 500);

  useEffect(() => {
    handleSearch();
  }, [searchedValue, selectedGender, selectedAge]);

  const handleAlphabetSort = () => {
    const sortedData = sortByAlphabet(patientData);
    setPatientData(sortedData);
  };

  const resetFilters = () => {
    setSearchedValue("");
    setSelectedGender("");
    setSelectedAge("");
  };

  return (
    <div className="patient-list-container">
      <h1 className="patient-header">Patient List</h1>
      <PatientFilters
        searchedValue={searchedValue}
        searchPatientData={searchPatientData}
        selectedGender={selectedGender}
        handlePatientGender={handlePatientGender}
        selectedAge={selectedAge}
        handlePatientAge={handlePatientAge}
        handleAlphabetSort={handleAlphabetSort}
        resetFilters={resetFilters}
      />
      <div className="patient-list">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {patientData.length > 0 ? (
              patientData?.map((item) => {
                return (
                  <tr
                    key={item.patient_id}
                    onClick={() => openUserDetails(item)}
                  >
                    <td>{item.patient_id}</td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No user found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
