export const ageFilter = (item, age) => {
  if (age) {
    if (age === "18-30") {
      return item.age >= 18 && item.age <= 30;
    } else if (age === "31-45") {
      return item.age >= 31 && item.age <= 45;
    } else if (age === ">45") {
      return item.age > 45;
    }
  }
  return true;
};

export const genderFilter = (item, gender) => {
  if (gender) {
    return item.gender === gender;
  }
  return true;
};
export const searchFilter = (item, value) => {
  if (value) {
    return (
      item.first_name?.toLowerCase().includes(value.toLowerCase()) ||
      item.last_name?.toLowerCase().includes(value.toLowerCase()) ||
      item.patient_id.toString() === value ||
      item.email?.toLowerCase().includes(value.toLowerCase())
    );
  }
  return true;
};
