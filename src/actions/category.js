import {
    GET_CATEGORIES_COMPLETE, GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST,
    GET_CATEGORY_DETAILS_COMPLETE, GET_CATEGORY_DETAILS_ERROR, GET_CATEGORY_DETAILS_REQUEST
} from './types';
import * as categoryAPI from '../api/category';
import {errorHandler} from "../helpers/error";

export const requestAllCategories = async () => async (dispatch) => {
    dispatch({
        type: GET_CATEGORIES_REQUEST
    });

    try {
        const categories = await categoryAPI.getAllCategories();

        dispatch({
            type: GET_CATEGORIES_COMPLETE,
            categories
        });

        return categories
    } catch (error) {
        console.error(error);
        errorHandler(error, GET_CATEGORIES_ERROR, dispatch);
    }
};

export const requestCategoryDetails = async (categorySlug) => async (dispatch) => {
    dispatch({
        type: GET_CATEGORY_DETAILS_REQUEST,
        categorySlug
    });

    try {
        const category = await categoryAPI.getCategoryDetails(categorySlug);

        dispatch({
            type: GET_CATEGORY_DETAILS_COMPLETE,
            category
        });

        return category;
    } catch (error) {
        console.error(error);
        errorHandler(error, GET_CATEGORY_DETAILS_ERROR, dispatch);
    }
};