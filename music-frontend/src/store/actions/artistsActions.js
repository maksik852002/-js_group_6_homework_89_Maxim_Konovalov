import { ARTISTS_FETCH_REQUEST, ARTISTS_FETCH_SUCCESS, ARTISTS_FETCH_FAILURE, ARTIST_FETCH_REQUEST, ARTIST_FETCH_SUCCESS, ARTIST_FETCH_FAILURE, ARTIST_ALBUMS_FETCH_REQUEST, ARTIST_ALBUMS_FETCH_SUCCESS, ARTIST_ALBUMS_FETCH_FAILURE, ARTIST_TRACKS_FETCH_REQUEST, ARTIST_TRACKS_FETCH_SUCCESS, ARTIST_TRACKS_FETCH_FAILURE, ARTIST_DELETE_FAILURE, ARTIST_PUBLISH_FAILURE, ARTIST_TRACKS_DELETE_FAILURE, ARTIST_TRACKS_PUBLISH_FAILURE, ARTIST_CREATE_REQUEST, ARTIST_CREATE_SUCCESS, ARTIST_CREATE_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from 'connected-react-router';

export const artistsFetchRequest = () => ({ type: ARTISTS_FETCH_REQUEST });
export const artistsFetchSuccess = data => ({ type: ARTISTS_FETCH_SUCCESS, data });
export const artistsFetchFailure = error => ({ type: ARTISTS_FETCH_FAILURE, error });

export const artistDeleteFailure = error => ({ type: ARTIST_DELETE_FAILURE, error });

export const artistPublishFailure = error => ({ type: ARTIST_PUBLISH_FAILURE, error });

export const artistCreateRequest = () => ({ type: ARTIST_CREATE_REQUEST });
export const artistCreateSuccess = () => ({ type: ARTIST_CREATE_SUCCESS });
export const artistCreateFailure = error => ({ type: ARTIST_CREATE_FAILURE, error });

export const artistFetchRequest = () => ({ type: ARTIST_FETCH_REQUEST });
export const artistFetchSuccess = data => ({ type: ARTIST_FETCH_SUCCESS, data });
export const artistFetchFailure = error => ({ type: ARTIST_FETCH_FAILURE, error });

export const artistAlbumsFetchRequest = () => ({ type: ARTIST_ALBUMS_FETCH_REQUEST });
export const artistAlbumsFetchSuccess = data => ({ type: ARTIST_ALBUMS_FETCH_SUCCESS, data });
export const artistAlbumsFetchFailure = error => ({ type: ARTIST_ALBUMS_FETCH_FAILURE, error });

export const artistTracksFetchRequest = () => ({ type: ARTIST_TRACKS_FETCH_REQUEST });
export const artistTracksFetchSuccess = data => ({ type: ARTIST_TRACKS_FETCH_SUCCESS, data });
export const artistTracksFetchFailure = error => ({ type: ARTIST_TRACKS_FETCH_FAILURE, error });

export const artistTracksDeleteFailure = error => ({ type: ARTIST_TRACKS_DELETE_FAILURE, error });

export const artistTracksPublishFailure = error => ({ type: ARTIST_TRACKS_PUBLISH_FAILURE, error });

export const fetchArtists = () => {
  return async dispatch => {
    try {
      dispatch(artistsFetchRequest());
      const response = await axios.get("/artists");
      dispatch(artistsFetchSuccess(response.data));
    } catch (e) {
      dispatch(artistsFetchFailure(e));
    }
  };
};

export const fetchArtist = (id) => {
  return async dispatch => {
    try {
      dispatch(artistFetchRequest());
      const response = await axios.get(`/artists/${id}`);
      dispatch(artistFetchSuccess(response.data));
    } catch (e) {
      dispatch(artistFetchFailure(e));
    }
  };
};

export const createArtist = (data) => {
  return async dispatch => {
    try {
      dispatch(artistCreateRequest());
      await axios.post("/artists", data);
      dispatch(artistCreateSuccess());
      dispatch(push('/'));
    } catch (e) {
      if (e.response) {
        dispatch(artistCreateFailure(e.response.data));
      } else {
        dispatch(artistCreateFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const deleteArtist = id => {
  return async dispatch => {
    try {
      await axios.delete(`/artists/${id}`);
      dispatch(push('/artists'))
    } catch (e) {
      if (e.response) {
        dispatch(artistDeleteFailure(e.response.data));
      } else {
        dispatch(artistDeleteFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const publishArtist = id => {
  return async dispatch => {
    try {
      await axios.put(`/artists/${id}`);
      dispatch(fetchArtist(id))
    } catch (e) {
      dispatch(artistPublishFailure(e));
    }
  };
};

export const fetchArtistAlbums = artistId => {
  return async dispatch => {
    try {
      dispatch(artistAlbumsFetchRequest());
      const response = await axios.get(`/albums/?artist=${artistId}`);
      dispatch(artistAlbumsFetchSuccess(response.data));
    } catch (e) {
      dispatch(artistAlbumsFetchFailure(e));
    }
  };
};

export const fetchArtistTracks = artistId => {
  return async dispatch => {
    try {
      dispatch(artistTracksFetchRequest());
      const response = await axios.get(`/tracks/?artist=${artistId}`);
      dispatch(artistTracksFetchSuccess(response.data));
    } catch (e) {
      dispatch(artistTracksFetchFailure(e));
    }
  };
};

export const deleteArtistTrack = (trackId, artistId) => {
  return async dispatch => {
    try {
      await axios.delete(`/tracks/${trackId}`);
      dispatch(fetchArtistTracks(artistId));
    } catch (e) {
      dispatch(artistTracksDeleteFailure(e));
    }
  };
};

export const publishArtistTrack = (trackId, artistId) => {
  return async dispatch => {
    try {
      await axios.put(`/tracks/${trackId}`);
      dispatch(fetchArtistTracks(artistId));
    } catch (e) {
      dispatch(artistTracksPublishFailure(e));
    }
  };
};