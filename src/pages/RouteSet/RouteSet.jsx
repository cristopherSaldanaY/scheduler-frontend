import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SchedulerAPI } from "../../api/scheduler";
import s from "./style.module.css";
import { BsGeoAltFill } from "react-icons/bs";
import ArrowBack from "../../assets/icons/arrow-back.png";
import RouteDetail from '../../components/RouteDetail/RouteDetail'

const RouteSet = () => {
  const location = useLocation();
  const { username, organizationId } = location.state;
  const [routes, setRoutes] = useState([]);

  async function fetchRoutes(organizationId) {
    try {
      const response = await SchedulerAPI.fetchRoutesByOrganization(
        organizationId
      );

      if (response.length > 0) {
        setRoutes(response);
        console.log("Rutas actualizadas:", response);
      }
    } catch (error) {
      console.log("Error al obtener rutas", error);
    }
  }

  useEffect(() => {
    fetchRoutes(organizationId);
  }, [organizationId]);

  return (
    <>
      <div className={s.main_container}>
        <div className="row">
          <div className="col">
            <p>Lista de rutas</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className={s.main_header}>
              <div className={s.btn_back}>
                <img src={ArrowBack} className={s.arrow_back} />
                <span>Conjunto de rutas</span>
              </div>

              <div className={s.header_btn}>
                <button className="btn btn-secondary">Editar</button>
                <button className="btn btn-primary">
                  Enviar a conductores
                </button>
              </div>
            </div>

            <div className={s.items}>
              <ul className="pagination">
                <li className="page-item active">
                  <a className="page-link" href="#">
                    Todo
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
              </ul>
            </div>
            <RouteDetail routes={routes}/>
          </div>

          <div className="col-sm-12 col-md-6"></div>
        </div>
      </div>
    </>
  );
}

export default RouteSet
