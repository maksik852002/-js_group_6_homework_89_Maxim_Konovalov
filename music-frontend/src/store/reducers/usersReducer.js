import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, ADD_TO_FAVORITE_FAILURE, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_FAILURE } from "../actions/actionsTypes";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case REGISTER_USER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case LOGIN_USER_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user, loading: false, error: null};
    case LOGIN_USER_FAILURE:
      return {...state, loading: false, error: action.error};
    case LOGOUT_USER_REQUEST:
      return {...state, loading: true, error: null};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null, loading: false, error: null};
    case LOGOUT_USER_FAILURE:
      return {...state, loading: false, error: action.error};
    case ADD_TO_FAVORITE_REQUEST:
      return {...state, loading: true, error: null};
    case ADD_TO_FAVORITE_SUCCESS:
      return {...state, user: action.user, loading: false, error: null};
    case ADD_TO_FAVORITE_FAILURE:
      return {...state, loading: false, error: action.error};
    case USER_FETCH_REQUEST:
      return {...state, loading: true, error: null};
    case USER_FETCH_SUCCESS:
      return {...state, user: action.user, loading: false, error: null};
    case USER_FETCH_FAILURE:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export default usersReducer;