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