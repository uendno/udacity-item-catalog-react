import {
    GET_LATEST_ITEMS_COMPLETE, GET_LATEST_ITEMS_ERROR, GET_LATEST_ITEMS_REQUEST,
    GET_ITEM_DETAILS_COMPLETE, GET_ITEM_DETAILS_ERROR, GET_ITEM_DETAILS_REQUEST,
    UPDATE_ITEM_COMPLETE, UPDATE_ITEM_ERROR, UPDATE_ITEM_REQUEST,
    ADD_ITEM_COMPLETE, ADD_ITEM_ERROR, ADD_ITEM_REQUEST,
    DELETE_ITEM_COMPLETE, DELETE_ITEM_ERROR, DELETE_ITEM_REQUEST
} from './types';
import * as itemsAPI from '../api/items';
import {errorHandler} from '../helpers/error';
import {getAccessToken} from '../reducers';

export const requestLatestItems = async () => async (dispatch) => {
    dispatch({
        type: GET_LATEST_ITEMS_REQUEST
    });

    try {
        const items = await itemsAPI.getLatestItems();

        dispatch({
            type: GET_LATEST_ITEMS_COMPLETE,
            items
        });

        return items;
    } catch (error) {
        errorHandler(error, GET_LATEST_ITEMS_ERROR, dispatch)
    }
};

export const requestItemDetails = async (id) => async (dispatch) => {
    dispatch({
        type: GET_ITEM_DETAILS_REQUEST,
        id
    });

    try {
        const item = await itemsAPI.getItemDetails(id);

        dispatch({
            type: GET_ITEM_DETAILS_COMPLETE,
            item
        });

        return item;
    } catch (error) {
        errorHandler(error, GET_ITEM_DETAILS_ERROR, dispatch)
    }
};

export const updateItem = async (id, name, description, categoryId) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_ITEM_REQUEST,
        id,
        name,
        description,
        categoryId
    });

    try {
        const accessToken = getAccessToken(getState());
        const updated = await itemsAPI.updateItem(accessToken, id, name, description, categoryId);

        dispatch({
            type: UPDATE_ITEM_COMPLETE,
            item: updated
        });

        return updated;
    } catch (error) {
        errorHandler(error, UPDATE_ITEM_ERROR, dispatch);
    }
};

export const addItem = async (name, description, categoryId) => async (dispatch, getState) => {
    dispatch({
        type: ADD_ITEM_REQUEST,
        name,
        description,
        categoryId
    });

    try {
        const accessToken = getAccessToken(getState());
        const added = await itemsAPI.addItem(accessToken, name, description, categoryId);

        dispatch({
            type: ADD_ITEM_COMPLETE,
            item: added
        });

        return added;
    } catch (error) {
        errorHandler(error, ADD_ITEM_ERROR, dispatch);
    }
};

export const deleteItem = async (id) => async (dispatch, getState) => {
    dispatch({
        type: DELETE_ITEM_REQUEST,
        id
    });

    try {
        const accessToken = getAccessToken(getState());
        await itemsAPI.deleteItem(accessToken, id);

        dispatch({
            type: DELETE_ITEM_COMPLETE,
            id
        });

        return true;
    } catch (error) {
        errorHandler(error, DELETE_ITEM_ERROR, dispatch);
    }
};