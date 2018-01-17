import {
    GET_CATEGORIES_COMPLETE, GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST,
    GET_CATEGORY_DETAILS_COMPLETE, GET_CATEGORY_DETAILS_ERROR, GET_CATEGORY_DETAILS_REQUEST
} from './types';
import * as categoryAPI from '../api/category';

export const requestAllCategories = async () => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_CATEGORIES_REQUEST
        });

        // try {
        const categories = await
            categoryAPI.getAllCategories();

        dispatch({
            type: GET_CATEGORIES_COMPLETE,
            categories: categories
        });

        return categories
    },

    errorType: GET_CATEGORIES_ERROR
});

export const requestCategoryDetails = async (categorySlug) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_CATEGORY_DETAILS_REQUEST,
            categorySlug
        });

        const category = await categoryAPI.getCategoryDetails(categorySlug);

        dispatch({
            type: GET_CATEGORY_DETAILS_COMPLETE,
            category
        });

        return category;
    },

    errorType: GET_CATEGORY_DETAILS_ERROR
});