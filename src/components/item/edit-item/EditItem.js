import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {requestItemDetails, updateItem, addItem} from '../../../actions/items';
import {requestAllCategories} from '../../../actions/category';
import {getItemById, getSessionInfo, getAllCategories} from '../../../selectors';
import './EditItem.scss';


class Item extends Component {

    static propTypes = {
        item: PropTypes.object,
        sessionInfo: PropTypes.object,
        requestAllCategories: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        updateItem: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {}
    }

    async componentDidMount() {
        const {requestItemDetails, match, requestAllCategories} = this.props;
        const itemId = match.params.itemId;

        requestAllCategories();

        if (itemId) {
            const item = await requestItemDetails(itemId);
            this.setState({
                id: item.id,
                name: item.name,
                description: item.description,
                categoryId: item.category.id
            })
        } else {

        }


    }

    componentDidUpdate() {
        const {categories} = this.props;
        const {categoryId} = this.state;

        if (!categoryId) {
            this.setState({
                categoryId: categories[0].id
            })
        }
    }

    render() {
        const {name, description} = this.state;


        return (
            <div className='edit-item-component'>
                <div className='component-content-wrapper'>
                    <div className='inner'>
                        <div className="edit-item-wrapper">
                            <h1 className="big-title">Edit Item</h1>
                            <br/>

                            Title
                            <br/>
                            <input type="text" name="title" value={name || ''} onChange={event => this.setState({
                                name: event.target.value
                            })}/>
                            <br/>
                            <br/>

                            Description
                            <br/>
                            <textarea name="title" value={description || ''} onChange={event => this.setState({
                                description: event.target.value
                            })}/>
                            <br/>
                            <br/>

                            Category
                            <br/>
                            {this.renderCategorySelect()}

                            <br/>
                            <br/>
                            <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        )

    }

    renderCategorySelect() {
        const {categories} = this.props;
        const {categoryId} = this.state;

        if (categories.length === 0) {
            return null;
        }

        return (
            <select value={categoryId || categories[0].id} onChange={event => this.setState({
                categoryId: event.target.value
            })}
            >
                {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
        )
    }

    async handleSubmit() {
        const {history, updateItem, addItem} = this.props;
        const {id, name, description, categoryId} = this.state;

        if (history.location.pathname === '/add') {
            const added = await addItem(name, description, categoryId);

            if (added) {
                history.push('/');
            }
        } else {
            const updated = await updateItem(id, name, description, categoryId);
            if (updated) {
                history.push("/catalog/" + updated.category.slug + "/" + updated.slug + "/" + updated.id);
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match} = ownProps;
    const itemId = match.params.itemId;

    return {
        item: getItemById(state, itemId),
        sessionInfo: getSessionInfo(state),
        categories: getAllCategories(state)
    }

};

export default withRouter(connect(mapStateToProps, {
    requestItemDetails,
    requestAllCategories,
    updateItem,
    addItem
})(Item))