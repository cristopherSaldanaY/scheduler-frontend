import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./style.module.css";
import Logo from "../../assets/images/routing-logo.png";
import { SchedulerAPI } from "../../api/scheduler";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await SchedulerAPI.login(username, password);

      const organizationsNid = response.organizations;

      navigate("/routeList", {
        state: {
          username,
          organizationsNid,
        },
        replace: true
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
      });
    }
  };

  return (
    <div className={s.main_container}>
      <div className="container">
        <div className={s.main_logo}>
          <img src={Logo} className={s.logo_img} alt="Logo" />
        </div>
        <div className="row">
          <div className="col">
            <div className={s.main_form}>
              <div className={s.form_header}>
                <h1>¡Te damos la bienvenida!</h1>
                <p>Por favor, ingresa tus datos.</p>
              </div>
              <div className={s.form_input}>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ej: password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
