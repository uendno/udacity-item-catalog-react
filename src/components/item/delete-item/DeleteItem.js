import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import './DeleteItem.css';
import {deleteItem} from '../../../actions/items';


class DeleteItem extends Component {

    static propTypes = {
        deleteItem: PropTypes.func.isRequired
    };

    render() {


        return (
            <div className='edit-item-component'>
                <div className='component-content-wrapper'>
                    <div className='inner'>
                        <div className="delete-item-wrapper">
                            <h1>Delete item</h1>
                            Are you sure want to delete?
                            <button className='delete-button' onClick={this.handleDelete.bind(this)}>Submit</button>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

    async handleDelete() {
        const {deleteItem, match, history} = this.props;
        const itemId = match.params.itemId;

        const result = await deleteItem(parseInt(itemId));

        if (result) {
            history.push('/')
        }
    }
}

export default withRouter(connect(null, {
    deleteItem
})(DeleteItem))