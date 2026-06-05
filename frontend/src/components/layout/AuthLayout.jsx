function AuthLayout({ title, children }) {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default AuthLayout;