import React from "react";
import { apiURL, noImage } from "../../constants";
import ShowTo from '../../hoc/ShowTo';
import "./Artist.css";


const Artist = props => {
  const path = apiURL + "/uploads/" + props.image;
   return (
    <ShowTo published={props.published} token={props.token} role='admin' >
      <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-3">
        <div onClick={props.click} className="Card">
          <div className="d-flex justify-content-center">
            <img
              src={props.image ? path : noImage}
              className="card-img-top rounded-circle"
              alt={props.title}
              style={{ width: "200px" }}
            />
          </div>
          <div className="Card-body">
            <h6
              className="card-title text-center m-0 Title"
              onClick={props.fullNews}
              style={{ cursor: "pointer", color: "#222" }}
            >
              {props.name}
              <small className="text-muted d-block mt-1">стиль</small>
            </h6>
            {!props.published && <span className="Badge">Неопубликовано</span>}
          </div>
        </div>
      </div>
    </ShowTo>
  );
};

export default Artist;
