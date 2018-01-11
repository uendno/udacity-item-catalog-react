import {combineReducers} from 'redux';
import categories, * as fromCategories from './categories';
import auth, * as fromAuth from './auth';
import items, * as fromItems from './items';

export default combineReducers({
    categories,
    auth,
    items
})

export const getAccessToken = (state) => fromAuth.getAccessToken(state.auth);

export const getSessionInfo = (state) => fromAuth.getSessionInfo(state.auth);

export const getAllCategories = (state) => fromCategories.getAllCategories(state.categories);

export const getLatestItems = (state) => fromItems.getLatestItems(state.items);

export const getItemsForCategory = (state, categorySlug) => fromItems.getItemsForCategory(state.items, categorySlug);

export const getItemById = (state, itemId) => fromItems.getItemById(state.items, itemId);