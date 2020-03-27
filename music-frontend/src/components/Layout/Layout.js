import React, {Fragment} from 'react';
import NavBar from "../UI/NavBar/NavBar";

const Layout = props => {
  return (
    <Fragment>
      <NavBar/>
      <main style={{ height: "calc(100vh - 69px)" }}>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
