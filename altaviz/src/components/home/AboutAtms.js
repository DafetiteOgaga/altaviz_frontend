// import useFetch from "../../hooks/useFetch";
import about_image from "../home/about-atm-image.png";
import './Hero.css';

function AboutAtms() {
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);

	return (
		<>
			<div className="about-atm-box">
				<div>
					<img src={about_image} alt="about-image"
					style={{
						width: '150%',
					}}/>
				</div>
				<div className="about-atm">
					<p><strong>Banking:</strong> Enhance branch services with self-service
						solutions that offer a full range of banking transactions.</p>
					<p><strong>Retail:</strong> Provide convenient banking services to
						customers in retail environments, increasing foot traffic and
						customer satisfaction.</p>
					<p><strong>Public Spaces:</strong> Perfect for installation in airports,
						malls, and transit hubs, offering accessible banking services to
						the public.</p>
					<br></br>
					<p>The GRG H22V series stands out for its reliability, security, and flexibility.
						It is backed by GRG's extensive experience and expertise in the ATM industry,
						ensuring top-notch support and service. Whether you're looking to upgrade your
						current ATM fleet or expand your service offerings, the H22V series provides a
						robust solution that meets modern banking needs.</p>
					<p>Explore the GRG H22V ATM Series today and discover how it can enhance your
						business operations and customer experience. Contact us for more information
						and to discuss how the H22V series can be customized to fit your company specific needs.</p>
				</div>
			</div>
		</>
	);
}
export default AboutAtms;