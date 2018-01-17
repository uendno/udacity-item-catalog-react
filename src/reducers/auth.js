import jwt from 'jsonwebtoken';
import {G_CONNECT_COMPLETE, LOG_OUT} from '../actions/types'
import localStorageSrv from '../services/localStorage';

const persistedAccessToken = localStorageSrv.get('accessToken');

const initialState = {
    accessToken: persistedAccessToken !== '' && persistedAccessToken,
};

if (initialState.accessToken) {
    initialState.decoded = jwt.decode(initialState.accessToken);
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case G_CONNECT_COMPLETE: {
            const decoded = jwt.decode(action.accessToken);

            localStorageSrv.set('accessToken', action.accessToken);

            return {
                accessToken: action.accessToken,
                decoded
            }
        }

        case LOG_OUT: {
            localStorageSrv.remove('accessToken');

            return {};
        }

        default:
            return state;
    }
};

export default auth;

