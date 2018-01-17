import _ from 'lodash';

let data;

try {
    const persisted = localStorage.getItem('item-catalog-data');
    data = JSON.parse(persisted);
} catch (error) {
    data = {};
}


const localStorageSrv = {
    get: (key) => data[key],
    set: (key, value) => {
        data[key] = value;
        localStorage.setItem('item-catalog-data', JSON.stringify(data));
    },
    remove: (key) => {
        data = _.omit(data, key);
        localStorage.setItem('item-catalog-data', JSON.stringify(data));
    }
};

export default localStorageSrv;


