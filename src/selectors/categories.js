export const getAllCategories = (state) => {
    return state.ids.map(id => state.byId[id]);
};