import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, ADD_TO_FAVORITE_FAILURE, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from "connected-react-router";

export const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
export const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS });
export const registerUserFailure = error => ({ type: REGISTER_USER_FAILURE, error });

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
export const loginUserSuccess = user => ({ type: LOGIN_USER_SUCCESS, user });
export const loginUserFailure = error => ({ type: LOGIN_USER_FAILURE, error });

export const logoutUserRequest = () => ({ type: LOGOUT_USER_REQUEST });
export const logoutUserSuccess = () => ({ type: LOGOUT_USER_SUCCESS });
export const logoutUserFailure = error => ({ type: LOGOUT_USER_FAILURE, error });

export const addToFavoriteRequest = () => ({ type: ADD_TO_FAVORITE_REQUEST });
export const addToFavoriteSuccess = user => ({ type: ADD_TO_FAVORITE_SUCCESS, user });
export const addToFavoriteFailure = error => ({ type: ADD_TO_FAVORITE_FAILURE, error });

export const fetchUserRequest = () => ({ type: USER_FETCH_REQUEST });
export const fetchUserSuccess = user => ({ type: USER_FETCH_SUCCESS, user });
export const fetchUserFailure = error => ({ type: USER_FETCH_FAILURE, error });

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());
      await axios.post("/users", userData);
      dispatch(registerUserSuccess());
      dispatch(push("/"));
    } catch (error) {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(
          registerUserFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axios.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push("/"));
    } catch (e) {
      dispatch(loginUserFailure(e.response.data))
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    try {
      dispatch(logoutUserRequest());
      await axios.delete('/users/sessions');
      dispatch(logoutUserSuccess());
      // dispatch(push("/"));
    } catch (e) {
      dispatch(logoutUserFailure(e))
    }
  };
};

export const addToFavorite = (track) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().users.user;
      dispatch(addToFavoriteRequest());
      const response = await axios.put(`/users/${user._id}`, {track});
      dispatch(addToFavoriteSuccess(response.data));
    } catch (e) {
      dispatch(addToFavoriteFailure(e))
    }
  };
};

export const fetchUser = () => {
  
  return async (dispatch, getState) => {
    try {
      const user = getState().users.user;
      dispatch(fetchUserRequest());
      const response = await axios.get(`/users/${user._id}`);
      dispatch(fetchUserSuccess(response.data));
    } catch (e) {
      dispatch(fetchUserFailure(e))
    }
  };
};