import {request} from '../helpers/api';

export const gConnect = async (code) => {
    return request({
        url: '/auth?provider=google',
        method: 'POST',
        data: {
            code
        }
    })
};