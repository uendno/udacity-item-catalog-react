import {API_END_POINT} from '../config';
import {processResponse} from '../helpers/response';

export const gConnect = async (code) => {

    const res = await fetch(API_END_POINT + "/gconnect", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code
        })
    });
    return processResponse(res);
};