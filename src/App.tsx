import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import NewApp from "./components/NewApp";
import JobList from "./components/JobList";
import Dashboard from "./components/Dashboard";
import AppHeader from "./components/AppHeader";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }, []);

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
