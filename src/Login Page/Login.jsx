import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [formData, setFormData] = useState({
    loginID: "", // ✅ changed from LoginID to loginID
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.text();
      alert("Response from backend: " + data);

      if (res.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="parent-of-login">
      <div
        className="form-container"
        data-aos="zoom-in"
        data-aos-duration="9000"
      >
        <h2 className="font-bold text-lg">Admin Login!</h2>
        <form onSubmit={handleSubmit}>
          <div
            className="input-group"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <label>User ID:</label>
            <input
              type="text"
              name="loginID" // ✅ changed from LoginID to loginID
              placeholder="Enter your ID"
              value={formData.loginID} // ✅ changed
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="input-group"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div id="lastbutton" data-aos="fade-up" data-aos-duration="1000">
            <button type="submit" style={{ marginTop: "20px" }}>
              Login Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
