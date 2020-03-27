import { TRACK_CREATE_REQUEST, TRACK_CREATE_SUCCESS, TRACK_CREATE_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from 'connected-react-router';

export const trackCreateRequest = () => ({ type: TRACK_CREATE_REQUEST });
export const trackCreateSuccess = () => ({ type: TRACK_CREATE_SUCCESS });
export const trackCreateFailure = error => ({ type: TRACK_CREATE_FAILURE, error });

export const createTrack = (data) => {
  return async dispatch => {
    try {
      dispatch(trackCreateRequest());
      await axios.post("/tracks", data);
      dispatch(trackCreateSuccess());
      dispatch(push('/'));
    } catch (e) {
      if (e.response) {
        dispatch(trackCreateFailure(e.response.data));
      } else {
        dispatch(trackCreateFailure({ global: "Network error or no internet" }));
      }
    }
  };
};