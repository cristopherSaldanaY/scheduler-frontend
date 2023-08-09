import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./style.module.css";
import Logo from "../../assets/images/routing-logo.png";
import { SchedulerAPI } from "../../api/scheduler";
import Swal from "sweetalert2";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ setLoggedUsername }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await SchedulerAPI.login(username, password);
      const organizationsNid = response.organizations;
      setLoggedUsername(username);

      navigate("/routeList", {
        state: { organizationsNid },
        replace: true,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = "Credenciales incorrectas";
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: errorMessage,
        confirmButtonColor: "#0d6efd",
      });
    }
  };

  return (
    <div className={s.main_login}>
      <Container>
        <Row style={{ padding: "20px", height: "100%", alignItems: "center" }}>
          <Col xs={10} sm={8} md={6} lg={5} style={{ margin: "0 auto" }}>
            <Image src={Logo} fluid />
            <div className={s.form_header}>
              <h1>Te damos la bienvenida</h1>
              <span>Por favor ingrese sus credenciales</span>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ width: "100%" }}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
