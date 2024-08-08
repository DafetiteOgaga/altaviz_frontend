import React from 'react';

const CustomTime = (name) => {
  // const monthNames = [
  //   "January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];
  // const dayNames = [
  //   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  // ];
  const timeNames = [
    "Morning", "Afternoon", "Evening",
  ];
  const now = new Date();
  // const dayOfWeek = dayNames[now.getDay()];
  // const month = monthNames[now.getMonth()];
  // const dayOfMonth = now.getDate();
  // const year = now.getFullYear();

  const hour = now.getHours()
  // const minute = now.getMinutes()
  // const second = now.getSeconds()

  let timeIndex = null;
  if (hour < 12) {
    timeIndex = 0;
  } else if (hour >= 12 && hour < 17) {
    timeIndex = 1;
  } else if (hour >= 17 && hour <= 24) {
    timeIndex = 2;
  }
  const timeOfDay = timeNames[timeIndex];

  return (
    <>
      <h2>
        Good {timeOfDay} {name.name},
      </h2>
    </>
  );
};

export default CustomTime;
