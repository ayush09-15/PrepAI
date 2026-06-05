import AuthLayout from "../components/layout/AuthLayout";

function Register() {
  return (
    <AuthLayout title="Register">
      <form>
        <input
          type="text"
          placeholder="Name"
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
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