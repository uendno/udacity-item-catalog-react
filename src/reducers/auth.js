import jwt from 'jsonwebtoken';
import {G_CONNECT_COMPLETE, LOG_OUT} from '../actions/types'

const persisted = localStorage.getItem('accessToken');

const initialState = {
    accessToken: persisted !== '' && persisted,
};

if (initialState.accessToken) {
    initialState.decoded = jwt.decode(initialState.accessToken);
}


const auth = (state = initialState, action) => {
    switch (action.type) {
        case G_CONNECT_COMPLETE: {
            const decoded = jwt.decode(action.accessToken);

            localStorage.setItem('accessToken', action.accessToken);

            return {
                accessToken: action.accessToken,
                decoded
            }
        }

        case LOG_OUT: {
            localStorage.removeItem('accessToken');

            return {};
        }

        default:
            return state;
    }
};

export default auth;

export const getAccessToken = (state) => state.accessToken;

export const getSessionInfo = (state) => state.decoded;