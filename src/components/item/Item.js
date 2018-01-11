import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {requestItemDetails} from '../../actions/items';
import {getItemById, getSessionInfo} from '../../reducers';
import './Item.css';


class Item extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        sessionInfo: PropTypes.object
    };

    componentDidMount() {
        const {requestItemDetails, match} = this.props;
        const itemId = match.params.itemId;

        requestItemDetails(itemId);
    }

    render() {
        const {item} = this.props;

        if (item) {

            return (
                <div className='item-component'>
                    <div className='component-content-wrapper'>
                        <div className='inner'>
                            <div className="single-item-wrapper">
                                <h1 className="big-title">{item.name} </h1>
                                <p> {item.description}</p>
                                {this._renderActionButtonsIfNeeded()}
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div className='item-component'>
                    <div className='component-content-wrapper'>
                        <div className='inner'>
                            <div className="single-item-wrapper">

                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }

    _renderActionButtonsIfNeeded() {
        const {sessionInfo, item} = this.props;

        if (!sessionInfo) {
            return null
        }

        if (item.userId === sessionInfo.id) {
            return (
                <div>
                    <Link to={`/catalog/${item.category.slug}/${item.slug}/${item.id}/edit`}>Edit</Link> | <Link
                    to={`/catalog/${item.category.slug}/${item.slug}/${item.id}/delete`}>Delete</Link>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match} = ownProps;
    const itemId = match.params.itemId;

    return {
        item: getItemById(state, itemId),
        sessionInfo: getSessionInfo(state)
    }

};

export default withRouter(connect(mapStateToProps, {
    requestItemDetails
})(Item))