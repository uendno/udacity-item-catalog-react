import {request, requestAuth} from '../helpers/api';

export const getLatestItems = async () => {
    return request({
        url: '/items?mode=latest&limit=10'
    });
};

export const getItemDetails = async (id) => {
    return request({
        url: '/items/' + id
    });
};

export const updateItem = async (id, name, description, categoryId) => {
    return requestAuth({
        url: '/items/' + id,
        method: 'PUT',
        data: {
            id,
            name,
            description,
            category_id: categoryId
        }
    });
};

export const addItem = async (name, description, categoryId) => {
    return requestAuth({
        url: '/items',
        method: 'POST',
        data: {
            name,
            description,
            category_id: categoryId
        }
    });
};

export const deleteItem = async (id) => {
    return requestAuth({
        url: '/items/' + id,
        method: 'DELETE',
    });
};