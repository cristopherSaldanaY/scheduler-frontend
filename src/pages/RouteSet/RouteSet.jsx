import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SchedulerAPI } from "../../api/scheduler";
import s from "./style.module.css";
import { useNavigate } from "react-router-dom";
import RouteDetail from "../../components/RouteDetail/RouteDetail";
import MapImage  from "../../assets/images/mapa.png"

const RouteSet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationsNid, organizations } = location.state;
  const [routes, setRoutes] = useState([]);

  async function fetchRoutes(selectedOrganization) {
    try {
      const response = await SchedulerAPI.fetchRoutesByOrganization(
        selectedOrganization
      );

      const responseUpdated = await Promise.all(
        response.map(async (route) => {
          let driverName = null;
          let vehiclePlate = null;

          if (route.driver_id) {
            driverName = await SchedulerAPI.fetchDriverById(route.driver_id);
          }

          if (route.vehicle_id) {
            vehiclePlate = await SchedulerAPI.fetchVehicleById(
              route.vehicle_id
            );
          }

          return {
            ...route,
            driver: driverName,
            vehicle: vehiclePlate,
          };
        })
      );

      if (responseUpdated.length > 0) {
        setRoutes(responseUpdated);
        console.log("Rutas actualizadas:", responseUpdated);
      }
    } catch (error) {
      console.log("Error al obtener rutas", error);
    }
  }

  async function updateRoutes(routes) {
    const routesUpdated = routes.map(async (route) => {
      const driverName = await SchedulerAPI.fetchDriverById(route.driver_id);
      const vehiclePlate = await SchedulerAPI.fetchVehicleById(
        route.vehicle_id
      );

      const { name } = driverName;
      const { plate } = vehiclePlate;

      return {
        ...route,
        driver_name: name,
        vehicle_plate: plate,
      };
    });
    setRoutes(routesUpdated);
  }

  const handleBack = () =>{

    navigate("/routeList", {
      state: {
        organizationsNid: organizations,
      },
    });
  }

  useEffect(() => {
    fetchRoutes(organizationsNid);
  }, [organizationsNid]);

  return (
    <>
      <div className={s.main_container}>
        <div className="row">
          <div
            className="col"
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className={s.main_routes}>
              <div className={s.main_header}>
                <div className={s.btn_back}>
                  <button className="btn btn-primary" onClick={handleBack}>Atras</button>
                  <h5 style={{ marginBottom: "0px" }}>Conjunto de rutas</h5>
                </div>

                <div className={s.header_btn}>
                  <button className="btn btn-secondary">Editar</button>
                  <button className="btn btn-primary">
                    Enviar a conductores
                  </button>
                </div>
              </div>
              <RouteDetail routes={routes} fetchRoutes={fetchRoutes} organizationsNid={organizationsNid} />
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <img src={MapImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteSet;
