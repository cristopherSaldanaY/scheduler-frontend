import { useState } from "react";
import { BsGeoAltFill } from "react-icons/bs";
import RouteModal from "../RouteModal/RouteModal";
import { SchedulerAPI } from "../../api/scheduler";
import Swal from "sweetalert2";
import { Pagination, Table, Button } from "react-bootstrap";

const RouteDetail = ({ routes, organizationsNid, fetchRoutes }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [routeId, setRouteID] = useState("");

  const timeConverter = (dateTime) => {
    const timeString = dateTime.split(", ")[1].slice(0, 5);
    return timeString;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page === "TODO" ? null : parseInt(page));
  };

  const handleAssign = (
    organizationNid,
    routeNid,
    routeName,
    routeTime,
    totalTime,
    routeStops,
    routeAction
  ) => {
    const newRoute = {
      routeName,
      routeTime,
      totalTime,
      routeStops,
      routeAction,
    };
    setCurrentRoute(newRoute);
    setRouteID(routeNid);
    fetchDrivers(organizationNid);
    fetchVehicles(organizationNid);
    setModalShow(true);
  };

  async function fetchDrivers(nid) {
    const driversResponse = await SchedulerAPI.fetchDriversByOrganization(nid);

    if (driversResponse.length > 0) {
      setDrivers(driversResponse);
    }
  }

  async function fetchVehicles(nid) {
    const vehiclesResponse = await SchedulerAPI.fetchVehiclesByOrganization(
      nid
    );
    if (vehiclesResponse.length > 0) {
      setVehicles(vehiclesResponse);
    }
  }

  async function updateRoute(routeId, driverId, vehicleId) {
    if (driverId === "" || vehicleId === "") {
      Swal.fire({
        icon: "info",
        text: "Ambos campos son requeridos",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }
    
    const result = await SchedulerAPI.updateRoute(routeId, driverId, vehicleId);

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Ruta actualizada",
      });
      fetchRoutes(organizationsNid);
      setModalShow(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Conflicto de horario",
        text: "Seleccione otro conductor o vehiculo!",
      });
    }
  }

  return (
    <>
      <div>
        <Pagination>
          <Pagination.Item className={currentPage ==  null ? "active" :  ""} onClick={() => handlePageChange("TODO")}>TODO</Pagination.Item>
          {routes.map((r, index) => (
            <Pagination.Item key={index} className={currentPage == index +1 ? "active" : "" } onClick={() => handlePageChange(index+1)}>{index + 1}</Pagination.Item>
          ))}
        </Pagination>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Hora</th>
            <th>Tiempo</th>
            <th>
              <BsGeoAltFill />
            </th>
            <th>Acción</th>
            <th>Asignación</th>
          </tr>
        </thead>
        <tbody>
          {currentPage === null
            ? routes.map((route, index) => (
                <tr key={route.nid}>
                  <td>{`Ruta ${index + 1}`}</td>
                  <td>{`${timeConverter(route.starts_at)} - ${timeConverter(
                    route.ends_at
                  )}`}</td>
                  <td>{route.travel_time}</td>
                  <td>{route.total_stops}</td>
                  <td>{route.action}</td>
                  <td>
                    {route.driver_id && route.vehicle_id ? (
                      <span>{`${route.driver.name} ${route.driver.lastname} / ${route.vehicle.plate}`}</span>
                    ) : (
                      <Button
                        variant="primary"
                        style={{ width: "100%" }}
                        onClick={() =>
                          handleAssign(
                            route.organization_id,
                            route.nid,
                            `Ruta ${index + 1}`,
                            `${timeConverter(
                              route.starts_at
                            )} - ${timeConverter(route.ends_at)}`,
                            route.travel_time,
                            route.total_stops,
                            route.action
                          )
                        }
                      >
                        Sin asignar
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            : routes.slice(currentPage - 1, currentPage).map((route, index) => (
                <tr key={route.nid}>
                  <td>{`Ruta ${currentPage}`}</td>
                  <td>{`${timeConverter(route.starts_at)} - ${timeConverter(
                    route.ends_at
                  )}`}</td>
                  <td>{route.travel_time}</td>
                  <td>{route.total_stops}</td>
                  <td>{route.action}</td>
                  <td>
                    {route.driver_id && route.vehicle_id ? (
                      <span>{`${route.driver.name} ${route.driver.lastname} / ${route.vehicle.plate}`}</span>
                    ) : (
                      <Button
                        variant="primary"
                        style={{ width: "100%" }}
                        onClick={() =>
                          handleAssign(
                            route.organization_id,
                            route.nid,
                            `Ruta ${index + 1}`,
                            `${timeConverter(
                              route.starts_at
                            )} - ${timeConverter(route.ends_at)}`,
                            route.travel_time,
                            route.total_stops,
                            route.action
                          )
                        }
                      >
                        Sin asignar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <RouteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        vehicles={vehicles}
        drivers={drivers}
        updateRoute={updateRoute}
        currentRoute={currentRoute}
        routeId={routeId}
      />
    </>
  );
};

export default RouteDetail;
