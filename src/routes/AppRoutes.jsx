import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Internships from "../pages/Internships";
import Jobs from "../pages/Jobs";
import ColdEmails from "../pages/ColdEmails";
import Resume from "../pages/Resume";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/emails" element={<ColdEmails />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}
