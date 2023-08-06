import React from "react";
import s from "./style.module.css"
import { BsGeoAltFill } from "react-icons/bs";

const RouteDetail = ({routes}) => {
  console.log(routes)
  return (
    <table className="table">
      <thead className={s.tables}>
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
        <tr>
          <th>Ruta 1</th>
          <td>09:00 - 11:30</td>
          <td>2H 10M</td>
          <td>3</td>
          <td>Llegada</td>
          <td>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Walter Puerto / KRBT75
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">Walter Puerto</p>
                </li>
                <li>
                  <p className="dropdown-item">KRBT75</p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        <tr>
          <th>Ruta 2</th>
          <td>09:00 - 10:10</td>
          <td>1H 30M</td>
          <td>2</td>
          <td>Llegada</td>
          <td>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sin asignar
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">Sin asignar</p>
                </li>
                <li>
                  <p className="dropdown-item">Sin asignar</p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RouteDetail;
