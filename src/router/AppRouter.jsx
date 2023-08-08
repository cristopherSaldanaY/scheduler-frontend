import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import RouteList from "../pages/RouteList/RouteList";
import RouteSet from "../pages/RouteSet/RouteSet";
import RouteNavBar from "../components/NavBar/RouteNavBar";
import { useState } from "react";

const AppRouter = () => {
  const [loggedUsername, setLoggedUsername] = useState("")
  
  return (
    <>
      <RouteNavBar username={loggedUsername} />
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login setLoggedUsername={setLoggedUsername}/>} />
        <Route path="/routeList" element={<RouteList />} />
        <Route path="/routeSet" element={<RouteSet />} />
      </Routes>
    </>
  );
};

export default AppRouter;
