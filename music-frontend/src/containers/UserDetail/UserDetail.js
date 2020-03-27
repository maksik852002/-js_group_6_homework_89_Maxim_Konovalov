import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchUser, addToFavorite } from "../../store/actions/usersActions"
import { fetchTrackHistory, addTrackToHistory } from "../../store/actions/trackHistoryActions";
import Track from "../../components/Track/Track";
import Spinner from "../../components/UI/Spinner/Spinner";
import { noImage } from "../../constants";
import './UserDetail.css';

class UserDetail extends Component {
  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchTrackHistory()
  }

  render() {
    const { user, trackHistory, loading } = this.props;
    return (
      <div className="d-flex flex-wrap pt-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              <div className='d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                  <div className="col-6 col-md-4">
                    <div className="d-flex rounded-circle m-auto" style={{width: '200px', height: "200px", background: "#e5e5e5"}}>
                      <img
                        src={noImage}
                        alt={"text"}
                        className="rounded-circle w-100"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-md-8">
                    <small className="text-muted d-block mt-1">ПОЛЬЗОВАТЕЛЬ</small>
                    <h1 style={{letterSpacing: "2px", fontWeight: "900"}}>{user&&user.username}</h1>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <ul style={{listStyle: "none"}} className='List d-flex m-0'>
                      <li className="nav-item">
                        <NavLink className="Nav-link" to={`/users/${user._id}/history`}>История треков</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="Nav-link" to={`/users/${user._id}/tracks`}>Мои треки</NavLink>
                      </li>
                    </ul>
                  </div>
                  <hr className='mt-0'/>
                  <div className="d-flex flex-wrap">
                    <Route
                      path={this.props.match.path + "/history"}
                      render={() => (
                        <div className="w-100">
                          <div className="row p-2" style={{color: '#777', fontSize: '13px'}}>
                            <div className='col-1 d-flex justify-content-center justify-content-sm-start'>#</div>
                            <div className='col-5'>Название трека</div>
                            <div className='col-4'>Исполнитель</div>
                            <div className='col-2'>Дата прослушивания</div>
                          </div>
                            {trackHistory&&trackHistory.map((el, i) => (
                              <Track
                                key={el._id}
                                id = {el.track._id}
                                sn={i+1}
                                name={el.track.name}
                                date={el.datetime}
                                artist={el.artist}
                                token={el.user.token}
                                published={el.track.published}
                                toHistory = {() => this.props.addTrackToHistory(el.track._id)}
                                toFavorite = {() => this.props.addToFavorite(el.track._id)}
                              />
                            ))}
                        </div>
                      )}
                    />
                    <Route
                      path={this.props.match.path + "/tracks"}
                      render={() => (
                        <div className="w-100">
                          <div className="row p-2" style={{color: '#777', fontSize: '13px'}}>
                            <div className='col-1 d-flex justify-content-center justify-content-sm-start'>#</div>
                            <div className='col-5'>Название трека</div>
                            <div className='col-4'>Альбом</div>
                            <div className='col-2'></div>
                          </div>
                            {user&&user.tracks.map((el, i) => (
                              <Track
                                key={el.id}
                                id = {el.id}
                                sn={i+1}
                                name={el.name}
                                duration={el.duration}
                                album={el.album}
                                token={user.token}
                                published={el.published}
                                toHistory = {() => this.props.addTrackToHistory(el.id)}
                                toFavorite = {() => this.props.addToFavorite(el.id)}
                              />
                            ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    loading: state.users.loading,
    trackHistory: state.history.history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchTrackHistory: () => dispatch(fetchTrackHistory()),
    addTrackToHistory: track => dispatch(addTrackToHistory(track)),
    addToFavorite: track => dispatch(addToFavorite(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
