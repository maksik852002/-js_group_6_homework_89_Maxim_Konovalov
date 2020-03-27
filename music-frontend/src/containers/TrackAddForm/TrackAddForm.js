import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArtists, fetchArtistAlbums } from '../../store/actions/artistsActions';
import { createTrack } from '../../store/actions/tracksActions';
import Spinner from "../../components/UI/Spinner/Spinner";

class TrackAddForm extends Component {
  state = {
    artist: "",
    album: "",
    name: "",
    duration: "",
    sn: ""
  };

  componentDidMount () {
    this.props.fetchArtists();
  }

  componentDidUpdate (prevProps, prevState) {
    return this.state.artist !== prevState.artist && 
    this.props.fetchArtistAlbums(this.state.artist)
  }

  submitFormHandler = event => {
    event.preventDefault();
    const data = {...this.state};
    delete data.artist
    console.log(data)
    this.props.createTrack(data);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {

    const {artists, albums, loading, error } = this.props;
    return (
      <>
        {loading ? (
          <Spinner/>
        ) : (
        <div className='container pt-4'>
          <h2 className='pb-2'>Добавить новый трек</h2>
          <form onSubmit={this.submitFormHandler}>
            <div className="form-group">
              <label htmlFor="artist">Исполнитель</label>
              <select
                name="artist"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="artist"
                value={this.state.artist}
                onChange={this.inputChangeHandler}
              >
                <option value="">Выберите исполнителя...</option>
                {artists.map(artist => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("artist")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="album">Альбом</label>
              <select
                name="album"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="album"
                value={this.state.album}
                onChange={this.inputChangeHandler}
              >
                <option value="">Выберите альбом...</option>
                {albums&&albums.map(album => (
                  <option key={album._id} value={album._id}>
                    {album.name}
                  </option>
                ))}
              </select>
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("album")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Название трека</label>
              <input
                name="name"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="name"
                placeholder="Введите название трека"
                value={this.state.name}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("name")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="duration">Продолжительность трека</label>
              <input
                name="duration"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="duration"
                placeholder="Введите продолжительность трека"
                value={this.state.duration}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("duration")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sn">Порядковый номер трека</label>
              <input
                name="sn"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="sn"
                placeholder="Введите порядковый номер трека"
                value={this.state.sn}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("sn")}
              </div>
            </div>
            <button type="submit" className="btn btn-secondary">
              Добавить
            </button>
          </form>
        </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists.artists,
  albums: state.artists.albums,
  loading: state.artists.loading,
  artError: state.artists.error,
  error: state.tracks.error
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  fetchArtistAlbums:  (artistId) => dispatch(fetchArtistAlbums(artistId)),
  createTrack: (data) => dispatch(createTrack(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(TrackAddForm);