import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SchedulerAPI } from "../../api/scheduler";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import RouteDetail from "../../components/RouteDetail/RouteDetail";
import MapImage from "../../assets/images/mapa.png";

const RouteSet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationsNid, organizations } = location.state;
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

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

      console.log("Rutas cargadas");
      setLoading(false);
      setRoutes(responseUpdated);
    } catch (error) {
      console.log("Error al obtener rutas", error);
    }
  }

  const handleBack = () => {
    navigate("/routeList", {
      state: {
        organizationsNid: organizations,
      },
    });
  };

  useEffect(() => {
    fetchRoutes(organizationsNid);
  }, [organizationsNid]);

  return (
    <Container>
      <hr />
      <Row className="justify-content-md-start mt-5">
        <Col sm={2} md={2} xs={2}>
          <Button
            variant="primary"
            style={{ marginTop: "4px" }}
            onClick={handleBack}
          >
            Atrás
          </Button>
        </Col>
        <Col sm={10} md={10} xs={10}>
          <h2>Conjunto de rutas</h2>
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col
          lg={7}
          style={
            loading
              ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {}
          }
        >
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <RouteDetail
              routes={routes}
              fetchRoutes={fetchRoutes}
              organizationsNid={organizationsNid}
            />
          )}
        </Col>
        <Col lg={5}>
          <img
            src={MapImage}
            alt=""
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <span></span>
        </Col>
      </Row>
    </Container>
  );
};

export default RouteSet;
