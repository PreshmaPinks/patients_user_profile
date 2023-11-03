export const sortByAlphabet = (patientData) => {
  const sorteData = [...patientData];
  sorteData.sort((a, b) => {
    if (a.first_name < b.first_name) {
      return -1;
    }
    if (a.first_name > b.first_name) {
      return 1;
    }
    return 0;
  });

  return sorteData;
};
