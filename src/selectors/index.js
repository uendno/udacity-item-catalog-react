import * as categoriesSelectors from './categories';
import * as authSelectors from './auth';
import * as itemsSelectors from './items';


export const getAccessToken = (state) => authSelectors.getAccessToken(state.auth);

export const getSessionInfo = (state) => authSelectors.getSessionInfo(state.auth);

export const getAllCategories = (state) => categoriesSelectors.getAllCategories(state.categories);

export const getLatestItems = (state) => itemsSelectors.getLatestItems(state.items);

export const getItemsForCategory = (state, categorySlug) => itemsSelectors.getItemsForCategory(state.items, categorySlug);

export const getItemById = (state, itemId) => itemsSelectors.getItemById(state.items, itemId);