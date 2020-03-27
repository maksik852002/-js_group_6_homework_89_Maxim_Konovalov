import { ALBUMS_FETCH_REQUEST, ALBUMS_FETCH_SUCCESS, ALBUMS_FETCH_FAILURE, ALBUM_TRACKS_FETCH_REQUEST, ALBUM_TRACKS_FETCH_SUCCESS, ALBUM_TRACKS_FETCH_FAILURE, ALBUM_FETCH_REQUEST, ALBUM_FETCH_SUCCESS, ALBUM_FETCH_FAILURE, ALBUM_DELETE_FAILURE, ALBUM_CREATE_REQUEST, ALBUM_CREATE_SUCCESS, ALBUM_CREATE_FAILURE } from "../actions/actionsTypes";

const initialState = {
  albums: [],
  album: [],
  tracks: [],
  loading: false,
  error: null,
  show: false
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_FETCH_REQUEST:
      return { ...state, loading: true };
    case ALBUMS_FETCH_SUCCESS:
      return { ...state, albums: action.data, loading: false, error: null };
    case ALBUMS_FETCH_FAILURE:
    return {...state, error: action.error, show: true, loading: false };
    case ALBUM_FETCH_REQUEST:
      return { ...state, loading: true };
    case ALBUM_FETCH_SUCCESS:
      return { ...state, album: action.data, loading: false, error: null };
    case ALBUM_FETCH_FAILURE:
      return {...state, error: action.error, show: true, loading: false };
    case ALBUM_DELETE_FAILURE:
        return {...state, error: action.error, show: true, loading: false };
    case ALBUM_TRACKS_FETCH_REQUEST:
      return { ...state, loading: true };
    case ALBUM_TRACKS_FETCH_SUCCESS:
      return { ...state, tracks: action.data, loading: false, error: null };
    case ALBUM_TRACKS_FETCH_FAILURE:
      return {...state, error: action.error, show: true, loading: false };
    case ALBUM_CREATE_REQUEST:
      return { ...state, loading: true };
    case ALBUM_CREATE_SUCCESS:
      return { ...state, loading: false, error: null };
    case ALBUM_CREATE_FAILURE:
      return {...state, error: action.error, show: true, loading: false };
    default:
      return state;
  }
};

export default albumsReducer;
