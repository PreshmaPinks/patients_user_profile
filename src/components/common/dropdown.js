import React, { useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../contexts/patientContext";
import { debounce } from "../../utils/debounce";
import { sortByAlphabet } from "../../utils/common";
import "./index.css";

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
      .filter((item) => {
        if (searchedValue) {
          return (
            item.first_name
              ?.toLowerCase()
              .includes(searchedValue.toLowerCase()) ||
            item.last_name
              ?.toLowerCase()
              .includes(searchedValue.toLowerCase()) ||
            item.patient_id.toString() === searchedValue ||
            item.email?.toLowerCase().includes(searchedValue.toLowerCase())
          );
        }
        return true;
      })
      .filter((item) => {
        if (selectedGender) {
          return item.gender.toLowerCase() === selectedGender.toLowerCase();
        }
        return true;
      })
      .filter((item) => {
        if (selectedAge) {
          if (selectedAge === "18-30") {
            return item.age >= 18 && item.age <= 30;
          } else if (selectedAge === "31-45") {
            return item.age >= 31 && item.age <= 45;
          } else if (selectedAge === ">45") {
            return item.age > 45;
          }
        }
        return true;
      });

    setPatientData(filteredData);
  };

  const handleSearch = useCallback(debounce(filterAndSearch, 500));

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
      <div className="patient-filters">
        <div className="patient-search-option">
          Search:
          <input
            value={searchedValue}
            onChange={searchPatientData}
            placeholder="Search by name, email, or ID"
          ></input>
        </div>
        <div className="patient-filter-option">
          Filters:
          <select value={selectedGender} onChange={handlePatientGender}>
            <option disabled={true} value="">
              --Select Gender--
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select value={selectedAge} onChange={handlePatientAge}>
            <option disabled={true} value="">
              --Select Age--
            </option>
            <option value="18-30">18-30</option>
            <option value="31-45">31-45</option>
            <option value=">45">&gt;45</option>
          </select>
          Sort:
          <button onClick={handleAlphabetSort}>A-Z</button>
          <button onClick={resetFilters}>Reset</button>
        </div>
      </div>
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
              <tr>No user found</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
