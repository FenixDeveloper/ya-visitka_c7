export const testUser: { name: string, avatar?: string} = {
  name: "Константин Константинович",
  avatar: "https://avatars.githubusercontent.com/u/85547727?v=4",
};

export const defaultArr = ['Петровск (Саратовская область)', 'Петровск-Забайкальский (Забайкальский край)', 'Петрозаводск (Республика Карелия)', 'Петропавловск-Камчатский (Камчатский край)'];

export const getListYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  startYear = Number(startYear) || 1980;  
  while ( startYear <= currentYear ) {
      years.push(startYear++);
  }   
  return years;
}

export const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
