import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Monitor from "./components/monitor/monitor";
import AboutUs from "./components/aboutus/about"; 
import Sidebar from "./components/sidebar/sidebar"; // ➡️ import Sidebar
import FAQ from "./components/faq/faq"; // Import FAQ

export const AuthContext = createContext();

function AppWrapper() {
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/", "/signup"]; // ➡️ Pages where Sidebar should be hidden

  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideSidebar && <Sidebar />} 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} /> {/* Add the FAQ route */}
      </Routes>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <AppWrapper />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
