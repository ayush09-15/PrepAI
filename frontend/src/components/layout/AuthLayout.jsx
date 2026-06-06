import "./AuthLayout.css";

function AuthLayout({
  title,
  children,
}) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          AI Interview Prep
        </h1>

        <p className="auth-subtitle">
          Practice smarter with
          AI-powered interviews
        </p>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;