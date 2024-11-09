import { useContext, useState, useEffect } from 'react';
import { SentenceCaseContext } from '../context/SentenceCaseContext';

const CustomTime = ({authData}) => {
  const { toSentenceCase } = useContext(SentenceCaseContext);
  const [nameData, setNameData] = useState(null);
  useEffect(() => {
    if (authData) {
      setNameData(authData)
    }
  }, [authData])
  const timeNames = [
    "Morning", "Afternoon", "Evening",
  ];
  const now = new Date();
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
  // console.log('authData:', authData)
  return (
    <>
      <h2 style={{
        margin: '0'
      }}>
        Good {timeOfDay}, {nameData && toSentenceCase(authData.first_name || authData.username)}
      </h2>
    </>
  );
};

export default CustomTime;
