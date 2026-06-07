import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import CreateInterview from "./pages/CreateInterview";
import InterviewDetails from "./pages/InterviewDetails";
import Home from "./pages/Home";

import { ROUTES } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
  path={ROUTES.DASHBOARD}
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path={ROUTES.INTERVIEW}
  element={
    <ProtectedRoute>
      <Interview />
    </ProtectedRoute>
  }
/>
<Route
  path={ROUTES.CREATE_INTERVIEW}
  element={<CreateInterview />}
/>

<Route
  path="/interviews/:id"
  element={
    <ProtectedRoute>
      <InterviewDetails />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;