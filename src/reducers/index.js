import {combineReducers} from 'redux';
import categories from './categories';
import auth from './auth';
import items from './items';

export default combineReducers({
    categories,
    auth,
    items
})

