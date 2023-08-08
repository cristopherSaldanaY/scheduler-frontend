import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SchedulerAPI } from "../../api/scheduler";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";


const RouteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username,organizationsNid } = location.state;

  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);

  // Función para manejar la navegación a la página de conjunto de rutas
  const handleRouteSet = () => {
    navigate("/routeSet", {
      state: {
        organizationsNid: selectedOrganization,
        organizations,
      },
    });
  };

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
  }, [organizationsNid]);

  const memoizedOrganizations = useMemo(() => organizations, [organizations]);

  return (
    <Container>
      <hr />
      <Row className="justify-content-md-start mt-5">
        <Col sm={8} md={10} xs={6}>
          <h2>Lista de rutas</h2>
        </Col>
        <Col sm={4} md={2} xs={6}>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            <option></option>
            {memoizedOrganizations.map((org) => (
              <option key={org.nid} value={org.nid}>
                {org.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col>
          {selectedOrganization === "" ? (
            <p>Seleccione una organización</p>
          ) : selectedOrganization != "266b88c0-ffdc-40fe-a5dd-71649256625c" ? (
            <p>No existen registro para esta organización</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Rutas</th>
                  <th>Fecha de creación</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Conjunto de rutas de prueba</td>
                  <td>1</td>
                  <td>07-08-2023 08:30</td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ width: "100%" }}
                      onClick={handleRouteSet}
                    >
                      VER
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RouteList;
