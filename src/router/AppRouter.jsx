import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import RouteList from "../pages/RouteList/RouteList";
import RouteSet from "../pages/RouteSet/RouteSet";

const  AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/routeList" element={<RouteList />} />
      <Route path="/routeSet" element={<RouteSet />} />
    </Routes>
  );
};

export default AppRouter

