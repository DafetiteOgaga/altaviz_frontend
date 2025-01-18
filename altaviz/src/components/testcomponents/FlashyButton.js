import styled, { keyframes } from "styled-components";

// Define the keyframes
const flash = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const glow = keyframes`
  0% {
    // box-shadow: 0 0 10px #2A2A5F;
    // box-shadow: 0 0 10px rgba(255, 87, 51, 0.8);
  }
  100% {
    // box-shadow: 0 0 30px #3E3E87;
    // box-shadow: 0 0 30px rgba(255, 189, 51, 1);
  }
`;

// Create the styled button
const FlashyButton = styled.button`
  background: linear-gradient(45deg, #B5B5BD, #3E3E87, #FBFBFB);
  // background: linear-gradient(45deg, #ff5733, #ffbd33, #33ffbd);
  background-size: 200% 200%;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 15px #8A8A93,;
  // box-shadow: 0 4px 15px rgba(255, 87, 51, 0.6);
  transition: transform 0.2s ease;
  animation: ${flash} 1.5s infinite alternate, ${glow} 2s infinite;

  &:hover {
    transform: scale(1.1);
  }
`;

export default FlashyButton;
