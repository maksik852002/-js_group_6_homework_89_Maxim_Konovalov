import { ALBUMS_FETCH_REQUEST, ALBUMS_FETCH_SUCCESS, ALBUMS_FETCH_FAILURE, ALBUM_TRACKS_FETCH_REQUEST, ALBUM_TRACKS_FETCH_SUCCESS, ALBUM_TRACKS_FETCH_FAILURE, ALBUM_FETCH_REQUEST, ALBUM_FETCH_SUCCESS, ALBUM_FETCH_FAILURE, ALBUM_DELETE_FAILURE, ALBUM_TRACKS_DELETE_FAILURE, ALBUM_TRACKS_PUBLISH_FAILURE, ALBUM_PUBLISH_FAILURE, ALBUM_CREATE_REQUEST, ALBUM_CREATE_SUCCESS, ALBUM_CREATE_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from 'connected-react-router';

export const albumsFetchRequest = () => ({ type: ALBUMS_FETCH_REQUEST });
export const albumsFetchSuccess = data => ({ type: ALBUMS_FETCH_SUCCESS, data });
export const albumsFetchFailure = error => ({ type: ALBUMS_FETCH_FAILURE, error });

export const albumFetchRequest = () => ({ type: ALBUM_FETCH_REQUEST });
export const albumFetchSuccess = data => ({ type: ALBUM_FETCH_SUCCESS, data });
export const albumFetchFailure = error => ({ type: ALBUM_FETCH_FAILURE, error });

export const albumCreateRequest = () => ({ type: ALBUM_CREATE_REQUEST });
export const albumCreateSuccess = () => ({ type: ALBUM_CREATE_SUCCESS });
export const albumCreateFailure = error => ({ type: ALBUM_CREATE_FAILURE, error });

export const albumDeleteFailure = error => ({ type: ALBUM_DELETE_FAILURE, error });

export const albumPublishFailure = error => ({ type: ALBUM_PUBLISH_FAILURE, error });

export const albumTracksFetchRequest = () => ({ type: ALBUM_TRACKS_FETCH_REQUEST });
export const albumTracksFetchSuccess = data => ({ type: ALBUM_TRACKS_FETCH_SUCCESS, data });
export const albumTracksFetchFailure = error => ({ type: ALBUM_TRACKS_FETCH_FAILURE, error });

export const albumTracksDeleteFailure = error => ({ type: ALBUM_TRACKS_DELETE_FAILURE, error });

export const albumTracksPublishFailure = error => ({ type: ALBUM_TRACKS_PUBLISH_FAILURE, error });

export const fetchAlbums = () => {
  return async dispatch => {
    try {
      dispatch(albumsFetchRequest());
      const response = await axios.get("/albums");
      dispatch(albumsFetchSuccess(response.data));
    } catch (e) {
      dispatch(albumsFetchFailure(e));
    }
  };
};

export const fetchAlbum = (id) => {
  return async dispatch => {
    try {
      dispatch(albumFetchRequest());
      const response = await axios.get(`/albums/${id}`);
      dispatch(albumFetchSuccess(response.data));
    } catch (e) {
      dispatch(albumFetchFailure(e));
    }
  };
};

export const createAlbum = (data) => {
  return async dispatch => {
    try {
      dispatch(albumCreateRequest());
      await axios.post("/albums", data);
      dispatch(albumCreateSuccess());
      dispatch(push('/albums'));
    } catch (e) {
      if (e.response) {
        dispatch(albumCreateFailure(e.response.data));
      } else {
        dispatch(albumCreateFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const deleteAlbum = id => {
  return async dispatch => {
    try {
      await axios.delete(`/albums/${id}`);
      dispatch(push('/albums'))
    } catch (e) {
      if (e.response) {
        dispatch(albumDeleteFailure(e.response.data));
      } else {
        dispatch(albumDeleteFailure({ global: "Network error or no internet" }));
      }
    }
  };
};

export const publishAlbum = id => {
  return async dispatch => {
    try {
      await axios.put(`/albums/${id}`);
      dispatch(fetchAlbum(id))
    } catch (e) {
      dispatch(albumPublishFailure(e));
    }
  };
};

export const fetchAlbumTracks = albumId => {
  return async dispatch => {
    try {
      dispatch(albumTracksFetchRequest());
      const response = await axios.get(`/tracks/?album=${albumId}`);
      dispatch(albumTracksFetchSuccess(response.data));
    } catch (e) {
      dispatch(albumTracksFetchFailure(e));
    }
  };
};

export const deleteAlbumTrack = (trackId, albumId) => {
  return async dispatch => {
    try {
      await axios.delete(`/tracks/${trackId}`);
      dispatch(fetchAlbumTracks(albumId));
    } catch (e) {
      dispatch(albumTracksDeleteFailure(e));
    }
  };
};

export const publishAlbumTrack = (trackId, albumId) => {
  return async dispatch => {
    try {
      await axios.put(`/tracks/${trackId}`);
      dispatch(fetchAlbumTracks(albumId));
    } catch (e) {
      dispatch(albumTracksPublishFailure(e));
    }
  };
};