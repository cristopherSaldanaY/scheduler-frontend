import React, { useEffect, useState, useMemo } from "react";
import s from "./style.module.css";
import Logo from "../../assets/images/miniLogo.png";
import { SchedulerAPI } from "../../api/scheduler";

const RouteNavBar = ({ organizationsNid }) => {
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async (organizationsNid) => {
    if (organizationsNid && organizationsNid.length > 0) {
      const organizationsResult = await Promise.all(
        organizationsNid.map(async (organizationId) => {
          const data = await SchedulerAPI.fetchOrganization(organizationId.nid);
          return data;
        })
      );

      setOrganizations(organizationsResult);
    }
  };

  useEffect(() => {
    fetchOrganizations(organizationsNid);
  }, []);

  const memoizedOrganizations = useMemo(() => organizations, [organizations]);

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <h4 className="navbar-brand" href="#">
          <img src={Logo} alt="" style={{ width: "50px", height: "50px" }} />
          RUTAS
        </h4>

        <div className={s.nav_organization}>
          <span>Organización</span>
          <select className="form-select">
            <option value=""></option>
            {memoizedOrganizations.map((org) => (
              <option key={org.nid} value={org.nid}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary">Logout</button>
      </div>
    </nav>
  );
};

export default RouteNavBar;
