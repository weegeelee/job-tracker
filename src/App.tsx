import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import NewApp from "./components/NewApp";
import JobList from "./components/JobList";
import Dashboard from "./components/Dashboard";
import AppHeader from "./components/AppHeader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import api from "./api";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }
    const fetchIsAuth = async () => {
      try {
        await api.get("/auth/status");
        setIsAuth(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }
    fetchIsAuth();
  }, []);

  if (loading) {
    return <p>is loading...</p>;
  }

  return (
    <HashRouter>
      <AppHeader isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<JobList />} />
        <Route path="/application" element={<NewApp />} />
        <Route path="/edit/:id" element={<NewApp isEditing={true} />} />
        <Route path="/analyse" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );

}

export default App;
