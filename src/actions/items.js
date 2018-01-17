import {
    GET_LATEST_ITEMS_COMPLETE, GET_LATEST_ITEMS_ERROR, GET_LATEST_ITEMS_REQUEST,
    GET_ITEM_DETAILS_COMPLETE, GET_ITEM_DETAILS_ERROR, GET_ITEM_DETAILS_REQUEST,
    UPDATE_ITEM_COMPLETE, UPDATE_ITEM_ERROR, UPDATE_ITEM_REQUEST,
    ADD_ITEM_COMPLETE, ADD_ITEM_ERROR, ADD_ITEM_REQUEST,
    DELETE_ITEM_COMPLETE, DELETE_ITEM_ERROR, DELETE_ITEM_REQUEST
} from './types';
import * as itemsAPI from '../api/items';

export const requestLatestItems = async () => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_LATEST_ITEMS_REQUEST
        });

        const items = await itemsAPI.getLatestItems();

        dispatch({
            type: GET_LATEST_ITEMS_COMPLETE,
            items
        });

        return items;
    },

    errorType: GET_LATEST_ITEMS_ERROR
});

export const requestItemDetails = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_ITEM_DETAILS_REQUEST,
            id
        });

        const item = await itemsAPI.getItemDetails(id);

        dispatch({
            type: GET_ITEM_DETAILS_COMPLETE,
            item
        });

        return item;
    },

    errorType: GET_ITEM_DETAILS_ERROR
});

export const updateItem = async (id, name, description, categoryId) => ({
    func: async (dispatch) => {
        dispatch({
            type: UPDATE_ITEM_REQUEST,
            id,
            name,
            description,
            categoryId
        });

        const updated = await itemsAPI.updateItem(id, name, description, categoryId);

        dispatch({
            type: UPDATE_ITEM_COMPLETE,
            item: updated
        });

        return updated;
    },

    errorType: UPDATE_ITEM_ERROR
});

export const addItem = async (name, description, categoryId) => ({
    func: async (dispatch) => {
        dispatch({
            type: ADD_ITEM_REQUEST,
            name,
            description,
            categoryId
        });

        const added = await itemsAPI.addItem(name, description, categoryId);

        dispatch({
            type: ADD_ITEM_COMPLETE,
            item: added
        });

        return added;
    },

    errorType: ADD_ITEM_ERROR
});

export const deleteItem = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: DELETE_ITEM_REQUEST,
            id
        });

        await itemsAPI.deleteItem(id);

        dispatch({
            type: DELETE_ITEM_COMPLETE,
            id
        });

        return true;
    },

    errorType: DELETE_ITEM_ERROR
});