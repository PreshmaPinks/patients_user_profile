import { AGE_FILTERS, GENDER_FILTERS } from "./constants";
export const PatientFilters = ({
  searchedValue,
  searchPatientData,
  selectedGender,
  handlePatientGender,
  selectedAge,
  handlePatientAge,
  handleAlphabetSort,
  resetFilters,
}) => {
  return (
    <div className="patient-filters">
      <div className="patient-search-option">
        Search:
        <input
          value={searchedValue}
          onChange={searchPatientData}
          placeholder="Search name, email, or ID"
        ></input>
      </div>
      <div className="patient-filter-option">
        Filters:
        <select value={selectedGender} onChange={handlePatientGender}>
          <option value="">--Select Gender--</option>
          {GENDER_FILTERS.map((item) => {
            return (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select value={selectedAge} onChange={handlePatientAge}>
          <option value="">--Select Age--</option>
          {AGE_FILTERS.map((item) => {
            return (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        Sort:
        <button onClick={handleAlphabetSort}>A-Z</button>
        <button onClick={resetFilters}>Reset</button>
      </div>
    </div>
  );
};
