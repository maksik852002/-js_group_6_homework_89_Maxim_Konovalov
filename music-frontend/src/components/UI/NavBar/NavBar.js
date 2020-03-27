import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from '../../../store/actions/usersActions';
import AnonymousMenu from "./AnonymousMenu";
import UserMenu from "./UserMenu";
// import Button from "../Button/Button";
import './NavBar.css';


class NavBar extends Component {
  state = {
    isClicked: false,
    userClicked: false
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  userDropMenuHandler = () => {
    this.setState({ userClicked: !this.state.userClicked });
  }

  handleClose = () => {
    this.setState({ clicked: false });
  };

  render = () => {
    let show = "collapse navbar-collapse justify-content-center";
    this.state.clicked && (show += " d-block");
    const {user, logoutUser} = this.props;
    return (
      <header className="w-100 border-bottom">
        <nav className="navbar navbar-expand-sm navbar-light py-0" style={{backgroundColor: '#white'}}>
          <div className="container">
            <NavLink className="navbar-brand" to="/artists">
              <img
                src="https://cache-mskm902.cdn.yandex.net/download.cdn.yandex.net/from/yandex.ru/support/ru/music/files/logo_main.png"
                alt="logo"
                width= '213px'
                height='58px'
              />
            </NavLink>
            {/* <Button
              label={<span className="navbar-toggler-icon"></span>}
              type="button"
              addClass="navbar-toggler"
              click={this.handleClick}
            /> */}
            <div className={show}>
              <ul onClick={this.handleClose} className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/artists">
                    Исполнители
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/albums">
                    Альбомы
                  </NavLink>
                </li>
              
              </ul>
            </div>
            {!user ? (
                 <AnonymousMenu/>
               ) : (
                <UserMenu user={user} click={this.userDropMenuHandler} clicked={this.state.userClicked} logout={logoutUser}/>
               )}
          </div>
        </nav>
      </header>
    );
  };
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);