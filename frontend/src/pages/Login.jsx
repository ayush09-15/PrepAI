import AuthLayout from "../components/layout/AuthLayout";

function Login() {
  return (
    <AuthLayout title="Login">
      <form>
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
          Login
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;