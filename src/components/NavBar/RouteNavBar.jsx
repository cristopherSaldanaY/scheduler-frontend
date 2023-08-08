import Logo from "../../assets/images/miniLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const RouteNavBar = ({username}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginRoute = location.pathname === "/login";
  const isRouteList = location.pathname === "/routeList";
  const isRouteSet = location.pathname === "/routeSet";

  if (isLoginRoute) {
    return null;
  }

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-dark" style={{ background: "#252525" }}>
      <img
        src="https://i0.wp.com/www.routinguc.com/wp-content/uploads/2021/07/02a_Logotipo_Apaisado-Negativo_solo.png?fit=900%2C449&ssl=1"
        width={100}
        style={{ overflow: "inherit" }}
        alt=""
      />
      <Container>
        <Navbar.Collapse className="justify-content-end" style={{gap: "50px"}} >
          <Navbar.Text>
            <span style={{ color: "#FFFFFF" }}>
              Usuario: <a style={{ color: "rgb(215 215 215)", textDecoration: "none"  }} href="#login">{username}</a>
            </span>
          </Navbar.Text>
          <Button type="submit" variant="primary" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RouteNavBar;
