import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Movie from "./pages/Movie";
import Person from "./pages/Person";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/person/:id" element={<Person />} />
      </Routes>
      <Footer />
    </Router>
  );
}
