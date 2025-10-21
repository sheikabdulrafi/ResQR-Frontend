import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Footer from "./components/Footer";
import UserAuth from "./pages/UserAuth";
import HomePage from "./pages/HomePage";
import PersonalPage from "./pages/PersonalPage";
import GuardainsPage from "./pages/GuardainsPage";
import MedicalInfo from "./pages/MedicalInfo";
import EmergencyPage from "./pages/EmergencyPage";
import GrievancePage from "./pages/GrievancePage";
import QRPage from "./pages/QRPage";
import LoadingPage from "./pages/LoadingPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/personal-update" element={<PersonalPage />} />
        <Route path="/guardain-update" element={<GuardainsPage />} />
        <Route path="/medical-update" element={<MedicalInfo />} />
        <Route path="/emergency-info" element={<EmergencyPage />} />
        <Route path="/grrievance" element={<GrievancePage />} />
        <Route path="/manage-qr" element={<QRPage />} />
        <Route path="/logout" element={<LoadingPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App