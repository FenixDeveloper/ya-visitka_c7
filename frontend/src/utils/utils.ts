export const getListYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  startYear = Number(startYear) || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const logout = () => {
  localStorage.clear()
}
