import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {requestAllCategories, requestCategoryDetails} from '../../actions/category';
import {requestLatestItems} from '../../actions/items';
import {getAllCategories, getLatestItems, getItemsForCategory, getAccessToken} from '../../reducers';
import './Catalog.css';

class CatalogComponent extends Component {

    static propTypes = {
        requestAllCategories: PropTypes.func.isRequired,
        requestLatestItems: PropTypes.func.isRequired,
        requestCategoryDetails: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        isIndex: PropTypes.bool.isRequired,
        categorySlug: PropTypes.string,
        accessToken: PropTypes.string
    };


    componentDidMount() {
        const {requestAllCategories, requestLatestItems, requestCategoryDetails, categorySlug} = this.props;


        requestAllCategories();

        if (categorySlug) {
            requestCategoryDetails(categorySlug);
        } else {
            requestLatestItems();
        }
    }

    componentDidUpdate(prevProps) {
        const prevCategorySlug = prevProps.categorySlug;
        const {requestLatestItems, requestCategoryDetails, categorySlug} = this.props;

        if (prevCategorySlug !== categorySlug) {
            if (categorySlug) {
                requestCategoryDetails(categorySlug);
            } else {
                requestLatestItems();
            }
        }
    }

    render() {
        return (
            <div className='catalog-component'>
                <div className='component-content-wrapper'>
                    <div className='inner'>
                        <div className='categories-wrapper'>
                            <h2 className="big-title">Categories</h2>
                            {this._renderCategories()}
                        </div>

                        <div className="separator-wrapper">
                            <div className="separator"/>
                        </div>

                        <div className='items-wrapper'>
                            {this._renderAddButtonIfNeeded()}
                            {this._renderTitle()}
                            {this._renderItems()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _renderAddButtonIfNeeded() {
        const {isIndex, accessToken} = this.props;

        if (isIndex && accessToken) {
            return (
                <Link to="/add">Add Item</Link>
            )
        } else {
            return null;
        }
    }

    _renderTitle() {
        const {isIndex, categories, categorySlug} = this.props;


        let title = '';

        if (isIndex) {
            title = 'Latest Items';
        } else {
            const category = categories.find(cat => cat.slug === categorySlug);

            if (category) {
                title = category.name;
            }
        }

        return (<h2 className="big-title">{title}</h2>)
    }

    _renderCategories() {
        const {categories} = this.props;

        return categories.map(category => (
            <div key={category.id}>
                <Link replace={true} to={{
                    pathname: `/catalog/${category.slug}/items`,
                    state: category.slug,
                }}>{category.name}</Link>
                <br/>
            </div>
        ))
    }

    _renderItems() {
        const {isIndex, items} = this.props;

        return items.map(item => {
            return (
                <div className='item' key={item.id}>
                    <Link className='item-link'
                          to={`/catalog/${item.category.slug}/${item.slug}/${item.id}`}>{item.name} </Link>
                    {isIndex ? (<span className='item-category'>({item.category.name})</span>) : null}
                </div>
            )
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match} = ownProps;
    const categorySlug = match.params.categorySlug;

    if (categorySlug) {
        return {
            categories: getAllCategories(state),
            isIndex: false,
            items: getItemsForCategory(state, categorySlug),
            accessToken: getAccessToken(state),
            categorySlug
        }
    } else {
        return {
            categories: getAllCategories(state),
            items: getLatestItems(state),
            isIndex: true,
            accessToken: getAccessToken(state),
        }
    }
};

export default withRouter(connect(mapStateToProps, {
    requestAllCategories,
    requestLatestItems,
    requestCategoryDetails
})(CatalogComponent));