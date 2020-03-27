import { FETCH_TRACK_HISTORY_SUCCESS, FETCH_TRACK_HISTORY_REQUEST, FETCH_TRACK_HISTORY_FAILURE } from "../actions/actionsTypes";

const initialState = {
  loading: false,
  error: null,
  history: null,
};

const trackHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRACK_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TRACK_HISTORY_SUCCESS:
      return { ...state, history: action.history, loading: false };
    case FETCH_TRACK_HISTORY_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default trackHistoryReducer;