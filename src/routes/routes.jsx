import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignUpPage"; 
import HomePage from "../pages/HomePage";
import DailyChallenge from "../pages/DailyChallengePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/daily" element={<DailyChallenge />} />
      </Routes>
    </BrowserRouter>
  );
}
