import { useState } from "react";
import { loginUser } from "../services/api/authApi";
import AuthLayout from "../components/layout/AuthLayout";

function Login() {
  const [formData, setFormData] = useState({
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
    const data = await loginUser(
      formData
    );

    console.log(data);

    localStorage.setItem(
      "token",
      data.token
    );

    alert("Login successful!");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;