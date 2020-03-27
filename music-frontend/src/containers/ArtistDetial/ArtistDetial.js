import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchArtist, fetchArtistAlbums, fetchArtistTracks, deleteArtistTrack, publishArtistTrack, deleteArtist, publishArtist } from "../../store/actions/artistsActions";
import { addTrackToHistory } from "../../store/actions/trackHistoryActions";
import { addToFavorite } from "../../store/actions/usersActions";
import { apiURL, noImage } from "../../constants";
import ArtistInfo from "../../components/ArtistInfo/ArtistInfo";
import Album from "../../components/Album/Album";
import Track from "../../components/Track/Track";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import './ArtistDetial.css';
import ShowToAdmin from "../../hoc/ShowToAdmin";
import { AiOutlineDelete  } from "react-icons/ai";
import { MdPublish } from "react-icons/md";

class ArtistDetial extends Component {
  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
    this.props.fetchArtistAlbums(this.props.match.params.id);
    this.props.fetchArtistTracks(this.props.match.params.id);
  }

  albumDetailOpenHandler = id => {
    this.props.history.push(`/albums/${id}`);
  };

  render() {
    const { artist, albums, tracks, loading, error, deleteArtist, deleteArtistTrack, publishArtistTrack, publishArtist } = this.props;
    const path = apiURL + "/uploads/" + artist.image;
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
                        src={artist.image ? path : noImage}
                        alt={"text"}
                        className="rounded-circle w-100"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-md-8">
                    <small className="text-muted d-block mt-1">ИСПОЛНИТЕЛЬ</small>
                    <h1 style={{letterSpacing: "2px", fontWeight: "900"}}>{artist.name}</h1>
                    {!artist.published && <span className="Badge">Неопубликовано</span>}
                    
                      <div className='d-flex pt-3' >
                        <ShowToAdmin published={artist.published} role="admin">
                        <div className='publish mr-3'>
                          <Button click={() => publishArtist(this.props.match.params.id)} label={<span className='align-middle'><MdPublish size='18px'/> Опубликовать</span>}/>
                        </div>
                        </ShowToAdmin>
                        <ShowToAdmin role="admin">
                          <div className='remove'>
                            <Button click={() => deleteArtist(this.props.match.params.id)} label={<span className='align-middle'><AiOutlineDelete  size='18px'/> Удалить</span>}/>
                          </div>
                        </ShowToAdmin>
                      </div>
                      {error && <div className="alert alert-danger d-block w-50 text-center mt-4" role="alert">
                        {error.message}
                      </div>}
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <ul style={{listStyle: "none"}} className='List d-flex m-0'>
                      <li className="nav-item"> 
                        <NavLink className="Nav-link" to={`/artists/${artist._id}/info`}>Информация</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="Nav-link" to={`/artists/${artist._id}/albums`}>Альбомы</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="Nav-link" to={`/artists/${artist._id}/tracks`}>Треки</NavLink>
                      </li>
                    </ul>
                  </div>
                  <hr className='mt-0'/>
                  <div className="d-flex flex-wrap justify-content-center">
                    <Route
                      path={this.props.match.path + "/info"}
                      render={() => (
                          <ArtistInfo
                            info={artist.info}
                          />
                      )}
                    />
                    <Route
                      path={this.props.match.path + "/albums"}
                      render={() => albums.map(el => (
                        <Album
                          key={el._id}
                          name={el.name}
                          image={el.image}
                          year={el.year}
                          artistName={el.artist.name}
                          token={el.user.token}
                          published={el.published}
                          click={() => this.albumDetailOpenHandler(el._id)}
                        />
                      ))}
                    />
                    <Route
                      path={this.props.match.path + "/tracks"}
                      render={() => (
                        <div className="w-100">
                          <div className="row p-2" style={{color: '#777', fontSize: '13px'}}>
                            <div className='col-1 d-flex justify-content-center justify-content-sm-start'>#</div>
                            <div className='col-5'>Название трека</div>
                            <div className='col-4'>Альбом</div>
                          </div>
                            {tracks.map((el, i) => (
                              <Track
                                key={el._id}
                                id = {el._id}
                                sn={i+1}
                                name={el.name}
                                album={el.album}
                                duration={el.duration}
                                token={el.user.token}
                                published={el.published}
                                toHistory = {() => this.props.addTrackToHistory(el._id)}
                                toFavorite = {() => this.props.addToFavorite(el._id)}
                                delete = {() => deleteArtistTrack(el._id, this.props.match.params.id)}
                                publish = {() => publishArtistTrack(el._id, this.props.match.params.id)}
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
    artist: state.artists.artist,
    albums: state.artists.albums,
    tracks: state.artists.tracks,
    loading: state.artists.loading,
    error: state.artists.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArtist: id => dispatch(fetchArtist(id)),
    deleteArtist: id => dispatch(deleteArtist(id)),
    fetchArtistAlbums: id => dispatch(fetchArtistAlbums(id)),
    fetchArtistTracks: id => dispatch(fetchArtistTracks(id)),
    deleteArtistTrack: (trackId, artistId) => dispatch(deleteArtistTrack(trackId, artistId)),
    publishArtistTrack: (trackId, artistId) => dispatch(publishArtistTrack(trackId, artistId)),
    addTrackToHistory: track => dispatch(addTrackToHistory(track)),
    addToFavorite: track => dispatch(addToFavorite(track)),
    publishArtist: id => dispatch(publishArtist(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetial);
