import {API_END_POINT} from '../config';
import {processResponse} from '../helpers/response';

export const getAllCategories = async () => {
    const res = await fetch(API_END_POINT + "/categories");
    return processResponse(res);
};

export const getCategoryDetails = async (slug) => {
    const res = await fetch(API_END_POINT + "/categories/" + slug);
    return processResponse(res);
};