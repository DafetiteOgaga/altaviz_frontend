// import "./CustomButton.css"
// import { useState } from "react";
import styled from "styled-components"

const Background = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	gap: 10rem;
`
const CButton = styled.h5`
	background-color: ${props => props.action? '' : '#8A8A93'};
	color: ${props => props.action? '#2b2929' : 'whitesmoke'};
	text-decoration: none;
	white-space: pre;
	// color: #2b2929;
	padding: 0.5rem;
	border: 0.01px solid;
	border-radius: 5px;
	margin: 1rem 0;

	&:hover {
	box-shadow: -7px 7px 0 rgba(0, 0, 0, 0.068);
	}
	&:active {
	box-shadow: -1px 1px 0 rgba(0, 0, 0, 0.068);
	}
`

function CustomButton({ text, action }) {
	// const [isClicked, setIsClicked] = useState(false);
	// // const [clicked, setClicked] = useState(false);
	// const clickHandler = () => {
	// 	setIsClicked(!isClicked);
	// }
	console.log('action:', action);
	return (
		<>
			<Background>
				<CButton
				action={action}
				// onClick={clickHandler}
				>
					{action ? text[1] : text[0]}
				</CButton>
			</Background>
		</>
	)
}
export default CustomButton;