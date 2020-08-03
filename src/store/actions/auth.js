import * as actionTypes from './actionTypes';
import { act } from 'react-dom/test-utils';

export const auth = (userName, email, password) => {
    return dispatch => {
        var temp = Math.floor(Math.random() * 10 );
        const authData = {
            user: {
                userName: userName,
                email: email,
                password: password
            }
        }
        console.log("Received to send to server", authData, temp);
        
        if(temp < 6) {
            dispatch(authSuccess());
        }   
        else {
            dispatch(authFail());
        }
    }
}

export const authSuccess = (token, userId, userName) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        userId: userId,
        userName: userName
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}