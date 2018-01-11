import {G_CONNECT_COMPLETE, G_CONNECT_ERROR, G_CONNECT_REQUEST, LOG_OUT} from './types';
import * as gConnectAPI from '../api/auth';
import {errorHandler} from '../helpers/error';

export const gConnect = async (code) => async (dispatch) => {
    dispatch({
        type: G_CONNECT_REQUEST,
        code
    });

    try {
        const accessToken = await gConnectAPI.gConnect(code);

        dispatch({
            type: G_CONNECT_COMPLETE,
            accessToken
        });

        return accessToken;
    } catch (error) {
        errorHandler(error, G_CONNECT_ERROR, dispatch)
    }
};

export const logout = () => {
    return {
        type: LOG_OUT
    }
};