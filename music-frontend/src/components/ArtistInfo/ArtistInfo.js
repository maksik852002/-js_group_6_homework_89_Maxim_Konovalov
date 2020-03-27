import React from "react";

const ArtistInfo = props => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <p className="lead">{props.info}</p>
      </div>
    </div>
  );
};

export default ArtistInfo;
