import React, { useState } from "react";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/send-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setResponseMessage("Email sent successfully!");
      } else {
        setResponseMessage(`Failed to send email: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="recipient"
        placeholder="Recipient Email"
        value={formData.recipient}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Email"}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default EmailForm;
