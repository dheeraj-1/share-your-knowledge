import axios from 'axios';
import * as actionTypes from './actionTypes';

/**
 * 
 * @param {String} userName Username of user entered in form data
 * @param {String} email Email of the user
 * @param {String} password Password of the user in form data
 * @param {Boolean} isSignup A flag which indicates whether user is trying to signUp or signIn
 */
export const auth = (userName, email, password, isSignup) => {
    return dispatch => {
        var reqUrl;
        const authData = {
            user: {
                email: email,
                password: password
            }
        }
        if(isSignup) {
            reqUrl = 'https://conduit.productionready.io/api/users';
            authData.user.username = userName;
        }
        else {
            reqUrl = 'https://conduit.productionready.io/api/users/login';
        }
        
        axios.post(reqUrl, authData)
                .then(res => {
                    console.log("Signup success", res);
                    localStorage.setItem('token', res.data.user.token);
                    localStorage.setItem('userId', res.data.user.id);
                    localStorage.setItem('userName', res.data.user.username);
                    dispatch(authSuccess(res.data.user.token, res.data.user.id, res.data.user.username));
                })
                .catch(err => {
                    console.log("Error occured while sign up", err);
                    dispatch(authFail(err));
                });
    }
}

export const autoSignIn = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        if(token) {
            let userId = localStorage.getItem('userId');
            let userName = localStorage.getItem('userName');
            console.log("Auto signed");
            dispatch(authSuccess(token, userId, userName));
        }
    }
}

export const logout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    return {
        type: actionTypes.LOGOUT
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
