import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getAccessToken} from '../../selectors';
import {logout} from '../../actions/auth';

class LoginButton extends Component {
    static propTypes = {
        accessToken: PropTypes.string,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {accessToken} = this.props;

        return accessToken ? <button className='header-login-button' onClick={this.logout.bind(this)}>
                Logout</button> :
            <Link className='header-login-button' to='/login'>Login</Link>
    }

    logout() {
        const {logout, history} = this.props;
        logout();
        history.push('/');
    }

}

const mapStateToProps = (state) => ({
    accessToken: getAccessToken(state)
});

export default withRouter(connect(mapStateToProps, {
    logout
})(LoginButton));