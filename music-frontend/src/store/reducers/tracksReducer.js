import { TRACK_CREATE_REQUEST, TRACK_CREATE_SUCCESS, TRACK_CREATE_FAILURE } from "../actions/actionsTypes";

const initialState = {
  loading: false,
  error: null,
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_CREATE_REQUEST:
      return { ...state, loading: true };
    case TRACK_CREATE_SUCCESS:
      return { ...state, loading: false };
    case TRACK_CREATE_FAILURE:
      return {...state, error: action.error, show: true, loading: false };
    default:
      return state;
  }
};

export default tracksReducer;
