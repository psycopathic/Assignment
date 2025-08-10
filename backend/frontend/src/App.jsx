import React from "react";
import ShortenerForm from "./pages/ShortenForm";
import AdminPage from "./pages/AdminPage"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div >
        <Header />
        <div className="bg-gray-200">
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
      </div>
    </>
  );
}

export default App;
