import axios from 'axios';
import * as actionTypes from './actionTypes';
import { act } from 'react-dom/test-utils';

export const auth = (userName, email, password) => {
    return dispatch => {
        var temp = Math.floor(Math.random() * 10 );
        const authData = {
            user: {
                username: userName,
                email: email,
                password: password
            }
        }
        axios.post('https://conduit.productionready.io/api/users', authData)
                .then(res => {
                    console.log("Signup success", res);
                    dispatch(authSuccess(res.user.token, res.user.id, res.user.username));
                })
                .catch(err => {
                    console.log("Error occured while sign up", err);
                    dispatch(authFail(err));
                });
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