import {combineReducers} from 'redux';
import categories, * as fromCategories from './categories';
import auth, * as fromAuth from './auth';
import items, * as fromItems from './items';

export default combineReducers({
    categories,
    auth,
    items
})

