import axios from "axios";
import { browserHistory } from "react-router";
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
    return function(dispatch) {
        // Submit emial/password to Server
        // {email, password} same as { email: email, password: password }
        axios
            .post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good
                // - Update state to indicated user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT Token
                localStorage.setItem("token", response.data.token);
                // - Redirect to the route '/feature'
                browserHistory.push("/feature");
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError("Bad Login Information"));
            });
    };
}

export default function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

//browserHistory communicates history about the URL to react-router
//browserHistory can also make changes to the URL

//localStorage to store the JWT
