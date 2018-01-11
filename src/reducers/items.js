import {
    GET_LATEST_ITEMS_COMPLETE, GET_CATEGORY_DETAILS_COMPLETE, GET_ITEM_DETAILS_COMPLETE,
    UPDATE_ITEM_COMPLETE, ADD_ITEM_COMPLETE, DELETE_ITEM_COMPLETE
} from '../actions/types';

const initialState = {
    ids: [],
    byId: {},
    latest: []
};

const items = (state = initialState, action) => {
    switch (action.type) {
        case GET_LATEST_ITEMS_COMPLETE: {
            const latest = [];
            const byId = {...state.byId};

            action.items.forEach(item => {
                latest.push(item.id);
                byId[item.id] = item;
            });

            return {
                ...state,
                latest,
                byId
            }
        }

        case GET_CATEGORY_DETAILS_COMPLETE: {
            const ids = [...state.ids];
            const byId = {...state.byId};

            action.category.items.forEach(item => {
                if (ids.indexOf(item.id) === -1) {
                    ids.push(item.id);
                    byId[item.id] = item;
                }
            });

            return {
                ...state,
                ids,
                byId
            }
        }

        case GET_ITEM_DETAILS_COMPLETE: {
            const ids = [...state.ids];
            const byId = {...state.byId};
            const item = action.item;


            if (ids.indexOf(item.id) === -1) {
                ids.push(item.id);
            }

            byId[item.id] = item;

            return {
                ...state,
                ids,
                byId
            }
        }

        case UPDATE_ITEM_COMPLETE: {
            const item = action.item;
            const byId = {...state.byId};

            byId[item.id] = {
                ...byId[item.id],
                ...item
            };

            return {
                ...state,
                byId
            }
        }
        case ADD_ITEM_COMPLETE: {
            const item = action.item;
            const byId = {...state.byId};
            const ids = [...state.ids];


            byId[item.id] = item;
            ids.push(item.id);

            const latest = [item.id, ...state.latest].splice(-1, 1);

            return {
                ...state,
                byId,
                ids,
                latest
            }
        }

        case DELETE_ITEM_COMPLETE:
            const id = action.id;
            const byId = {...state.byId};
            let ids = [...state.ids];
            let latest = [...state.latest];

            ids.splice(ids.indexOf(id), 1);
            latest.splice(latest.indexOf(id), 1);
            byId[action.id] = null;

            return {
                ...state,
                byId,
                ids,
                latest
            };

        default:
            return state;
    }
};

export default items;

export const getLatestItems = (state) => {
    return state.latest.map(id => state.byId[id])
};

export const getItemsForCategory = (state, categorySlug) => {
    return state.ids.map(id => state.byId[id])
        .filter(item => item.category.slug === categorySlug);
};

export const getItemById = (state, id) => {
    return state.byId[id];
};