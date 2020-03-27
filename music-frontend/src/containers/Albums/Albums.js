import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../../store/actions/albumsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Album from "../../components/Album/Album";

class Albums extends Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  albumDetailOpenHandler = id => {
    this.props.history.push(`/albums/${id}`);
  };

  render() {
    const {loading, albums } = this.props;
    return (
      <div className='container'>
        <h2 className='pt-4'>Альбомы</h2>
        <div className="d-flex flex-wrap">
          {loading ? (
            <Spinner />
          ) : (
            albums.map(el => (
              <Album
                key={el._id}
                name={el.name}
                artistName={el.artist.name}
                year={el.year}
                image={el.image}
                token={el.user.token}
                published={el.published}
                click={() => this.albumDetailOpenHandler(el._id)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: state.albums.albums,
    loading: state.albums.loading,
    show: state.albums.show,
    error: state.albums.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
