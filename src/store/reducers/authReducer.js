import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    error: null
}

const authSuccess = (state, action) => {
    console.log('received in reducer for success', state, action);
    return updateObject(state, { token: action.token, userName: action.userName, userId: action.userId});
}

const authFail = (state, action) => {
    console.log('received in reducer for fail', state, action);
    return updateObject(state, { error: action.error});
}

const logout = (state, action) => {
    return updateObject(state, { token: null, userId: null, userName: null});
}

const reducer = (state = initialState, action) => {
    console.log('reducer: ', state, action);
    switch(action.type) {
        case actionTypes.SIGNUP_SUCCESS: return authSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return authFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default:
            return state;
    }
}

export default reducer;