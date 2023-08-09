import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table, Form } from "react-bootstrap";
import s from "./style.module.css";
import { BsGeoAltFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const RouteModal = (props) => {
  const {
    vehicles,
    drivers,
    updateRoute,
    currentRoute,
    show,
    onHide,
    routeId,
  } = props;


  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() =>{
    setSelectedDriver("")
    setSelectedVehicle("")
  },[show])

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{overflow: "hidden"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Asignación de ruta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{overflow: "auto"}}>
        <Table className="table" variant="light">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Hora</th>
              <th>Tiempo</th>
              <th>
                <BsGeoAltFill />
              </th>
              <th>acción</th>
              <th>Conductor</th>
              <th>Vehiculo</th>
            </tr>
          </thead>
          <tbody>
            {currentRoute ? (
              <tr className={s.align_item}>
                <td>{currentRoute.routeName}</td>
                <td>{currentRoute.routeTime}</td>
                <td>{currentRoute.totalTime}</td>
                <td>{currentRoute.routeStops}</td>
                <td>{currentRoute.routeAction}</td>

                <td>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                  >
                    <option value={null} disabled></option>
                    {drivers.map((driver) => (
                      <option key={driver.nid} value={driver.nid}>
                        {driver.name} {driver.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    <option value={null} disabled></option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.nid} value={vehicle.nid}>
                        {vehicle.plate}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            ) : (
              <tr className={s.align_item}>
                <td>Route X</td>
                <td>11:00 - 13:30</td>
                <td>2H 30M</td>
                <td>2</td>
                <td>Llegada</td>

                <td>
                  {" "}
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                  >
                    <option value={null}></option>
                    {drivers.map((driver) => (
                      <option key={driver.nid} value={driver.nid}>
                        {driver.name} {driver.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    <option value={null}></option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.nid} value={vehicle.nid}>
                        {vehicle.plate}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <div className={s.modal_footer}>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              {
                if(!selectedDriver || !selectedVehicle){

                }

                updateRoute(routeId, selectedDriver, selectedVehicle)
              }
            }
          >
            Actualizar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RouteModal;
