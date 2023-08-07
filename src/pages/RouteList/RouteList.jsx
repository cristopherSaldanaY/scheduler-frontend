import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteNavBar from "../../components/NavBar/RouteNavBar";
import { SchedulerAPI } from "../../api/scheduler";

import s from "./style.module.css";

const RouteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationsNid } = location.state;

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);

  // Función para manejar la navegación a la página de conjunto de rutas
  const handleRouteSet = () => {

    navigate("/routeSet", {
      state: {
        organizationsNid: selectedOrganization,
        organizations
      },
    });
  };


  const fetchOrganizations = async (organizationsNid) => {
    if (organizationsNid && organizationsNid.length > 0) {
      const organizationsResult = await Promise.all(
        organizationsNid.map(async (organizationId) => {
          const data = await SchedulerAPI.fetchOrganization(
            organizationId.nid
          );
          return data;
        })
      );

      setOrganizations(organizationsResult);
    }
  };



  useEffect(() => {
    fetchOrganizations(organizationsNid);
  }, [organizationsNid]);

  const memoizedOrganizations = useMemo(() => organizations, [organizations]);

  return (
    <>
      {/* <RouteNavBar organizationsNid={organizationsNid} /> */}
      <div className={s.main_container}>
        <div className={s.main_container_item}>
          <div className={s.main}>
            <div className={s.table_header}>
              <h5>Lista de rutas</h5>
              <div className={s.nav_organization}>
                <span>Organización</span>
                <select
                  className="form-select"
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                >
                  <option value=""></option>
                  {memoizedOrganizations.map((org) => (
                    <option key={org.nid} value={org.nid}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {
              selectedOrganization === ""
              ? <p>Seleccione una organización</p>
              : selectedOrganization != "266b88c0-ffdc-40fe-a5dd-71649256625c"
              ? <p>No existen registros</p>
              :(
                <table className="table">
                <thead className={s.tables}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rutas</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Conjunto de rutas 07/08/2023</td>
                    <td>1</td>
                    <td>07-08-2023 08:00</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={handleRouteSet}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              )
            }
            

          </div>
        </div>
      </div>
    </>
  );
};

export default RouteList;
