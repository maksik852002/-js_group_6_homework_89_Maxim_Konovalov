import React, { Component } from "react";
import { connect } from "react-redux";
import { createArtist } from '../../store/actions/artistsActions';
import Spinner from "../../components/UI/Spinner/Spinner";

class ArtistAddForm extends Component {
  state = {
    name: "",
    info: "",
    image: ""
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    this.props.createArtist(formData);
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

    const {loading, error } = this.props;
    return (
      <>
        {loading ? (
          <Spinner/>
        ) : (
        <div className='container pt-4'>
          <h2 className='pb-2'>Добавить нового исполнителя</h2>
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
                {this.state.image ? this.state.image.name : "Выберите изображение исполнителя"}
              </label>
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("image")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Название исполнителя</label>
              <input
                name="name"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="name"
                placeholder="Введите название исполнителя"
                value={this.state.name}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("name")}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="info">Информация об исполнителе</label>
              <input
                name="info"
                type="text"
                className={
                  !error ? "form-control" : "form-control is-invalid"
                }
                id="info"
                placeholder="Введите информацию об исполнителе"
                value={this.state.info}
                onChange={this.inputChangeHandler}
              />
              <div className={error && "invalid-feedback d-block"}>
                {this.getFieldError("info")}
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
  loading: state.albums.loading,
  error: state.albums.error
});

const mapDispatchToProps = dispatch => ({
  createArtist: (data) => dispatch(createArtist(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(ArtistAddForm);