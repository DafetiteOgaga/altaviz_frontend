// import useFetch from "../../hooks/useFetch";
// import Hero from "./Hero";
// import AboutAtms from "./AboutAtms";
// import ProductCards from "./ProductCards";
import MonthandYear from "./MonthandYear";
import logo from "../../logo/altaviz_logo.png"
import "./footer.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../context/Context";
// import useNavigation from "../hooks/useNavigate";
// import cardreader from "./product_images/Card Reader.png"

function Footer() {
	const { companyName } = useContext(GlobalContext)
	return (
		<>
			<div className="footer">
				<Link to="/">
					<img className="img" src={logo} alt="company logo" />
				</Link>
			<div>
				<p>Copyright &copy; {companyName}</p>
				<p><Link to="/about">About Us</Link></p>
				<p>Address: Lagos, Nigeria</p>
			</div>
			<div>
				<p>Privacy Policy</p>
				<p>Terms of Service</p>
				<p>customercare@altaviz.com</p>
			</div>
				<MonthandYear />
			</div>
		</>
	);
}
export default Footer;