import {API_END_POINT} from '../config';
import {processResponse} from '../helpers/response';

export const getLatestItems = async () => {
    const res = await fetch(API_END_POINT + "/items/latest");
    return processResponse(res);
};

export const getItemDetails = async (id) => {
    const res = await fetch(API_END_POINT + '/items/' + id);
    return processResponse(res);
};

export const updateItem = async (accessToken, id, name, description, categoryId) => {
    const res = await fetch(API_END_POINT + "/items/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify({
            id,
            name,
            description,
            categoryId
        })
    });
    return processResponse(res);
};

export const addItem = async (accessToken, name, description, categoryId) => {
    const res = await fetch(API_END_POINT + "/items", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify({
            name,
            description,
            categoryId
        })
    });
    return processResponse(res);
};

export const deleteItem = async (accessToken, id) => {
    const res = await fetch(API_END_POINT + "/items/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': accessToken
        },
    });

    return processResponse(res);
};