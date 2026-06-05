import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import { registerUser } from "../services/api/authApi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await registerUser(
      formData
    );

    console.log(data);

    alert(
      "Registration successful!"
    );

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Registration failed"
    );
  }
};

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;