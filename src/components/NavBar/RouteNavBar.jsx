import Logo from "../../assets/images/miniLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const RouteNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginRoute = location.pathname === "/login";
  const isRouteList = location.pathname === "/routeList";
  const isRouteSet = location.pathname === "/routeSet"

  if (isLoginRoute) {
    return null;
  }

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand disabled><img src={Logo} alt="" style={{ width: "50px", height: "50px" }} />Routing</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={isRouteList ? "active disabled": ""}>lista de rutas</Nav.Link>
            <Nav.Link href="#action2" disabled className={isRouteSet ? "active": ""}>conjunto de rutas</Nav.Link>
          </Nav>
          <Form className="d-flex">

            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RouteNavBar;
