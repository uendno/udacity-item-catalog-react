import {request} from '../helpers/api';

export const getAllCategories = async () => {
    return request({
        url: '/categories'
    });
};

export const getCategoryDetails = async (slug) => {
    return request({
        url: '/categories/' + slug
    });
};