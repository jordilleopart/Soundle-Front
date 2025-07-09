import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../lib/helpers/utils.js";


export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    //console.log(`Field changed: ${e.target.name}, Value: ${e.target.value}`);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const res = await fetch(`${config.address}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);

      if (res.status === 200) {
        const token = res.headers.get("Authorization").split(" ")[1];
        console.log("Login successful, token received:", token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", formData.username);
        
        // Redirect to home page
        navigate("/home");

      } else if (res.status === 401) {
        console.log("Invalid username or password.");
        setError("Invalid username or password.");
      } else {
        const data = await res.json();
        console.log("Error response data:", data);
        sessionStorage.setItem("httpStatus", res.status);
        sessionStorage.setItem("customMessage", data.message);
        navigate("/error");
      }
    } catch (err) {
      console.error("Server error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium text-center">
          {error}
        </div>
      )}

      <div className="text-sm text-blue-600 hover:underline text-right">
        <a href="#">Forgot password?</a>
      </div>

      <button type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
        Login
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up now
        </a>
      </p>
    </form>
  );
}
