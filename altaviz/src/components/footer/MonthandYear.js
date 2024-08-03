import React from 'react';

const MonthandYear = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  const now = new Date();
  const dayOfWeek = dayNames[now.getDay()];
  const month = monthNames[now.getMonth()];
  const dayOfMonth = now.getDate();
  const year = now.getFullYear();

  return (
    <>
      <p className='paragraph'>
        Developed by: Dafetite <a href="https://dafetiteogaga.github.io/dafetite">(portfolio)</a>
        <br></br>
        {dayOfWeek}, {month} {dayOfMonth}, {year}
      </p>
      {/* <p className='paragraph'>Altaviz Support Limited &copy; <br></br> • {dayOfWeek}, {month} {dayOfMonth}, {year} <br></br>
      Developed by: Dafetite <a href="https://dafetiteogaga.github.io/dafetite">(portfolio)</a></p> */}
    </>
  );
};

export default MonthandYear;
