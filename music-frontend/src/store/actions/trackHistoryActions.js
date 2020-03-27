import { ADD_TRACK_TO_HISTORY_REQUEST, ADD_TRACK_TO_HISTORY_SUCCESS, ADD_TRACK_TO_HISTORY_FAILURE, FETCH_TRACK_HISTORY_REQUEST, FETCH_TRACK_HISTORY_SUCCESS, FETCH_TRACK_HISTORY_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";

export const addTrackToHistoryRequest = () => ({ type: ADD_TRACK_TO_HISTORY_REQUEST });
export const addTrackToHistorySuccess = track => ({ type: ADD_TRACK_TO_HISTORY_SUCCESS, track });
export const addTrackToHistoryFailure = error => ({ type: ADD_TRACK_TO_HISTORY_FAILURE, error });

export const fetchTrackHistoryRequest = () => ({ type: FETCH_TRACK_HISTORY_REQUEST });
export const fetchTrackHistorySuccess = history => ({ type: FETCH_TRACK_HISTORY_SUCCESS, history });
export const fetchTrackHistoryFailure = error => ({ type: FETCH_TRACK_HISTORY_FAILURE, error });

export const addTrackToHistory = track => {
  return async dispatch => {
    try {
      dispatch(addTrackToHistoryRequest());
      const response = await axios.post('/track_history', {track});
      dispatch(addTrackToHistorySuccess(response.data));
    } catch (e) {
      dispatch(addTrackToHistoryFailure(e.response.data))
    }
  };
};

export const fetchTrackHistory = () => {
  return async dispatch => {
    try {
      dispatch(fetchTrackHistoryRequest());
      const response = await axios.get('/track_history');
      dispatch(fetchTrackHistorySuccess(response.data));
    } catch (e) {
      dispatch(fetchTrackHistoryFailure(e))
    }
  };
};

