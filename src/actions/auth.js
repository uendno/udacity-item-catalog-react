import {G_CONNECT_COMPLETE, G_CONNECT_ERROR, G_CONNECT_REQUEST, LOG_OUT} from './types';
import * as gConnectAPI from '../api/auth';

export const gConnect = async (code) => ({
    func: async (dispatch) => {
        dispatch({
            type: G_CONNECT_REQUEST,
            code
        });

        const accessToken = await gConnectAPI.gConnect(code);

        dispatch({
            type: G_CONNECT_COMPLETE,
            accessToken
        });

        return accessToken;
    },

    errorType: G_CONNECT_ERROR
});

export const logout = () => {
    return {
        type: LOG_OUT
    }
};