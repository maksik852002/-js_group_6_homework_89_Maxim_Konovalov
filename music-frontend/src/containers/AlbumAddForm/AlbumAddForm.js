import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArtists } from '../../store/actions/artistsActions';
import { createAlbum } from '../../store/actions/albumsActions';
import Spinner from "../../components/UI/Spinner/Spinner";

class AlbumAddForm extends Component {
  state = {
    artist: "",
    name: "",
    year: "",
    image: ""
  };

  componentDidMount () {
    this.props.fetchArtists();
  }

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    this.props.createAlbum(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {

    const {artists, loading, error } = this.props;
    return (
      <>
        {loading ? (
          <Spinner/>
        ) : (
        <div className='container pt-4'>
          <h2 className='pb-2'>Добавить новый альбом</h2>
          <form onSubmit={this.submitFormHandler}>
            <div className="custom-file mb-3">
              <input
                name="image"
                type="file"
                className={
                  !error
                    ? "custom-file-input"
                    : "custom-file-input is-invalid"
                }
                id="image"
                onChange={this.fileChangeHandler}
              />
              <label className="custom-file-label" htmlFor="image">
                {this.state.image ? this.state.image.name : "Выберите изображение альбома"}
              </label>
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("image")}
              </div>
            </div>
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
              <label htmlFor="name">Название альбома</label>
              <input
                name="name"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="name"
                placeholder="Введите название альбома"
                value={this.state.name}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("name")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="year">Год выпуска</label>
              <input
                name="year"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="year"
                placeholder="Введите год выпуска альбома"
                value={this.state.year}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("year")}
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
  loading: state.artists.loading,
  error: state.albums.error
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  createAlbum: (data) => dispatch(createAlbum(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AlbumAddForm);