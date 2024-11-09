// import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { GlobalContext } from "../../context/Context";
import './about.css'
import { FaIdBadge, FaWrench, FaTools, FaHandshake, FaCheckCircle, FaSmile } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"
// import useNavigation from "../hooks/useNavigate";
// import Navigate from "../hooks/useNavigate";
// import React from "react";

function About() {
	const { companyName, useNavigation } = useContext(GlobalContext)
	return (
		<>
			<div id="about-animation" className="background-color about-page">
				<h2>About Us</h2>
				<p>Welcome to {companyName}, your trusted
					partner in the ATM industry. We specialize in
					providing comprehensive solutions for ATM sales,
					support, maintenance, and services. With a commitment
					to excellence and a customer-centric approach, we
					aim to empower financial institutions, retailers,
					and businesses with reliable and efficient ATM
					systems.</p>
				

				<h2>Our Services:</h2>
				<div className="service-item">
					<FaHandshake className="icon" />
					<h3>ATM Sales</h3>
				</div>
					<p>We offer a wide range of ATM models, from compact
						machines for small businesses to high-capacity units
						for busy locations. Our team works closely with
						clients to identify the best solutions to meet their
						specific needs, ensuring a seamless integration into
						their operations.</p>
				
				<div className="service-item">
					<FaWrench className="icon" />
					<h3>Support and Maintenance</h3>
				</div>
					<p>At {companyName}, we understand the
						importance of keeping your ATMs operational at all
						times. Our dedicated support team provides
						round-the-clock assistance and proactive maintenance
						services to prevent downtime and ensure optimal
						performance.</p>

                <div className="service-item">
					<FaTools className="icon" />
					<h3>Technical Services</h3>
				</div>
					<p>Our expert Engineers are equipped to handle all
						aspects of ATM installation, software upgrades, and
						hardware repairs. We use the latest technology and
						industry best practices to deliver fast and efficient
						service, minimizing disruptions to your business.</p>

				<div className="service-item">
					<FaHandshake className="icon" />
					<h3>Consultation and Training</h3>
				</div>
					<p>Beyond sales and maintenance, we offer consultation
						services to help businesses choose the right ATM
						solutions and maximize their benefits. We also provide
						training for staff, ensuring they are well-versed in
						operating and managing the systems effectively.</p>
				
				<h2>Why Choose Us?</h2>
				<div className="why-item">
					<FaIdBadge className="icon" />
					<h3>Expertise and Experience</h3>
				</div>
					<p>With years of experience in the ATM industry, our team
						possesses the knowledge and skills necessary to
						deliver top-tier services. We stay abreast of the
						latest technological advancements and regulatory
						requirements to offer innovative solutions.</p>

				<div className="why-item">
					<FaSmile className="icon" />
					<h3>Customer-Centric Approach</h3>
				</div>
					<p>We prioritize our clients' needs and satisfaction. Our
						support team is always available to address any
						concerns and provide timely assistance, making sure
						your operations run smoothly.</p>

				<div className="why-item">
					<FaCheckCircle className="icon" />
					<h3>Quality Assurance</h3>
				</div>
					<p>We believe in providing high-quality products and
						services. All our ATMs are sourced from reputable
						manufacturers and undergo rigorous testing to ensure
						reliability and durability.</p>

				<div className="why-item">
					<FaTools className="icon" />
					<h3>Comprehensive Solutions</h3>
				</div>
					<p>From the initial consultation to ongoing maintenance,
						we offer a full spectrum of services to meet all your
						ATM-related needs. Our goal is to be your one-stop
						solution for everything ATM.</p>

				<p>At {companyName}, we are committed to
					building long-lasting partnerships with our clients,
					helping them enhance their financial service offerings
					and improve customer satisfaction. Whether you're
					looking to purchase a new ATM, need technical support,
					or require maintenance services, we're here to assist
					you every step of the way.</p>

				<p>{useNavigation('contact us')} today to learn more about how we can support
					your business with our comprehensive ATM solutions.</p>
			</div>
		</>
	);
}
export default About;
