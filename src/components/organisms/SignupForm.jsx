import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../lib/helpers/utils";
import { validatePassword, validateString,toCamelCase,} from "../../lib/helpers/validation";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const valid =
      Object.entries(formData).every(([key, value]) => {
        if (key.includes("password")) return true;
        return validateString(value);
      }) && validatePassword(formData.password);

    if (!valid) {
      setError("All fields must be valid. Password must be strong.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {};
    for (const [key, value] of Object.entries(formData)) {
      payload[toCamelCase(key)] = value;
    }

    try {
      const res = await fetch(`${config.address}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        navigate("/");
      } else if (res.status === 409) {
        const data = await res.json();
        if (data.message.includes("email")) {
          setError("Email already exists.");
        } else {
          setError("Username already exists.");
        }
      } else {
        const data = await res.json();
        sessionStorage.setItem("httpStatus", res.status);
        sessionStorage.setItem("customMessage", data.message);
        navigate("/error");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-lg shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </form>
  );
}
