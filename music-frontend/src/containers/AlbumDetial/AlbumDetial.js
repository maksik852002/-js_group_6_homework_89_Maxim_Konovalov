import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAlbum, fetchAlbumTracks, deleteAlbumTrack, publishAlbumTrack, deleteAlbum, publishAlbum } from "../../store/actions/albumsActions";
import { addTrackToHistory } from "../../store/actions/trackHistoryActions";
import { addToFavorite } from "../../store/actions/usersActions";
import { apiURL, noImage } from "../../constants";
import Track from "../../components/Track/Track";
import Spinner from "../../components/UI/Spinner/Spinner";
import './AlbumDetial.css';
import Button from "../../components/UI/Button/Button";
import ShowToAdmin from "../../hoc/ShowToAdmin";
import { AiOutlineDelete  } from "react-icons/ai";
import { MdPublish } from "react-icons/md";

class ArtistDetial extends Component {
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id);
    this.props.fetchAlbumTracks(this.props.match.params.id);
  }

  render() {
    const { album, tracks, loading, deleteAlbum, publishAlbum, deleteAlbumTrack, publishAlbumTrack, error } = this.props;
    const path = apiURL + "/uploads/" + album.image;
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
                        src={album.image ? path : noImage}
                        alt={"text"}
                        className="w-100"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-md-8">
                    <small className="text-muted d-block mt-1">АЛЬБОМ</small>
                    <h1 style={{letterSpacing: "2px", fontWeight: "900"}}>{album.name}</h1>
                    {!album.published && <span className="Badge">Неопубликовано</span>}
                    <div className='d-flex pt-3' >
                      <ShowToAdmin published={album.published} role="admin">
                          <div className='publish mr-3'>
                            <Button click={() => publishAlbum(this.props.match.params.id)} label={<span className='align-middle'><MdPublish size='18px'/> Опубликовать</span>}/>
                          </div>
                        </ShowToAdmin>
                        <ShowToAdmin role="admin">
                          <div className='remove'>
                            <Button click={() => deleteAlbum(this.props.match.params.id)} label={<span className='align-middle'><AiOutlineDelete  size='18px'/> Удалить</span>}/>
                          </div>
                        </ShowToAdmin>
                      </div>
                      {error && <div className="alert alert-danger d-block w-50 text-center mt-4" role="alert">
                        {error.message}
                      </div>}
                  </div>
                </div>
                <div className="mt-4">
                  <hr className='mt-0'/>
                  <div className="d-flex flex-wrap">
                    <div className="w-100">
                      <div className="row p-2" style={{color: '#777', fontSize: '13px'}}>
                        <div className='col-1 d-flex justify-content-center justify-content-sm-start'>#</div>
                        <div className='col-5'>Название трека</div>
                        <div className='col-4'>Исполнитель</div>
                      </div>
                        {album&&tracks.map(el => (
                          <Track
                            key={el._id}
                            id={el._id}
                            sn={el.sn}
                            name={el.name}
                            artist={album.artist}
                            duration={el.duration}
                            token={el.user.token}
                            published={el.published}
                            toHistory = {() => this.props.addTrackToHistory(el._id)}
                            toFavorite = {() => this.props.addToFavorite(el._id)}
                            delete = {() => deleteAlbumTrack(el._id, this.props.match.params.id)}
                            publish = {() => publishAlbumTrack(el._id, this.props.match.params.id)}
                          />
                        ))}
                    </div>
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
    album: state.albums.album,
    tracks: state.albums.tracks,
    loading: state.albums.loading,
    error: state.albums.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: id => dispatch(fetchAlbum(id)),
    fetchAlbumTracks: id => dispatch(fetchAlbumTracks(id)),
    deleteAlbumTrack: (trackId, albumId) => dispatch(deleteAlbumTrack(trackId, albumId)),
    publishAlbumTrack: (trackId, albumId) => dispatch(publishAlbumTrack(trackId, albumId)),
    addTrackToHistory: track => dispatch(addTrackToHistory(track)),
    addToFavorite: track => dispatch(addToFavorite(track)),
    deleteAlbum: id => dispatch(deleteAlbum(id)),
    publishAlbum: id => dispatch(publishAlbum(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetial);
