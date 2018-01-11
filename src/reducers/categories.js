import {GET_CATEGORIES_COMPLETE} from '../actions/types';

const initialState = {
    byId: {},
    ids: []
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_COMPLETE: {
            const categories = action.categories;

            const byId = {};
            const ids = [];

            categories.forEach(category => {
                ids.push(category.id);
                byId[category.id] = category;
            });

            return {
                byId,
                ids
            }
        }

        default:
            return state;
    }
};

export default categories;

export const getAllCategories = (state) => {
    return state.ids.map(id => state.byId[id]);
};