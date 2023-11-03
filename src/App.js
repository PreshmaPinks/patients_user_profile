import "./App.css";
import UserList from "./components/user-list";
import UserDetails from "./components/user-details";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { PatientContext } from "./contexts/patientContext";
import { useState } from "react";
import { data } from "./Data";
import NotFound from "./components/error-page/userNotFound";

function App() {
  const [patientData, setPatientData] = useState(data);
  const [initialData, setInitialData] = useState(data);
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  return (
    <div>
      <PatientContext.Provider
        value={{
          patientData,
          setPatientData,
          initialData,
          setInitialData,
          searchedValue,
          setSearchedValue,
          selectedGender,
          setSelectedGender,
          selectedAge,
          setSelectedAge,
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<UserList />}></Route>
            <Route path="/details/:id" element={<UserDetails />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PatientContext.Provider>
    </div>
  );
}

export default App;
