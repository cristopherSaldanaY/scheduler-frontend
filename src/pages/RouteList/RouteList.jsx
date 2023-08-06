import { useLocation } from "react-router-dom";
import RouteNavBar from "../../components/NavBar/RouteNavBar";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import s from "./style.module.css";

const RouteList = () => {
  const location = useLocation();
  const { username, organizationsNid } = location.state;

  return (
    <>
      <RouteNavBar organizationsNid={organizationsNid} />
      <div className={s.main_container}>
        <div className={s.main_container_item}>
          <div className={s.main}>
            <h5>Lista de rutas</h5>
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
                  <td><button className="btn btn-primary">Ver</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteList;
